# 🍽️ Saffron Table

### A Modern Indian Dining Experience

Saffron Table is a visually rich, interactive restaurant website inspired by the warmth, flavours and atmosphere of modern Indian dining.

Built with React and Vite, the website combines immersive visual effects, interactive food discovery, menu browsing and a smooth ordering experience.

---

## ✨ Features

### 🏠 Homepage
- Full-screen animated hero slider.
- Floating spice particles and interactive visual effects.
- Animated steam and heat shimmer effects.
- Interactive 3D signature-dish carousel.
- Customer testimonials.
- Restaurant story section.

### 🍛 Interactive Menu
- Browse dishes by category.
- Search dishes.
- Vegetarian filter.
- Sorting options.
- Animated menu cards.
- Dish ingredients and spice-level information.

### 🛒 Shopping Cart
- Add and remove dishes.
- Update item quantities.
- Persistent cart using localStorage.
- Tax and delivery calculations.
- Order confirmation interface.

### 🎡 Interactive Experiences
- Spin-the-wheel dish selector.
- Spice confetti animations.
- Interactive 3D dish carousel.
- Animated section reveals.
- Custom visual effects.

### 📅 Table Reservations
- Guest selection.
- Reservation time slots.
- Form validation.
- Reservation confirmation interface.

### 📱 Responsive Design
- Mobile-friendly layouts.
- Smooth page transitions.
- Interactive navigation.
- Responsive animations and components.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend UI |
| Vite | Development and build tool |
| React Router | Client-side routing |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| Swiper | Interactive sliders |
| Zustand | State management |
| Lucide React | Icons |
| React Hot Toast | Notifications |
| HTML5 Canvas | Custom particle effects |

---

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm
- Git (optional for local development)

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
```

### 2. Navigate into the project

```bash
cd saffron-table
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL displayed in your terminal.

---

## 📦 Production Build

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

The production-ready files are generated inside:

```text
dist/
```

---

## 🌐 Deployment

The project can be deployed using platforms such as:

- Vercel
- Netlify

For Vercel:

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Select Vite as the framework preset.
4. Use `npm run build` as the build command.
5. Use `dist` as the output directory.
6. Deploy.

---

## 🎨 Custom Effects

Custom visual effects are implemented in:

```text
src/lib/fx.js
```

Effect components are located in:

```text
src/components/
```

These include:

- Floating spice particles.
- Spice confetti bursts.
- Rising steam animations.
- Heat shimmer effects.
- Scroll-triggered reveals.
- Animated decorative elements.

---

## 📁 Project Structure

```text
saffron-table/
│
├── public/
│   └── images/
│
├── src/
│   ├── components/
│   ├── data/
│   ├── lib/
│   ├── pages/
│   ├── store/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

---

## ⚠️ Project Notes

Saffron Table is currently a frontend-only demonstration project.

Cart, ordering and reservation interactions are implemented on the frontend. A production restaurant would require backend services for real order processing, payment integration and reservation management.

---

## 👨‍💻 Development

Contributions, suggestions and improvements are welcome.

---

**Saffron Table — Fire, flavour and unforgettable dining.**