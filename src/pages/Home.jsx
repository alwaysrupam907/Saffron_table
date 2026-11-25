import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Hero from "../components/Hero";
import Plates from "../components/Plates";
import Wheel from "../components/Wheel";
import Under from "../components/Under";
import Story from "../components/Story";
import Testimonials from "../components/Testimonials";
import FX from "../lib/fx";
import { useCart } from "../store/cart";
import { DISHES } from "../data/menu";

const pick = (ids) => ids.map((id) => DISHES.find((d) => d.id === id));
const SIG = pick([4, 1, 5, 9, 2, 7]);
const WHEEL = pick([1, 2, 4, 5, 6, 9, 11, 12]);

export default function Home() {
  // Adds a dish to the cart with a spice burst where the button was clicked.
  const add = (d, el) => {
    if (el) { const r = el.getBoundingClientRect(); FX.burst(r.left + r.width / 2, r.top + r.height / 2); }
    useCart.getState().add(d);
    toast.success(`${d.name} added`);
  };
  return (
    <>
      <Hero />
      <section className="mx-auto max-w-6xl overflow-hidden px-5 py-20">
        <h2 className="rv text-4xl font-extrabold md:text-6xl"><span className="relative inline-block">Signature dishes<Under /></span></h2>
        <p className="rv mt-4 max-w-md text-ink/65">Drag the table to spin it, or use the arrows.</p>
        <Plates dishes={SIG} add={add} />
      </section>
      <section className="bg-wine py-20 text-white">
        <div className="mx-auto max-w-5xl px-5">
          <h2 className="rv text-4xl font-extrabold md:text-6xl"><span className="relative inline-block">Can’t decide?<Under /></span></h2>
          <p className="rv mb-10 mt-4 max-w-md text-white/70">Spin the wheel and let the kitchen choose.</p>
          <Wheel dishes={WHEEL} add={add} />
        </div>
      </section>
      <Story />
      <Testimonials />
      <section className="px-5 pb-20">
        <div className="rv mx-auto max-w-6xl rounded-3xl bg-saffron p-10 text-center">
          <h2 className="text-4xl font-extrabold">Tables fill up on weekends.</h2>
          <p className="mx-auto mt-2 max-w-md">Reserve in under a minute and we’ll hold your table for 15 minutes.</p>
          <Link to="/reserve" onClick={(e) => FX.burst(e.clientX, e.clientY)} className="mt-6 inline-block rounded-full bg-wine px-7 py-3 font-bold text-white transition active:scale-95">Book a table</Link>
        </div>
      </section>
    </>
  );
}
