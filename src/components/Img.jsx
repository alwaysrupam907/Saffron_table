import { useState } from "react";
import DishArt, { DISH_ART } from "./DishArt";

// Shows the photo. If it is missing or fails to load, shows a drawn picture of the dish
// (matched by the dish name in `alt`), or a plain colored panel for other images.
export default function Img({ src, alt, className = "" }) {
  const [bad, setBad] = useState(false);
  if (bad) {
    const art = DISH_ART[alt];
    if (art) {
      return (
        <div role="img" aria-label={alt} className={`grid place-items-center overflow-hidden ${className}`} style={{ background: `linear-gradient(135deg, ${art[1]}55, ${art[1]}18)` }}>
          <DishArt kind={art[0]} color={art[1]} />
        </div>
      );
    }
    return <div role="img" aria-label={alt} className={`bg-gradient-to-br from-saffron/50 to-wine/70 ${className}`} />;
  }
  return <img src={src} alt={alt} loading="lazy" onError={() => setBad(true)} className={`object-cover ${className}`} />;
}
