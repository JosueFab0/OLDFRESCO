import { concerts } from "@/lib/data";
import ConcertCard from "@/components/ConcertCard";

export const metadata = {
  title: "Shows — OldFresco",
};

export default function ConciertosPage() {
  const upcoming = concerts.filter((c) => !c.soldOut);
  const soldOut = concerts.filter((c) => c.soldOut);

  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">

      {/* Header */}
      <div className="mb-16">
        <h1
          className="font-display text-white leading-none mb-8"
          style={{ fontSize: "clamp(60px, 14vw, 180px)", letterSpacing: "-0.02em" }}
        >
          SHOWS
        </h1>

        {/* Stats en línea */}
        <div className="flex items-center gap-8 border-t border-[#141414] pt-6">
          <div>
            <span className="font-display text-[#ffe600] text-2xl">{upcoming.length}</span>
            <span className="text-[#444] text-xs ml-2 tracking-widest uppercase">disponibles</span>
          </div>
          <div className="w-px h-6 bg-[#1e1e1e]" />
          <div>
            <span className="font-display text-[#333] text-2xl">{soldOut.length}</span>
            <span className="text-[#444] text-xs ml-2 tracking-widest uppercase">agotados</span>
          </div>
        </div>
      </div>

      {/* Lista de shows */}
      <div className="space-y-2">
        {upcoming.map((c, i) => (
          <ConcertCard key={c.id} concert={c} index={i} />
        ))}
      </div>

      {/* Agotados */}
      {soldOut.length > 0 && (
        <div className="mt-20">
          <p className="font-display text-[#222] text-xs tracking-[0.3em] mb-6 uppercase">Agotados</p>
          <div className="space-y-2 opacity-30 pointer-events-none select-none">
            {soldOut.map((c, i) => (
              <ConcertCard key={c.id} concert={c} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
