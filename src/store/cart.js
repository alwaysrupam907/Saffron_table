import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCart = create(
  persist(
    (set) => ({
      items: [],
      open: false,
      setOpen: (open) => set({ open }),
      add: (d) =>
        set((s) => {
          const found = s.items.find((i) => i.id === d.id);
          return {
            items: found
              ? s.items.map((i) => (i.id === d.id ? { ...i, qty: i.qty + 1 } : i))
              : [...s.items, { id: d.id, name: d.name, price: d.price, img: d.img, qty: 1 }],
          };
        }),
      inc: (id) => set((s) => ({ items: s.items.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)) })),
      dec: (id) => set((s) => ({ items: s.items.map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i)).filter((i) => i.qty > 0) })),
      clear: () => set({ items: [] }),
    }),
    { name: "saffron-cart", partialize: (s) => ({ items: s.items }) }
  )
);
