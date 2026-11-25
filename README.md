# Saffron Table (restaurant website, frontend only)

Built with React + Vite, React Router, Tailwind CSS, Framer Motion, Swiper, Zustand, Lucide icons and React Hot Toast.

## Run
```
npm install
npm run dev
```
Build: `npm run build` (deploy the `dist` folder on Vercel or Netlify).

## Features
- Swiper fade hero, signature-dish carousel and testimonials slider
- Parallax story section (Framer Motion scroll)
- Menu page: category tabs with animated pill, search, veg filter, sorting, animated grid
- Cart drawer (Zustand, saved in localStorage): quantities, taxes, delivery form, order confirmation
- Table reservation with time slots, guest stepper and validation
- Page transitions, toasts, responsive layout

## Photos
Images load from loremflickr by keyword and may not match perfectly. For real clients, add your own photos
to `src/assets/` and set `img` in `src/data/menu.js` and the slide/story images in `src/components/`.

## Dish photos
Put photos in `public/images/` using the file names listed in `public/images/README.txt`.
Missing photos fall back to a drawn illustration automatically.

## Effects
Effect code is in `src/lib/fx.js` (plain JavaScript and canvas, no animation library needed), the effect components are in `src/components/`.
- Spice particles that dodge your mouse (hero), rising steam and heat shimmer on the hero dish, rotating text badge
- 3D "lazy Susan" carousel of signature dishes (drag, flick or use the arrows): `Plates.jsx`
- "Can't decide?" spin-the-wheel that lands on a dish and bursts with spice confetti: `Wheel.jsx`
- Menu cards that flip over to show ingredients and heat level: `DishCard.jsx`
- Doodle underlines that draw themselves, sections that pop in on scroll (`rv` class, `draw` class)
- Spice burst when you add a dish to the order
