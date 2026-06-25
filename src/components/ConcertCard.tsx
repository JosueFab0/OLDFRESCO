import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatPrice, formatDate } from "@/lib/data";
import { Concert } from "@/lib/types";

type Props = {
  concert: Concert;
  index?: number;
};

export default function ConcertCard({ concert, index = 0 }: Props) {
  const lowestPrice = Math.min(...concert.tiers.map((t) => t.price));
  const availableCount = concert.tiers.reduce((s, t) => s + t.available, 0);
  const isLow = availableCount < 500 && availableCount > 0;
  const date = new Date(concert.date + "T00:00:00");
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleDateString("es-CR", { month: "short" }).toUpperCase().replace(".", "");

  return (
    <Link
      href={`/conciertos/${concert.slug}`}
      className="group relative flex items-stretch border border-[#1a1a1a] hover:border-[#ffe600] transition-all duration-200 overflow-hidden bg-[#0a0a0a] hover:bg-[#0f0f0f]"
    >
      {/* Número del día — columna izquierda */}
      <div className="flex-shrink-0 w-20 md:w-28 flex flex-col items-center justify-center border-r border-[#1a1a1a] group-hover:border-[#ffe600] transition-colors py-6 px-2 text-center">
        <span className="font-display leading-none text-[#ffe600]" style={{ fontSize: "clamp(32px, 5vw, 52px)" }}>
          {day}
        </span>
        <span className="font-display text-[#444] text-xs tracking-widest mt-1 group-hover:text-[#888] transition-colors">
          {month}
        </span>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col md:flex-row md:items-center gap-2 md:gap-6 px-5 py-5">

        {/* Nombre artista */}
        <div className="flex-1 min-w-0">
          <h3
            className="font-display text-white leading-none truncate group-hover:text-[#ffe600] transition-colors"
            style={{ fontSize: "clamp(22px, 3.5vw, 40px)", letterSpacing: "-0.01em" }}
          >
            {concert.artist}
          </h3>
          <p className="text-[#555] text-xs mt-1 tracking-wide uppercase font-display truncate">
            {concert.venue} — {concert.city}
          </p>
        </div>

        {/* Tags / estado */}
        <div className="flex items-center gap-2 flex-wrap md:flex-nowrap">
          {concert.soldOut && (
            <span className="font-display text-[10px] tracking-widest text-[#ff1f1f] border border-[#ff1f1f]/30 px-2 py-0.5 whitespace-nowrap">
              AGOTADO
            </span>
          )}
          {isLow && !concert.soldOut && (
            <span className="font-display text-[10px] tracking-widest text-[#ff1f1f] border border-[#ff1f1f]/30 px-2 py-0.5 whitespace-nowrap">
              ÚLTIMOS
            </span>
          )}
          {concert.featured && !concert.soldOut && (
            <span className="font-display text-[10px] tracking-widest text-[#080808] bg-[#ffe600] px-2 py-0.5 whitespace-nowrap">
              HOT
            </span>
          )}
          {concert.genre.slice(0, 1).map((g) => (
            <span key={g} className="hidden md:block font-display text-[10px] tracking-widest text-[#444] border border-[#1e1e1e] px-2 py-0.5 whitespace-nowrap">
              {g.toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      {/* Precio + CTA — columna derecha */}
      <div className="flex-shrink-0 flex flex-col items-end justify-center gap-2 px-5 py-5 border-l border-[#1a1a1a] group-hover:border-[#ffe600] transition-colors">
        {concert.soldOut ? (
          <span className="font-display text-[#333] text-xs tracking-widest">——</span>
        ) : (
          <>
            <div className="text-right">
              <p className="text-[#444] text-[10px] tracking-widest uppercase">desde</p>
              <p className="font-display text-white text-base md:text-xl leading-none group-hover:text-[#ffe600] transition-colors whitespace-nowrap">
                {formatPrice(lowestPrice)}
              </p>
            </div>
            <div className="w-8 h-8 border border-[#2a2a2a] group-hover:border-[#ffe600] group-hover:bg-[#ffe600] flex items-center justify-center transition-all">
              <ArrowUpRight size={14} className="text-[#444] group-hover:text-[#080808] transition-colors" />
            </div>
          </>
        )}
      </div>

      {/* Línea izquierda que aparece en hover */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#ffe600] scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300" />
    </Link>
  );
}
