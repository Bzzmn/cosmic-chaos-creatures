import { useState, useEffect } from 'react';
import { CharacterType } from '@/components/CharacterCard';

// Mock character data with addresses
const mockCharacters: (CharacterType & { address: string })[] = [
  {
    name: "Zortblob",
    class: "Camarero Cuántico",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    stats: {
      quantumCharisma: 85,
      absurdityResistance: 70,
      sarcasmLevel: 92,
      timeWarping: 60,
      cosmicLuck: 78
    }
  },
  {
    name: "Blipzoid",
    class: "Psicólogo de Paradojas",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    address: "0x23F49454A17b387bd8DDfEdDB3C5665F0b2f0c33",
    stats: {
      quantumCharisma: 65,
      absurdityResistance: 95,
      sarcasmLevel: 72,
      timeWarping: 83,
      cosmicLuck: 60
    }
  },
  {
    name: "Quirkton",
    class: "Buceador de Agujeros Negros",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    address: "0x8C143CBa219Fde784246DaC873C5E13445298456",
    stats: {
      quantumCharisma: 78,
      absurdityResistance: 82,
      sarcasmLevel: 68,
      timeWarping: 90,
      cosmicLuck: 84
    }
  }
];

export interface LatestCharacter extends CharacterType {
  address: string;
}

export function useLatestCharacters() {
  const [characters, setCharacters] = useState<LatestCharacter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestCharacters = async () => {
      setLoading(true);
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In a real app, this would be an API call to get the latest characters
        // For now, we'll use mock data
        setCharacters(mockCharacters);
        setError(null);
      } catch (err) {
        console.error('Error fetching latest characters:', err);
        setError('Failed to load the latest characters');
      } finally {
        setLoading(false);
      }
    };

    fetchLatestCharacters();
  }, []);

  return { characters, loading, error };
} 