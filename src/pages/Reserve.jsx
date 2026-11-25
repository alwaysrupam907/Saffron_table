import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Check, Minus, Plus, Users } from "lucide-react";
import toast from "react-hot-toast";

const SLOTS = ["12:30 pm", "1:30 pm", "2:30 pm", "7:00 pm", "8:00 pm", "9:00 pm", "10:00 pm"];
const today = new Date().toISOString().split("T")[0];
const empty = { name: "", phone: "", date: "", time: "", guests: 2 };

export default function Reserve() {
  const [f, setF] = useState(empty);
  const [err, setErr] = useState("");
  const [done, setDone] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    if (f.name.trim().length < 2) return setErr("Enter your name.");
    if (!/^\d{10}$/.test(f.phone)) return setErr("Enter a 10-digit phone number.");
    if (!f.date) return setErr("Pick a date.");
    if (!f.time) return setErr("Choose a time slot.");
    setErr(""); setDone(true); toast.success("Table booked");
  };
  const field = "w-full rounded-xl border border-black/15 bg-white px-3 py-2.5 outline-none focus:border-saffron";
  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-2">
      <div>
        <h1 className="text-5xl font-extrabold">Book a table</h1>
        <p className="mt-3 max-w-sm text-ink/65">Choose a date, a time and how many people are coming. We’ll hold your table for 15 minutes.</p>
        <ul className="mt-8 space-y-3 text-ink/75">
          <li className="flex items-center gap-3"><CalendarDays className="text-saffron" /> Open daily, 12 pm to 11 pm</li>
          <li className="flex items-center gap-3"><Users className="text-saffron" /> Groups above 8, call us on xxxx</li>
        </ul>
      </div>
      {done ? (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="grid place-items-center rounded-3xl bg-wine p-10 text-center text-white">
          <div><div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-pista text-ink"><Check size={32} /></div>
            <h2 className="text-3xl font-bold">You’re booked, {f.name}.</h2>
            <p className="mt-2 text-white/75">Table for {f.guests} on {f.date} at {f.time}.</p>
            <button onClick={() => { setDone(false); setF(empty); }} className="mt-6 rounded-full bg-saffron px-6 py-2.5 font-bold text-ink">Book another</button></div>
        </motion.div>
      ) : (
        <form onSubmit={submit} noValidate className="space-y-4 rounded-3xl bg-white p-6 ring-1 ring-black/5">
          <input className={field} placeholder="Full name" aria-label="Full name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
          <input className={field} placeholder="Phone (10 digits)" aria-label="Phone" inputMode="numeric" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} />
          <input type="date" min={today} className={field} aria-label="Date" value={f.date} onChange={(e) => setF({ ...f, date: e.target.value })} />
          <div>
            <p className="mb-2 text-sm font-semibold">Time</p>
            <div className="flex flex-wrap gap-2">{SLOTS.map((s) => <button type="button" key={s} aria-pressed={f.time === s} onClick={() => setF({ ...f, time: s })} className={`rounded-full border px-3.5 py-1.5 text-sm font-semibold transition ${f.time === s ? "border-wine bg-wine text-white" : "border-black/15"}`}>{s}</button>)}</div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Guests</span>
            <div className="flex items-center gap-3">
              <button type="button" aria-label="Fewer guests" onClick={() => setF({ ...f, guests: Math.max(1, f.guests - 1) })} className="rounded-full border border-black/15 p-1.5"><Minus size={16} /></button>
              <span className="w-6 text-center font-bold">{f.guests}</span>
              <button type="button" aria-label="More guests" onClick={() => setF({ ...f, guests: Math.min(8, f.guests + 1) })} className="rounded-full border border-black/15 p-1.5"><Plus size={16} /></button>
            </div>
          </div>
          <p role="alert" className="min-h-5 text-sm text-red-600">{err}</p>
          <button className="w-full rounded-full bg-saffron py-3 font-bold text-ink transition active:scale-[0.98]">Reserve table</button>
        </form>
      )}
    </section>
  );
}
