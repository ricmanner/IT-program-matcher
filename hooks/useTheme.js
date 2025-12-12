import { useState, useEffect } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'dark'
    setTheme(saved)
    applyTheme(saved)
    setMounted(true)
  }, [])

  function applyTheme(newTheme) {
    const root = document.documentElement
    root.setAttribute('data-theme', newTheme)
    if (newTheme === 'light') {
      root.classList.add('light-mode')
      root.classList.remove('dark-mode')
    } else {
      root.classList.add('dark-mode')
      root.classList.remove('light-mode')
    }
  }

  function toggleTheme() {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    applyTheme(newTheme)
  }

  return { theme: theme || 'dark', toggleTheme, mounted }
}
