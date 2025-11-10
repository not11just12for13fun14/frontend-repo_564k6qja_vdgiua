import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle, Loader2 } from 'lucide-react';

export default function Checkout({ open, onClose, item }) {
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  if (!open) return null;

  const handlePay = async () => {
    setProcessing(true);
    setDone(false);
    // Simulate secure checkout and instant download link generation
    await new Promise((r) => setTimeout(r, 1500));
    setProcessing(false);
    setDone(true);
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-slate-900 to-black text-cyan-100 shadow-[0_0_60px_rgba(0,255,255,0.2)]"
      >
        <div className="flex items-center justify-between border-b border-cyan-500/20 p-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-cyan-300" size={20} />
            <h3 className="font-semibold">Secure Checkout</h3>
          </div>
          <button onClick={onClose} className="rounded-md px-2 py-1 text-cyan-200/80 hover:bg-white/5">Close</button>
        </div>

        <div className="p-5">
          {item ? (
            <div className="mb-4">
              <p className="text-sm text-cyan-100/70">You are purchasing</p>
              <h4 className="text-lg font-semibold text-cyan-100">{item.title}</h4>
              <p className="text-sm text-cyan-200/80">${item.price} • Instant digital download</p>
            </div>
          ) : null}

          {!done ? (
            <>
              <div className="mb-4 grid grid-cols-2 gap-3">
                <input className="rounded-md border border-cyan-500/30 bg-black/40 px-3 py-2 text-sm outline-none placeholder:text-cyan-100/40" placeholder="Email" />
                <input className="rounded-md border border-cyan-500/30 bg-black/40 px-3 py-2 text-sm outline-none placeholder:text-cyan-100/40" placeholder="Card (mock)" />
              </div>
              <button
                onClick={handlePay}
                disabled={processing}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-cyan-500/40 bg-cyan-500/10 px-4 py-2 text-cyan-100 transition hover:bg-cyan-500/20 disabled:opacity-60"
              >
                {processing ? <Loader2 size={18} className="animate-spin" /> : null}
                {processing ? 'Processing…' : 'Pay & Download'}
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-3 text-center">
              <CheckCircle className="text-cyan-300" size={40} />
              <p className="text-cyan-100">Payment successful. Your download is ready.</p>
              <a
                href="#"
                className="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-4 py-2 text-cyan-100 hover:bg-cyan-500/20"
                onClick={(e) => e.preventDefault()}
              >
                Download {item?.title}
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
