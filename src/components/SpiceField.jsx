import { useEffect, useRef } from "react";
import FX from "../lib/fx";

export default function SpiceField() {
  const ref = useRef();
  useEffect(() => FX.particles(ref.current), []);
  return <canvas ref={ref} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />;
}
