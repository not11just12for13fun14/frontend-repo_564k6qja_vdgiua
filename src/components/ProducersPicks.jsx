import React from 'react';
import { motion } from 'framer-motion';
import { Star, Sparkles } from 'lucide-react';

const picks = [
  { title: 'Midnight Keys', note: 'Perfect for dreamy trap & alt RnB.', tag: 'New' },
  { title: 'Quantum Drums', note: 'Punchy, textured, and mix-ready.', tag: 'Hot' },
  { title: 'Vapor Vox', note: 'Airy vocals with shimmer tails.', tag: 'Vocal' },
  { title: 'Nebula Pads', note: 'Evolving atmospheres for hooks.', tag: 'Ambient' },
];

export default function ProducersPicks() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-cyan-100 sm:text-3xl">Producer’s Picks</h2>
          <p className="mt-1 text-sm text-cyan-100/70">Hand-selected tools our community loves.</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-cyan-300">
          <Sparkles size={18} />
          <span className="text-sm">Curated weekly</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {picks.map((p, i) => (
          <motion.div
            key={p.title}
            className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-white/5 p-5 backdrop-blur-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-100">
              <Star size={14} className="text-cyan-300" />
              {p.tag}
            </div>
            <h3 className="text-lg font-semibold text-cyan-100">{p.title}</h3>
            <p className="mt-2 text-sm text-cyan-100/70">{p.note}</p>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-300/10 via-transparent to-transparent" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
