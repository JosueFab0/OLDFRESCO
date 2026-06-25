"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const { itemCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[#080808]/95 backdrop-blur-sm border-b border-[#141414]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between h-14">

          {/* Logo — raw, sin decoraciones */}
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="w-7 h-7 bg-[#ffe600] flex items-center justify-center">
              <span className="font-display text-[#080808] text-xs leading-none">OF</span>
            </div>
            <span className="font-display text-base tracking-[0.15em] group-hover:text-[#ffe600] transition-colors hidden sm:block">
              OLDFRESCO
            </span>
          </Link>

          {/* Links desktop — simples, sin adornos */}
          <div className="hidden md:flex items-center gap-10">
            <Link href="/conciertos" className="text-[#666] hover:text-white transition-colors text-sm tracking-widest font-display">
              SHOWS
            </Link>
            <Link href="/galeria" className="text-[#666] hover:text-white transition-colors text-sm tracking-widest font-display">
              GALERÍA
            </Link>
            <Link href="/suscripcion" className="text-[#666] hover:text-white transition-colors text-sm tracking-widest font-display">
              VIP
            </Link>
            <Link href="/admin" className="text-[#333] hover:text-[#666] transition-colors text-xs tracking-widest font-display">
              ADMIN
            </Link>
          </div>

          {/* Acciones */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2.5 text-[#666] hover:text-white transition-colors"
            >
              <ShoppingCart size={18} />
              {itemCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#ffe600] text-[#080808] text-[10px] font-black flex items-center justify-center rounded-full">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Hamburger mobile */}
            <button
              className="md:hidden p-2.5 text-[#666] hover:text-white transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <X size={18} />
              ) : (
                <div className="flex flex-col gap-1.5 w-5">
                  <span className="h-px bg-current block" />
                  <span className="h-px bg-current block w-3" />
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#080808] border-t border-[#141414]">
            {[
              { href: "/conciertos", label: "SHOWS" },
              { href: "/galeria", label: "GALERÍA" },
              { href: "/suscripcion", label: "VIP" },
              { href: "/admin", label: "ADMIN" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block px-6 py-4 font-display text-sm tracking-widest text-[#666] hover:text-white hover:bg-[#0f0f0f] transition-colors border-b border-[#0f0f0f]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
