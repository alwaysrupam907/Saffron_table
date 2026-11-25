import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Plus } from "lucide-react";
import toast from "react-hot-toast";
import Img from "./Img";
import FX from "../lib/fx";
import { useCart } from "../store/cart";
import { inr } from "../data/menu";

// Flip card: hover (or tap on touch) turns it over to show the ingredients and heat level.
// The outer motion.article handles enter/exit; the inner .flip element handles the flip.
export default function DishCard({ d }) {
  const add = useCart((s) => s.add);
  const [on, setOn] = useState(false);
  const addIt = (e) => {
    e.stopPropagation();
    const r = e.currentTarget.getBoundingClientRect();
    FX.burst(r.left + r.width / 2, r.top + r.height / 2);
    add(d);
    toast.success(`${d.name} added`);
  };
  const btn = "flex items-center gap-1 rounded-full bg-wine px-3.5 py-1.5 text-sm font-semibold text-white transition hover:bg-saffron hover:text-ink active:scale-95";
  return (
    <motion.article layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}>
      <div className={"flip" + (on ? " on" : "")} onClick={() => setOn(!on)}>
        <div className="flip-in">
          <div className="face bg-white shadow-sm ring-1 ring-black/5">
            <div className="relative">
              <Img src={d.img} alt={d.name} className="h-44 w-full" />
              <span className={`absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-xs font-bold ${d.veg ? "bg-pista text-ink" : "bg-red-200 text-red-900"}`}>{d.veg ? "Veg" : "Non-veg"}</span>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-lg font-bold leading-tight">{d.name}</h3>
                <span className="flex items-center gap-1 text-sm font-semibold"><Star size={14} className="fill-saffron text-saffron" />{d.rating}</span>
              </div>
              <p className="mt-1 text-sm text-ink/65">{d.desc}</p>
              <div className="mt-3 flex items-center justify-between"><span className="font-bold">{inr(d.price)}</span><button onClick={addIt} className={btn}><Plus size={16} />Add</button></div>
              <p className="mt-2 text-xs text-ink/40">Hover or tap to flip</p>
            </div>
          </div>
          <div className="face back flex flex-col bg-wine p-5 text-white">
            <h3 className="text-xl font-bold">{d.name}</h3>
            <p className="mt-4 text-xs font-bold uppercase tracking-widest text-saffron">What’s inside</p>
            <div className="mt-2 flex flex-wrap gap-1.5">{d.ing.map((x) => <span key={x} className="rounded-full bg-white/10 px-2.5 py-1 text-xs">{x}</span>)}</div>
            <p className="mt-4 text-xs font-bold uppercase tracking-widest text-saffron">Heat</p>
            <div className="mt-1 flex gap-1">{[0, 1, 2].map((k) => <span key={k} className={k < d.spicy ? "" : "opacity-20"}>🔥</span>)}</div>
            <div className="mt-auto flex items-center justify-between"><span className="text-lg font-bold">{inr(d.price)}</span><button onClick={addIt} className={btn}><Plus size={16} />Add</button></div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
