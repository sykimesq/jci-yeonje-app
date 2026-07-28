'use client'

import { useState, useEffect } from 'react'

const SITE_PASSWORD = '0273'
const STORAGE_KEY = 'jci-auth-granted'

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [granted, setGranted] = useState(false)
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem(STORAGE_KEY)
      if (stored === 'true') {
        setGranted(true)
      }
      setLoading(false)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input === SITE_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, 'true')
      setGranted(true)
      setError(false)
    } else {
      setError(true)
      setInput('')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-jci-bg">
        <div className="w-8 h-8 border-2 border-jci-300 border-t-jci-500 rounded-full animate-spin" />
      </div>
    )
  }

  if (granted) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-jci-500 via-jci-600 to-jci-800 p-4">
      <div className="w-full max-w-sm">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-2xl p-8 space-y-6"
        >
          {/* Logo / Title */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-jci-500 to-jci-700 flex items-center justify-center mx-auto">
              <span className="text-white font-bold text-2xl">JC</span>
            </div>
            <h1 className="text-xl font-bold text-jci-800">연제JC 회원수첩</h1>
            <p className="text-sm text-jci-muted">비밀번호를 입력해주세요</p>
          </div>

          {/* Password Input */}
          <div className="space-y-1">
            <input
              type="password"
              value={input}
              onChange={(e) => {
                setInput(e.target.value)
                setError(false)
              }}
              placeholder="비밀번호"
              autoFocus
              className="w-full px-4 py-3 rounded-xl border border-jci-border bg-jci-bg text-jci-900
                placeholder:text-jci-muted/60 text-center text-lg tracking-widest
                focus:outline-none focus:ring-2 focus:ring-jci-400 focus:border-jci-400
                transition-all"
            />
            {error && (
              <p className="text-red-500 text-xs text-center pt-1">
                비밀번호가 일치하지 않습니다
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-jci-500 text-white font-medium text-sm
              hover:bg-jci-600 active:bg-jci-700 transition-colors shadow-sm"
          >
            확인
          </button>

          <p className="text-[10px] text-jci-muted/60 text-center">
            부산연제청년회의소 회원전용
          </p>
        </form>
      </div>
    </div>
  )
}
