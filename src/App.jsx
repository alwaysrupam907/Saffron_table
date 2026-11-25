import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import FX from "./lib/fx";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Reserve from "./pages/Reserve";

const Page = ({ children }) => (
  <motion.main initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
    {children}
  </motion.main>
);

export default function App() {
  const location = useLocation();
  useEffect(() => { FX.init(); }, []);
  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);
  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Page><Home /></Page>} />
          <Route path="/menu" element={<Page><Menu /></Page>} />
          <Route path="/reserve" element={<Page><Reserve /></Page>} />
          <Route path="*" element={<Page><p className="py-24 text-center text-xl">Page not found.</p></Page>} />
        </Routes>
      </AnimatePresence>
      <Footer />
      <CartDrawer />
      <Toaster position="bottom-center" toastOptions={{ duration: 1800 }} />
    </>
  );
}
