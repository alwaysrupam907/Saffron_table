import Under from "./Under";

const INFO = [["Open daily", "12 pm to 11 pm"], ["Address", "xxx"], ["Phone", "xxxx"]];

export default function Story() {
  return (
    <section className="mx-auto max-w-4xl px-5 py-20 text-center">
      <h2 className="rv text-4xl font-extrabold md:text-6xl"><span className="relative inline-block">Cooked the slow way, since 2012.<Under /></span></h2>
      <p className="rv mx-auto mt-8 max-w-2xl text-lg text-ink/70">We grind our own spice blends each week, marinate for a full day and cook over charcoal. Nothing leaves the kitchen until the chef tastes it.</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {INFO.map(([t, v], k) => <div key={t} className="rv rounded-2xl bg-white p-4 ring-1 ring-black/5" style={{ animationDelay: k * 90 + "ms" }}><p className="font-bold">{t}</p><p className="text-sm text-ink/60">{v}</p></div>)}
      </div>
    </section>
  );
}
