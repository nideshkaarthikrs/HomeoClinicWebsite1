import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Menu, X, Phone, Mail, MapPin, Clock, ChevronDown, ChevronRight,
  Heart, Leaf, Shield, Star, Users, Award, BookOpen,
  Sparkles, Brain, Wind, Droplets, CheckCircle, ArrowRight,
  HelpCircle, FlaskConical, Activity, Stethoscope, FileText,
  ClipboardList, Navigation, Quote, Target, Eye
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// Clinic hours in IST: Morning 9:30–13:30, Evening 17:30–21:00
function checkClinicOpen() {
  const now = new Date()
  const istMs = now.getTime() + now.getTimezoneOffset() * 60000 + 330 * 60000
  const ist = new Date(istMs)
  const t = ist.getHours() * 60 + ist.getMinutes()
  return (t >= 570 && t < 810) || (t >= 1050 && t < 1260)
}

function useClinicStatus() {
  const [isOpen, setIsOpen] = useState(checkClinicOpen)
  useEffect(() => {
    const id = setInterval(() => setIsOpen(checkClinicOpen()), 60000)
    return () => clearInterval(id)
  }, [])
  return isOpen
}

// ─── Navbar ──────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Homeopathy', href: '#what-is' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ]

  const scrollTo = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 nav-pill ${scrolled ? 'scrolled' : ''}`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-primary-700 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                <path d="M12 3 C12 3 7 9 7 13.5 C7 16.5 9.2 19 12 19 C14.8 19 17 16.5 17 13.5 C17 9 12 3 12 3Z" fill="white" opacity="0.95"/>
                <ellipse cx="10.2" cy="14.5" rx="1.2" ry="1.6" fill="#0F766E" opacity="0.4"/>
              </svg>
            </div>
            <div className="leading-none">
              <div className="font-display font-700 text-sm text-white">Vijaya Homeo Care</div>
              <div className="font-mono text-[10px] text-primary-300 tracking-widest uppercase">Homeopathy</div>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {links.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={e => scrollTo(e, link.href)}
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              onClick={e => scrollTo(e, '#contact')}
              className="magnetic-btn flex items-center gap-2 px-5 py-2 text-sm font-semibold bg-primary-700 hover:bg-primary-600 text-white rounded-full transition-colors duration-200"
            >
              <MapPin size={14} />
              Find the Clinic
            </a>
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-all"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-[#0a1628]/95 backdrop-blur-xl mobile-menu ${menuOpen ? 'open' : ''} flex flex-col pt-24 px-6`}
      >
        <div className="flex flex-col gap-1">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={e => scrollTo(e, link.href)}
              className="flex items-center justify-between px-4 py-4 text-lg font-medium text-slate-200 hover:text-white border-b border-white/5 hover:border-primary-700/40 transition-all"
            >
              {link.label}
              <ChevronRight size={18} className="text-primary-400" />
            </a>
          ))}
        </div>
        <a
          href="#contact"
          onClick={e => scrollTo(e, '#contact')}
          className="mt-8 w-full py-4 text-center font-semibold bg-primary-700 text-white rounded-2xl text-lg magnetic-btn flex items-center justify-center gap-2"
        >
          <MapPin size={18} />
          Find the Clinic
        </a>
      </div>
    </>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const heroRef = useRef(null)
  const headRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)
  const badgeRef = useRef(null)
  const particlesRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })
      tl.from(badgeRef.current, { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' })
        .from(headRef.current.children, { opacity: 0, y: 40, stagger: 0.12, duration: 0.8, ease: 'power3.out' }, '-=0.3')
        .from(subRef.current, { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, '-=0.4')
        .from(ctaRef.current.children, { opacity: 0, y: 20, stagger: 0.1, duration: 0.5, ease: 'power3.out' }, '-=0.3')
    }, heroRef)
    return () => ctx.revert()
  }, [])

  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 4,
    x: 60 + Math.random() * 38,
    y: 5 + Math.random() * 70,
    dur: 7 + Math.random() * 6,
    del: Math.random() * 4,
    color: i % 3 === 0 ? '#14b8a6' : i % 3 === 1 ? '#D97706' : '#5eead4',
    opacity: 0.2 + Math.random() * 0.3,
  }))

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden grid-bg"
      style={{ minHeight: '100dvh' }}
    >
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=1920&q=80&auto=format&fit=crop"
          alt="Homeopathic herbs and natural remedies"
          className="w-full h-full object-cover object-center opacity-15"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0a1628]/90 to-primary-950/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-transparent" />
      </div>

      <div ref={particlesRef} className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {particles.map(p => (
          <div
            key={p.id}
            className="hero-particle"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              background: p.color,
              opacity: p.opacity,
              '--pdur': `${p.dur}s`,
              '--pdel': `${p.del}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-28 pb-16 w-full">
        <div className="max-w-3xl">
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-6"
          >
            <Leaf size={14} className="text-primary-400" />
            <span className="font-mono text-xs text-primary-300 tracking-widest uppercase">
              Compassionate Care · Natural Healing · Holistic Wellness
            </span>
          </div>

          <h1 ref={headRef} className="font-display leading-tight mb-6">
            <span className="block text-4xl md:text-5xl lg:text-6xl font-800 text-white">
              Heal Naturally,
            </span>
            <span className="block text-4xl md:text-5xl lg:text-6xl font-800 gradient-text italic font-serif">
              Live Completely.
            </span>
            <span className="block text-lg md:text-xl font-400 text-slate-400 mt-3 font-body">
              Dr. P. Andal Ambika · Vijaya Homeo Care
            </span>
          </h1>

          <p ref={subRef} className="text-slate-300 text-base md:text-lg leading-relaxed mb-10 max-w-xl">
            Ethical, holistic, and patient-centred homeopathic care for over 18 years.
            Addressing the root cause of illness through classical homeopathic principles — no side effects.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 items-start">
            <a
              href="#contact"
              onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="magnetic-btn flex items-center gap-2 px-8 py-4 bg-primary-700 hover:bg-primary-600 text-white font-semibold rounded-full text-sm transition-all duration-300 shadow-lg shadow-primary-900/40"
            >
              <Navigation size={16} />
              Find the Clinic
            </a>
            <a
              href="#what-is"
              onClick={e => { e.preventDefault(); document.querySelector('#what-is')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="flex items-center gap-2 px-8 py-4 border border-white/15 hover:border-primary-500/50 text-slate-300 hover:text-white font-medium rounded-full text-sm transition-all duration-300 hover:bg-white/5"
            >
              <BookOpen size={16} />
              What is Homeopathy?
            </a>
          </div>

          <div className="mt-14 flex flex-wrap gap-6 md:gap-10">
            {[
              { value: '18+', label: 'Years Experience' },
              { value: '8+', label: 'Specializations' },
              { value: 'BHMS', label: 'Qualified Doctor' },
            ].map(stat => (
              <div key={stat.label} className="text-left">
                <div className="font-display text-2xl font-800 gradient-text">{stat.value}</div>
                <div className="font-mono text-[11px] text-slate-400 tracking-widest uppercase mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-50">
        <span className="font-mono text-[10px] text-slate-400 tracking-widest uppercase">Scroll</span>
        <ChevronDown size={16} className="text-slate-400 animate-bounce" />
      </div>
    </section>
  )
}

// ─── GlobulesAnimation ───────────────────────────────────────────────────────
function GlobulesAnimation() {
  const globules = Array.from({ length: 9 }, (_, i) => ({
    id: i,
    x: 18 + (i % 3) * 22,
    duration: 2.5 + (i % 3) * 0.5,
    delay: (i * 0.4) % 2.4,
    color: i % 2 === 0 ? 'radial-gradient(circle at 35% 30%, #5eead4, #0F766E)' : 'radial-gradient(circle at 35% 30%, #fbbf24, #D97706)',
    size: 8 + (i % 3) * 2,
  }))

  return (
    <div className="relative w-full h-36 overflow-hidden rounded-2xl" aria-hidden="true">
      <svg className="absolute left-1/2 -translate-x-1/2 bottom-0 opacity-20 w-20 h-28" viewBox="0 0 60 80" fill="none">
        <path d="M22 15 L18 25 L10 30 L10 72 Q10 78 16 78 L44 78 Q50 78 50 72 L50 30 L42 25 L38 15 Z" fill="#14b8a6"/>
        <rect x="22" y="8" width="16" height="9" rx="2" fill="#14b8a6"/>
        <rect x="24" y="5" width="12" height="5" rx="1.5" fill="#14b8a6"/>
      </svg>
      {globules.map(g => (
        <div key={g.id} className="absolute" style={{ left: `${g.x}%`, top: 0 }}>
          <div
            className="homeo-globe"
            style={{
              background: g.color,
              width: g.size,
              height: g.size,
              '--duration': `${g.duration}s`,
              '--delay': `${g.delay}s`,
            }}
          />
        </div>
      ))}
      {[0, 0.5, 1.1].map((delay, i) => (
        <div
          key={i}
          className="homeo-ripple"
          style={{ left: `${25 + i * 25}%`, bottom: 12, '--delay': `${delay}s` }}
        />
      ))}
      <div className="absolute bottom-2 left-0 right-0 text-center font-mono text-[10px] text-primary-400 tracking-widest uppercase opacity-70">
        Homeopathic Globules
      </div>
    </div>
  )
}

// ─── Features ─────────────────────────────────────────────────────────────────
function Features() {
  const sectionRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feat-card', {
        opacity: 0, y: 50, stagger: 0.15, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <section ref={sectionRef} id="about" className="section-pad max-w-7xl mx-auto px-4 md:px-8">
      <div className="text-center mb-14">
        <p className="section-label">Why Choose Us</p>
        <h2 className="font-display text-3xl md:text-4xl font-700 text-white">
          A Clinic That <span className="gradient-text italic font-serif">Truly Listens</span>
        </h2>
        <div className="divider mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="feat-card glass rounded-2xl p-6 flex flex-col gap-4">
          <div className="section-label">Precision Remedies</div>
          <GlobulesAnimation />
          <p className="text-slate-300 text-sm leading-relaxed">
            Ultra-diluted natural substances, each remedy precisely matched to your unique symptom pattern — not just the disease.
          </p>
        </div>

        <div
          className="feat-card glass rounded-2xl p-6 cursor-crosshair relative overflow-hidden"
          onMouseMove={handleMouseMove}
        >
          <div
            className="absolute inset-0 pointer-events-none transition-all duration-300 rounded-2xl"
            style={{
              background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(15,118,110,0.18) 0%, transparent 65%)`,
            }}
          />
          <div className="section-label relative z-10">Personalized Care</div>
          <div className="relative z-10 flex flex-col gap-3 mt-4">
            {[
              { icon: Stethoscope, text: 'In-depth first consultation' },
              { icon: FileText, text: 'Complete medical history review' },
              { icon: Heart, text: 'Mind–body–constitution analysis' },
              { icon: FlaskConical, text: 'Custom remedy selection' },
              { icon: Activity, text: 'Ongoing follow-up & adjustment' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-sm text-slate-300">
                <div className="w-7 h-7 rounded-lg bg-primary-700/30 flex items-center justify-center flex-shrink-0">
                  <Icon size={13} className="text-primary-400" />
                </div>
                {text}
              </div>
            ))}
          </div>
        </div>

        <div className="feat-card glass rounded-2xl p-6 flex flex-col gap-4">
          <div className="section-label">First Visit Guide</div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
              <ClipboardList size={18} className="text-accent" />
            </div>
            <span className="font-display font-600 text-white text-sm">What to Bring</span>
          </div>
          <div className="flex flex-col gap-2.5">
            {[
              'Previous medical records & test reports',
              'List of current medications',
              'Details of past treatments tried',
              'Note of symptoms & their timeline',
              'Any scan or lab reports (if any)',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                <CheckCircle size={14} className="text-primary-400 flex-shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>
          <div className="mt-auto pt-3 border-t border-white/5">
            <p className="text-xs text-slate-400 leading-relaxed">
              Your first consultation is <span className="text-primary-300 font-medium">thorough and unhurried</span>. The more information you share, the more precise the remedy selection.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}


// ─── What Is Homeopathy ───────────────────────────────────────────────────────
function WhatIsHomeopathy() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.whatis-reveal', {
        opacity: 0, y: 40, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const principles = [
    {
      icon: Leaf,
      title: 'Like Cures Like',
      body: 'A substance that causes symptoms in a healthy person can cure similar symptoms in a sick one — just like how certain vaccines work.',
    },
    {
      icon: Droplets,
      title: 'The Law of Infinitesimals',
      body: 'Remedies are diluted to very small amounts, a process called potentization, which is believed to enhance their healing energy.',
    },
    {
      icon: Heart,
      title: 'Treat the Whole Person',
      body: 'Homeopathy addresses the physical, emotional, and mental aspects together — the root cause, not just the symptom.',
    },
    {
      icon: Shield,
      title: 'No Harmful Side Effects',
      body: 'Because of extreme dilution, remedies are non-toxic and safe for all ages — from newborns to the elderly.',
    },
  ]

  return (
    <section ref={sectionRef} id="what-is" className="section-pad grid-bg">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="whatis-reveal text-center mb-12">
          <p className="section-label">Understanding Homeopathy</p>
          <h2 className="font-display text-3xl md:text-4xl font-700 text-white">
            What Is <span className="gradient-text italic font-serif">Homeopathy?</span>
          </h2>
          <div className="divider mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="whatis-reveal space-y-5">
            <div className="glass rounded-2xl p-6 border-l-2 border-primary-600">
              <p className="text-slate-200 text-base leading-relaxed">
                Homeopathy is a 200-year-old natural system of medicine developed by German physician
                <span className="text-primary-300 font-medium"> Dr. Samuel Hahnemann</span>. It is practiced worldwide
                and recognized by the WHO as one of the most widely used alternative medicine systems globally.
              </p>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Rather than suppressing symptoms, homeopathy stimulates the body's own healing mechanisms.
              Tiny doses of natural substances — derived from plants, minerals, or animals — are carefully matched
              to each person's individual symptom picture.
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              Homeopathy <strong className="text-white">can be used alongside conventional medicine</strong> — many patients use it as a complement to their existing treatment for better overall wellbeing.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {['Safe for all ages', 'No drug interactions', 'Treats root cause', 'WHO recognized'].map(tag => (
                <span key={tag} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-light text-xs text-primary-300 font-mono tracking-wide">
                  <CheckCircle size={11} />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {principles.map(p => {
              const Icon = p.icon
              return (
                <div key={p.title} className="whatis-reveal glass rounded-2xl p-5 service-card">
                  <div className="w-9 h-9 rounded-xl bg-primary-700/20 flex items-center justify-center mb-3">
                    <Icon size={18} className="text-primary-400" />
                  </div>
                  <h3 className="font-display font-600 text-white text-sm mb-2">{p.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{p.body}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="whatis-reveal mt-14 glass rounded-3xl p-8">
          <h3 className="font-display font-600 text-white text-lg mb-6 text-center">
            How a Homeopathic Consultation Works
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Deep Listening', desc: 'Dr. Andal Ambika takes a thorough history — your symptoms, lifestyle, emotions, and past illnesses.' },
              { step: '02', title: 'Constitutional Analysis', desc: 'Your unique constitution and symptom pattern are mapped to find the best-matched remedy.' },
              { step: '03', title: 'Remedy Dispensed', desc: 'Small globules or drops are given — gentle, tasteless, safe for all ages.' },
              { step: '04', title: 'Follow-Up & Healing', desc: 'Progress is reviewed over visits. The remedy is adjusted as your health improves.' },
            ].map((s, i, arr) => (
              <div key={s.step} className="relative flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-2xl bg-primary-700 text-white font-mono font-600 text-sm flex items-center justify-center mb-3 shadow-lg shadow-primary-900/30">
                  {s.step}
                </div>
                {i < arr.length - 1 && (
                  <div className="hidden sm:block absolute top-6 left-[calc(50%+24px)] w-[calc(100%-24px)] h-px bg-gradient-to-r from-primary-700/60 to-transparent" />
                )}
                <h4 className="font-display font-600 text-white text-sm mb-1">{s.title}</h4>
                <p className="text-slate-400 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Protocol ─────────────────────────────────────────────────────────────────
function Protocol() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.proto-card')
    if (!cards?.length) return
    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        if (i === 0) return
        gsap.from(card, {
          yPercent: 30, opacity: 0, scale: 0.96,
          scrollTrigger: { trigger: card, start: 'top 80%', end: 'top 40%', scrub: 1 }
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const steps = [
    {
      num: '01',
      title: 'Your First Visit',
      body: 'Arrive with an open mind. Dr. Andal Ambika conducts an in-depth case evaluation — understanding not just your chief complaint, but your entire health story — past illnesses, emotional patterns, sleep, appetite, and more.',
      icon: Stethoscope,
      accent: '#14b8a6',
    },
    {
      num: '02',
      title: 'Remedy Prescription',
      body: "Based on your unique constitution, a single or combination homeopathic remedy is carefully selected from over 3,000 known remedies. You'll receive clear instructions on dosage and timing.",
      icon: FlaskConical,
      accent: '#D97706',
    },
    {
      num: '03',
      title: 'Healing & Follow-Up',
      body: 'Homeopathy works gradually and deeply. Follow-up visits track your progress, and the remedy is fine-tuned. Most patients notice improvement within 4–8 weeks for chronic conditions.',
      icon: Activity,
      accent: '#5eead4',
    },
  ]

  return (
    <section ref={sectionRef} className="section-pad bg-[#071220]">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center mb-14">
          <p className="section-label">The Process</p>
          <h2 className="font-display text-3xl md:text-4xl font-700 text-white">
            Your Healing <span className="gradient-text italic font-serif">Journey</span>
          </h2>
          <div className="divider mx-auto mt-4" />
        </div>

        <div className="flex flex-col gap-6 md:gap-8">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div
                key={step.num}
                className="proto-card glass rounded-3xl p-7 md:p-10 flex flex-col md:flex-row items-start gap-6 service-card"
              >
                <div className="flex-shrink-0 flex flex-col items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ background: `${step.accent}18`, border: `1px solid ${step.accent}30` }}
                  >
                    <Icon size={24} style={{ color: step.accent }} />
                  </div>
                  <span className="font-mono text-xs font-600" style={{ color: step.accent }}>{step.num}</span>
                </div>
                <div>
                  <h3 className="font-display text-xl font-700 text-white mb-3">{step.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">{step.body}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Services Grid ─────────────────────────────────────────────────────────────
function ServicesGrid() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const tiles = sectionRef.current?.querySelectorAll('.svc-tile')
    if (!tiles?.length) return
    gsap.set(tiles, { opacity: 0, y: 30 })
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 85%',
      once: true,
      onEnter: () => gsap.to(tiles, { opacity: 1, y: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out' }),
    })
    return () => { st.kill(); gsap.set(tiles, { clearProps: 'all' }) }
  }, [])

  const services = [
    {
      icon: Wind,
      title: 'Allergy & Respiratory Disorders',
      desc: 'Constitutional treatment for allergic rhinitis, asthma, sinusitis, and recurring respiratory conditions to reduce sensitivity and improve lung health.',
      tags: ['Rhinitis', 'Asthma', 'Sinusitis'],
    },
    {
      icon: Sparkles,
      title: 'Skin Diseases & Chronic Dermatoses',
      desc: 'Deep-rooted homeopathic treatment for eczema, psoriasis, urticaria, acne, and other chronic skin conditions addressing the internal root cause.',
      tags: ['Eczema', 'Psoriasis', 'Urticaria'],
    },
    {
      icon: Shield,
      title: 'Arthritis & Joint Disorders',
      desc: 'Gentle, effective care for rheumatoid arthritis, osteoarthritis, gout, and joint pain — improving mobility and reducing inflammation naturally.',
      tags: ['Arthritis', 'Joint Pain', 'Gout'],
    },
    {
      icon: Brain,
      title: 'Migraine & Recurrent Headaches',
      desc: 'Individualized treatment to reduce the frequency and severity of migraines and recurrent headaches through constitutional homeopathic prescribing.',
      tags: ['Migraine', 'Headache', 'Neurological'],
    },
    {
      icon: Heart,
      title: "Women's Health & Child Health",
      desc: 'Hormonal balance, PCOS, menstrual disorders, menopause support, and safe pediatric care — gentle remedies for all life stages.',
      tags: ['PCOS', 'Menopause', 'Pediatric'],
    },
    {
      icon: Activity,
      title: 'Chronic Disease Management',
      desc: 'Long-term management of lifestyle disorders, diabetes, thyroid conditions, and preventive holistic healthcare for sustained well-being.',
      tags: ['Diabetes', 'Thyroid', 'Lifestyle'],
    },
  ]

  return (
    <section ref={sectionRef} id="services" className="section-pad grid-bg">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <p className="section-label">Areas of Special Interest</p>
          <h2 className="font-display text-3xl md:text-4xl font-700 text-white">
            Our <span className="gradient-text italic font-serif">Specializations</span>
          </h2>
          <div className="divider mx-auto mt-4" />
          <p className="text-slate-400 text-sm mt-4 max-w-xl mx-auto">
            Every condition is treated as unique to you — no two prescriptions are the same.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-primary-900/20 rounded-2xl overflow-hidden border border-primary-900/30">
          {services.map((svc) => {
            const Icon = svc.icon
            return (
              <div key={svc.title} className="svc-tile service-card bg-[#0a1628] p-7 flex flex-col gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary-700/15 border border-primary-700/20 flex items-center justify-center">
                  <Icon size={20} className="text-primary-400" />
                </div>
                <div>
                  <h3 className="font-display font-600 text-white text-base mb-2">{svc.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{svc.desc}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto pt-2">
                  {svc.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 rounded-full bg-primary-900/40 border border-primary-800/30 text-primary-300 text-xs font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Trust Signals ─────────────────────────────────────────────────────────────
function TrustSignals() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.trust-badge', {
        opacity: 0, y: 30, stagger: 0.15, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 bg-[#071220] border-t border-primary-900/20">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <p className="section-label">About the Doctor</p>
          <h2 className="font-display text-3xl md:text-4xl font-700 text-white">
            Credentials & <span className="gradient-text italic font-serif">Trust</span>
          </h2>
          <div className="divider mx-auto mt-4" />
        </div>

        <div className="trust-badge glass rounded-3xl p-8 mb-8 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary-600 to-primary-900 flex items-center justify-center text-4xl font-display font-800 text-white shadow-xl shadow-primary-900/40">
              A
            </div>
          </div>
          <div>
            <h3 className="font-display text-2xl font-700 text-white">Dr. P. Andal Ambika</h3>
            <p className="font-mono text-sm text-primary-300 tracking-widest mt-1 mb-3">BHMS · Homeopathic Physician · Founder & Chief Consultant</p>
            <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
              Dr. P. Andal Ambika founded Vijaya Homeo Care with a single vision — to provide compassionate,
              ethical, and patient-centred homeopathic care that addresses the root cause of illness through
              classical homeopathic principles. With over 18 years of clinical practice, she is known for her
              careful case evaluation and her commitment to delivering effective treatment that enhances the
              overall well-being of every patient.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}

// ─── Journey ──────────────────────────────────────────────────────────────────
function Journey() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.journey-item', {
        opacity: 0, x: -30, stagger: 0.2, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const milestones = [
    {
      period: 'Sep 2007 – Jan 2009',
      location: 'Alangulam, Virudhunagar District',
      desc: 'Founded Vijaya Homeo Care, beginning a journey of compassionate homeopathic service to the community.',
    },
    {
      period: 'Feb 2009 – Dec 2014',
      location: 'Bose Complex, Y. Othakadai, Madurai',
      desc: 'Expanded to Madurai, growing a loyal patient community through dedicated and personalized care.',
    },
    {
      period: 'Jan 2015 – Present',
      location: 'Sri Sai Complex, Singaravelan Street, K. Pudur, Madurai',
      desc: 'Current home of Vijaya Homeo Care — serving patients with the same commitment to holistic wellness and classical homeopathy.',
      current: true,
    },
  ]

  return (
    <section ref={sectionRef} className="section-pad grid-bg">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <p className="section-label">18 Years of Service</p>
          <h2 className="font-display text-3xl md:text-4xl font-700 text-white">
            Our <span className="gradient-text italic font-serif">Journey</span>
          </h2>
          <div className="divider mx-auto mt-4" />
          <p className="text-slate-400 text-sm mt-4 max-w-xl mx-auto">
            Vijaya Homeo Care has steadily grown through years of dedicated service and patient trust.
          </p>
        </div>

        <div className="relative flex flex-col gap-0">
          <div className="absolute left-6 top-4 bottom-4 w-px bg-gradient-to-b from-primary-700/60 via-primary-700/30 to-transparent hidden sm:block" />
          {milestones.map((m, i) => (
            <div key={i} className="journey-item flex gap-6 pb-10 last:pb-0">
              <div className="flex-shrink-0 relative z-10">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${m.current ? 'bg-primary-700 shadow-lg shadow-primary-900/40' : 'bg-primary-900/60 border border-primary-700/30'}`}>
                  <MapPin size={18} className={m.current ? 'text-white' : 'text-primary-400'} />
                </div>
              </div>
              <div className={`glass rounded-2xl p-6 flex-1 service-card ${m.current ? 'border border-primary-700/30' : ''}`}>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                  <span className="font-mono text-xs text-primary-400 tracking-widest uppercase">{m.period}</span>
                  {m.current && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-mono">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 status-dot" />
                      Current Location
                    </span>
                  )}
                </div>
                <h3 className="font-display font-600 text-white text-sm mb-2">{m.location}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials() {
  const sectionRef = useRef(null)

  const testimonials = [
    {
      quote: 'Dr. Andal Ambika listens patiently and provides treatment with genuine care and compassion.',
      author: 'Patient, Vijaya Homeo Care',
    },
    {
      quote: "The personalised approach and continuous follow-up made a significant difference in our family's health.",
      author: 'Family Patient, Vijaya Homeo Care',
    },
  ]

  return (
    <section ref={sectionRef} className="section-pad bg-[#071220] border-t border-primary-900/20">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <p className="section-label">Patient Voices</p>
          <h2 className="font-display text-3xl md:text-4xl font-700 text-white">
            What Patients <span className="gradient-text italic font-serif">Say</span>
          </h2>
          <div className="divider mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="glass rounded-2xl p-8 service-card flex flex-col gap-5">
              <div className="w-10 h-10 rounded-xl bg-primary-700/20 border border-primary-700/20 flex items-center justify-center">
                <Quote size={18} className="text-primary-400" />
              </div>
              <p className="text-slate-200 text-base leading-relaxed italic">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/5">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={12} className="text-accent fill-accent" />
                  ))}
                </div>
                <span className="font-mono text-xs text-slate-400 tracking-wide">{t.author}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ───────────────────────────────────────────────────────────────────────
function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.faq-item')
    if (!items?.length) return
    gsap.set(items, { opacity: 0, y: 20 })
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 85%',
      once: true,
      onEnter: () => gsap.to(items, { opacity: 1, y: 0, stagger: 0.06, duration: 0.6, ease: 'power3.out' }),
    })
    return () => { st.kill(); gsap.set(items, { clearProps: 'all' }) }
  }, [])

  const faqs = [
    {
      q: 'Is homeopathy scientifically proven?',
      a: 'Homeopathy remains an active area of research. While the mechanism of action is debated in mainstream science, numerous clinical studies and over 200 years of widespread use — including WHO recognition — support its effectiveness for many conditions. Many patients experience significant improvement when other treatments have not worked. We encourage complementary use alongside conventional care.',
    },
    {
      q: 'Are homeopathic remedies safe? Can they cause side effects?',
      a: 'Homeopathic remedies are highly diluted and non-toxic, making them extremely safe for all ages — including newborns, pregnant women, and the elderly. They carry no risk of organ damage or dependency. In rare cases, a brief "healing aggravation" (temporary worsening of symptoms before improvement) can occur, which is a recognized part of the healing process and is monitored by Dr. Andal Ambika.',
    },
    {
      q: 'Can I use homeopathy alongside my current medications?',
      a: 'Yes, absolutely. Homeopathic remedies do not interact with pharmaceutical drugs. Many patients use homeopathy as a complement to allopathic (conventional) treatment. Please inform Dr. Andal Ambika of all medications you are taking so she can tailor your treatment plan. Never stop prescribed medications without consulting your treating physician.',
    },
    {
      q: 'How long does it take to see results?',
      a: 'Acute conditions (colds, fever, minor infections) often respond within hours to days. Chronic conditions — built up over months or years — typically require 4–12 weeks of consistent treatment before meaningful improvement is seen. Healing with homeopathy is progressive and deeper than symptom suppression. Dr. Andal Ambika will set realistic expectations at your first visit.',
    },
    {
      q: 'How is homeopathy different from herbal medicine?',
      a: 'Herbal medicine uses medicinal quantities of plant extracts, while homeopathy uses ultra-diluted preparations of various substances (plant, mineral, or animal origin). The key difference is the principle of potentization (dilution + succussion) and the law of similars. Homeopathy focuses on the whole constitutional picture, not just one symptom or organ.',
    },
    {
      q: 'Is homeopathy just a placebo effect?',
      a: "This is a common question. Homeopathy is used effectively in infants and animals — groups where placebo effects are less likely to explain results. Many patients who were skeptical initially report measurable improvement. While we respect scientific scrutiny, Dr. Andal Ambika's clinical experience and patient outcomes speak to its real-world effectiveness. We welcome skeptical patients — healing is the best answer.",
    },
    {
      q: 'What should I bring to my first consultation?',
      a: 'Please bring any previous medical records, test reports (blood tests, scans), a list of current medications and supplements, and a note of your main complaints with their timeline. The more details you share, the more precise the remedy selection will be. There are no dietary restrictions before the visit.',
    },
    {
      q: 'Does Dr. Andal Ambika treat children and elderly patients?',
      a: 'Yes. Homeopathy is particularly well-suited for children (where minimal intervention is preferred) and the elderly (where polypharmacy and side effects are concerns). Dr. Andal Ambika has extensive experience treating childhood conditions, behavioral concerns, and senior chronic conditions like arthritis, joint disorders, and lifestyle diseases.',
    },
  ]

  return (
    <section ref={sectionRef} id="faq" className="section-pad grid-bg">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <p className="section-label">Common Questions</p>
          <h2 className="font-display text-3xl md:text-4xl font-700 text-white">
            Frequently Asked <span className="gradient-text italic font-serif">Questions</span>
          </h2>
          <div className="divider mx-auto mt-4" />
          <p className="text-slate-400 text-sm mt-4">
            Addressing your doubts honestly — because an informed patient heals better.
          </p>
        </div>

        <div className="flex flex-col gap-0">
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item">
              <button
                className="w-full flex items-start justify-between gap-4 py-5 text-left group"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <div className="flex items-start gap-3">
                  <HelpCircle size={16} className="text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="font-display font-600 text-white text-sm group-hover:text-primary-300 transition-colors">
                    {faq.q}
                  </span>
                </div>
                <ChevronDown
                  size={18}
                  className={`flex-shrink-0 text-slate-400 transition-transform duration-300 mt-0.5 ${openIndex === i ? 'rotate-180 text-primary-400' : ''}`}
                />
              </button>
              <div className={`faq-answer ${openIndex === i ? 'open' : ''}`}>
                <p className="text-slate-300 text-sm leading-relaxed pl-7">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Location Section ─────────────────────────────────────────────────────────
const MAP_EMBED_SRC = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.819376879306!2d78.14026117547752!3d9.948981473909628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c5dafa615f95%3A0x5d9460088509ef6a!2sVIJAYA%20HOMEO%20CARE!5e0!3m2!1sen!2sus!4v1781012432396!5m2!1sen!2sus'
const DIRECTIONS_URL = 'https://maps.app.goo.gl/jWx5WLgY1WGf5dAc7'

function LocationSection() {
  const sectionRef = useRef(null)
  const isOpen = useClinicStatus()

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.loc-reveal')
    if (!items?.length) return
    gsap.set(items, { opacity: 0, y: 30 })
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 85%',
      once: true,
      onEnter: () => gsap.to(items, { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out' }),
    })
    return () => { st.kill(); gsap.set(items, { clearProps: 'all' }) }
  }, [])

  const info = [
    { icon: MapPin, label: 'Address',            value: 'Sri Sai Complex, Singaravelan Street, K. Pudur, Madurai – 625 007' },
    { icon: Phone,  label: 'Phone',              value: '9597860727' },
    { icon: Mail,   label: 'Email',              value: 'pattuanandalambika@gmail.com' },
    { icon: Clock,  label: 'Consultation Hours', value: 'Morning: 9:30 AM – 1:30 PM  |  Evening: 5:30 PM – 9:00 PM' },
  ]

  return (
    <section ref={sectionRef} id="contact" className="section-pad bg-[#071220] border-t border-primary-900/20">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="loc-reveal text-center mb-12">
          <p className="section-label">Find Us</p>
          <h2 className="font-display text-3xl md:text-4xl font-700 text-white">
            Visit the <span className="gradient-text italic font-serif">Clinic</span>
          </h2>
          <div className="divider mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="loc-reveal glass rounded-2xl p-6 flex flex-col gap-5">
              <h3 className="font-display font-600 text-white text-base">Clinic Information</h3>
              {info.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary-700/15 border border-primary-700/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={16} className="text-primary-400" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-accent tracking-widest uppercase mb-0.5">{label}</div>
                    <div className="text-slate-300 text-sm">{value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="loc-reveal glass rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-400 status-dot' : 'bg-red-400'}`} />
                <span className={`font-mono text-xs tracking-widest uppercase ${isOpen ? 'text-green-400' : 'text-red-400'}`}>
                  {isOpen ? 'Open Now' : 'Currently Closed'}
                </span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Accepting new patients. Walk-ins welcome during consultation hours.
              </p>
            </div>

            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="loc-reveal magnetic-btn flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-primary-700/40 text-primary-300 hover:text-white hover:bg-primary-700/20 text-sm font-medium transition-all duration-300"
            >
              <Navigation size={15} />
              Get Directions
            </a>
          </div>

          <div className="loc-reveal lg:col-span-3 rounded-2xl overflow-hidden border border-primary-900/30 min-h-[380px] lg:min-h-0 relative">
            <iframe
              src={MAP_EMBED_SRC}
              width="100%"
              height="100%"
              style={{
                border: 0,
                display: 'block',
                minHeight: '380px',
                filter: 'invert(90%) hue-rotate(180deg) brightness(0.85) contrast(0.9)',
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Vijaya Homeo Care location on Google Maps"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const isOpen = useClinicStatus()
  const scrollTo = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <footer className="bg-[#050e1a] border-t border-primary-900/20 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-primary-700 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                  <path d="M12 3 C12 3 7 9 7 13.5 C7 16.5 9.2 19 12 19 C14.8 19 17 16.5 17 13.5 C17 9 12 3 12 3Z" fill="white" opacity="0.95"/>
                  <ellipse cx="10.2" cy="14.5" rx="1.2" ry="1.6" fill="#0F766E" opacity="0.4"/>
                </svg>
              </div>
              <div className="leading-none">
                <div className="font-display font-700 text-sm text-white">Vijaya Homeo Care</div>
                <div className="font-mono text-[10px] text-primary-300 tracking-widest uppercase">Dr. P. Andal Ambika · BHMS</div>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Compassionate, ethical, and patient-centred homeopathic care. Serving Madurai and surrounding communities for over 18 years.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <div className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-400 status-dot' : 'bg-red-400'}`} />
              <span className="font-mono text-xs text-slate-400">
                {isOpen ? 'Open Now · Accepting Patients' : 'Currently Closed · Accepting New Patients'}
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-[10px] text-accent tracking-widest uppercase mb-4">Navigation</h4>
            <ul className="flex flex-col gap-2.5">
              {[
                ['About', '#about'],
                ['Services', '#services'],
                ['What is Homeopathy', '#what-is'],
                ['FAQ', '#faq'],
                ['Contact', '#contact'],
              ].map(([label, href]) => (
                <li key={href}>
                  <a href={href} onClick={e => scrollTo(e, href)} className="text-slate-400 hover:text-primary-300 text-sm transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[10px] text-accent tracking-widest uppercase mb-4">Contact</h4>
            <ul className="flex flex-col gap-3 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-primary-500 flex-shrink-0 mt-0.5" />
                Sri Sai Complex, Singaravelan Street, K. Pudur, Madurai – 625 007
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-primary-500 flex-shrink-0" />
                9597860727
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-primary-500 flex-shrink-0" />
                pattuanandalambika@gmail.com
              </li>
              <li className="flex items-start gap-2">
                <Clock size={14} className="text-primary-500 flex-shrink-0 mt-0.5" />
                9:30 AM – 1:30 PM  |  5:30 PM – 9:00 PM
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs text-center md:text-left">
            © {new Date().getFullYear()} Vijaya Homeo Care. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">Privacy Policy</a>
            <a href="/terms" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">Terms of Use</a>
            <span className="text-slate-600 text-xs">Disclaimer: Homeopathy is a complementary system. Not a substitute for emergency medical care.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App({ page }) {
  if (page === 'privacy') {
    return (
      <div className="min-h-screen bg-[#0a1628] text-slate-300 font-body px-6 py-20 max-w-3xl mx-auto">
        <h1 className="font-display text-3xl font-700 text-white mb-6">Privacy Policy</h1>
        <p className="text-sm leading-relaxed mb-4">Vijaya Homeo Care respects your privacy. Information submitted through this website is used solely for appointment scheduling and clinical communication.</p>
        <p className="text-sm leading-relaxed mb-4">We do not sell, share, or disclose your personal health information to third parties without explicit consent, except as required by law.</p>
        <p className="text-sm leading-relaxed">For questions, contact us at pattuanandalambika@gmail.com.</p>
        <a href="/" className="mt-8 inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 text-sm"><ArrowRight size={14} /> Back to Home</a>
      </div>
    )
  }

  if (page === 'terms') {
    return (
      <div className="min-h-screen bg-[#0a1628] text-slate-300 font-body px-6 py-20 max-w-3xl mx-auto">
        <h1 className="font-display text-3xl font-700 text-white mb-6">Terms of Use</h1>
        <p className="text-sm leading-relaxed mb-4">By using this website, you agree that the content provided is for informational purposes only and does not constitute medical advice.</p>
        <p className="text-sm leading-relaxed mb-4">Homeopathic treatment should complement, not replace, emergency or conventional medical care. Always consult a qualified healthcare provider for serious health concerns.</p>
        <p className="text-sm leading-relaxed">All content © {new Date().getFullYear()} Vijaya Homeo Care.</p>
        <a href="/" className="mt-8 inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 text-sm"><ArrowRight size={14} /> Back to Home</a>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a1628] font-body antialiased">
      <Navbar />
      <Hero />
      <Features />
      <WhatIsHomeopathy />
      <Protocol />
      <ServicesGrid />
      <TrustSignals />
      <Journey />
      <Testimonials />
      <FAQ />
      <LocationSection />
      <Footer />
    </div>
  )
}
