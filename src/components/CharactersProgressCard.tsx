
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Rocket, Users, Coffee } from 'lucide-react';
import GalaxyCard from './GalaxyCard';
import NeonTitle from './NeonTitle';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

// Mock API function to get character count
const getCharacterCount = () => {
  // For demonstration purposes, return a random number between 100-250
  return Math.floor(Math.random() * 150) + 100;
};

interface CharactersProgressCardProps {
  className?: string;
}

const CharactersProgressCard: React.FC<CharactersProgressCardProps> = ({ 
  className 
}) => {
  const [characterCount, setCharacterCount] = React.useState(0);
  const [isHovering, setIsHovering] = React.useState(false);
  const goal = 500;
  
  React.useEffect(() => {
    // Simulate API call to get character count
    const count = getCharacterCount();
    setCharacterCount(count);
  }, []);
  
  const progressPercentage = Math.min(Math.round((characterCount / goal) * 100), 100);
  
  const handleInfoClick = () => {
    toast.info("¡Los Desarrolladores Cósmicos te necesitan!", {
      description: "Crea tu personaje para desbloquear la próxima aventura.",
      icon: <Coffee className="h-5 w-5" />,
    });
  };
  
  return (
    <GalaxyCard 
      className={cn("text-center py-6 px-4 max-w-3xl mx-auto", className)}
      hasGlow 
      glowColor="green"
    >
      <div className="relative">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2 text-cosmic-cyan">
            <Users className="h-5 w-5" />
            <span className="text-lg font-space">Personajes Creados</span>
          </div>
          <div 
            className="bg-cosmic-dark/50 p-1.5 rounded-full cursor-pointer hover:bg-cosmic-purple/20 transition-colors"
            onClick={handleInfoClick}
          >
            <Coffee className="h-4 w-4 text-cosmic-green" />
          </div>
        </div>
        
        <div className="mb-6 relative">
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-cosmic-green font-bold">{characterCount} personajes</span>
            <span className="text-white/70">Meta: {goal}</span>
          </div>
          <Progress 
            value={progressPercentage} 
            className="h-3 bg-cosmic-dark/60" 
          />
          <div 
            className={cn(
              "absolute -right-2 -top-1 transition-all duration-300",
              isHovering ? "transform translate-y-[-5px]" : ""
            )}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <Rocket 
              className={cn(
                "h-6 w-6 text-cosmic-magenta",
                isHovering ? "animate-pulse" : ""
              )} 
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <NeonTitle variant="green" size="sm" className="mb-2">
            Desarrolladores Cósmicos en Huelga
          </NeonTitle>
          
          <p className="text-white/80 text-sm md:text-base">
            Los Desarrolladores Cósmicos de Betelgeuse-5 se han declarado en huelga. 
            Sus tentáculos se niegan a tocar el teclado hasta que haya <span className="text-cosmic-cyan font-bold">500 personajes</span> en 
            nuestra base de datos galáctica.
          </p>
          
          <p className="text-white/80 text-sm">
            "Necesitamos la energía creativa de 500 viajeros para activar nuestros cerebros cuánticos", 
            declaró su representante, un pulpo de 42 tentáculos que programa en 17 lenguajes simultáneamente.
          </p>
          
          <div className="bg-cosmic-dark/40 p-3 rounded-lg border border-cosmic-green/20 mt-4">
            <p className="text-cosmic-green italic text-sm">
              Próxima actualización: <span className="font-bold">"Comienza la Aventura"</span> - 
              ¡Desbloqueable cuando alcancemos los 500 personajes!
            </p>
          </div>
        </div>
      </div>
    </GalaxyCard>
  );
};

export default CharactersProgressCard;
