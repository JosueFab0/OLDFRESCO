import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#0f0f0f] bg-[#080808]">
      {/* Bloque principal */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Brand */}
        <div className="md:col-span-2">
          <div className="flex items-end gap-4 mb-6">
            <span
              className="font-display leading-none text-white"
              style={{ fontSize: "clamp(48px, 8vw, 90px)", letterSpacing: "-0.02em" }}
            >
              OLD
            </span>
            <span
              className="font-display leading-none text-[#ffe600]"
              style={{ fontSize: "clamp(48px, 8vw, 90px)", letterSpacing: "-0.02em" }}
            >
              FRESCO
            </span>
          </div>
          <p className="text-[#444] text-sm leading-relaxed max-w-sm">
            Productora de conciertos en Costa Rica desde 2018. Los artistas urbanos más grandes, acá.
          </p>
          <div className="flex gap-4 mt-8">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-xs tracking-widest text-[#444] hover:text-[#ffe600] transition-colors"
            >
              IG
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-xs tracking-widest text-[#444] hover:text-[#ffe600] transition-colors"
            >
              TK
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-xs tracking-widest text-[#444] hover:text-[#ffe600] transition-colors"
            >
              YT
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-4">
          <p className="font-display text-[10px] tracking-[0.3em] text-[#333] mb-2">LINKS</p>
          {[
            { href: "/conciertos", label: "Shows" },
            { href: "/suscripcion", label: "VIP / Suscripción" },
            { href: "#", label: "Reembolsos" },
            { href: "#", label: "Contacto" },
          ].map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-[#555] hover:text-white transition-colors text-sm"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-[#0f0f0f] max-w-[1400px] mx-auto px-6 md:px-10 py-4 flex items-center justify-between gap-4">
        <p className="text-[#333] text-xs">© {year} OldFresco</p>
        <p className="text-[#333] text-xs">Costa Rica</p>
      </div>
    </footer>
  );
}
