import Img from "./Img";

// Shows the dish photo (public/images/...) or, if it is missing, the drawn illustration.
export default function Pic({ d, h = "h-44" }) {
  return <Img src={d.img} alt={d.name} className={`${h} w-full`} />;
}
