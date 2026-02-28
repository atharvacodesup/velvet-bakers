import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import HomePage from "@/pages/HomePage";
import NotFound from "@/pages/NotFound";

// Code-split heavier pages
const MenuPage = lazy(() => import("@/pages/MenuPage"));
const CustomOrderPage = lazy(() => import("@/pages/CustomOrderPage"));
const GalleryPage = lazy(() => import("@/pages/GalleryPage"));
const ReviewsPage = lazy(() => import("@/pages/ReviewsPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const FAQsPage = lazy(() => import("@/pages/FAQsPage"));
const CartPage = lazy(() => import("@/pages/CartPage"));

const queryClient = new QueryClient();

const Loading = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Header />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/custom-order" element={<CustomOrderPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faqs" element={<FAQsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
        <FloatingContact />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
