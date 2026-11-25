import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Search } from "lucide-react";
import DishCard from "../components/DishCard";
import { CATS, DISHES } from "../data/menu";

export default function Menu() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [veg, setVeg] = useState(false);
  const [sort, setSort] = useState("popular");
  const shown = useMemo(() => {
    const list = DISHES.filter((d) => (cat === "All" || d.cat === cat) && (!veg || d.veg) && d.name.toLowerCase().includes(q.toLowerCase()));
    if (sort === "low") list.sort((a, b) => a.price - b.price);
    if (sort === "high") list.sort((a, b) => b.price - a.price);
    if (sort === "popular") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [cat, q, veg, sort]);
  return (
    <section className="mx-auto max-w-6xl px-5 py-14">
      <h1 className="text-5xl font-extrabold">Our menu</h1>
      <p className="mt-2 text-ink/65">Cooked to order. Add dishes and check out from your order panel.</p>
      <LayoutGroup>
        <div className="mt-8 flex flex-wrap gap-2">
          {CATS.map((c) => (
            <button key={c} onClick={() => setCat(c)} className="relative rounded-full px-4 py-2 text-sm font-semibold">
              {cat === c && <motion.span layoutId="tab" className="absolute inset-0 rounded-full bg-wine" />}
              <span className={`relative ${cat === c ? "text-white" : "text-ink"}`}>{c}</span>
            </button>
          ))}
        </div>
      </LayoutGroup>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <label className="flex min-w-60 flex-1 items-center gap-2 rounded-full border border-black/15 bg-white px-4 py-2.5"><Search size={18} className="text-ink/50" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search dishes" aria-label="Search dishes" className="w-full bg-transparent outline-none" /></label>
        <button aria-pressed={veg} onClick={() => setVeg(!veg)} className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition ${veg ? "border-pista bg-pista" : "border-black/15 bg-white"}`}>Veg only</button>
        <select aria-label="Sort dishes" value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-full border border-black/15 bg-white px-4 py-2.5 text-sm font-semibold">
          <option value="popular">Top rated</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option>
        </select>
      </div>
      {shown.length === 0 ? <p className="py-16 text-center text-ink/60">No dishes match “{q}”. Try another word or clear the filters.</p> : (
        <motion.div layout className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">{shown.map((d) => <DishCard key={d.id} d={d} />)}</AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}
