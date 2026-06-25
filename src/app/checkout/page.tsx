"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/data";
import { ArrowLeft, CreditCard, Check, Lock } from "lucide-react";
import Link from "next/link";

type ActiveStep = "cart" | "info" | "payment";
type Step = ActiveStep | "success";

export default function CheckoutPage() {
  const { items, total, removeItem, updateQuantity, clearCart } = useCart();
  const [step, setStep] = useState<Step>("cart");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardName: "",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "info") setStep("payment");
    else if (step === "payment") {
      clearCart();
      setStep("success");
    }
  };

  const orderNum = "OF-" + Date.now().toString().slice(-6);

  if (step === "success") {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center space-y-8">
        <div className="w-20 h-20 bg-[#ffe600] flex items-center justify-center mx-auto">
          <Check size={36} className="text-[#080808]" />
        </div>
        <div>
          <h1 className="font-display text-5xl tracking-tight mb-3">¡LISTO!</h1>
          <p className="text-[#888] leading-relaxed">
            Tu orden <span className="text-[#ffe600] font-bold">#{orderNum}</span> ha sido confirmada.
            Recibirás tus tickets digitales en tu correo en los próximos minutos.
          </p>
        </div>
        <div className="border border-[#1e1e1e] p-6 text-left space-y-2">
          <p className="font-display tracking-widest text-xs text-[#888] mb-4">RESUMEN DE ORDEN</p>
          <div className="flex justify-between text-sm">
            <span className="text-[#888]">Número de orden</span>
            <span className="font-bold text-[#ffe600]">#{orderNum}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#888]">Email</span>
            <span>{form.email}</span>
          </div>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#ffe600] text-[#080808] font-display tracking-widest px-8 py-4 hover:bg-white transition-colors"
        >
          VOLVER AL INICIO
        </Link>
      </div>
    );
  }

  if (items.length === 0 && (step as string) !== "success") {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center space-y-6">
        <p className="font-display text-4xl tracking-tight text-[#444]">CARRITO VACÍO</p>
        <Link href="/conciertos" className="inline-flex items-center gap-2 border border-[#2a2a2a] font-display tracking-widest px-6 py-3 hover:border-[#ffe600] hover:text-[#ffe600] transition-colors text-sm">
          <ArrowLeft size={14} /> VER CONCIERTOS
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <Link href="/conciertos" className="inline-flex items-center gap-2 text-sm text-[#888] hover:text-[#ffe600] transition-colors mb-6 font-display tracking-widest">
          <ArrowLeft size={14} /> VOLVER
        </Link>
        <h1 className="font-display text-5xl tracking-tight">CHECKOUT</h1>
      </div>

      {/* Steps indicator */}
      <div className="flex items-center gap-4 mb-10">
        {(["cart", "info", "payment"] as ActiveStep[]).map((s, i) => (
          <div key={s} className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div
                className={`w-7 h-7 flex items-center justify-center font-display text-sm ${
                  step === s
                    ? "bg-[#ffe600] text-[#080808]"
                    : (["cart", "info", "payment"] as ActiveStep[]).indexOf(s) < (["cart", "info", "payment"] as ActiveStep[]).indexOf(step as ActiveStep)
                    ? "bg-[#2a2a2a] text-[#888]"
                    : "border border-[#2a2a2a] text-[#444]"
                }`}
              >
                {i + 1}
              </div>
              <span className={`font-display tracking-widest text-xs hidden sm:block ${step === s ? "text-[#ffe600]" : "text-[#444]"}`}>
                {s === "cart" ? "CARRITO" : s === "info" ? "TUS DATOS" : "PAGO"}
              </span>
            </div>
            {i < 2 && <div className="w-8 h-px bg-[#2a2a2a]" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Main */}
        <div className="lg:col-span-3">
          {step === "cart" && (
            <div className="space-y-4">
              <p className="font-display tracking-widest text-sm text-[#888] mb-6">TUS TICKETS</p>
              {items.map((item) => (
                <div key={`${item.concertId}-${item.tierId}`} className="border border-[#2a2a2a] p-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-display tracking-wider">{item.concertTitle}</p>
                    <p className="text-sm text-[#888]">{item.tierName} · {item.venue}</p>
                    <p className="text-xs text-[#888]">{item.concertDate}</p>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <p className="font-display text-[#ffe600] tracking-wider">{formatPrice(item.price * item.quantity)}</p>
                    <div className="flex items-center gap-3 border border-[#2a2a2a]">
                      <button onClick={() => updateQuantity(item.concertId, item.tierId, item.quantity - 1)} className="w-8 h-8 hover:text-[#ffe600] transition-colors">−</button>
                      <span className="w-6 text-center text-sm font-bold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.concertId, item.tierId, item.quantity + 1)} className="w-8 h-8 hover:text-[#ffe600] transition-colors">+</button>
                    </div>
                    <button onClick={() => removeItem(item.concertId, item.tierId)} className="text-xs text-[#444] hover:text-[#ff1f1f] transition-colors font-display tracking-widest">
                      ELIMINAR
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={() => setStep("info")}
                className="w-full bg-[#ffe600] text-[#080808] font-display tracking-widest py-4 hover:bg-white transition-colors mt-4"
              >
                CONTINUAR
              </button>
            </div>
          )}

          {step === "info" && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <p className="font-display tracking-widest text-sm text-[#888] mb-6">TUS DATOS</p>
              {[
                { name: "name", label: "NOMBRE COMPLETO", type: "text", placeholder: "María Rodríguez" },
                { name: "email", label: "EMAIL", type: "email", placeholder: "tu@email.com" },
                { name: "phone", label: "TELÉFONO", type: "tel", placeholder: "+506 8888-8888" },
              ].map((f) => (
                <div key={f.name}>
                  <label className="block font-display text-xs tracking-widest text-[#888] mb-2">{f.label}</label>
                  <input
                    required
                    type={f.type}
                    name={f.name}
                    value={form[f.name as keyof typeof form]}
                    onChange={handleInput}
                    placeholder={f.placeholder}
                    className="w-full bg-[#141414] border border-[#2a2a2a] px-4 py-3 text-sm focus:outline-none focus:border-[#ffe600] transition-colors placeholder:text-[#444]"
                  />
                </div>
              ))}
              <button type="submit" className="w-full bg-[#ffe600] text-[#080808] font-display tracking-widest py-4 hover:bg-white transition-colors mt-2">
                CONTINUAR AL PAGO
              </button>
            </form>
          )}

          {step === "payment" && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex items-center gap-2 mb-6">
                <Lock size={14} className="text-[#ffe600]" />
                <p className="font-display tracking-widest text-sm text-[#888]">PAGO SEGURO</p>
              </div>
              <div>
                <label className="block font-display text-xs tracking-widest text-[#888] mb-2">NÚMERO DE TARJETA</label>
                <div className="relative">
                  <input
                    required
                    type="text"
                    name="cardNumber"
                    value={form.cardNumber}
                    onChange={handleInput}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="w-full bg-[#141414] border border-[#2a2a2a] px-4 py-3 text-sm focus:outline-none focus:border-[#ffe600] transition-colors placeholder:text-[#444] pr-12"
                  />
                  <CreditCard size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#444]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-display text-xs tracking-widest text-[#888] mb-2">VENCIMIENTO</label>
                  <input required type="text" name="expiry" value={form.expiry} onChange={handleInput} placeholder="MM/AA" maxLength={5} className="w-full bg-[#141414] border border-[#2a2a2a] px-4 py-3 text-sm focus:outline-none focus:border-[#ffe600] transition-colors placeholder:text-[#444]" />
                </div>
                <div>
                  <label className="block font-display text-xs tracking-widest text-[#888] mb-2">CVV</label>
                  <input required type="text" name="cvv" value={form.cvv} onChange={handleInput} placeholder="123" maxLength={4} className="w-full bg-[#141414] border border-[#2a2a2a] px-4 py-3 text-sm focus:outline-none focus:border-[#ffe600] transition-colors placeholder:text-[#444]" />
                </div>
              </div>
              <div>
                <label className="block font-display text-xs tracking-widest text-[#888] mb-2">NOMBRE EN TARJETA</label>
                <input required type="text" name="cardName" value={form.cardName} onChange={handleInput} placeholder="MARIA RODRIGUEZ" className="w-full bg-[#141414] border border-[#2a2a2a] px-4 py-3 text-sm focus:outline-none focus:border-[#ffe600] transition-colors placeholder:text-[#444]" />
              </div>
              <button type="submit" className="w-full bg-[#ffe600] text-[#080808] font-display tracking-widest py-4 hover:bg-white transition-colors mt-2 flex items-center justify-center gap-3">
                <Lock size={14} /> PAGAR {formatPrice(total)}
              </button>
              <p className="text-xs text-center text-[#444]">Tus datos están protegidos con cifrado SSL de 256 bits</p>
            </form>
          )}
        </div>

        {/* Order summary */}
        <div className="lg:col-span-2">
          <div className="border border-[#1e1e1e] sticky top-20">
            <div className="bg-[#141414] px-6 py-4 border-b border-[#2a2a2a]">
              <p className="font-display tracking-widest text-sm text-[#888]">RESUMEN</p>
            </div>
            <div className="p-6 space-y-4">
              {items.map((item) => (
                <div key={`${item.concertId}-${item.tierId}`} className="flex justify-between text-sm">
                  <div>
                    <p className="font-medium">{item.concertTitle}</p>
                    <p className="text-[#888] text-xs">{item.tierName} × {item.quantity}</p>
                  </div>
                  <p className="font-display text-[#ffe600]">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
              <div className="border-t border-[#2a2a2a] pt-4 flex justify-between">
                <span className="text-[#888] text-sm">TOTAL</span>
                <span className="font-display text-2xl text-[#ffe600]">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
