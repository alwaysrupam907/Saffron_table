import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Plus, Minus, Check } from "lucide-react";
import toast from "react-hot-toast";
import Img from "./Img";
import { useCart } from "../store/cart";
import { inr } from "../data/menu";

export default function CartDrawer() {
  const { items, open, setOpen, inc, dec, clear } = useCart();
  const [step, setStep] = useState("cart");
  const [f, setF] = useState({ name: "", phone: "", address: "" });
  const [err, setErr] = useState("");
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const tax = Math.round(subtotal * 0.05);
  const close = () => { setOpen(false); setTimeout(() => setStep((s) => (s === "done" ? "cart" : s)), 300); };
  const place = (e) => {
    e.preventDefault();
    if (f.name.trim().length < 2) return setErr("Enter your name.");
    if (!/^\d{10}$/.test(f.phone)) return setErr("Enter a 10-digit phone number.");
    if (f.address.trim().length < 8) return setErr("Enter your delivery address.");
    setErr(""); clear(); setStep("done"); toast.success("Order placed");
  };
  const field = "w-full rounded-xl border border-black/15 px-3 py-2.5 outline-none focus:border-saffron";
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div key="scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close} className="fixed inset-0 z-50 bg-black/50" />
          <motion.aside key="drawer" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween", duration: 0.3 }} className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-paper p-5 shadow-2xl" aria-label="Your order">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-2xl font-bold">{step === "details" ? "Delivery details" : "Your order"}</h2>
              <button onClick={close} aria-label="Close" className="rounded-full p-2 hover:bg-black/5"><X /></button>
            </div>

            {step === "done" ? (
              <div className="grid flex-1 place-items-center text-center">
                <div><motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-pista"><Check size={32} /></motion.div>
                  <h3 className="text-2xl font-bold">Order placed</h3>
                  <p className="mt-1 text-ink/65">Thanks, {f.name}. Your food will arrive in about 35 minutes.</p>
                  <button onClick={close} className="mt-5 rounded-full bg-wine px-5 py-2.5 font-semibold text-white">Back to menu</button></div>
              </div>
            ) : items.length === 0 ? (
              <p className="flex-1 pt-10 text-center text-ink/60">Your order is empty. Add a dish from the menu.</p>
            ) : step === "cart" ? (
              <>
                <div className="flex-1 space-y-3 overflow-auto">
                  {items.map((i) => (
                    <motion.div layout key={i.id} className="flex items-center gap-3 rounded-xl bg-white p-2.5 ring-1 ring-black/5">
                      <Img src={i.img} alt={i.name} className="h-16 w-16 rounded-lg" />
                      <div className="flex-1"><p className="font-semibold leading-tight">{i.name}</p><p className="text-sm text-ink/60">{inr(i.price * i.qty)}</p></div>
                      <div className="flex items-center gap-2">
                        <button aria-label="Remove one" onClick={() => dec(i.id)} className="rounded-full border border-black/15 p-1"><Minus size={14} /></button>
                        <span className="w-5 text-center font-semibold">{i.qty}</span>
                        <button aria-label="Add one" onClick={() => inc(i.id)} className="rounded-full border border-black/15 p-1"><Plus size={14} /></button>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="space-y-1 border-t border-black/10 pt-3 text-sm">
                  <div className="flex justify-between"><span>Subtotal</span><span>{inr(subtotal)}</span></div>
                  <div className="flex justify-between"><span>Taxes (5%)</span><span>{inr(tax)}</span></div>
                  <div className="flex justify-between"><span>Delivery</span><span className="text-green-700">Free</span></div>
                  <div className="flex justify-between pt-1 text-lg font-bold"><span>Total</span><span>{inr(subtotal + tax)}</span></div>
                </div>
                <button onClick={() => setStep("details")} className="mt-3 rounded-full bg-saffron py-3 font-bold text-ink transition active:scale-[0.98]">Continue to delivery</button>
              </>
            ) : (
              <form onSubmit={place} noValidate className="flex flex-1 flex-col gap-3">
                <input className={field} placeholder="Full name" aria-label="Full name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
                <input className={field} placeholder="Phone (10 digits)" aria-label="Phone" inputMode="numeric" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} />
                <textarea className={field} rows={3} placeholder="Delivery address" aria-label="Delivery address" value={f.address} onChange={(e) => setF({ ...f, address: e.target.value })} />
                <p role="alert" className="min-h-5 text-sm text-red-600">{err}</p>
                <div className="mt-auto flex gap-2">
                  <button type="button" onClick={() => setStep("cart")} className="rounded-full border border-black/20 px-5 py-3 font-semibold">Back</button>
                  <button className="flex-1 rounded-full bg-saffron py-3 font-bold text-ink active:scale-[0.98]">Place order · {inr(subtotal + tax)}</button>
                </div>
              </form>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
