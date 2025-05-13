
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import StarryBackground from '@/components/StarryBackground';
import CosmicParticles from '@/components/CosmicParticles';
import CosmicButton from '@/components/CosmicButton';
import NeonTitle from '@/components/NeonTitle';
import GalaxyCard from '@/components/GalaxyCard';
import { Rocket, Sparkles, Coffee } from 'lucide-react';

const Landing: React.FC = () => {
  const [showQuote, setShowQuote] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowQuote(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleCheckGalaxy = () => {
    toast.info("No hay otra cosa en el universo como el Restaurante del Fin del Mundo", {
      description: "¡Conecta tu wallet para acceder a la galaxia!",
      icon: <Coffee className="h-5 w-5" />,
    });
  };
  
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <StarryBackground />
      <CosmicParticles />
      
      {/* Main content */}
      <div className="max-w-4xl w-full mx-auto text-center z-10 space-y-12">
        <div className="space-y-6 animate-float">
          <div className="inline-block mb-2">
            <Rocket className="inline-block h-12 w-12 text-cosmic-magenta mr-2" />
            <Sparkles className="inline-block h-8 w-8 text-cosmic-cyan" />
          </div>
          
          <NeonTitle variant="magenta" size="xl" className="mb-3">
            El Restaurante del Fin del Universo
          </NeonTitle>
          
          <h2 className="text-xl md:text-2xl font-space font-medium text-cosmic-cyan">
            🛸 Crea tu alter ego cósmico y conquista lo absurdo
          </h2>
          
          {showQuote && (
            <div className="opacity-0 animate-[fade-in_1s_ease_forwards]">
              <p className="italic text-white/80 max-w-2xl mx-auto">
                "El Restaurante del Fin del Universo es una de las más extraordinarias creaciones 
                en toda la historia de la industria de servicios."
              </p>
              <p className="mt-2 text-cosmic-green font-space">– Guía del Autoestopista Galáctico</p>
            </div>
          )}
        </div>
        
        <div className="flex flex-col items-center space-y-4">
          <Link to="/personality">
            <CosmicButton variant="primary" size="lg">
              <span className="text-xl">¡Llévame al Caos!</span>
            </CosmicButton>
          </Link>
          
          <button 
            onClick={handleCheckGalaxy}
            className="text-white/70 underline underline-offset-4 hover:text-cosmic-cyan transition-colors"
          >
            Explorar la galaxia
          </button>
        </div>
        
        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <GalaxyCard>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 flex items-center justify-center bg-cosmic-magenta/20 rounded-full mb-4">
                <Rocket className="h-6 w-6 text-cosmic-magenta" />
              </div>
              <h3 className="font-space font-medium text-lg mb-2">Aventura Cósmica</h3>
              <p className="text-sm text-white/70">Viaja por historias aleatorias y absurdas generadas por IA</p>
            </div>
          </GalaxyCard>
          
          <GalaxyCard>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 flex items-center justify-center bg-cosmic-cyan/20 rounded-full mb-4">
                <Sparkles className="h-6 w-6 text-cosmic-cyan" />
              </div>
              <h3 className="font-space font-medium text-lg mb-2">Personajes Únicos</h3>
              <p className="text-sm text-white/70">Genera tu alter ego con estadísticas absurdas e imágenes generadas por IA</p>
            </div>
          </GalaxyCard>
          
          <GalaxyCard>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 flex items-center justify-center bg-cosmic-green/20 rounded-full mb-4">
                <Coffee className="h-6 w-6 text-cosmic-green" />
              </div>
              <h3 className="font-space font-medium text-lg mb-2">Llévalo al Multiverso</h3>
              <p className="text-sm text-white/70">Mintea tu personaje como un NFT para la posteridad cósmica</p>
            </div>
          </GalaxyCard>
        </div>
      </div>
      
      <footer className="absolute bottom-4 text-center w-full text-xs text-white/50">
        Inspirado en la obra de Douglas Adams © {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default Landing;
