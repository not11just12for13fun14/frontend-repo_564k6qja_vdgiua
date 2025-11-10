import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Nova Beats',
    role: 'Producer / YouTuber',
    quote:
      'These packs cut my sketch time in half. The textures and 3D browsing flow are actually inspiring.',
  },
  {
    name: 'Kali X',
    role: 'Artist',
    quote:
      'Instant downloads after checkout and the demo previews slap. Cyber Wave Vol.1 is a staple now.',
  },
  {
    name: 'Orbit Sound',
    role: 'Mix Engineer',
    quote:
      'Top-tier drum design. Quantum Drums sits in the mix without much tweaking. Big fan.',
  },
];

export default function Testimonials() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-cyan-100 sm:text-3xl">Loved by creators</h2>
        <p className="mt-1 text-sm text-cyan-100/70">Real feedback from real music makers.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.blockquote
            key={t.name}
            className="relative rounded-2xl border border-cyan-500/20 bg-white/5 p-6 backdrop-blur-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.06 }}
          >
            <Quote className="mb-3 text-cyan-300" size={22} />
            <p className="text-cyan-100/90">“{t.quote}”</p>
            <footer className="mt-4 text-sm text-cyan-200/80">
              — {t.name}, <span className="text-cyan-100/60">{t.role}</span>
            </footer>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-300/10 via-transparent to-transparent" />
          </motion.blockquote>
        ))}
      </div>
    </section>
  );
}
