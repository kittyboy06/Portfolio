import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * Full-Viewport Scroll-Driven 3D WebGL Canvas Scene (Morphing Polyhedron)
 * Replaces TorusKnot with an interactive 3D Morphing Geodesic Polyhedron (Icosahedron)
 * with animated vertex displacement, wireframe grid, and orbiting particle constellation.
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

    // 3. 3D Morphing Icosahedron Geometry
    const baseGeometry = new THREE.IcosahedronGeometry(1.4, 3)
    const positionAttribute = baseGeometry.attributes.position
    const vertexCount = positionAttribute.count

    // Store original vertex positions for morphing calculations
    const originalPositions = new Float32Array(vertexCount * 3)
    for (let i = 0; i < vertexCount * 3; i++) {
      originalPositions[i] = positionAttribute.array[i]
    }

    // Outer Coral Wireframe Mesh
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xE85D3F,
      wireframe: true,
      transparent: true,
      opacity: 0.55
    })
    const wireframeMesh = new THREE.Mesh(baseGeometry, wireframeMaterial)

    // Inner Glowing Indigo Nucleus Mesh
    const innerGeometry = new THREE.IcosahedronGeometry(1.1, 2)
    const innerMaterial = new THREE.MeshStandardMaterial({
      color: 0x4F46E5,
      roughness: 0.25,
      metalness: 0.8,
      transparent: true,
      opacity: 0.35
    })
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial)

    // Outer Orbiting Wireframe Rings
    const ringGeometry = new THREE.TorusGeometry(2.1, 0.02, 16, 100)
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x4F46E5,
      wireframe: true,
      transparent: true,
      opacity: 0.4
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
    const particleCount = 420
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

    // 7. Render Loop with Vertex Morphing
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

      // Vertex Morphing / Pulsing Wave effect on outer icosahedron
      const currentPositions = baseGeometry.attributes.position.array
      for (let i = 0; i < vertexCount; i++) {
        const vx = originalPositions[i * 3]
        const vy = originalPositions[i * 3 + 1]
        const vz = originalPositions[i * 3 + 2]

        // 3D Sine wave distortion based on vertex position & time
        const wave = Math.sin(elapsedTime * 2.5 + vx * 2 + vy * 2) * 0.15
        const scale = 1 + wave

        currentPositions[i * 3] = vx * scale
        currentPositions[i * 3 + 1] = vy * scale
        currentPositions[i * 3 + 2] = vz * scale
      }
      baseGeometry.attributes.position.needsUpdate = true

      // Calculate 3D Targets based on smoothScrollP (0.0 -> 1.0)
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

      polyGroup.position.x = lerp(polyGroup.position.x, targetX + mouseX * 0.4, 0.08)
      polyGroup.position.y = lerp(polyGroup.position.y, targetY - mouseY * 0.4, 0.08)
      polyGroup.position.z = lerp(polyGroup.position.z, targetZ, 0.08)

      polyGroup.scale.x = lerp(polyGroup.scale.x, targetScale, 0.08)
      polyGroup.scale.y = lerp(polyGroup.scale.y, targetScale, 0.08)
      polyGroup.scale.z = lerp(polyGroup.scale.z, targetScale, 0.08)

      polyGroup.rotation.x = elapsedTime * 0.3 + smoothScrollP * Math.PI * 2.5 + mouseY * 0.4
      polyGroup.rotation.y = elapsedTime * 0.4 + smoothScrollP * Math.PI * 4 + mouseX * 0.4
      polyGroup.rotation.z = smoothScrollP * Math.PI * 1.5

      // Counter-rotate outer rings
      ringMesh1.rotation.z = elapsedTime * 0.5
      ringMesh2.rotation.y = -elapsedTime * 0.6

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
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden" 
    />
  )
}
