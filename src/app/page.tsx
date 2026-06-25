import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { concerts, formatPrice } from "@/lib/data";
import ConcertCard from "@/components/ConcertCard";
import CountdownTimer from "@/components/CountdownTimer";

export default function Home() {
  const featured = concerts.filter((c) => c.featured);
  const heroEvent = featured[0];
  const nextShows = concerts.filter((c) => !c.soldOut).slice(1, 5);
  const heroDate = new Date(heroEvent.date + "T00:00:00");

  return (
    <div className="overflow-x-hidden">

      {/* ── HERO ─── editorial, asimétrico ────────────────────── */}
      <section className="relative min-h-screen bg-[#080808] flex flex-col">

        {/* Número del mes como textura de fondo */}
        <div
          aria-hidden
          className="pointer-events-none select-none absolute top-0 right-0 font-display leading-none text-[#0e0e0e]"
          style={{ fontSize: "clamp(180px, 35vw, 480px)", lineHeight: 0.85 }}
        >
          {String(heroDate.getMonth() + 1).padStart(2, "0")}
        </div>

        {/* Línea vertical izquierda */}
        <div className="absolute left-0 top-0 h-full w-[3px] bg-[#ffe600]" />

        {/* Status pill — como los stickers de los conciertos */}
        <div className="absolute top-6 right-6 bg-[#ffe600] text-[#080808] font-display tracking-[0.2em] text-[10px] px-3 py-1.5 rotate-1">
          PRÓXIMAMENTE
        </div>

        <div className="flex-1 flex flex-col justify-end px-6 md:px-10 pb-12 pt-32 max-w-[1400px] mx-auto w-full">

          {/* Venue + ciudad — dato chico antes del nombre grande */}
          <div className="flex items-center gap-4 mb-4 ml-1">
            <span className="text-[#888] text-xs tracking-widest">{heroEvent.venue}</span>
            <span className="text-[#333]">·</span>
            <span className="text-[#888] text-xs tracking-widest">{heroEvent.city.toUpperCase()}</span>
          </div>

          {/* Nombre del artista — sangra fuera del viewport en mobile */}
          <h1
            className="font-display leading-[0.88] mb-3 text-white"
            style={{ fontSize: "clamp(72px, 16vw, 220px)", letterSpacing: "-0.02em" }}
          >
            {heroEvent.artist}
          </h1>

          {/* Tour name en negativo sobre amarillo */}
          <div className="inline-block bg-[#ffe600] self-start px-4 py-1 mb-8 -skew-x-2">
            <span className="font-display text-[#080808] tracking-wider" style={{ fontSize: "clamp(14px, 2.5vw, 24px)" }}>
              {heroEvent.title}
            </span>
          </div>

          {/* Bottom row: fecha enorme + countdown + CTA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">

            {/* Fecha — formato de flyer */}
            <div>
              <div className="flex items-baseline gap-3 mb-1">
                <span
                  className="font-display text-[#ffe600] leading-none"
                  style={{ fontSize: "clamp(60px, 10vw, 120px)" }}
                >
                  {String(heroDate.getDate()).padStart(2, "0")}
                </span>
                <div className="flex flex-col">
                  <span className="font-display text-white text-2xl md:text-4xl leading-tight uppercase">
                    {heroDate.toLocaleDateString("es-CR", { month: "long" })}
                  </span>
                  <span className="font-display text-[#444] text-xl md:text-3xl">
                    {heroDate.getFullYear()}
                  </span>
                </div>
              </div>
              <CountdownTimer targetDate={heroEvent.date + "T20:00:00"} />
            </div>

            {/* CTA + precio */}
            <div className="flex flex-col items-start md:items-end gap-4">
              <div className="text-right">
                <p className="text-[#444] text-xs uppercase tracking-widest mb-1">entradas desde</p>
                <p className="font-display text-white" style={{ fontSize: "clamp(28px, 4vw, 48px)" }}>
                  {formatPrice(Math.min(...heroEvent.tiers.map((t) => t.price)))}
                </p>
              </div>
              <Link
                href={`/conciertos/${heroEvent.slug}`}
                className="group flex items-center gap-3 bg-[#ffe600] text-[#080808] font-display tracking-widest px-8 py-4 hover:bg-white transition-colors text-sm"
              >
                CONSEGUÍ TU TICKET
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CINTA AMARILLA — divisor agresivo ─────────────────── */}
      <div className="bg-[#ffe600] py-2 px-6 flex items-center justify-between overflow-hidden">
        <span className="font-display text-[#080808] text-xs tracking-[0.3em] whitespace-nowrap">
          OLDFRESCO PRODUCCIONES — COSTA RICA
        </span>
        <span className="font-display text-[#080808] text-xs tracking-[0.3em] whitespace-nowrap hidden sm:block">
          ★ ★ ★
        </span>
        <Link
          href="/conciertos"
          className="font-display text-[#080808] text-xs tracking-[0.3em] whitespace-nowrap hover:opacity-60 transition-opacity flex items-center gap-1"
        >
          VER TODOS <ArrowRight size={10} />
        </Link>
      </div>

      {/* ── PRÓXIMOS SHOWS — lista de flyers ──────────────────── */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-20">

        {/* Header editorial */}
        <div className="flex items-start justify-between mb-14 gap-6">
          <div className="flex-1">
            <h2
              className="font-display text-white leading-none"
              style={{ fontSize: "clamp(52px, 10vw, 130px)", letterSpacing: "-0.02em" }}
            >
              LO QUE<br />
              <span className="text-[#ffe600]">VIENE.</span>
            </h2>
          </div>
          {/* Rotated label — elemento de zine */}
          <div className="hidden md:flex items-center justify-center w-24 h-24 border-2 border-[#1e1e1e] rotate-6 flex-shrink-0 mt-4">
            <span className="font-display text-[#444] text-xs tracking-[0.2em] text-center leading-tight">
              CR<br />26/27
            </span>
          </div>
        </div>

        {/* Grid de conciertos */}
        <div className="space-y-3">
          {nextShows.map((c, i) => (
            <ConcertCard key={c.id} concert={c} index={i} />
          ))}
        </div>

        <div className="mt-10 border-t border-[#1e1e1e] pt-8 flex items-center justify-between">
          <p className="text-[#444] text-sm">
            {concerts.length} shows en agenda
          </p>
          <Link
            href="/conciertos"
            className="font-display tracking-widest text-sm text-white hover:text-[#ffe600] transition-colors flex items-center gap-2 group"
          >
            TODOS LOS SHOWS
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* ── BLOQUE NEGRO/AMARILLO — suscripción raw ───────────── */}
      <section className="bg-[#ffe600]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2
              className="font-display text-[#080808] leading-none"
              style={{ fontSize: "clamp(48px, 8vw, 100px)", letterSpacing: "-0.02em" }}
            >
              PRIMERO<br />
              EN SABER.
            </h2>
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-[#1a1a1a] leading-relaxed">
              Los suscriptores VIP agarran los tickets 48 horas antes que el resto. Sin drama, sin quedarse afuera.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link
                href="/suscripcion"
                className="bg-[#080808] text-[#ffe600] font-display tracking-widest px-6 py-3 text-sm hover:bg-[#1a1a1a] transition-colors"
              >
                UNIRME AL VIP
              </Link>
              <Link
                href="/suscripcion"
                className="border border-[#080808] text-[#080808] font-display tracking-widest px-6 py-3 text-sm hover:bg-[#080808] hover:text-[#ffe600] transition-colors"
              >
                VER PLANES
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOLD OUT — trofeo de lo que se perdieron ──────────── */}
      {concerts.filter((c) => c.soldOut).length > 0 && (
        <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">
          <p className="font-display text-[#333] text-xs tracking-[0.3em] mb-6">YA REVENTAMOS</p>
          <div className="flex flex-wrap gap-4">
            {concerts.filter((c) => c.soldOut).map((c) => (
              <div key={c.id} className="border border-[#1e1e1e] px-5 py-3 opacity-40">
                <span className="font-display text-sm tracking-wider line-through">{c.artist}</span>
                <span className="text-xs text-[#444] ml-3">{new Date(c.date + "T00:00:00").toLocaleDateString("es-CR", { month: "short", day: "numeric" })}</span>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
