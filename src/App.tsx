import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import PersonalityTest from "./pages/PersonalityTest";
import CharacterCreation from "./pages/CharacterCreation";
import CharacterDetail from "./pages/CharacterDetail";
import Adventure from "./pages/Adventure";
import NotFound from "./pages/NotFound";

// Creamos el QueryClient fuera del componente para evitar recreaciones en cada render
const queryClient = new QueryClient();

// Definimos el componente App como una función explícitamente
const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/personality" element={<PersonalityTest />} />
            <Route path="/character-creation" element={<CharacterCreation />} />
            <Route path="/character/:address" element={<CharacterDetail />} />
            <Route path="/adventure" element={<Adventure />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
