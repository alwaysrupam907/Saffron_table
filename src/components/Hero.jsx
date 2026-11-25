import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import DishArt from "./DishArt";
import SpiceField from "./SpiceField";

const SLIDES = [
  { h: "Fire, smoke and saffron.", p: "A modern Indian grill where every dish starts in the clay oven.", art: "skewer", color: "#D9532B", bg: "from-[#3A1230] via-wine to-[#12080F]" },
  { h: "Biryani, sealed and slow.", p: "Dum-cooked in small batches, opened at your table.", art: "pot", color: "#E8B64B", bg: "from-[#4A2A10] via-[#2A1424] to-wine" },
  { h: "Dinner worth dressing up for.", p: "Warm lights, long tables and a kitchen that never rushes.", art: "balls", color: "#8A3B1E", bg: "from-[#2A1A40] via-wine to-[#12080F]" },
];

// Rising steam over the dish (CSS animated SVG paths).
const Steam = () => (
  <svg className="pointer-events-none absolute left-1/2 top-[-4%] h-1/2 w-1/2 -translate-x-1/2" viewBox="0 0 120 120" aria-hidden="true">
    {[30, 60, 90].map((x, k) => <path key={x} className="wisp" d={`M${x} 110c-14-18 14-32 0-50s14-32 0-50`} style={{ animationDelay: k * 0.8 + "s" }} />)}
  </svg>
);

// Slowly rotating text badge.
const Badge = () => (
  <svg className="spin-slow absolute bottom-10 right-6 z-10 hidden h-32 w-32 text-white md:block" viewBox="0 0 120 120" aria-hidden="true">
    <defs><path id="circ" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" /></defs>
    <text fill="currentColor" fontSize="10" fontWeight="700" letterSpacing="2.4"><textPath href="#circ">OPEN DAILY • COOKED SLOW •</textPath></text>
    <circle cx="60" cy="60" r="22" fill="#F5A524" /><text x="60" y="67" textAnchor="middle" fontSize="20">🔥</text>
  </svg>
);

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <Swiper modules={[Autoplay, EffectFade, Pagination]} effect="fade" loop pagination={{ clickable: true }} autoplay={{ delay: 5500, disableOnInteraction: false }} className="h-[86vh] min-h-[540px]">
        {SLIDES.map((s) => (
          <SwiperSlide key={s.h} className={`relative bg-gradient-to-br ${s.bg}`}>
            <div className="absolute right-[-60px] top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-saffron/15 blur-2xl md:right-10" />
            <div className="relative mx-auto grid h-full max-w-6xl items-center gap-6 px-5 md:grid-cols-2">
              <div className="text-white">
                <h1 className="max-w-md text-5xl font-extrabold leading-[1.02] md:text-7xl">{s.h}</h1>
                <p className="mt-4 max-w-md text-lg text-white/80">{s.p}</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link to="/menu" className="rounded-full bg-saffron px-6 py-3 font-bold text-ink transition hover:brightness-110 active:scale-95">Order online</Link>
                  <Link to="/reserve" className="rounded-full border border-white/60 px-6 py-3 font-semibold text-white transition hover:bg-white/10">Book a table</Link>
                </div>
              </div>
              <div className="relative hidden h-[340px] md:block">
                <div className="heat absolute inset-0 grid place-items-center"><DishArt kind={s.art} color={s.color} /></div>
                <Steam />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <SpiceField />
      <Badge />
    </section>
  );
}
