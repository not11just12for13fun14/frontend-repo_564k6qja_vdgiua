import React, { useCallback, useState } from 'react';
import Hero3D from './components/Hero3D';
import FeaturedPacks from './components/FeaturedPacks';
import ProducersPicks from './components/ProducersPicks';
import Testimonials from './components/Testimonials';
import Checkout from './components/Checkout';

export default function App() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openCheckout = useCallback((item) => {
    if (item) setSelectedItem(item);
    setCheckoutOpen(true);
  }, []);

  const closeCheckout = useCallback(() => {
    setCheckoutOpen(false);
  }, []);

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Hero3D onBuyClick={() => openCheckout(null)} />

      <div className="pointer-events-none mx-auto -mt-10 h-10 max-w-7xl bg-gradient-to-t from-black to-transparent" />

      <FeaturedPacks onBuy={openCheckout} />
      <ProducersPicks />
      <Testimonials />

      <footer className="mx-auto max-w-7xl px-6 py-12 text-center text-cyan-100/70">
        <p>© {new Date().getFullYear()} Cyber Sample Lab — Crafted for creators.</p>
      </footer>

      <Checkout open={checkoutOpen} onClose={closeCheckout} item={selectedItem} />
    </div>
  );
}
