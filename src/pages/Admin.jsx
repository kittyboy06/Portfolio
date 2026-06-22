import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import portfolioData from '../data/portfolio.json'
import { Lock, Eye, EyeOff, Clipboard, Check, ArrowLeft, Terminal } from 'lucide-react'

export default function Admin() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passError, setPassError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [copied, setCopied] = useState(false)
  const [editedJson, setEditedJson] = useState('')

  // Initialize textarea content from static JSON
  useEffect(() => {
    setEditedJson(JSON.stringify(portfolioData, null, 2))
  }, [])

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    if (password === 'admin123') {
      setIsAuthenticated(true)
      setPassError('')
    } else {
      setPassError('ACCESS DENIED: INVALID DECRYPT KEY')
    }
  }

  const handleCopyClipboard = () => {
    navigator.clipboard.writeText(editedJson)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Gateway Access Page (Light/Coral Theme)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full bg-theme-bg flex items-center justify-center px-6 py-12 relative overflow-hidden">
        {/* Subtle background circles for playful visual vibe */}
        <div className="absolute top-[-100px] right-[-100px] w-96 h-96 rounded-full bg-theme-accent/5 pointer-events-none"></div>
        <div className="absolute bottom-[-100px] left-[-100px] w-96 h-96 rounded-full bg-theme-secondary/5 pointer-events-none"></div>

        <div className="max-w-md w-full bg-theme-card p-8 rounded-2xl offset-border offset-shadow-black text-center space-y-7 relative">
          {/* Top accent bar */}
          <div className="absolute top-0 left-0 w-full h-[6px] bg-theme-accent rounded-t-xl"></div>

          {/* Shield Lock Icon */}
          <div className="inline-flex p-4 rounded-full bg-theme-accent/10 text-theme-accent">
            <Lock className="w-6 h-6" />
          </div>

          <div className="space-y-1.5">
            <h2 className="font-jakarta font-extrabold text-2xl text-theme-text uppercase tracking-tight">
              Gateway Access
            </h2>
            <p className="font-jakarta text-xs text-theme-muted uppercase tracking-wider">
              Enter Admin Password to Unlock Config
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                placeholder="🔑 Password (admin123)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full font-jakarta font-bold text-sm bg-theme-bg border-2 border-theme-text px-4 py-3.5 rounded-lg text-theme-text placeholder-theme-muted focus:outline-none focus:border-theme-accent transition-colors tracking-wide"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-theme-muted hover:text-theme-text transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {passError && (
              <div className="font-jakarta font-bold text-xs text-theme-accent tracking-wide text-center uppercase animate-pulse">
                ⚠ {passError}
              </div>
            )}

            <button 
              type="submit"
              className="w-full font-jakarta font-extrabold text-sm uppercase py-4 rounded-lg bg-theme-accent hover:bg-theme-accent/90 text-white tracking-widest transition-colors shadow-sm"
            >
              Sync Database
            </button>
          </form>

          <Link 
            to="/" 
            className="inline-flex items-center space-x-1.5 font-jakarta font-bold text-xs uppercase text-theme-muted hover:text-theme-accent transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Surface</span>
          </Link>
        </div>
      </div>
    )
  }

  // Dashboard interface once logged in (Light/Coral Theme)
  return (
    <div className="min-h-screen w-full bg-theme-bg py-12 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        
        {/* Header navigation bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b-2 border-theme-text pb-6">
          <div className="flex items-center space-x-3 text-center sm:text-left">
            <div className="p-2.5 rounded-lg bg-theme-accent/10 text-theme-accent border-2 border-theme-text">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-jakarta font-extrabold text-2xl text-theme-text uppercase tracking-tight">
                System Database Console
              </h1>
              <p className="font-jakarta text-xs text-theme-accent tracking-wide uppercase font-semibold">
                Permission Level: Administrator (Active)
              </p>
            </div>
          </div>

          <Link 
            to="/" 
            className="flex items-center space-x-2 font-jakarta font-bold text-xs uppercase px-4 py-2.5 rounded-lg border-2 border-theme-text hover:bg-theme-accent hover:text-white bg-theme-card offset-shadow-black transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Surface Interface</span>
          </Link>
        </div>

        {/* Content Panel Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main JSON Data display screen */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-jakarta font-bold text-sm text-theme-text uppercase tracking-wider">
                📁 portfolio.json Configuration
              </span>
              
              {/* Copy Database button */}
              <button
                onClick={handleCopyClipboard}
                className="flex items-center space-x-1.5 font-jakarta font-extrabold text-xs uppercase px-4 py-2 rounded-lg border-2 border-theme-text bg-theme-accent text-white hover:bg-theme-accent/95 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Clipboard className="w-3.5 h-3.5" />
                    <span>Copy JSON File</span>
                  </>
                )}
              </button>
            </div>

            {/* Config textarea editor */}
            <div className="relative rounded-xl border-2 border-theme-text bg-theme-card overflow-hidden">
              {/* Top editor mock decoration tab */}
              <div className="bg-theme-surface border-b-2 border-theme-text px-4 py-2 flex items-center space-x-1.5 text-xs text-theme-muted">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                <span className="font-jakarta font-bold text-xs uppercase tracking-wider pl-3 text-theme-text">
                  portfolio_editor.json
                </span>
              </div>
              <textarea
                value={editedJson}
                onChange={(e) => setEditedJson(e.target.value)}
                className="w-full min-h-[480px] p-6 font-mono text-sm bg-theme-card text-theme-text focus:outline-none select-text border-none resize-y"
                style={{ lineHeight: '1.6' }}
              />
            </div>
          </div>

          {/* Action Instructions Guide (Bento card style) */}
          <div className="lg:col-span-4 bg-theme-card p-6 md:p-7 rounded-xl border-2 border-theme-text space-y-6 relative offset-shadow-accent">
            <div className="space-y-2">
              <h3 className="font-jakarta font-bold text-lg text-theme-text uppercase tracking-wider">
                System Instructions
              </h3>
              <p className="text-sm text-theme-muted font-sans leading-relaxed">
                Follow these manual developer steps to sync changes made inside the editor to the production codebase:
              </p>
            </div>

            {/* Numbered Steps */}
            <div className="space-y-4 text-xs font-sans leading-relaxed">
              <div className="flex items-start space-x-3">
                <span className="font-jakarta font-black text-theme-accent text-sm">01.</span>
                <p className="text-theme-text text-sm font-medium">
                  Edit the JSON above directly or paste in your updates, then click <strong className="text-theme-accent">"Copy JSON File"</strong>.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="font-jakarta font-black text-theme-accent text-sm">02.</span>
                <p className="text-theme-text text-sm font-medium">
                  Open <code className="bg-theme-surface border border-theme-border px-1.5 py-0.5 rounded text-xs font-semibold text-theme-secondary">src/data/portfolio.json</code> in your local VS Code workspace.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="font-jakarta font-black text-theme-accent text-sm">03.</span>
                <p className="text-theme-text text-sm font-medium">
                  Select all contents, delete, paste the copied JSON, and save the file.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="font-jakarta font-black text-theme-accent text-sm">04.</span>
                <p className="text-theme-text text-sm font-medium">
                  Run the deployment script or build process to compile the new data live.
                </p>
              </div>
            </div>

            {/* Glowing System Note Alert */}
            <div className="bg-theme-accent/5 border-2 border-theme-accent p-4 rounded-lg flex items-start space-x-2.5">
              <Terminal className="w-4 h-4 text-theme-accent mt-0.5" />
              <div className="font-jakarta font-bold text-[10px] text-theme-accent tracking-wide leading-relaxed uppercase">
                System status active. Ready to process database updates.
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
