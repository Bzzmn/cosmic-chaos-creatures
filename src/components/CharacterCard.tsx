
import React from 'react';
import { cn } from '@/lib/utils';
import GalaxyCard from './GalaxyCard';

export interface CharacterStats {
  quantumCharisma: number;
  absurdityResistance: number;
  sarcasmLevel: number;
  timeWarping: number;
  cosmicLuck: number;
}

export interface CharacterType {
  name: string;
  class: string;
  imageUrl: string;
  stats: CharacterStats;
}

interface CharacterCardProps {
  character: CharacterType;
  className?: string;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, className }) => {
  const getStatColor = (value: number) => {
    if (value > 80) return 'text-cosmic-green';
    if (value > 60) return 'text-cosmic-cyan';
    if (value > 40) return 'text-yellow-400';
    if (value > 20) return 'text-orange-500';
    return 'text-red-500';
  };
  
  const renderStatBar = (value: number) => {
    return (
      <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
        <div 
          className={cn("h-full rounded-full", getStatColor(value))}
          style={{ width: `${value}%`, opacity: 0.7 }} 
        />
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
      
      <div className="relative w-full aspect-square mb-6 rounded-lg overflow-hidden border-2 border-cosmic-cyan/30">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
        <img 
          src={character.imageUrl || "/placeholder.svg"} 
          alt={character.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="space-y-3">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-semibold">Quantum Charisma</span>
            <span className={cn("text-sm", getStatColor(character.stats.quantumCharisma))}>
              {character.stats.quantumCharisma}%
            </span>
          </div>
          {renderStatBar(character.stats.quantumCharisma)}
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-semibold">Absurdity Resistance</span>
            <span className={cn("text-sm", getStatColor(character.stats.absurdityResistance))}>
              {character.stats.absurdityResistance}%
            </span>
          </div>
          {renderStatBar(character.stats.absurdityResistance)}
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-semibold">Sarcasm Level</span>
            <span className={cn("text-sm", getStatColor(character.stats.sarcasmLevel))}>
              {character.stats.sarcasmLevel}%
            </span>
          </div>
          {renderStatBar(character.stats.sarcasmLevel)}
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-semibold">Time Warping</span>
            <span className={cn("text-sm", getStatColor(character.stats.timeWarping))}>
              {character.stats.timeWarping}%
            </span>
          </div>
          {renderStatBar(character.stats.timeWarping)}
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-semibold">Cosmic Luck</span>
            <span className={cn("text-sm", getStatColor(character.stats.cosmicLuck))}>
              {character.stats.cosmicLuck}%
            </span>
          </div>
          {renderStatBar(character.stats.cosmicLuck)}
        </div>
      </div>
    </GalaxyCard>
  );
};

export default CharacterCard;
