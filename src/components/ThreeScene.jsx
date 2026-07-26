import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Loader2, Sparkles } from 'lucide-react'

/**
 * Interactive WebGL 3D Canvas Scene for Hero Card with OrbitControls & Loading Status.
 * Displays real-time download percentage & sleek progress bar until mouse.glb is loaded.
 */
export default function ThreeScene({ className = "w-full h-full" }) {
  const mountRef = useRef(null)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    // 1. Scene & Camera Setup
    const width = container.clientWidth || 400
    const height = container.clientHeight || 400

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.set(0, 0, 5.2)

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // 3. User Interactive OrbitControls with ZOOM Enabled
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.08
    controls.enableZoom = true
    controls.minDistance = 2.5
    controls.maxDistance = 7.5
    controls.enablePan = false
    controls.target.set(0, -0.05, 0)
    
    // Clamp rotation angles so the back of the model is NEVER shown
    controls.minAzimuthAngle = -Math.PI / 3.5
    controls.maxAzimuthAngle = Math.PI / 3.5
    controls.minPolarAngle = Math.PI / 3.2
    controls.maxPolarAngle = Math.PI / 1.8

    // Main 3D Model Group
    const modelGroup = new THREE.Group()
    scene.add(modelGroup)

    // 4. Load Custom mouse.glb 3D Model with Real-Time Progress Tracking
    const base = import.meta.env.BASE_URL || '/'
    const modelUrl = `${base}mouse.glb`

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
        const targetScale = 1.9 / (maxDim || 1)
        loadedModel.scale.set(targetScale, targetScale, targetScale)

        loadedModel.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
          }
        })

        modelGroup.add(loadedModel)
        setLoadingProgress(100)
        setTimeout(() => setIsLoaded(true), 200)
      },
      (xhr) => {
        if (xhr.lengthComputable && xhr.total > 0) {
          const percent = Math.round((xhr.loaded / xhr.total) * 100)
          setLoadingProgress(percent)
        } else {
          // Estimate progress if total size unavailable
          setLoadingProgress((prev) => Math.min(prev + 15, 90))
        }
      },
      (error) => {
        console.warn('Failed to load mouse.glb:', error)
        setIsLoaded(true) // Graceful fallback
      }
    )

    // 5. 3D Orbiting Particle Constellation
    const particleCount = 280
    const particlePositions = new Float32Array(particleCount * 3)
    const particleColors = new Float32Array(particleCount * 3)

    const colorCoral = new THREE.Color(0xE85D3F)
    const colorIndigo = new THREE.Color(0x4F46E5)

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 10
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 10
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 10

      const mixedColor = colorCoral.clone().lerp(colorIndigo, Math.random())
      particleColors[i * 3] = mixedColor.r
      particleColors[i * 3 + 1] = mixedColor.g
      particleColors[i * 3 + 2] = mixedColor.b
    }

    const particleGeometry = new THREE.BufferGeometry()
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3))

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    })

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particleSystem)

    // 6. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8)
    scene.add(ambientLight)

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.5)
    mainLight.position.set(2, 4, 5)
    scene.add(mainLight)

    const coralPointLight = new THREE.PointLight(0xE85D3F, 3, 10)
    coralPointLight.position.set(2, 2, 3)
    scene.add(coralPointLight)

    // 7. Animation Render Loop
    let animationFrameId
    let clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      controls.update()

      if (modelGroup) {
        modelGroup.position.y = -0.05 + Math.sin(elapsedTime * 1.5) * 0.03
      }

      particleSystem.rotation.y = -elapsedTime * 0.05

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
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
      controls.dispose()
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }
      particleGeometry.dispose()
      particleMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div className={`relative ${className}`}>
      {/* Loading Status Indicator (Overlay inside Card Showcase) */}
      {!isLoaded && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#FAFAF8]/95 backdrop-blur-md rounded-2xl p-6 transition-opacity duration-300">
          <div className="flex items-center space-x-2 text-[#E85D3F] mb-3">
            <Loader2 className="w-6 h-6 animate-spin" />
            <Sparkles className="w-5 h-5 text-[#4F46E5] animate-pulse" />
          </div>

          <span className="font-jakarta font-black text-xs uppercase tracking-widest text-[#1A1A1A] mb-1">
            Loading 3D Model
          </span>
          <span className="font-mono text-sm font-extrabold text-[#E85D3F] mb-4">
            {loadingProgress}%
          </span>

          {/* Progress Bar Track */}
          <div className="w-44 h-2 bg-[#E0DFDB] rounded-full overflow-hidden border border-[#1A1A1A]/20 shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-[#E85D3F] via-[#F43F5E] to-[#4F46E5] transition-all duration-200 rounded-full"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* WebGL Canvas Container */}
      <div 
        ref={mountRef} 
        className={`w-full h-full cursor-grab active:cursor-grabbing select-none pointer-events-auto transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`} 
      />
    </div>
  )
}
