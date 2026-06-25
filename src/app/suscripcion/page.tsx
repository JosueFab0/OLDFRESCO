"use client";

import { useState } from "react";
import { Check, ArrowRight, Zap, Star, Bell } from "lucide-react";

const plans = [
  {
    id: "free",
    name: "FRESCO",
    price: 0,
    label: "GRATIS",
    desc: "Para los que quieren estar al tanto.",
    perks: [
      "Newsletter semanal de eventos",
      "Notificaciones de nuevos shows",
      "Acceso a la tienda general",
    ],
    cta: "SUSCRIBIRME GRATIS",
    highlight: false,
  },
  {
    id: "vip",
    name: "VIP",
    price: 4990,
    label: "₡4.990 / mes",
    desc: "Para los que siempre van en el front.",
    perks: [
      "Todo lo del plan Fresco",
      "Preventa 48hrs antes que el público",
      "Descuentos exclusivos en tickets",
      "Acceso a zonas VIP seleccionadas",
      "Contenido exclusivo detrás de cámaras",
      "Sorteos de meet & greet",
    ],
    cta: "HACERME VIP",
    highlight: true,
  },
];

export default function SuscripcionPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [selected, setSelected] = useState<"free" | "vip">("vip");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center space-y-8">
        <div className="w-20 h-20 bg-[#ffe600] flex items-center justify-center mx-auto">
          <Check size={36} className="text-[#080808]" />
        </div>
        <div>
          <h1 className="font-display text-5xl tracking-tight mb-3">¡BIENVENIDO!</h1>
          <p className="text-[#888] leading-relaxed">
            Ya eres parte de la familia OldFresco.
            {selected === "vip" && " Tu acceso VIP ya está activo."}
            {" "}Revisa tu email <span className="text-[#ffe600]">{email}</span> para confirmar.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-[#1e1e1e] bg-[#0d0d0d] py-24 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-end overflow-hidden pointer-events-none select-none">
          <span className="font-display text-[20vw] text-[#111] leading-none pr-10">VIP</span>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <p className="font-display text-[#ffe600] tracking-[0.3em] text-xs mb-4">MEMBRESÍA</p>
          <h1 className="font-display text-5xl md:text-7xl tracking-tight leading-none mb-6">
            ÚNETE A LA<br />
            <span className="text-[#ffe600]">FAMILIA.</span>
          </h1>
          <p className="text-[#888] max-w-lg leading-relaxed">
            Sé el primero en enterarte de nuevos shows, accede a preventas exclusivas y vive los conciertos desde otro nivel.
          </p>
        </div>
      </section>

      {/* Features */}
      <div className="border-b border-[#1e1e1e]">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1e1e1e]">
          {[
            { icon: <Bell size={24} />, title: "PREVENTA EXCLUSIVA", desc: "48 horas antes de que los tickets salgan al público." },
            { icon: <Zap size={24} />, title: "PRECIOS ESPECIALES", desc: "Descuentos en todos los tiers para miembros VIP." },
            { icon: <Star size={24} />, title: "EXPERIENCIAS ÚNICAS", desc: "Meet & greet, backstage y contenido exclusivo." },
          ].map((f) => (
            <div key={f.title} className="bg-[#080808] p-10 flex flex-col gap-3">
              <div className="text-[#ffe600]">{f.icon}</div>
              <h3 className="font-display tracking-widest text-sm">{f.title}</h3>
              <p className="text-[#888] text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Plans */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <p className="font-display text-[#ffe600] tracking-[0.3em] text-xs mb-3 text-center">PLANES</p>
        <h2 className="font-display text-4xl md:text-5xl text-center mb-12 tracking-tight">ELIGE TU NIVEL</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {plans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelected(plan.id as "free" | "vip")}
              className={`text-left border p-8 transition-all ${
                selected === plan.id
                  ? plan.highlight
                    ? "border-[#ffe600] bg-[#ffe600]/5"
                    : "border-[#f0ede8]"
                  : "border-[#2a2a2a] hover:border-[#444]"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-display text-2xl tracking-widest">{plan.name}</p>
                  <p className="text-[#888] text-sm mt-1">{plan.desc}</p>
                </div>
                {plan.highlight && (
                  <span className="bg-[#ffe600] text-[#080808] font-display text-xs tracking-widest px-2 py-1">
                    POPULAR
                  </span>
                )}
              </div>

              <p className={`font-display text-3xl mb-6 tracking-wider ${plan.highlight ? "text-[#ffe600]" : ""}`}>
                {plan.label}
              </p>

              <ul className="space-y-2">
                {plan.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2 text-sm text-[#888]">
                    <Check size={14} className={`mt-0.5 flex-shrink-0 ${plan.highlight ? "text-[#ffe600]" : "text-[#888]"}`} />
                    {perk}
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>

        {/* Signup form */}
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto border border-[#2a2a2a] p-8 space-y-5">
          <p className="font-display tracking-widest text-sm text-center mb-6">
            PLAN SELECCIONADO:{" "}
            <span className="text-[#ffe600]">{plans.find((p) => p.id === selected)?.name}</span>
          </p>

          <div>
            <label className="block font-display text-xs tracking-widest text-[#888] mb-2">NOMBRE</label>
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              className="w-full bg-[#141414] border border-[#2a2a2a] px-4 py-3 text-sm focus:outline-none focus:border-[#ffe600] transition-colors placeholder:text-[#444]"
            />
          </div>

          <div>
            <label className="block font-display text-xs tracking-widest text-[#888] mb-2">EMAIL</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="w-full bg-[#141414] border border-[#2a2a2a] px-4 py-3 text-sm focus:outline-none focus:border-[#ffe600] transition-colors placeholder:text-[#444]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#ffe600] text-[#080808] font-display tracking-widest py-4 hover:bg-white transition-colors flex items-center justify-center gap-3"
          >
            {plans.find((p) => p.id === selected)?.cta}
            <ArrowRight size={16} />
          </button>

          <p className="text-xs text-center text-[#444]">
            Sin compromisos. Cancela cuando quieras.
          </p>
        </form>
      </section>
    </div>
  );
}
