import { concerts, sales, subscribers, formatPrice } from "@/lib/data";
import { TrendingUp, Ticket, Users, Music } from "lucide-react";

export default function AdminDashboard() {
  const totalRevenue = sales.filter((s) => s.status === "confirmed").reduce((sum, s) => sum + s.total, 0);
  const totalTickets = sales.filter((s) => s.status === "confirmed").reduce((sum, s) => sum + s.items.reduce((a, i) => a + i.quantity, 0), 0);
  const vipCount = subscribers.filter((s) => s.plan === "vip").length;
  const upcomingCount = concerts.filter((c) => !c.soldOut).length;

  const stats = [
    { label: "INGRESOS TOTALES", value: formatPrice(totalRevenue), icon: <TrendingUp size={20} />, sub: "órdenes confirmadas" },
    { label: "TICKETS VENDIDOS", value: totalTickets.toLocaleString(), icon: <Ticket size={20} />, sub: "este período" },
    { label: "SUSCRIPTORES", value: subscribers.length.toLocaleString(), icon: <Users size={20} />, sub: `${vipCount} VIP activos` },
    { label: "SHOWS ACTIVOS", value: upcomingCount.toString(), icon: <Music size={20} />, sub: "con tickets disponibles" },
  ];

  return (
    <div className="p-8">
      <div className="mb-10">
        <p className="font-display text-[#ffe600] tracking-[0.3em] text-xs mb-2">PANEL DE CONTROL</p>
        <h1 className="font-display text-4xl tracking-tight">DASHBOARD</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-12">
        {stats.map((s) => (
          <div key={s.label} className="bg-[#141414] border border-[#2a2a2a] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <p className="font-display text-xs tracking-widest text-[#888]">{s.label}</p>
              <div className="text-[#ffe600]">{s.icon}</div>
            </div>
            <p className="font-display text-3xl tracking-wide text-[#ffe600]">{s.value}</p>
            <p className="text-xs text-[#444]">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Recent sales */}
      <div className="mb-10">
        <p className="font-display text-xs tracking-[0.3em] text-[#888] mb-4">VENTAS RECIENTES</p>
        <div className="border border-[#2a2a2a] overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#141414]">
              <tr>
                {["ORDEN", "CLIENTE", "EVENTO", "TOTAL", "ESTADO"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-display text-xs tracking-widest text-[#888]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <tr key={sale.id} className="border-t border-[#1e1e1e] hover:bg-[#0d0d0d] transition-colors">
                  <td className="px-4 py-3 font-display text-xs text-[#ffe600]">{sale.orderNumber}</td>
                  <td className="px-4 py-3">
                    <p>{sale.customer}</p>
                    <p className="text-xs text-[#888]">{sale.email}</p>
                  </td>
                  <td className="px-4 py-3 text-[#888] text-xs">{sale.concertTitle}</td>
                  <td className="px-4 py-3 font-display">{formatPrice(sale.total)}</td>
                  <td className="px-4 py-3">
                    <span className={`font-display text-xs tracking-widest px-2 py-1 ${
                      sale.status === "confirmed" ? "bg-[#ffe600]/10 text-[#ffe600]" :
                      sale.status === "pending" ? "bg-[#888]/10 text-[#888]" :
                      "bg-[#ff1f1f]/10 text-[#ff1f1f]"
                    }`}>
                      {sale.status === "confirmed" ? "CONFIRMADO" : sale.status === "pending" ? "PENDIENTE" : "REEMBOLSADO"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upcoming events quick view */}
      <div>
        <p className="font-display text-xs tracking-[0.3em] text-[#888] mb-4">PRÓXIMOS EVENTOS</p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {concerts.slice(0, 3).map((c) => {
            const sold = c.tiers.reduce((s, t) => s + (t.total - t.available), 0);
            const total = c.tiers.reduce((s, t) => s + t.total, 0);
            const pct = Math.round((sold / total) * 100);
            return (
              <div key={c.id} className="border border-[#2a2a2a] p-5 space-y-4">
                <div>
                  <p className="font-display tracking-wider">{c.artist}</p>
                  <p className="text-xs text-[#888]">{c.date} · {c.venue}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#888]">Vendido</span>
                    <span className="text-[#ffe600] font-display">{pct}%</span>
                  </div>
                  <div className="h-1.5 bg-[#1e1e1e]">
                    <div className="h-full bg-[#ffe600]" style={{ width: `${pct}%` }} />
                  </div>
                  <p className="text-xs text-[#444]">{sold.toLocaleString()} / {total.toLocaleString()} tickets</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
