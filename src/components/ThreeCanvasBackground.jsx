import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * Optimized Full-Viewport Scroll-Driven 3D WebGL Canvas Scene
 * Features lerped scroll progress dampening and clamped delta times
 * to prevent crashes or stutter during rapid mouse wheel scrolling.
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

    // 3. 3D Torus Knot Geometry (Light Theme Coral/Indigo Wireframe)
    const geometry = new THREE.TorusKnotGeometry(1.2, 0.36, 120, 32)
    
    // Outer Coral Wireframe Mesh
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xE85D3F,
      wireframe: true,
      transparent: true,
      opacity: 0.5
    })
    const wireframeMesh = new THREE.Mesh(geometry, wireframeMaterial)

    // Inner Solid Indigo Mesh
    const innerMaterial = new THREE.MeshStandardMaterial({
      color: 0x4F46E5,
      roughness: 0.3,
      metalness: 0.7,
      transparent: true,
      opacity: 0.25
    })
    const innerMesh = new THREE.Mesh(geometry, innerMaterial)
    innerMesh.scale.set(0.98, 0.98, 0.98)

    const knotGroup = new THREE.Group()
    knotGroup.add(wireframeMesh)
    knotGroup.add(innerMesh)
    scene.add(knotGroup)

    // 4. Optimized 3D Particle Constellation (Depth-Write False for fast rendering)
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

    // 5. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2)
    scene.add(ambientLight)

    const coralPointLight = new THREE.PointLight(0xE85D3F, 3.5, 10)
    coralPointLight.position.set(3, 4, 5)
    scene.add(coralPointLight)

    const indigoPointLight = new THREE.PointLight(0x4F46E5, 3.5, 10)
    indigoPointLight.position.set(-3, -4, 3)
    scene.add(indigoPointLight)

    // 6. Interactive Mouse & Scroll Progress Tracking with Smoothing
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

    // 7. Render Loop with Clamped Frame Delta
    let animationFrameId
    let clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const delta = Math.min(clock.getDelta(), 0.033) // Clamp max delta to 33ms
      const elapsedTime = clock.getElapsedTime()

      // Dampen scroll progress lerp to eliminate rapid scroll jitter
      const rawScrollP = getRawScrollProgress()
      smoothScrollP = lerp(smoothScrollP, rawScrollP, 0.08)

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.05
      mouseY += (targetMouseY - mouseY) * 0.05

      // Calculate 3D Knot Targets based on smoothScrollP (0.0 -> 1.0)
      let targetX = 0
      let targetY = 0
      let targetZ = 0
      let targetScale = 1

      if (smoothScrollP < 0.25) {
        const t = smoothScrollP / 0.25
        targetX = lerp(2.2, -2.4, t)
        targetY = lerp(0.2, -0.2, t)
        targetZ = lerp(0, 0.4, t)
        targetScale = lerp(1, 1.15, t)
      } else if (smoothScrollP < 0.5) {
        const t = (smoothScrollP - 0.25) / 0.25
        targetX = lerp(-2.4, 2.2, t)
        targetY = lerp(-0.2, 0.4, t)
        targetZ = lerp(0.4, 0.8, t)
        targetScale = lerp(1.15, 1.25, t)
      } else if (smoothScrollP < 0.75) {
        const t = (smoothScrollP - 0.5) / 0.25
        targetX = lerp(2.2, 0, t)
        targetY = lerp(0.4, 0, t)
        targetZ = lerp(0.8, 1.5, t)
        targetScale = lerp(1.25, 1.4, t)
      } else {
        const t = (smoothScrollP - 0.75) / 0.25
        targetX = lerp(0, 0, t)
        targetY = lerp(0, -0.3, t)
        targetZ = lerp(1.5, 2.6, t)
        targetScale = lerp(1.4, 1.75, t)
      }

      // Smoothly interpolate position & scale
      knotGroup.position.x = lerp(knotGroup.position.x, targetX + mouseX * 0.4, 0.08)
      knotGroup.position.y = lerp(knotGroup.position.y, targetY - mouseY * 0.4, 0.08)
      knotGroup.position.z = lerp(knotGroup.position.z, targetZ, 0.08)

      knotGroup.scale.x = lerp(knotGroup.scale.x, targetScale, 0.08)
      knotGroup.scale.y = lerp(knotGroup.scale.y, targetScale, 0.08)
      knotGroup.scale.z = lerp(knotGroup.scale.z, targetScale, 0.08)

      // Continuous rotation
      knotGroup.rotation.x = elapsedTime * 0.35 + smoothScrollP * Math.PI * 2.5 + mouseY * 0.4
      knotGroup.rotation.y = elapsedTime * 0.45 + smoothScrollP * Math.PI * 4 + mouseX * 0.4
      knotGroup.rotation.z = smoothScrollP * Math.PI * 1.5

      // Particle rotation
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
      geometry.dispose()
      wireframeMaterial.dispose()
      innerMaterial.dispose()
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
