import { useEffect, useRef, useState } from "react";
import Pic from "./Pic";
import { inr } from "../data/menu";

// A 3D "lazy Susan": dishes sit on a ring you can drag, flick or step through with the arrows.
export default function Plates({ dishes, add }) {
  const n = dishes.length, step = 360 / n, R = 330;
  const ring = useRef(), cards = useRef([]), last = useRef(0);
  const s = useRef({ a: 0, vx: 0, down: false, x: 0, hover: false, target: null });
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf;
    const loop = () => {
      const o = s.current;
      if (!o.down) {
        if (o.target !== null) { o.a += (o.target - o.a) * 0.09; if (Math.abs(o.target - o.a) < 0.05) o.target = null; }
        else { o.a += o.vx; o.vx *= 0.94; if (!calm && !o.hover && Math.abs(o.vx) < 0.05) o.a -= 0.12; }
      }
      ring.current.style.transform = `translateZ(-${R}px) rotateY(${o.a}deg)`;
      cards.current.forEach((el, i) => { if (el) el.style.opacity = (0.25 + 0.75 * Math.max(0, Math.cos(((i * step + o.a) * Math.PI) / 180))).toFixed(2); });
      const k = ((Math.round(-o.a / step) % n) + n) % n;
      if (k !== last.current) { last.current = k; setIdx(k); }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  const o = s.current;
  const go = (d) => { o.target = (Math.round(-o.a / step) + d) * -step; o.vx = 0; };
  const cur = dishes[idx];
  const arrow = "h-11 w-11 rounded-full border border-black/20 text-xl transition hover:bg-wine hover:text-white active:scale-90";
  return (
    <div className="mt-10">
      <div className="relative mx-auto h-[330px] w-full max-w-3xl select-none" style={{ perspective: "1100px", touchAction: "pan-y", cursor: "grab" }}
        onPointerDown={(e) => { o.down = true; o.x = e.clientX; o.vx = 0; o.target = null; e.currentTarget.setPointerCapture(e.pointerId); }}
        onPointerMove={(e) => { if (!o.down) return; const dx = e.clientX - o.x; o.x = e.clientX; o.a += dx * 0.35; o.vx = dx * 0.35; }}
        onPointerUp={() => { o.down = false; }} onPointerCancel={() => { o.down = false; }}
        onMouseEnter={() => { o.hover = true; }} onMouseLeave={() => { o.hover = false; }}>
        <div ref={ring} className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
          {dishes.map((d, i) => (
            <div key={d.id} ref={(el) => (cards.current[i] = el)} className="absolute left-1/2 top-4 w-[210px]" style={{ marginLeft: -105, transform: `rotateY(${i * step}deg) translateZ(${R}px)`, backfaceVisibility: "hidden" }}>
              <div className="overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-black/5">
                <div className={i === idx ? "heat" : ""}><Pic d={d} h="h-44" /></div>
                <div className="p-3 text-center font-bold">{d.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 flex items-center justify-center gap-4">
        <button aria-label="Previous dish" onClick={() => go(-1)} className={arrow}>‹</button>
        <div className="w-64 text-center"><h3 className="text-2xl font-bold">{cur.name}</h3><p className="text-ink/60">{inr(cur.price)}</p></div>
        <button aria-label="Next dish" onClick={() => go(1)} className={arrow}>›</button>
      </div>
      <div className="mt-4 text-center">
        <button onClick={(e) => add(cur, e.currentTarget)} className="rounded-full bg-saffron px-6 py-3 font-bold text-ink transition hover:brightness-110 active:scale-95">+ Add to order</button>
      </div>
    </div>
  );
}
