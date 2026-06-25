"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { formatPrice, formatDate } from "@/lib/data";
import { Concert } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import { clsx } from "clsx";

type Props = { concert: Concert };

export default function TicketSelector({ concert }: Props) {
  const { addItem } = useCart();
  const [selected, setSelected] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const selectedTier = concert.tiers.find((t: { id: string }) => t.id === selected);

  const handleAdd = () => {
    if (!selectedTier) return;
    addItem({
      concertId: concert.id,
      concertTitle: concert.artist,
      concertDate: formatDate(concert.date),
      venue: concert.venue,
      tierId: selectedTier.id,
      tierName: selectedTier.name,
      price: selectedTier.price,
      quantity: qty,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (concert.soldOut) {
    return (
      <div className="border border-[#2a2a2a] p-6 text-center space-y-4">
        <p className="font-display text-3xl text-[#ff1f1f] tracking-widest">AGOTADO</p>
        <p className="text-sm text-[#888]">Este evento ya no tiene entradas disponibles.</p>
      </div>
    );
  }

  return (
    <div className="border border-[#2a2a2a] overflow-hidden">
      {/* Header */}
      <div className="bg-[#141414] px-6 py-4 border-b border-[#2a2a2a]">
        <p className="font-display tracking-widest text-sm text-[#888]">SELECCIONAR TICKETS</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Tier selection */}
        <div className="space-y-3">
          {concert.tiers.map((tier: { id: string; available: number; name: string; price: number; perks?: string[] }) => {
            const isSold = tier.available === 0;
            const isSelected = selected === tier.id;

            return (
              <button
                key={tier.id}
                onClick={() => !isSold && setSelected(tier.id)}
                disabled={isSold}
                className={clsx(
                  "w-full text-left p-4 border transition-all",
                  isSold
                    ? "border-[#1e1e1e] opacity-40 cursor-not-allowed"
                    : isSelected
                    ? "border-[#ffe600] bg-[#ffe600]/5"
                    : "border-[#2a2a2a] hover:border-[#444] cursor-pointer"
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className={clsx(
                          "w-4 h-4 border flex items-center justify-center flex-shrink-0",
                          isSelected ? "border-[#ffe600] bg-[#ffe600]" : "border-[#2a2a2a]"
                        )}
                      >
                        {isSelected && <Check size={10} className="text-[#080808]" strokeWidth={3} />}
                      </div>
                      <span className="font-display tracking-wider text-sm">{tier.name}</span>
                      {isSold && (
                        <span className="text-xs text-[#ff1f1f] font-display tracking-wider">AGOTADO</span>
                      )}
                    </div>
                    {tier.perks && (
                      <ul className="pl-6 space-y-0.5">
                        {tier.perks.map((p: string) => (
                          <li key={p} className="text-xs text-[#888]">· {p}</li>
                        ))}
                      </ul>
                    )}
                    {!isSold && (
                      <p className="pl-6 text-xs text-[#444] mt-1">
                        {tier.available.toLocaleString()} disponibles
                      </p>
                    )}
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-display text-lg text-[#ffe600] tracking-wider">
                      {formatPrice(tier.price)}
                    </p>
                    <p className="text-xs text-[#888]">c/u</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Quantity */}
        {selected && (
          <div className="space-y-2">
            <p className="font-display tracking-widest text-xs text-[#888]">CANTIDAD</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 border border-[#2a2a2a] p-1">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-9 h-9 hover:text-[#ffe600] transition-colors font-bold text-lg"
                >
                  −
                </button>
                <span className="w-8 text-center font-bold tabular-nums">{qty}</span>
                <button
                  onClick={() => setQty(Math.min(8, qty + 1))}
                  className="w-9 h-9 hover:text-[#ffe600] transition-colors font-bold text-lg"
                >
                  +
                </button>
              </div>
              <p className="text-xs text-[#888]">máx. 8 por orden</p>
            </div>
          </div>
        )}

        {/* Subtotal */}
        {selectedTier && (
          <div className="border-t border-[#1e1e1e] pt-4 flex justify-between items-center">
            <span className="text-sm text-[#888]">Subtotal</span>
            <span className="font-display text-xl text-[#ffe600] tracking-wider">
              {formatPrice(selectedTier.price * qty)}
            </span>
          </div>
        )}

        {/* Add to cart */}
        <button
          onClick={handleAdd}
          disabled={!selected}
          className={clsx(
            "w-full font-display tracking-widest py-4 flex items-center justify-center gap-3 transition-all",
            !selected
              ? "bg-[#1e1e1e] text-[#444] cursor-not-allowed"
              : added
              ? "bg-white text-[#080808]"
              : "bg-[#ffe600] text-[#080808] hover:bg-white"
          )}
        >
          {added ? (
            <>
              <Check size={16} /> AGREGADO AL CARRITO
            </>
          ) : (
            <>
              <ShoppingCart size={16} />
              {selected ? "AGREGAR AL CARRITO" : "SELECCIONA UN TIER"}
            </>
          )}
        </button>

        <p className="text-xs text-center text-[#444]">
          Tickets digitales · Envío inmediato por email
        </p>
      </div>
    </div>
  );
}
