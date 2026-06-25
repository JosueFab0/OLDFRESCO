"use client";

import { X, Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/data";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CartDrawer({ open, onClose }: Props) {
  const { items, removeItem, updateQuantity, total, itemCount } = useCart();

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#141414] z-50 flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#2a2a2a]">
          <h2 className="font-display tracking-widest text-lg">
            CARRITO ({itemCount})
          </h2>
          <button onClick={onClose} className="p-1 hover:text-[#ffe600] transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-[#444]">
              <ShoppingBag size={48} strokeWidth={1} />
              <p className="font-display tracking-widest text-sm">CARRITO VACÍO</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.concertId}-${item.tierId}`}
                className="border border-[#2a2a2a] p-4 space-y-3"
              >
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <p className="font-display tracking-wider text-sm">{item.concertTitle}</p>
                    <p className="text-xs text-[#888] mt-0.5">{item.tierName} · {item.venue}</p>
                    <p className="text-xs text-[#888]">{item.concertDate}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.concertId, item.tierId)}
                    className="p-1 text-[#444] hover:text-[#ff1f1f] transition-colors flex-shrink-0"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.concertId, item.tierId, item.quantity - 1)}
                      className="w-7 h-7 border border-[#2a2a2a] hover:border-[#ffe600] flex items-center justify-center text-sm transition-colors"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.concertId, item.tierId, item.quantity + 1)}
                      className="w-7 h-7 border border-[#2a2a2a] hover:border-[#ffe600] flex items-center justify-center text-sm transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <p className="font-display text-[#ffe600] tracking-wider">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#2a2a2a] px-6 py-5 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[#888] text-sm">TOTAL</span>
              <span className="font-display text-2xl text-[#ffe600] tracking-wider">
                {formatPrice(total)}
              </span>
            </div>
            <Link
              href="/checkout"
              onClick={onClose}
              className="block w-full bg-[#ffe600] text-[#080808] font-display tracking-widest text-center py-4 hover:bg-white transition-colors"
            >
              COMPRAR AHORA
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
