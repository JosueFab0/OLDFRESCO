import { subscribers } from "@/lib/data";
import { Crown } from "lucide-react";

export default function AdminSuscriptoresPage() {
  const vipCount = subscribers.filter((s) => s.plan === "vip").length;
  const freeCount = subscribers.filter((s) => s.plan === "free").length;

  return (
    <div className="p-8">
      <div className="mb-10">
        <p className="font-display text-[#ffe600] tracking-[0.3em] text-xs mb-2">GESTIÓN</p>
        <h1 className="font-display text-4xl tracking-tight">SUSCRIPTORES</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { label: "TOTAL", value: subscribers.length },
          { label: "VIP", value: vipCount },
          { label: "GRATIS", value: freeCount },
        ].map((s) => (
          <div key={s.label} className="bg-[#141414] border border-[#2a2a2a] p-6">
            <p className="font-display text-xs tracking-widest text-[#888] mb-3">{s.label}</p>
            <p className="font-display text-3xl text-[#ffe600]">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="border border-[#2a2a2a] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#141414]">
            <tr>
              {["NOMBRE", "EMAIL", "PLAN", "DESDE"].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-display text-xs tracking-widest text-[#888]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {subscribers.map((sub) => (
              <tr key={sub.id} className="border-t border-[#1e1e1e] hover:bg-[#0d0d0d] transition-colors">
                <td className="px-4 py-4 font-medium text-sm">{sub.name}</td>
                <td className="px-4 py-4 text-sm text-[#888]">{sub.email}</td>
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center gap-1.5 font-display text-xs tracking-widest px-2 py-1 ${
                    sub.plan === "vip" ? "bg-[#ffe600]/10 text-[#ffe600]" : "bg-[#2a2a2a] text-[#888]"
                  }`}>
                    {sub.plan === "vip" && <Crown size={10} />}
                    {sub.plan.toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-4 text-xs text-[#888]">{sub.subscribedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
