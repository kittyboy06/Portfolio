import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

/**
 * Full-Viewport Scroll-Driven 3D WebGL Canvas Scene with mouse.glb Model
 * Rotation is clamped to front-facing angles so the back of the model is never exposed.
 */
export default function ThreeCanvasBackground() {
  const mountRef = useRef(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    // 1. Scene & Perspective Camera Setup
    let width = window.innerWidth
    let height = window.innerHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000)
    camera.position.z = 5.5

    // 2. High-Performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    container.appendChild(renderer.domElement)

    // Main 3D Group
    const modelGroup = new THREE.Group()
    scene.add(modelGroup)

    // 3. Load Custom mouse.glb 3D Model
    const base = import.meta.env.BASE_URL || '/'
    const modelUrl = `${base}mouse.glb`

    const loader = new GLTFLoader()
    let loadedModel = null

    loader.load(
      modelUrl,
      (gltf) => {
        loadedModel = gltf.scene

        // Auto-center and normalize scale of the 3D model
        const box = new THREE.Box3().setFromObject(loadedModel)
        const center = box.getCenter(new THREE.Vector3())
        const size = box.getSize(new THREE.Vector3())

        // Center geometry to origin
        loadedModel.position.sub(center)

        // Scale factor (~3.5 units for full view)
        const maxDim = Math.max(size.x, size.y, size.z)
        const targetScale = 3.5 / (maxDim || 1)
        loadedModel.scale.set(targetScale, targetScale, targetScale)

        // Enable shadows & metallic reflections
        loadedModel.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
          }
        })

        modelGroup.add(loadedModel)
      },
      undefined,
      (error) => {
        console.warn('Failed to load mouse.glb:', error)
      }
    )

    // 4. 3D Orbiting Particle Constellation
    const particleCount = 400
    const particlePositions = new Float32Array(particleCount * 3)
    const particleColors = new Float32Array(particleCount * 3)

    const colorCoral = new THREE.Color(0xE85D3F)
    const colorIndigo = new THREE.Color(0x4F46E5)
    const colorDark = new THREE.Color(0x1A1A1A)

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 16
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 16
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 16

      const r = Math.random()
      const mixedColor = r < 0.5 ? colorCoral.clone().lerp(colorIndigo, r * 2) : colorIndigo.clone().lerp(colorDark, (r - 0.5) * 2)
      particleColors[i * 3] = mixedColor.r
      particleColors[i * 3 + 1] = mixedColor.g
      particleColors[i * 3 + 2] = mixedColor.b
    }

    const particleGeometry = new THREE.BufferGeometry()
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3))

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      depthWrite: false
    })

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particleSystem)

    // 5. Lighting Setup for Light Theme
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6)
    scene.add(ambientLight)

    const coralPointLight = new THREE.PointLight(0xE85D3F, 4, 12)
    coralPointLight.position.set(3, 4, 5)
    scene.add(coralPointLight)

    const indigoPointLight = new THREE.PointLight(0x4F46E5, 4, 12)
    indigoPointLight.position.set(-3, -4, 3)
    scene.add(indigoPointLight)

    // 6. Interactive Mouse & Scroll Target Tracking
    let targetMouseX = 0
    let targetMouseY = 0
    let mouseX = 0
    let mouseY = 0
    let smoothScrollP = 0

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    const lerp = (start, end, amt) => (1 - amt) * start + amt * end

    const getRawScrollProgress = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      if (totalScroll <= 0) return 0
      return Math.max(0, Math.min(1, window.scrollY / totalScroll))
    }

    // 7. Render Loop (Clamped front-facing angles)
    let animationFrameId
    let clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      const rawScrollP = getRawScrollProgress()
      smoothScrollP = lerp(smoothScrollP, rawScrollP, 0.08)

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.05
      mouseY += (targetMouseY - mouseY) * 0.05

      // Calculate 3D Targets based on smoothScrollP (0.0 -> 1.0)
      let targetX = 0
      let targetY = 0
      let targetZ = 0
      let targetScale = 1

      if (smoothScrollP < 0.25) {
        const t = smoothScrollP / 0.25
        targetX = lerp(2.0, -2.2, t)
        targetY = lerp(0.1, -0.1, t)
        targetZ = lerp(0, 0.4, t)
        targetScale = lerp(1, 1.15, t)
      } else if (smoothScrollP < 0.5) {
        const t = (smoothScrollP - 0.25) / 0.25
        targetX = lerp(-2.2, 2.0, t)
        targetY = lerp(-0.1, 0.3, t)
        targetZ = lerp(0.4, 0.8, t)
        targetScale = lerp(1.15, 1.25, t)
      } else if (smoothScrollP < 0.75) {
        const t = (smoothScrollP - 0.5) / 0.25
        targetX = lerp(2.0, 0, t)
        targetY = lerp(0.3, 0, t)
        targetZ = lerp(0.8, 1.5, t)
        targetScale = lerp(1.25, 1.4, t)
      } else {
        const t = (smoothScrollP - 0.75) / 0.25
        targetX = lerp(0, 0, t)
        targetY = lerp(0, -0.2, t)
        targetZ = lerp(1.5, 2.5, t)
        targetScale = lerp(1.4, 1.7, t)
      }

      modelGroup.position.x = lerp(modelGroup.position.x, targetX + mouseX * 0.4, 0.08)
      modelGroup.position.y = lerp(modelGroup.position.y, targetY - mouseY * 0.4, 0.08)
      modelGroup.position.z = lerp(modelGroup.position.z, targetZ, 0.08)

      modelGroup.scale.x = lerp(modelGroup.scale.x, targetScale, 0.08)
      modelGroup.scale.y = lerp(modelGroup.scale.y, targetScale, 0.08)
      modelGroup.scale.z = lerp(modelGroup.scale.z, targetScale, 0.08)

      // CLAMPED ROTATION: Only tilt subtly so the back is NEVER exposed
      modelGroup.rotation.x = Math.sin(elapsedTime * 0.6) * 0.12 + mouseY * 0.35
      modelGroup.rotation.y = Math.cos(elapsedTime * 0.5) * 0.18 + mouseX * 0.45
      modelGroup.rotation.z = Math.sin(elapsedTime * 0.4) * 0.05

      particleSystem.rotation.y = -elapsedTime * 0.05 - smoothScrollP * 1.5
      particleSystem.rotation.x = Math.sin(elapsedTime * 0.08) * 0.15

      renderer.render(scene, camera)
    }

    animate()

    // 8. Debounced Resize Handler
    let resizeTimer
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        width = window.innerWidth
        height = window.innerHeight
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height)
      }, 100)
    }

    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }
      particleGeometry.dispose()
      particleMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden" 
    />
  )
}
