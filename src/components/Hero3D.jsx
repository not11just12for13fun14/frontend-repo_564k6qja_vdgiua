import React, { useEffect, useMemo, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, ShoppingBag } from 'lucide-react';

const bgMusicUrl = 'https://cdn.pixabay.com/download/audio/2024/01/31/audio_3a096e9159.mp3?filename=future-bass-183975.mp3';

export default function Hero3D({ onBuyClick }) {
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef(null);

  // Parallax based on mouse
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useTransform(my, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mx, [-0.5, 0.5], [-10, 10]);
  const glowOpacity = useTransform(my, [-0.5, 0.5], [0.3, 0.8]);

  useEffect(() => {
    const handler = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = e.clientX / innerWidth - 0.5;
      const y = e.clientY / innerHeight - 0.5;
      mx.set(x);
      my.set(y);
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [mx, my]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = true;
    if (musicOn) {
      audio.volume = 0.4;
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [musicOn]);

  const ctaVariants = useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.8 } },
  }), []);

  return (
    <section className="relative h-[90vh] w-full overflow-hidden bg-black text-white">
      {/* 3D Spline Scene */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Ambient gradient glows */}
      <motion.div
        className="pointer-events-none absolute -inset-20 rounded-[50%] bg-[radial-gradient(circle_at_center,rgba(0,204,255,0.25),rgba(0,0,0,0)_60%)] blur-3xl"
        style={{ opacity: glowOpacity }}
      />

      {/* Content overlay */}
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center"
      >
        <div className="backdrop-blur-xl/50 rounded-2xl border border-cyan-500/20 bg-white/5 p-6 shadow-[0_0_60px_rgba(0,255,255,0.15)]">
          <h1 className="bg-gradient-to-b from-cyan-300 to-blue-500 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-6xl">
            Cyber Sample Lab
          </h1>
          <p className="mt-4 max-w-2xl text-balance text-sm text-cyan-100/80 sm:text-base">
            Futuristic sample packs and music kits with immersive 3D shopping. Hover, explore, and vibe.
          </p>
          <motion.div variants={ctaVariants} initial="initial" animate="animate" className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onBuyClick}
              className="group inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-5 py-2 text-cyan-100 transition hover:bg-cyan-500/20 hover:shadow-[0_0_30px_rgba(0,255,255,0.35)]"
            >
              <ShoppingBag size={18} className="text-cyan-300" />
              <span>Secure Checkout</span>
            </button>
            <button
              onClick={() => setMusicOn((m) => !m)}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-white/5 px-5 py-2 text-cyan-100 transition hover:bg-white/10"
              aria-label="Toggle background music"
            >
              {musicOn ? <Pause size={18} className="text-cyan-300" /> : <Play size={18} className="text-cyan-300" />}
              <span>Background Music</span>
              {musicOn ? <Volume2 size={18} className="text-cyan-300" /> : <VolumeX size={18} className="text-cyan-300" />}
            </button>
          </motion.div>
        </div>
      </motion.div>

      <audio ref={audioRef} src={bgMusicUrl} />
    </section>
  );
}
