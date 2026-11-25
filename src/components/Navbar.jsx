import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "../store/cart";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/reserve", label: "Reserve" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const count = useCart((s) => s.items.reduce((n, i) => n + i.qty, 0));
  const setCart = useCart((s) => s.setOpen);
  const cls = ({ isActive }) => `rounded-full px-4 py-2 text-sm font-semibold transition ${isActive ? "bg-saffron text-ink" : "text-white/85 hover:text-saffron"}`;
  return (
    <header className="sticky top-0 z-40 bg-wine/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="font-display text-2xl font-extrabold text-white">Saffron <span className="text-saffron">Table</span></Link>
        <nav className="hidden gap-1 md:flex">{links.map((l) => <NavLink key={l.to} to={l.to} className={cls} end>{l.label}</NavLink>)}</nav>
        <div className="flex items-center gap-2">
          <button onClick={() => setCart(true)} aria-label="Open order" className="relative rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20">
            <ShoppingBag size={20} />
            <AnimatePresence>
              {count > 0 && (
                <motion.span key={count} initial={{ scale: 0.4 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-saffron px-1 text-xs font-bold text-ink">{count}</motion.span>
              )}
            </AnimatePresence>
          </button>
          <button onClick={() => setOpen(!open)} aria-label="Toggle menu" className="rounded-full bg-white/10 p-2.5 text-white md:hidden">{open ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden md:hidden">
            <div className="flex flex-col gap-1 px-5 pb-4">{links.map((l) => <NavLink key={l.to} to={l.to} className={cls} end onClick={() => setOpen(false)}>{l.label}</NavLink>)}</div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
