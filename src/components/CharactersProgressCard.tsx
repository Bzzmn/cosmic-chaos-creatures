
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Users } from 'lucide-react';
import GalaxyCard from './GalaxyCard';
import NeonTitle from './NeonTitle';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

// Mock API function to get character count
const getCharacterCount = () => {
  // For demonstration purposes, return a random number between 30-70
  return Math.floor(Math.random() * 40) + 30;
};

interface CharactersProgressCardProps {
  className?: string;
}

const CharactersProgressCard: React.FC<CharactersProgressCardProps> = ({ 
  className 
}) => {
  const [characterCount, setCharacterCount] = React.useState(0);
  const goal = 100; // Changed from 500 to 100
  
  React.useEffect(() => {
    // Simulate API call to get character count
    const count = getCharacterCount();
    setCharacterCount(count);
  }, []);
  
  const progressPercentage = Math.min(Math.round((characterCount / goal) * 100), 100);
  
  const handleInfoClick = () => {
    toast.info("¡Los Desarrolladores Cósmicos te necesitan!", {
      description: "Crea tu personaje para desbloquear la próxima aventura.",
    });
  };
  
  return (
    <GalaxyCard 
      className={cn("text-center py-8 px-6 max-w-3xl mx-auto", className)}
      hasGlow 
      glowColor="green"
    >
      <div className="relative">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 text-cosmic-cyan">
            <Users className="h-6 w-6" />
            <span className="text-xl font-space">Personajes Creados</span>
          </div>
        </div>
        
        <div className="mb-8 relative">
          <div className="flex justify-between mb-4">
            <div 
              className="text-3xl font-bold text-cosmic-green"
              style={{ 
                textShadow: `0 0 10px rgba(132, 204, 22, 0.7), 0 0 20px rgba(132, 204, 22, 0.5)` 
              }}
            >
              {characterCount} personajes
            </div>
            <div 
              className="text-2xl font-space text-cosmic-cyan"
              style={{ 
                textShadow: `0 0 8px rgba(6, 182, 212, 0.7), 0 0 16px rgba(6, 182, 212, 0.5)` 
              }}
            >
              Meta: {goal}
            </div>
          </div>
          
          <Progress 
            value={progressPercentage} 
            className="h-4 bg-cosmic-dark/60 rounded-full" 
          />
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-black/30 rounded-lg overflow-hidden h-40 flex items-center justify-center border border-white/10">
            <div className="text-white/50 text-sm">
              Placeholder para gráfico de personajes
            </div>
          </div>
          
          <div className="bg-black/30 rounded-lg overflow-hidden h-40 flex items-center justify-center border border-white/10">
            <div className="text-white/50 text-sm">
              Placeholder para imagen de desarrolladores
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <NeonTitle variant="green" size="sm" className="mb-2">
            Desarrolladores Cósmicos en Huelga
          </NeonTitle>
          
          <p className="text-white/80 text-sm md:text-base">
            Los Desarrolladores Cósmicos de Betelgeuse-5 se han declarado en huelga. 
            Sus tentáculos se niegan a tocar el teclado hasta que haya <span className="text-cosmic-cyan font-bold">{goal} personajes</span> en 
            nuestra base de datos galáctica.
          </p>
          
          <p className="text-white/80 text-sm">
            "Necesitamos la energía creativa de {goal} viajeros para activar nuestros cerebros cuánticos", 
            declaró su representante, un pulpo de 42 tentáculos que programa en 17 lenguajes simultáneamente.
          </p>
          
          <div className="bg-cosmic-dark/40 p-4 rounded-lg border border-cosmic-green/20 mt-4">
            <p className="text-cosmic-green italic text-sm md:text-base">
              Próxima actualización: <span className="font-bold">"Comienza la Aventura"</span> - 
              ¡Desbloqueable cuando alcancemos los {goal} personajes!
            </p>
          </div>
        </div>
      </div>
    </GalaxyCard>
  );
};

export default CharactersProgressCard;
