import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * High-performance WebGL 3D Canvas Scene powered by Three.js
 * Features a morphing interactive 3D Icosahedron geometry with orbiting rings,
 * particle constellation, and mouse-tilt interaction.
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

    // 3. 3D Morphing Icosahedron Geometry
    const baseGeometry = new THREE.IcosahedronGeometry(1.3, 3)
    const positionAttribute = baseGeometry.attributes.position
    const vertexCount = positionAttribute.count

    const originalPositions = new Float32Array(vertexCount * 3)
    for (let i = 0; i < vertexCount * 3; i++) {
      originalPositions[i] = positionAttribute.array[i]
    }

    // Outer Coral Wireframe Material
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xE85D3F,
      wireframe: true,
      transparent: true,
      opacity: 0.75
    })
    const wireframeMesh = new THREE.Mesh(baseGeometry, wireframeMaterial)

    // Inner Solid Indigo Mesh
    const innerGeometry = new THREE.IcosahedronGeometry(1.0, 2)
    const innerMaterial = new THREE.MeshStandardMaterial({
      color: 0x4F46E5,
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: 0.35
    })
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial)

    // Outer Orbiting Wireframe Rings
    const ringGeometry = new THREE.TorusGeometry(1.9, 0.02, 16, 100)
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x4F46E5,
      wireframe: true,
      transparent: true,
      opacity: 0.5
    })
    const ringMesh1 = new THREE.Mesh(ringGeometry, ringMaterial)
    const ringMesh2 = new THREE.Mesh(ringGeometry, ringMaterial)
    ringMesh2.rotation.x = Math.PI / 2

    const polyGroup = new THREE.Group()
    polyGroup.add(wireframeMesh)
    polyGroup.add(innerMesh)
    polyGroup.add(ringMesh1)
    polyGroup.add(ringMesh2)
    scene.add(polyGroup)

    // 4. 3D Orbiting Particle Constellation
    const particleCount = 350
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
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2)
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

      // Vertex Morphing Wave
      const currentPositions = baseGeometry.attributes.position.array
      for (let i = 0; i < vertexCount; i++) {
        const vx = originalPositions[i * 3]
        const vy = originalPositions[i * 3 + 1]
        const vz = originalPositions[i * 3 + 2]

        const wave = Math.sin(elapsedTime * 2.5 + vx * 2 + vy * 2) * 0.15
        const scale = 1 + wave

        currentPositions[i * 3] = vx * scale
        currentPositions[i * 3 + 1] = vy * scale
        currentPositions[i * 3 + 2] = vz * scale
      }
      baseGeometry.attributes.position.needsUpdate = true

      // Continuous rotation + mouse tilt
      polyGroup.rotation.x = elapsedTime * 0.35 + mouseY * 0.8
      polyGroup.rotation.y = elapsedTime * 0.45 + mouseX * 0.8
      polyGroup.rotation.z = Math.sin(elapsedTime * 0.5) * 0.2

      ringMesh1.rotation.z = elapsedTime * 0.5
      ringMesh2.rotation.y = -elapsedTime * 0.6

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
      baseGeometry.dispose()
      wireframeMaterial.dispose()
      innerGeometry.dispose()
      innerMaterial.dispose()
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
