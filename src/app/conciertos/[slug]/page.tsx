import { notFound } from "next/navigation";
import { concerts, formatPrice, formatDate } from "@/lib/data";
import { Calendar, MapPin, Clock, Users, ChevronRight } from "lucide-react";
import TicketSelector from "@/components/TicketSelector";
import Link from "next/link";

export async function generateStaticParams() {
  return concerts.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const concert = concerts.find((c) => c.slug === slug);
  if (!concert) return {};
  return {
    title: `${concert.artist} — ${concert.title} | OldFresco`,
    description: concert.description,
  };
}

export default async function ConcertPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const concert = concerts.find((c) => c.slug === slug);
  if (!concert) notFound();

  const totalAvailable = concert.tiers.reduce((s, t) => s + t.available, 0);
  const totalCapacity = concert.tiers.reduce((s, t) => s + t.total, 0);
  const soldPct = Math.round(((totalCapacity - totalAvailable) / totalCapacity) * 100);

  return (
    <div>
      {/* Hero banner */}
      <div className="relative h-[45vh] bg-[#141414] overflow-hidden border-b border-[#1e1e1e]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(#1e1e1e 1px, transparent 1px), linear-gradient(90deg, #1e1e1e 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            opacity: 0.5,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span
            className="font-display leading-none"
            style={{
              fontSize: "25vw",
              color: "transparent",
              WebkitTextStroke: "1px #1e1e1e",
            }}
          >
            {concert.artist[0]}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#080808] to-transparent" />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ffe600]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-10 pb-24">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#444] mb-8 font-display tracking-widest">
          <Link href="/" className="hover:text-[#888] transition-colors">INICIO</Link>
          <ChevronRight size={12} />
          <Link href="/conciertos" className="hover:text-[#888] transition-colors">CONCIERTOS</Link>
          <ChevronRight size={12} />
          <span className="text-[#ffe600]">{concert.artist.toUpperCase()}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Genres */}
            <div className="flex gap-2 flex-wrap">
              {concert.genre.map((g) => (
                <span key={g} className="font-display text-xs tracking-widest px-3 py-1 border border-[#2a2a2a] text-[#888]">
                  {g.toUpperCase()}
                </span>
              ))}
            </div>

            {/* Title */}
            <div>
              <h1 className="font-display text-5xl md:text-7xl leading-none tracking-tight mb-2">
                {concert.artist}
              </h1>
              <p className="font-display text-xl text-[#888] tracking-widest uppercase">{concert.title}</p>
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#1e1e1e]">
              {[
                { icon: <Calendar size={16} />, label: "FECHA", value: formatDate(concert.date), capitalize: true },
                { icon: <Clock size={16} />, label: "HORA", value: concert.time + " hrs" },
                { icon: <MapPin size={16} />, label: "LUGAR", value: concert.venue },
                { icon: <Users size={16} />, label: "CIUDAD", value: concert.city },
              ].map((d) => (
                <div key={d.label} className="bg-[#141414] p-5 flex flex-col gap-2">
                  <div className="text-[#ffe600]">{d.icon}</div>
                  <p className="font-display text-xs tracking-widest text-[#444]">{d.label}</p>
                  <p className={`text-sm font-medium leading-snug ${d.capitalize ? "capitalize" : ""}`}>{d.value}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="border-l-2 border-[#ffe600] pl-6">
              <p className="text-[#888] leading-relaxed">{concert.description}</p>
            </div>

            {/* Availability bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-display tracking-widest text-[#888]">DISPONIBILIDAD</span>
                <span className="font-display text-[#ffe600]">{soldPct}% VENDIDO</span>
              </div>
              <div className="h-2 bg-[#1e1e1e] overflow-hidden">
                <div
                  className="h-full bg-[#ffe600] transition-all"
                  style={{ width: `${soldPct}%` }}
                />
              </div>
              <p className="text-xs text-[#444]">{totalAvailable.toLocaleString()} entradas disponibles</p>
            </div>
          </div>

          {/* Right: Ticket selector */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <TicketSelector concert={concert} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
