import { concerts, formatPrice, formatDate } from "@/lib/data";
import { Plus, Edit, Eye } from "lucide-react";
import Link from "next/link";

export default function AdminConciertosPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="font-display text-[#ffe600] tracking-[0.3em] text-xs mb-2">GESTIÓN</p>
          <h1 className="font-display text-4xl tracking-tight">CONCIERTOS</h1>
        </div>
        <button className="flex items-center gap-2 bg-[#ffe600] text-[#080808] font-display tracking-widest px-5 py-3 text-sm hover:bg-white transition-colors">
          <Plus size={14} /> NUEVO EVENTO
        </button>
      </div>

      <div className="border border-[#2a2a2a] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#141414]">
            <tr>
              {["ARTISTA", "FECHA", "VENUE", "TIERS", "DISPONIBILIDAD", "ESTADO", ""].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-display text-xs tracking-widest text-[#888]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {concerts.map((c) => {
              const available = c.tiers.reduce((s, t) => s + t.available, 0);
              const total = c.tiers.reduce((s, t) => s + t.total, 0);
              const pct = Math.round(((total - available) / total) * 100);
              return (
                <tr key={c.id} className="border-t border-[#1e1e1e] hover:bg-[#0d0d0d] transition-colors">
                  <td className="px-4 py-4">
                    <p className="font-display tracking-wider">{c.artist}</p>
                    <p className="text-xs text-[#888] mt-0.5">{c.title}</p>
                  </td>
                  <td className="px-4 py-4 text-xs text-[#888] capitalize">{formatDate(c.date)}</td>
                  <td className="px-4 py-4 text-xs text-[#888]">{c.venue}, {c.city}</td>
                  <td className="px-4 py-4">
                    <div className="space-y-0.5">
                      {c.tiers.map((t) => (
                        <div key={t.id} className="flex items-center gap-2 text-xs">
                          <span className="text-[#888]">{t.name}</span>
                          <span className="text-[#ffe600] font-display">{formatPrice(t.price)}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="space-y-1 min-w-[100px]">
                      <div className="flex justify-between text-xs">
                        <span className="text-[#888]">{available.toLocaleString()} disp.</span>
                        <span className="font-display text-[#ffe600]">{pct}%</span>
                      </div>
                      <div className="h-1 bg-[#1e1e1e]">
                        <div className="h-full bg-[#ffe600]" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`font-display text-xs tracking-widest px-2 py-1 ${
                      c.soldOut ? "bg-[#ff1f1f]/10 text-[#ff1f1f]" :
                      c.featured ? "bg-[#ffe600]/10 text-[#ffe600]" :
                      "bg-[#2a2a2a] text-[#888]"
                    }`}>
                      {c.soldOut ? "AGOTADO" : c.featured ? "DESTACADO" : "ACTIVO"}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/conciertos/${c.slug}`} className="p-2 text-[#444] hover:text-[#ffe600] transition-colors">
                        <Eye size={14} />
                      </Link>
                      <button className="p-2 text-[#444] hover:text-[#ffe600] transition-colors">
                        <Edit size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
