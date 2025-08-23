'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'

const NAV_ITEMS = [
  { label: 'About', id: 'about' },
  { label: 'Events', id: 'events' },
  { label: 'Sponsors', id: 'sponsors' },
]

function clsx(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(' ')
}

export default function Navbar() {
  const [active, setActive] = useState<string>('home')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const ids = ['home', ...NAV_ITEMS.map((n) => n.id)]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-45% 0px -45% 0px',
        threshold: 0.01,
      }
    )

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToId = (id: string) => (e?: React.MouseEvent) => {
    e?.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    setOpen(false)
  }

  return (
    <nav className="fixed top-4 left-1/2 z-50 w-[min(1200px,92%)] -translate-x-1/2">
      <div className="relative">
        {/* glow border */}
        <div
          className="pointer-events-none absolute -inset-0.5 rounded-full bg-gradient-to-r from-yellow-400/40 via-yellow-400/40 to-yellow-400/40 blur-sm"
          aria-hidden
        />

        <div className="relative flex items-center justify-between rounded-full border border-yellow-400/20 bg-black/85 px-3 py-2 md:px-6 md:py-3 font-bmono backdrop-blur-lg backdrop-saturate-150">
          <a
            href="#home"
            onClick={scrollToId('home')}
            className="group flex items-center gap-3 rounded-full px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300/60"
            aria-label="Go to home"
          >
            <Image src="/logo.svg" alt="ACM UCF" width={150} height={36} priority />
          </a>

          <ul className="mx-2 hidden items-center gap-10 lg:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={scrollToId(item.id)}
                  className={clsx(
                    'rounded-full px-2 py-1 text-md font-medium text-zinc-300 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300/60',
                    active === item.id && 'text-white'
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link
            href="#discord"
            onClick={scrollToId('discord')}
            className="group relative hidden lg:inline-flex"
            >
            <span
            aria-hidden
            className="pointer-events-none absolute -inset-1 rounded-full [background:conic-gradient(from_180deg_at_50%_50%,#96D7A8_0%,#9A9EF5_45%,#E8667A_80%,#96D7A8_100%)] opacity-40 blur-sm transition-opacity group-hover:opacity-60"
            />

            {/* gradient ring container */}
            <span className="relative inline-flex rounded-full p-[2px] [background:conic-gradient(from_180deg_at_50%_50%,#96D7A8_0%,#9A9EF5_45%,#E8667A_80%,#96D7A8_100%)]">
            <span className="relative inline-flex items-center justify-center rounded-full bg-black/90 hover:bg-black/85 transition px-6 py-3 text-sm font-medium text-white ring-1 ring-white/15">
            Join Discord
            <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
            />
            </span>
            </span>
            </Link>


            <button
            className="inline-flex items-center justify-center rounded-full p-2 text-zinc-200 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300/60 lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
            >
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
            </div>
            </div>
      </div>
    </nav>
  )
}
