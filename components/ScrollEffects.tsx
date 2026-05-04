'use client'
import { useEffect } from 'react'

export default function ScrollEffects() {
  useEffect(() => {
    const progressBar = document.getElementById('read-progress') as HTMLElement

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight

      if (progressBar && docHeight > 0) {
        progressBar.style.width = `${(scrollTop / docHeight) * 100}%`
      }

      const btn = document.getElementById('back-to-top')
      if (btn) {
        btn.style.opacity = scrollTop > 400 ? '1' : '0'
      }

      const nav = document.querySelector('nav')
      if (nav) {
        if (scrollTop > 40) {
          nav.classList.add('py-2')
          nav.classList.remove('py-4')
        } else {
          nav.classList.add('py-4')
          nav.classList.remove('py-2')
        }
      }
    }

    // Fade-in observer — threshold baixo para acionar antes do elemento entrar na viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible')
            }, i * 60)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    )

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el))

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <button
      id="back-to-top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Voltar ao topo"
      style={{
        opacity: 0,
        transition: 'opacity 0.3s',
        background: 'linear-gradient(135deg, #c9a84c 0%, #b8860b 100%)',
      }}
      className="fixed bottom-8 right-8 z-40 w-11 h-11 rounded-full flex items-center justify-center shadow-lg hover:-translate-y-1 transition-all"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0d0d0d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  )
}
