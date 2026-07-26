import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * High-performance WebGL 3D Canvas Scene powered by Three.js
 * Features a floating interactive 3D Torus Knot with wireframe geometry,
 * orbiting particle constellation, mouse-tilt interaction, and scroll-linked rotation.
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
    camera.position.z = 4.5

    // 2. WebGL Renderer with Alpha & Antialiasing
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // 3. 3D Torus Knot Geometry (Anime.js Style)
    const geometry = new THREE.TorusKnotGeometry(1.1, 0.35, 128, 32)
    
    // Outer Cyan/Indigo Wireframe Material
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x06B6D4,
      wireframe: true,
      transparent: true,
      opacity: 0.75
    })
    const wireframeMesh = new THREE.Mesh(geometry, wireframeMaterial)

    // Inner Glowing Solid Mesh
    const innerMaterial = new THREE.MeshStandardMaterial({
      color: 0x4F46E5,
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: 0.35
    })
    const innerMesh = new THREE.Mesh(geometry, innerMaterial)
    innerMesh.scale.set(0.98, 0.98, 0.98)

    // Grouping the 3D meshes
    const knotGroup = new THREE.Group()
    knotGroup.add(wireframeMesh)
    knotGroup.add(innerMesh)
    scene.add(knotGroup)

    // 4. 3D Orbiting Particle Constellation
    const particleCount = 450
    const particlePositions = new Float32Array(particleCount * 3)
    const particleColors = new Float32Array(particleCount * 3)

    const color1 = new THREE.Color(0x06B6D4) // Cyan
    const color2 = new THREE.Color(0x8B5CF6) // Violet

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 12
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 12
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 12

      const mixedColor = color1.clone().lerp(color2, Math.random())
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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)

    const cyanPointLight = new THREE.PointLight(0x06B6D4, 3, 10)
    cyanPointLight.position.set(2, 3, 4)
    scene.add(cyanPointLight)

    const purplePointLight = new THREE.PointLight(0x8B5CF6, 3, 10)
    purplePointLight.position.set(-2, -3, 2)
    scene.add(purplePointLight)

    // 6. Interactive Mouse & Scroll Target Tracking
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

      // Continuous 3D rotation + mouse tilt
      knotGroup.rotation.x = elapsedTime * 0.35 + mouseY * 0.8
      knotGroup.rotation.y = elapsedTime * 0.45 + mouseX * 0.8
      knotGroup.rotation.z = Math.sin(elapsedTime * 0.5) * 0.2

      // Scroll-driven extra rotation
      const scrollY = window.scrollY || 0
      knotGroup.rotation.y += scrollY * 0.001

      // Rotate particle constellation slowly
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

    // Cleanup Resources
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
      className={`relative cursor-grab active:cursor-grabbing select-none ${className}`} 
    />
  )
}
