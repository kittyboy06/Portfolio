import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

/**
 * High-performance WebGL 3D Canvas Scene for Hero Card
 * Loads custom HORNET.glb model with orbiting rings and mouse-tilt interaction.
 */
export default function ThreeScene({ className = "w-full h-full" }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    // 1. Scene & Camera Setup
    const width = container.clientWidth || 400
    const height = container.clientHeight || 400

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000)
    camera.position.z = 4.2

    // 2. WebGL Renderer with Alpha & Antialiasing
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Main 3D Model Group
    const modelGroup = new THREE.Group()
    scene.add(modelGroup)

    // 3. Load Custom HORNET.glb 3D Model
    const base = import.meta.env.BASE_URL || '/'
    const modelUrl = `${base}HORNET.glb`

    const loader = new GLTFLoader()
    let loadedModel = null

    loader.load(
      modelUrl,
      (gltf) => {
        loadedModel = gltf.scene

        // Auto-center and normalize scale
        const box = new THREE.Box3().setFromObject(loadedModel)
        const center = box.getCenter(new THREE.Vector3())
        const size = box.getSize(new THREE.Vector3())

        loadedModel.position.sub(center)

        const maxDim = Math.max(size.x, size.y, size.z)
        const targetScale = 2.0 / (maxDim || 1)
        loadedModel.scale.set(targetScale, targetScale, targetScale)

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
        console.warn('Failed to load HORNET.glb:', error)
      }
    )

    // Outer Orbiting Wireframe Rings
    const ringGeometry = new THREE.TorusGeometry(2.1, 0.02, 16, 100)
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xE85D3F,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    })
    const ringMesh1 = new THREE.Mesh(ringGeometry, ringMaterial)
    const ringMesh2 = new THREE.Mesh(ringGeometry, ringMaterial)
    ringMesh2.rotation.x = Math.PI / 2

    modelGroup.add(ringMesh1)
    modelGroup.add(ringMesh2)

    // 4. 3D Orbiting Particle Constellation
    const particleCount = 300
    const particlePositions = new Float32Array(particleCount * 3)
    const particleColors = new Float32Array(particleCount * 3)

    const colorCoral = new THREE.Color(0xE85D3F)
    const colorIndigo = new THREE.Color(0x4F46E5)

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 12
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 12
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 12

      const mixedColor = colorCoral.clone().lerp(colorIndigo, Math.random())
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
      opacity: 0.85
    })

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particleSystem)

    // 5. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4)
    scene.add(ambientLight)

    const coralPointLight = new THREE.PointLight(0xE85D3F, 3.5, 10)
    coralPointLight.position.set(2, 3, 4)
    scene.add(coralPointLight)

    const indigoPointLight = new THREE.PointLight(0x4F46E5, 3.5, 10)
    indigoPointLight.position.set(-2, -3, 2)
    scene.add(indigoPointLight)

    // 6. Interactive Mouse Target Tracking
    let targetMouseX = 0
    let targetMouseY = 0
    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window
      targetMouseX = (e.clientX / innerWidth - 0.5) * 2
      targetMouseY = (e.clientY / innerHeight - 0.5) * 2
    }

    window.addEventListener('mousemove', handleMouseMove)

    // 7. Animation Render Loop
    let animationFrameId
    let clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.05
      mouseY += (targetMouseY - mouseY) * 0.05

      // Continuous rotation + mouse tilt
      modelGroup.rotation.x = elapsedTime * 0.25 + mouseY * 0.8
      modelGroup.rotation.y = elapsedTime * 0.35 + mouseX * 0.8
      modelGroup.rotation.z = Math.sin(elapsedTime * 0.5) * 0.2

      ringMesh1.rotation.z = elapsedTime * 0.4
      ringMesh2.rotation.y = -elapsedTime * 0.5

      particleSystem.rotation.y = -elapsedTime * 0.08
      particleSystem.rotation.x = Math.cos(elapsedTime * 0.05) * 0.1

      renderer.render(scene, camera)
    }

    animate()

    // 8. Responsive Resize Handler
    const handleResize = () => {
      if (!container) return
      const newWidth = container.clientWidth
      const newHeight = container.clientHeight
      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }
      ringGeometry.dispose()
      ringMaterial.dispose()
      particleGeometry.dispose()
      particleMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div 
      ref={mountRef} 
      className={`relative cursor-grab active:cursor-grabbing select-none ${className}`} 
    />
  )
}
