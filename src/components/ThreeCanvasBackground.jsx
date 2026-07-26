import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * Full-Viewport Scroll-Driven 3D WebGL Canvas Scene (Anime.js Style)
 * Continuous 3D camera travel, knot position translation, wireframe morphing,
 * and particle warp speed linked directly to mouse wheel scrolling!
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

    // 2. WebGL Renderer with Alpha
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // 3. 3D Torus Knot Geometry (Anime.js Geometric Mesh)
    const geometry = new THREE.TorusKnotGeometry(1.25, 0.38, 140, 36)
    
    // Outer Cyan Wireframe Mesh
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x06B6D4,
      wireframe: true,
      transparent: true,
      opacity: 0.65
    })
    const wireframeMesh = new THREE.Mesh(geometry, wireframeMaterial)

    // Inner Glowing Violet Mesh
    const innerMaterial = new THREE.MeshStandardMaterial({
      color: 0x6366F1,
      roughness: 0.15,
      metalness: 0.85,
      transparent: true,
      opacity: 0.35
    })
    const innerMesh = new THREE.Mesh(geometry, innerMaterial)
    innerMesh.scale.set(0.98, 0.98, 0.98)

    const knotGroup = new THREE.Group()
    knotGroup.add(wireframeMesh)
    knotGroup.add(innerMesh)
    scene.add(knotGroup)

    // 4. 3D Orbiting Particle Constellation
    const particleCount = 650
    const particlePositions = new Float32Array(particleCount * 3)
    const particleColors = new Float32Array(particleCount * 3)

    const colorCyan = new THREE.Color(0x38BDF8)
    const colorViolet = new THREE.Color(0x8B5CF6)
    const colorRose = new THREE.Color(0xF43F5E)

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 18
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 18
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 18

      const r = Math.random()
      const mixedColor = r < 0.5 ? colorCyan.clone().lerp(colorViolet, r * 2) : colorViolet.clone().lerp(colorRose, (r - 0.5) * 2)
      particleColors[i * 3] = mixedColor.r
      particleColors[i * 3 + 1] = mixedColor.g
      particleColors[i * 3 + 2] = mixedColor.b
    }

    const particleGeometry = new THREE.BufferGeometry()
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3))

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.85
    })

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particleSystem)

    // 5. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9)
    scene.add(ambientLight)

    const cyanPointLight = new THREE.PointLight(0x06B6D4, 4, 12)
    cyanPointLight.position.set(3, 4, 5)
    scene.add(cyanPointLight)

    const purplePointLight = new THREE.PointLight(0x8B5CF6, 4, 12)
    purplePointLight.position.set(-3, -4, 3)
    scene.add(purplePointLight)

    // 6. Interactive Mouse & Scroll Target Tracking
    let targetMouseX = 0
    let targetMouseY = 0
    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Smooth lerp function
    const lerp = (start, end, amt) => (1 - amt) * start + amt * end

    // 7. Scroll-Driven 3D Keyframe Path Interpolation
    const getScrollProgress = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      if (totalScroll <= 0) return 0
      return Math.max(0, Math.min(1, window.scrollY / totalScroll))
    }

    // 8. Animation Render Loop
    let animationFrameId
    let clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()
      const scrollP = getScrollProgress()

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.05
      mouseY += (targetMouseY - mouseY) * 0.05

      // Calculate 3D Knot Position based on scroll sections (0.0 -> 1.0)
      let targetX = 0
      let targetY = 0
      let targetZ = 0
      let targetScale = 1

      if (scrollP < 0.25) {
        // Hero Section: Top-right side of screen
        const t = scrollP / 0.25
        targetX = lerp(2.2, -2.4, t)
        targetY = lerp(0.2, -0.2, t)
        targetZ = lerp(0, 0.4, t)
        targetScale = lerp(1, 1.15, t)
      } else if (scrollP < 0.5) {
        // About & Achievements: Move to left and shift forward
        const t = (scrollP - 0.25) / 0.25
        targetX = lerp(-2.4, 2.2, t)
        targetY = lerp(-0.2, 0.4, t)
        targetZ = lerp(0.4, 0.8, t)
        targetScale = lerp(1.15, 1.25, t)
      } else if (scrollP < 0.75) {
        // Skills & Projects: Shift to top-center
        const t = (scrollP - 0.5) / 0.25
        targetX = lerp(2.2, 0, t)
        targetY = lerp(0.4, 0, t)
        targetZ = lerp(0.8, 1.5, t)
        targetScale = lerp(1.25, 1.4, t)
      } else {
        // Timeline & Contact: Center & Zoom deep inside particles!
        const t = (scrollP - 0.75) / 0.25
        targetX = lerp(0, 0, t)
        targetY = lerp(0, -0.3, t)
        targetZ = lerp(1.5, 2.8, t)
        targetScale = lerp(1.4, 1.8, t)
      }

      // Lerp knot position & scale smoothly
      knotGroup.position.x = lerp(knotGroup.position.x, targetX + mouseX * 0.5, 0.05)
      knotGroup.position.y = lerp(knotGroup.position.y, targetY - mouseY * 0.5, 0.05)
      knotGroup.position.z = lerp(knotGroup.position.z, targetZ, 0.05)

      knotGroup.scale.x = lerp(knotGroup.scale.x, targetScale, 0.05)
      knotGroup.scale.y = lerp(knotGroup.scale.y, targetScale, 0.05)
      knotGroup.scale.z = lerp(knotGroup.scale.z, targetScale, 0.05)

      // Continuous 3D rotation scrubbed by scroll position + time
      knotGroup.rotation.x = elapsedTime * 0.3 + scrollP * Math.PI * 3 + mouseY * 0.5
      knotGroup.rotation.y = elapsedTime * 0.4 + scrollP * Math.PI * 5 + mouseX * 0.5
      knotGroup.rotation.z = scrollP * Math.PI * 2

      // Warp speed particles rotation when scrolling fast
      particleSystem.rotation.y = -elapsedTime * 0.06 - scrollP * 2
      particleSystem.rotation.x = Math.sin(elapsedTime * 0.1) * 0.2 + scrollP

      renderer.render(scene, camera)
    }

    animate()

    // 9. Resize Handler
    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

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
