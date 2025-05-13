
import React from 'react';
import { cn } from '@/lib/utils';
import GalaxyCard from './GalaxyCard';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Star } from 'lucide-react';

export interface CharacterStats {
  quantumCharisma: number;
  absurdityResistance: number;
  sarcasmLevel: number;
  timeWarping: number;
  cosmicLuck: number;
}

export interface Artifact {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  effect: {
    stat: keyof CharacterStats;
    bonus: number;
    duration: number; // Number of adventures
  };
  isActive: boolean;
  remainingUses?: number;
}

export interface CharacterType {
  name: string;
  class: string;
  imageUrl: string;
  stats: CharacterStats;
  artifacts: (Artifact | null)[];
  experience?: number;
}

interface CharacterCardProps {
  character: CharacterType;
  className?: string;
  onActivateArtifact?: (index: number) => void;
}

const POINTS_PER_LEVEL = 10; // Every 10 points equals 1 level

const CharacterCard: React.FC<CharacterCardProps> = ({ 
  character, 
  className,
  onActivateArtifact
}) => {
  const getStatLevel = (points: number) => {
    return Math.floor(points / POINTS_PER_LEVEL);
  };
  
  const getStatColor = (points: number) => {
    const level = getStatLevel(points);
    if (level > 8) return 'text-cosmic-green';
    if (level > 6) return 'text-cosmic-cyan';
    if (level > 4) return 'text-yellow-400';
    if (level > 2) return 'text-orange-500';
    return 'text-red-500';
  };
  
  const renderStatBar = (points: number) => {
    const level = getStatLevel(points);
    const progress = (points % POINTS_PER_LEVEL) / POINTS_PER_LEVEL;
    
    return (
      <div className="flex items-center space-x-2">
        <div className="flex-grow">
          <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
            <div 
              className={cn("h-full rounded-full", getStatColor(points))}
              style={{ width: `${progress * 100}%`, opacity: 0.7 }} 
            />
          </div>
        </div>
        <div className={cn("text-sm font-medium", getStatColor(points))}>
          Lvl {level}
        </div>
      </div>
    );
  };

  const renderLevelStars = (points: number) => {
    const level = getStatLevel(points);
    const stars = [];
    
    for (let i = 0; i < level; i++) {
      stars.push(
        <Star 
          key={i} 
          className={cn("h-3 w-3 fill-current", getStatColor(points))} 
        />
      );
    }
    
    return (
      <div className="flex">
        {stars.length === 0 ? (
          <span className="text-xs text-gray-400">Nivel 0</span>
        ) : (
          stars
        )}
      </div>
    );
  };

  return (
    <GalaxyCard 
      className={cn("max-w-md w-full mx-auto", className)}
      hasGlow
      glowColor="cyan"
    >
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-cosmic-cyan mb-1">{character.name}</h2>
        <p className="text-cosmic-magenta font-medium">{character.class}</p>
      </div>
      
      <div className="relative w-full mb-6 rounded-lg overflow-hidden border-2 border-cosmic-cyan/30">
        <AspectRatio ratio={1/1}>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
          <img 
            src={character.imageUrl || "/placeholder.svg"} 
            alt={character.name}
            className="w-full h-full object-cover"
          />
        </AspectRatio>
      </div>
      
      <div className="space-y-3">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-semibold">Carisma Cuántico</span>
            {renderLevelStars(character.stats.quantumCharisma)}
          </div>
          {renderStatBar(character.stats.quantumCharisma)}
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-semibold">Resistencia al Absurdo</span>
            {renderLevelStars(character.stats.absurdityResistance)}
          </div>
          {renderStatBar(character.stats.absurdityResistance)}
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-semibold">Nivel de Sarcasmo</span>
            {renderLevelStars(character.stats.sarcasmLevel)}
          </div>
          {renderStatBar(character.stats.sarcasmLevel)}
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-semibold">Distorsión Temporal</span>
            {renderLevelStars(character.stats.timeWarping)}
          </div>
          {renderStatBar(character.stats.timeWarping)}
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-semibold">Suerte Cósmica</span>
            {renderLevelStars(character.stats.cosmicLuck)}
          </div>
          {renderStatBar(character.stats.cosmicLuck)}
        </div>
      </div>
      
      {/* Artifact Slots */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <h3 className="text-sm font-semibold mb-2">Artefactos Absurdos</h3>
        <div className="grid grid-cols-2 gap-2">
          {[0, 1, 2, 3].map((index) => (
            <div 
              key={index}
              onClick={() => {
                if (character.artifacts[index] && onActivateArtifact) {
                  onActivateArtifact(index);
                }
              }}
              className={cn(
                "border rounded-md aspect-square p-2 flex flex-col items-center justify-center text-center",
                character.artifacts[index] 
                  ? "border-cosmic-cyan/50 bg-black/30 cursor-pointer hover:bg-black/50 transition-colors" 
                  : "border-white/10 bg-black/10"
              )}
            >
              {character.artifacts[index] ? (
                <>
                  <div className="mb-1 text-xs font-medium text-cosmic-cyan truncate w-full">
                    {character.artifacts[index]?.name}
                  </div>
                  {character.artifacts[index]?.isActive ? (
                    <span className="text-[9px] bg-cosmic-green/20 text-cosmic-green px-1 rounded">
                      Activo
                    </span>
                  ) : (
                    <span className="text-[9px] text-white/40">
                      Haz clic para activar
                    </span>
                  )}
                </>
              ) : (
                <span className="text-xs text-white/30">Vacío</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </GalaxyCard>
  );
};

export default CharacterCard;
