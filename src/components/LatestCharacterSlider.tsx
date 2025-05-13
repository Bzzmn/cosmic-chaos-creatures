import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLatestCharacters, LatestCharacter } from '@/hooks/useLatestCharacters';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import GalaxyCard from './GalaxyCard';
import { cn } from '@/lib/utils';

interface LatestCharacterSliderProps {
  className?: string;
}

const LatestCharacterSlider: React.FC<LatestCharacterSliderProps> = ({ 
  className 
}) => {
  const { characters, loading, error } = useLatestCharacters();
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  
  const handlePrevious = () => {
    if (characters.length === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? characters.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    if (characters.length === 0) return;
    setCurrentIndex((prev) => (prev === characters.length - 1 ? 0 : prev + 1));
  };
  
  const handleViewCharacter = (character: LatestCharacter) => {
    // Navigate to the character detail page with the character data
    navigate(`/character/${character.address}`, { state: { character } });
  };
  
  if (loading) {
    return (
      <div className={cn("max-w-3xl mx-auto py-8", className)}>
        <GalaxyCard className="p-8 text-center">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-cosmic-cyan animate-pulse" />
            <div className="w-4 h-4 rounded-full bg-cosmic-magenta animate-pulse delay-150" />
            <div className="w-4 h-4 rounded-full bg-cosmic-green animate-pulse delay-300" />
          </div>
          <p className="text-cosmic-cyan mt-4">Cargando personajes recientes...</p>
        </GalaxyCard>
      </div>
    );
  }
  
  if (error || characters.length === 0) {
    return (
      <div className={cn("max-w-3xl mx-auto py-8", className)}>
        <GalaxyCard className="p-8 text-center">
          <p className="text-cosmic-magenta">
            {error || "No hay personajes recientes para mostrar"}
          </p>
        </GalaxyCard>
      </div>
    );
  }
  
  const currentCharacter = characters[currentIndex];
  
  return (
    <div className={cn("max-w-3xl mx-auto py-8", className)}>
      <h3 className="text-2xl font-space font-medium text-cosmic-cyan text-center mb-6">
        Últimos Personajes Creados
      </h3>
      
      <div className="relative pb-6">
        <GalaxyCard 
          hasGlow 
          glowColor="magenta"
          className="p-6 transition-all duration-300"
        >
          <div className="flex flex-col md:flex-row gap-6">
            {/* Character Image */}
            <div className="w-full md:w-1/3 relative">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden border-2 border-cosmic-magenta/30">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
                <img 
                  src={currentCharacter.imageUrl} 
                  alt={currentCharacter.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="bg-black/60 backdrop-blur-sm mt-3 p-2 rounded border border-cosmic-cyan/20 break-all">
                <p className="text-xs text-cosmic-cyan font-mono">
                  {currentCharacter.address}
                </p>
              </div>
            </div>
            
            {/* Character Info */}
            <div className="flex-1 flex flex-col">
              <div className="mb-4">
                <h4 className="text-2xl font-bold text-cosmic-magenta mb-1">
                  {currentCharacter.name}
                </h4>
                <p className="text-cosmic-cyan font-medium">
                  {currentCharacter.class}
                </p>
              </div>
              
              <div className="flex-1 space-y-3">
                {Object.entries(currentCharacter.stats).map(([key, value]) => {
                  const formattedKey = key
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, str => str.toUpperCase());
                  
                  const getStatColor = (val: number) => {
                    if (val > 80) return 'bg-cosmic-green';
                    if (val > 60) return 'bg-cosmic-cyan';
                    if (val > 40) return 'bg-yellow-400';
                    if (val > 20) return 'bg-orange-500';
                    return 'bg-red-500';
                  };
                  
                  return (
                    <div key={key}>
                      <div className="flex justify-between text-xs mb-1">
                        <span>{formattedKey}</span>
                        <span>{value}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={cn("h-full rounded-full", getStatColor(value))}
                          style={{ width: `${value}%`, opacity: 0.7 }} 
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <button
                onClick={() => handleViewCharacter(currentCharacter)}
                className="mt-6 w-full px-4 py-2 bg-cosmic-dark border border-cosmic-cyan rounded-md hover:bg-cosmic-cyan/20 transition-colors flex items-center justify-center gap-2"
              >
                Ver Detalles
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          </div>
        </GalaxyCard>
        
        {/* Pagination dots */}
        <div className="flex justify-center mt-4 gap-2">
          {characters.map((_, index) => (
            <button 
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all",
                index === currentIndex 
                  ? "bg-cosmic-magenta scale-110" 
                  : "bg-cosmic-magenta/30 hover:bg-cosmic-magenta/50"
              )}
              aria-label={`Go to character ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Navigation arrows */}
        <button 
          onClick={handlePrevious}
          className="absolute top-1/2 -left-3 transform -translate-y-1/2 w-10 h-10 rounded-full bg-cosmic-dark border border-cosmic-cyan/30 flex items-center justify-center hover:bg-cosmic-cyan/20 transition-colors z-20"
          aria-label="Previous character"
        >
          <ArrowLeft className="h-5 w-5 text-cosmic-cyan" />
        </button>
        
        <button 
          onClick={handleNext}
          className="absolute top-1/2 -right-3 transform -translate-y-1/2 w-10 h-10 rounded-full bg-cosmic-dark border border-cosmic-cyan/30 flex items-center justify-center hover:bg-cosmic-cyan/20 transition-colors z-20"
          aria-label="Next character"
        >
          <ArrowRight className="h-5 w-5 text-cosmic-cyan" />
        </button>
      </div>
    </div>
  );
};

export default LatestCharacterSlider; 