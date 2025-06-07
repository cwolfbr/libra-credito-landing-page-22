import { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from '@/components/ScrollToTop';
import GlobalTracker from '@/components/GlobalTracker';
import { MobileOptimized } from '@/components/MobileOptimized';

// Lazy load components
const Index = lazy(() => import("./pages/Index"));
const Vantagens = lazy(() => import("./pages/Vantagens"));
const QuemSomos = lazy(() => import("./pages/QuemSomos"));
const Blog = lazy(() => import("./pages/Blog"));
const Parceiros = lazy(() => import("./pages/Parceiros"));
const Simulacao = lazy(() => import("./pages/Simulacao"));
const PoliticaPrivacidade = lazy(() => import("./pages/PoliticaPrivacidade"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const SupabaseTestPage = lazy(() => import("./pages/SupabaseTestPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const MobileDemo = lazy(() => import("./pages/MobileDemo"));
const MobileNavDemo = lazy(() => import("./pages/MobileNavDemo"));

const Loading = () => (
  <div className="w-full h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-libra-blue mx-auto mb-4"></div>
      <p>Carregando...</p>
    </div>
  </div>
);

// Configure query client
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <MobileOptimized>
        <BrowserRouter>
          <ScrollToTop />
          <GlobalTracker />
          <Toaster />
          <Sonner />
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/vantagens" element={<Vantagens />} />
              <Route path="/quem-somos" element={<QuemSomos />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/parceiros" element={<Parceiros />} />
              <Route path="/simulacao" element={<Simulacao />} />
              <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/test-supabase" element={<SupabaseTestPage />} />
              <Route path="/mobile-demo" element={<MobileDemo />} />
              <Route path="/mobile-nav" element={<MobileNavDemo />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </MobileOptimized>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
