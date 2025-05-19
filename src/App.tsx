
import { Suspense, lazy } from 'react';
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load components with prefetch
const Index = lazy(() => {
  // Prefetch Index dependencies while loading
  import("./components/Hero").catch(() => {});
  import("./components/Benefits").catch(() => {});
  return import("./pages/Index");
});
const NotFound = lazy(() => import("./pages/NotFound"));

const Loading = () => (
  <div className="w-full h-screen flex items-center justify-center" aria-label="Carregando conteúdo">
    <div className="space-y-4 w-full max-w-3xl px-4">
      <Skeleton className="h-12 w-3/4 mx-auto" />
      <Skeleton className="h-80 w-full" />
      <Skeleton className="h-20 w-full" />
    </div>
  </div>
);

// Configure query client with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 300 * 1000, // 5 minutes
      gcTime: 900 * 1000, // 15 minutes (previously cacheTime)
      retry: 1,
    }
  }
});

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<Loading />}>
            <main id="main-content" tabIndex={-1} className="focus:outline-none">
              <Routes>
                <Route path="/" element={<Index />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
