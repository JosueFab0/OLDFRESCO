import { sales, formatPrice } from "@/lib/data";

export default function AdminVentasPage() {
  const confirmed = sales.filter((s) => s.status === "confirmed");
  const totalRevenue = confirmed.reduce((s, o) => s + o.total, 0);
  const totalTickets = confirmed.reduce((s, o) => s + o.items.reduce((a, i) => a + i.quantity, 0), 0);

  return (
    <div className="p-8">
      <div className="mb-10">
        <p className="font-display text-[#ffe600] tracking-[0.3em] text-xs mb-2">GESTIÓN</p>
        <h1 className="font-display text-4xl tracking-tight">VENTAS</h1>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {[
          { label: "INGRESOS CONFIRMADOS", value: formatPrice(totalRevenue) },
          { label: "TICKETS VENDIDOS", value: totalTickets.toLocaleString() },
          { label: "ÓRDENES TOTALES", value: sales.length.toString() },
        ].map((s) => (
          <div key={s.label} className="bg-[#141414] border border-[#2a2a2a] p-6">
            <p className="font-display text-xs tracking-widest text-[#888] mb-3">{s.label}</p>
            <p className="font-display text-3xl text-[#ffe600]">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="border border-[#2a2a2a] overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead className="bg-[#141414]">
            <tr>
              {["ORDEN", "FECHA", "CLIENTE", "EVENTO", "ITEMS", "TOTAL", "ESTADO"].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-display text-xs tracking-widest text-[#888]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id} className="border-t border-[#1e1e1e] hover:bg-[#0d0d0d] transition-colors">
                <td className="px-4 py-4 font-display text-xs text-[#ffe600]">{sale.orderNumber}</td>
                <td className="px-4 py-4 text-xs text-[#888]">{sale.date}</td>
                <td className="px-4 py-4">
                  <p className="font-medium text-xs">{sale.customer}</p>
                  <p className="text-xs text-[#888]">{sale.email}</p>
                </td>
                <td className="px-4 py-4 text-xs text-[#888]">{sale.concertTitle}</td>
                <td className="px-4 py-4">
                  {sale.items.map((item, i) => (
                    <p key={i} className="text-xs text-[#888]">{item.tierName} × {item.quantity}</p>
                  ))}
                </td>
                <td className="px-4 py-4 font-display">{formatPrice(sale.total)}</td>
                <td className="px-4 py-4">
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
  );
}
