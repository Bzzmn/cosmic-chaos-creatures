import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { LatestCharacter } from '@/hooks/useLatestCharacters';
import CharacterCard from '@/components/CharacterCard';
import CosmicButton from '@/components/CosmicButton';
import StarryBackground from '@/components/StarryBackground';
import CosmicParticles from '@/components/CosmicParticles';
import NeonTitle from '@/components/NeonTitle';
import { ArrowLeft, User, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

// Mock function to get character by address (in a real app, this would be an API call)
const getCharacterByAddress = async (address: string): Promise<LatestCharacter | null> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // For demo purposes, we're returning mock data
  const mockCharacters: LatestCharacter[] = [
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
  
  return mockCharacters.find(char => char.address === address) || null;
};

const CharacterDetail: React.FC = () => {
  const { address } = useParams<{ address: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<LatestCharacter | null>(
    (location.state?.character as LatestCharacter) || null
  );
  const [loading, setLoading] = useState(!character);
  const [copied, setCopied] = useState(false);
  
  useEffect(() => {
    const loadCharacter = async () => {
      if (!address) return;
      
      try {
        setLoading(true);
        // Try to load character if not passed in location state
        if (!character) {
          const loadedCharacter = await getCharacterByAddress(address);
          setCharacter(loadedCharacter);
        }
      } catch (error) {
        console.error('Error loading character:', error);
        toast.error('Error al cargar el personaje');
      } finally {
        setLoading(false);
      }
    };
    
    loadCharacter();
  }, [address, character]);
  
  const handleBack = () => {
    navigate('/');
  };
  
  const copyAddress = () => {
    if (!character) return;
    
    navigator.clipboard.writeText(character.address)
      .then(() => {
        setCopied(true);
        toast.success('Dirección copiada al portapapeles');
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        toast.error('Error al copiar la dirección');
      });
  };
  
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <StarryBackground />
      <CosmicParticles />
      
      <div className="max-w-4xl w-full mx-auto z-10">
        <div className="mb-8 flex items-center">
          <button 
            onClick={handleBack}
            className="p-2 rounded-full bg-cosmic-dark/50 hover:bg-cosmic-dark/80 transition-colors mr-4"
          >
            <ArrowLeft className="h-5 w-5 text-cosmic-cyan" />
          </button>
          
          <NeonTitle variant="cyan" size="lg">Detalles del Personaje</NeonTitle>
        </div>
        
        {loading ? (
          <div className="text-center p-10 bg-cosmic-dark/30 rounded-lg border border-cosmic-cyan/20">
            <div className="relative w-20 h-20 mx-auto mb-4">
              <div className="absolute inset-0 rounded-full border-4 border-t-cosmic-magenta border-r-cosmic-cyan border-b-cosmic-green border-l-transparent animate-cosmic-spin"></div>
              <User className="absolute inset-0 m-auto h-8 w-8 text-white animate-pulse-glow" />
            </div>
            <p className="text-lg text-white/80">Cargando personaje...</p>
          </div>
        ) : character ? (
          <div className="animate-[fade-in_0.5s_ease_forwards]">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/2">
                <CharacterCard character={character} />
                
                <div className="mt-5 bg-cosmic-dark p-4 rounded-lg border border-cosmic-cyan/20">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/60">Dirección del personaje:</span>
                    <button 
                      onClick={copyAddress}
                      className="flex items-center gap-1 text-cosmic-cyan hover:text-cosmic-magenta transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4" />
                          <span className="text-xs">Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          <span className="text-xs">Copiar</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="font-mono text-xs mt-1 break-all text-cosmic-green">
                    {character.address}
                  </p>
                </div>
              </div>
              
              <div className="lg:w-1/2 bg-cosmic-dark/30 p-6 rounded-lg border border-cosmic-magenta/20">
                <h3 className="text-xl font-space font-medium text-cosmic-magenta mb-4">
                  Historia del Personaje
                </h3>
                
                <p className="text-white/80 mb-4">
                  {character.name} es un {character.class.toLowerCase()} que deambula por los confines 
                  más extraños del universo conocido. Con una {character.stats.quantumCharisma}% de carisma cuántico, 
                  ha logrado salir de situaciones imposibles simplemente hablando en ecuaciones 
                  incomprensibles a sus captores.
                </p>
                
                <p className="text-white/80 mb-4">
                  Su resistencia al absurdo de {character.stats.absurdityResistance}% le permite mantener la 
                  cordura en las situaciones más ridículas, como aquella vez que tuvo que explicar 
                  a un robot la diferencia entre un pato y una plancha.
                </p>
                
                <p className="text-white/80">
                  Con un nivel de sarcasmo de {character.stats.sarcasmLevel}%, su especialidad es hacer 
                  comentarios mordaces sobre la inutilidad de los planes de conquista galáctica 
                  mientras disfruta de un martini de antimateria en el Bar del Fin del Universo.
                </p>
                
                <div className="mt-8">
                  <h4 className="text-lg font-space font-medium text-cosmic-cyan mb-3">
                    Aventuras Pasadas
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-cosmic-dark/50 rounded border border-cosmic-cyan/10">
                      <p className="text-sm text-cosmic-cyan">El incidente del sandwich multidimensional</p>
                      <p className="text-xs text-white/60 mt-1">
                        Una aventura donde {character.name} tuvo que resolver un conflicto 
                        entre dos especies alienígenas que se disputaban la receta original.
                      </p>
                    </div>
                    
                    <div className="p-3 bg-cosmic-dark/50 rounded border border-cosmic-cyan/10">
                      <p className="text-sm text-cosmic-cyan">La paradoja del pianista invisible</p>
                      <p className="text-xs text-white/60 mt-1">
                        {character.name} descubrió que la música más bella del universo 
                        es la que no se puede escuchar, pero se puede sentir en el vacío del espacio.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <CosmicButton variant="primary" className="w-full" onClick={() => navigate('/adventure', { state: { character } })}>
                    Continuar la Aventura
                  </CosmicButton>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center p-10 bg-cosmic-dark/30 rounded-lg border border-cosmic-cyan/20">
            <p className="text-lg text-cosmic-magenta">Personaje no encontrado</p>
            <p className="text-white/60 mt-2">El personaje que buscas no existe o ha sido abducido por alienígenas</p>
            <CosmicButton variant="secondary" className="mt-6" onClick={handleBack}>
              Volver al Inicio
            </CosmicButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterDetail; 