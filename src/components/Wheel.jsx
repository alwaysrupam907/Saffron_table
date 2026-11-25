import { useRef, useState } from "react";
import FX from "../lib/fx";
import Pic from "./Pic";
import { inr } from "../data/menu";

// "Can't decide?" wheel: spins, slows down, lands on a dish, then bursts with spice confetti.
export default function Wheel({ dishes, add }) {
  const n = dishes.length, seg = 360 / n;
  const [rot, setRot] = useState(0), [busy, setBusy] = useState(false), [win, setWin] = useState(null);
  const box = useRef();
  const pt = (a, r) => [r * Math.sin((a * Math.PI) / 180), -r * Math.cos((a * Math.PI) / 180)];
  const arc = (i) => { const [x1, y1] = pt(i * seg, 96), [x2, y2] = pt((i + 1) * seg, 96); return `M0 0L${x1} ${y1}A96 96 0 0 1 ${x2} ${y2}Z`; };
  const spin = () => {
    if (busy) return;
    const k = Math.floor(Math.random() * n);
    const delta = 360 * 5 + ((360 - ((k * seg + seg / 2 + rot) % 360)) % 360);
    setBusy(true); setWin(null); setRot(rot + delta);
    setTimeout(() => {
      setBusy(false); setWin(dishes[k]);
      const r = box.current.getBoundingClientRect();
      FX.burst(r.left + r.width / 2, r.top + r.height / 2);
    }, 4700);
  };
  return (
    <div className="rv grid items-center gap-8 sm:grid-cols-2">
      <div ref={box} className="relative mx-auto aspect-square w-full max-w-sm">
        <div className="absolute left-1/2 top-[-8px] z-10 -translate-x-1/2" style={{ width: 0, height: 0, borderLeft: "14px solid transparent", borderRight: "14px solid transparent", borderTop: "26px solid #F5A524" }} />
        <svg viewBox="-100 -100 200 200" className="h-full w-full drop-shadow-xl" aria-hidden="true" style={{ transform: `rotate(${rot}deg)`, transition: busy ? "transform 4.6s cubic-bezier(.12,.7,.1,1)" : "none" }}>
          <circle r="99" fill="#F5A524" />
          {dishes.map((d, i) => (
            <g key={d.id}>
              <path d={arc(i)} fill={i % 2 ? "#2A1424" : "#4A1C3C"} stroke="#F5A524" strokeWidth="1" />
              <text transform={`rotate(${i * seg + seg / 2}) translate(0,-62)`} textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">{d.name.split(" ")[0]}</text>
            </g>
          ))}
          <circle r="14" fill="#F5A524" /><circle r="6" fill="#1E0F1C" />
        </svg>
      </div>
      <div className="text-center sm:text-left">
        <button onClick={spin} disabled={busy} className="rounded-full bg-saffron px-8 py-3.5 text-lg font-bold text-ink transition hover:brightness-110 active:scale-95 disabled:opacity-60">{busy ? "Spinning…" : win ? "Spin again" : "Spin the wheel"}</button>
        <div className="mt-6 min-h-[200px]">
          {win ? (
            <div className="rv in overflow-hidden rounded-2xl bg-white text-ink">
              <Pic d={win} h="h-32" />
              <div className="flex items-center justify-between gap-3 p-4">
                <div><h3 className="text-xl font-bold">{win.name}</h3><p className="text-sm text-ink/60">{inr(win.price)}</p></div>
                <button onClick={(e) => add(win, e.currentTarget)} className="rounded-full bg-wine px-4 py-2 text-sm font-semibold text-white transition hover:bg-saffron hover:text-ink active:scale-95">+ Add</button>
              </div>
            </div>
          ) : <p className="text-white/60">{busy ? "Choosing something delicious…" : "Tap the button and let the kitchen choose for you."}</p>}
        </div>
      </div>
    </div>
  );
}
