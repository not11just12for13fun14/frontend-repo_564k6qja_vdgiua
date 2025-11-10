import React, { useMemo, useRef, useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { PlayCircle, PauseCircle, Download } from 'lucide-react';

const packs = [
  {
    id: 'cyber-wave',
    title: 'Cyber Wave Vol.1',
    desc: 'Neon synths, razor kicks, glitchy perc.',
    price: 24,
    cover: '/covers/cyberwave.jpg',
    preview: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_0a33b6f3a9.mp3?filename=cyberpunk-moonlight-21069.mp3',
  },
  {
    id: 'holo-drill',
    title: 'Hologram Drill',
    desc: 'Dark 808s, icy hats, haunting pads.',
    price: 29,
    cover: '/covers/hologram.jpg',
    preview: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_5661e5a1b2.mp3?filename=neon-gaming-128925.mp3',
  },
  {
    id: 'astro-rnb',
    title: 'Astro RnB Kit',
    desc: 'Silky chords, airy vox, velvet drums.',
    price: 19,
    cover: '/covers/astro.jpg',
    preview: 'https://cdn.pixabay.com/download/audio/2021/09/09/audio_0c95d85f2d.mp3?filename=modern-vlog-140795.mp3',
  },
];

function HoloCard({ item, onBuy }) {
  const [hovered, setHovered] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);
  const controls = useAnimationControls();

  const start = () => {
    setPlaying(true);
    audioRef.current && audioRef.current.play().catch(() => {});
  };
  const stop = () => {
    setPlaying(false);
    audioRef.current && (audioRef.current.pause(), (audioRef.current.currentTime = 0));
  };

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={controls}
      whileHover={{ y: -6 }}
      className="group relative w-full overflow-hidden rounded-2xl border border-cyan-500/20 bg-white/5 p-4 shadow-[0_0_40px_rgba(0,255,255,0.08)] backdrop-blur-md"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gradient-to-br from-cyan-900/30 via-blue-900/20 to-black">
        {/* Simulated rotating 3D box via layered divs */}
        <motion.div
          className="absolute inset-6 rounded-lg border border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/10"
          animate={{ rotateY: hovered ? 25 : 0, rotateX: hovered ? -6 : 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 15 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{ boxShadow: hovered ? '0 0 60px rgba(0,255,255,0.35)' : '0 0 0 rgba(0,0,0,0)' }}
          />
          <motion.div className="absolute inset-0 grid place-items-center">
            <div className="grid place-items-center">
              <div className="mb-3 h-16 w-16 rounded-full border border-cyan-300/40 bg-cyan-500/20 shadow-[0_0_30px_rgba(0,255,255,0.25)]" />
              <p className="text-xs text-cyan-100/70">Holographic Disc</p>
            </div>
          </motion.div>
          {/* Soundwave bars */}
          <div className="pointer-events-none absolute bottom-2 left-0 right-0 flex items-end justify-center gap-1 px-4">
            {Array.from({ length: 18 }).map((_, i) => (
              <motion.span
                key={i}
                className="h-6 w-1 rounded-full bg-cyan-300/60"
                animate={{ height: hovered ? [8, 28, 12, 24, 10][i % 5] : 8 }}
                transition={{ repeat: hovered ? Infinity : 0, duration: 0.8, delay: i * 0.03 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Glass overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent" />
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-cyan-100">{item.title}</h3>
          <p className="mt-1 text-sm text-cyan-100/70">{item.desc}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-cyan-200/90">${item.price}</p>
          <button
            onClick={() => onBuy(item)}
            className="mt-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-100 hover:bg-cyan-500/20"
          >
            Buy Now
          </button>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <button
          onClick={() => (playing ? stop() : start())}
          className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-white/5 px-3 py-1 text-sm text-cyan-100 transition hover:bg-white/10"
        >
          {playing ? <PauseCircle size={18} className="text-cyan-300" /> : <PlayCircle size={18} className="text-cyan-300" />}
          Try Demo Sounds
        </button>
        <button
          onClick={() => onBuy(item)}
          className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-100 transition hover:bg-cyan-500/20"
        >
          <Download size={18} className="text-cyan-300" />
          Instant Download
        </button>
      </div>

      <audio ref={audioRef} src={item.preview} />
    </motion.div>
  );
}

export default function FeaturedPacks({ onBuy }) {
  const items = useMemo(() => packs, []);

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-cyan-100 sm:text-3xl">Featured Sample Packs</h2>
          <p className="mt-1 text-sm text-cyan-100/70">Curated sounds to spark your next idea.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <HoloCard key={item.id} item={item} onBuy={onBuy} />)
        )}
      </div>
    </section>
  );
}
