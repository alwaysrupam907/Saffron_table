import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Star } from "lucide-react";
import Under from "./Under";

const REVIEWS = [
  { n: "Aarav M.", t: "The dum biryani is the best I have had in the city. The staff were warm and quick." },
  { n: "Priya S.", t: "We booked a table for my parents’ anniversary. Everything felt thoughtful, down to the dessert." },
  { n: "Rohan K.", t: "Dal makhani and garlic naan, every time. Fast delivery and still piping hot." },
  { n: "Neha T.", t: "Great vegetarian options that don’t feel like an afterthought. The paneer tikka is excellent." },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <h2 className="rv text-4xl font-extrabold md:text-5xl"><span className="relative inline-block">What guests say<Under /></span></h2>
      <Swiper modules={[Autoplay, Pagination]} autoplay={{ delay: 4500 }} pagination={{ clickable: true }} spaceBetween={18} slidesPerView={1} breakpoints={{ 768: { slidesPerView: 2 } }} className="!pb-12 pt-8">
        {REVIEWS.map((r) => (
          <SwiperSlide key={r.n} className="!h-auto">
            <figure className="h-full rounded-2xl bg-white p-6 ring-1 ring-black/5">
              <div className="mb-3 flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} className="fill-saffron text-saffron" />)}</div>
              <blockquote className="text-lg">{r.t}</blockquote>
              <figcaption className="mt-4 font-bold">{r.n}</figcaption>
            </figure>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
