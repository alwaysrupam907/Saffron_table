// Drawn illustrations used when a dish has no photo (or the photo fails to load).
export const DISH_ART = {
  "Smoked Tandoori Chicken": ["skewer", "#D9532B"],
  "Paneer Tikka": ["skewer", "#F0A12D"],
  "Dahi ke Kebab": ["patty", "#D8A25E"],
  "Dum Biryani": ["pot", "#E8B64B"],
  "Butter Chicken": ["curry", "#D9742B"],
  "Dal Makhani": ["curry", "#8A4A2B"],
  "Garlic Naan": ["naan", "#E6C48A"],
  "Saffron Pulao": ["rice", "#F2B632"],
  "Gulab Jamun": ["balls", "#8A3B1E"],
  "Rasmalai": ["balls", "#F3E6C8"],
  "Mango Lassi": ["glass", "#F5A524"],
  "Masala Chai": ["cup", "#B9784A"],
};

export default function DishArt({ kind, color }) {
  const s = "#2A1722";
  const bowl = <path d="M22 62h116c0 30-26 46-58 46S22 92 22 62z" fill="#F6EEE4" stroke={s} strokeWidth="3" />;
  const d = {
    skewer: (<><rect x="14" y="58" width="132" height="6" rx="3" fill="#C9A27A" />{[30, 54, 78, 102].map((x, i) => <rect key={x} x={x} y="40" width="22" height="40" rx="8" fill={i % 2 ? "#4F9A63" : color} stroke={s} strokeWidth="3" />)}</>),
    patty: (<><ellipse cx="80" cy="84" rx="64" ry="20" fill="#fff" stroke={s} strokeWidth="3" />{[44, 80, 116].map((x) => <circle key={x} cx={x} cy="66" r="21" fill={color} stroke={s} strokeWidth="3" />)}<circle cx="80" cy="80" r="7" fill="#4F9A63" /></>),
    pot: (<>{bowl}<path d="M30 62c8-38 28-48 50-48s42 10 50 48z" fill={color} stroke={s} strokeWidth="3" />{[[60, 40], [84, 32], [100, 48], [72, 52]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="3" fill="#D9532B" />)}</>),
    curry: (<>{bowl}<ellipse cx="80" cy="62" rx="58" ry="13" fill={color} stroke={s} strokeWidth="3" /><path d="M52 62c14-9 20 8 34-2s14 2 22-2" stroke="#FFF3E0" strokeWidth="4" fill="none" strokeLinecap="round" /></>),
    naan: (<><ellipse cx="80" cy="64" rx="66" ry="40" fill={color} stroke={s} strokeWidth="3" />{[[50, 52], [88, 44], [110, 70], [66, 80], [96, 88]].map(([x, y]) => <ellipse key={x} cx={x} cy={y} rx="6" ry="4" fill="#B98A3E" />)}<path d="M64 62l6 4M100 58l5-4" stroke="#4F9A63" strokeWidth="3" strokeLinecap="round" /></>),
    rice: (<>{bowl}<path d="M28 62c10-34 30-42 52-42s42 8 52 42z" fill={color} stroke={s} strokeWidth="3" />{[[56, 44], [78, 34], [100, 46], [86, 52], [66, 54]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="3" fill="#fff" opacity=".8" />)}</>),
    balls: (<><ellipse cx="80" cy="88" rx="66" ry="20" fill="#fff" stroke={s} strokeWidth="3" /><ellipse cx="80" cy="86" rx="52" ry="12" fill="#F2B632" opacity=".45" />{[48, 80, 112].map((x) => <g key={x}><circle cx={x} cy="68" r="21" fill={color} stroke={s} strokeWidth="3" /><ellipse cx={x - 6} cy="60" rx="6" ry="3.5" fill="#fff" opacity=".4" /></g>)}</>),
    glass: (<><path d="M50 12h60l-8 96H58z" fill="#fff" stroke={s} strokeWidth="3" /><path d="M54 36h52l-6 72H60z" fill={color} /><path d="M84 4l10 44" stroke="#D9532B" strokeWidth="5" strokeLinecap="round" /></>),
    cup: (<><g stroke="#9BB0A8" strokeWidth="3" strokeLinecap="round" fill="none" opacity=".7"><path d="M62 24c-6-8 6-12 0-20M82 24c-6-8 6-12 0-20" /></g><path d="M38 34h70l-6 62a12 12 0 0 1-12 10H56a12 12 0 0 1-12-10z" fill={color} stroke={s} strokeWidth="3" /><path d="M106 46c26-2 26 38-4 38" fill="none" stroke={s} strokeWidth="5" strokeLinecap="round" /></>),
  };
  return <svg viewBox="0 0 160 120" className="h-[82%] w-[72%] max-h-full transition duration-500" role="img" aria-hidden="true">{d[kind]}</svg>;
}
