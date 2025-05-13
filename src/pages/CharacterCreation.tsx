
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import StarryBackground from '@/components/StarryBackground';
import CosmicParticles from '@/components/CosmicParticles';
import CosmicButton from '@/components/CosmicButton';
import NeonTitle from '@/components/NeonTitle';
import CharacterCard, { CharacterType, CharacterStats } from '@/components/CharacterCard';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

// Array of absurd character classes
const characterClasses = [
  "Camarero Cuántico",
  "Poeta del Caos",
  "Abogado Interdimensional",
  "Buceador de Agujeros Negros",
  "Crítico de Restaurantes Extintos",
  "Piloto de Bebidas",
  "Psicólogo de Paradojas",
  "Contador de Estrellas",
  "Bailarín de Cometas",
  "DJ de Ruido Cósmico",
  "Embajador del Absurdo",
  "Coleccionista de Momentos",
];

// Array of first name parts
const firstNames = [
  "Zap", "Blip", "Zort", "Bleep", "Frood", "Zax", "Quib", "Plim", "Vorp", 
  "Nib", "Glib", "Trax", "Zilch", "Blob", "Quirk", "Glip", "Flib", "Zim",
];

// Array of second name parts
const lastNames = [
  "tron", "blat", "glot", "frob", "wack", "oid", "zoid", "ston", "quax",
  "blob", "pop", "wiz", "fuzz", "bop", "plex", "ton", "tastic", "zap",
];

const placeholderImageUrl = "/placeholder.svg";
const characterImageUrls = [
  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
  "https://images.unsplash.com/photo-1518770660439-4636190af475",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
];

const CharacterCreation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState<boolean>(true);
  const [character, setCharacter] = useState<CharacterType | null>(null);
  
  useEffect(() => {
    // If we don't have answers, go back to test
    if (!location.state?.answers) {
      navigate("/personality");
      return;
    }
    
    const generateCharacter = async () => {
      setIsGenerating(true);
      
      // Simulate loading time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const answers = location.state?.answers || [];
      const questions = location.state?.questions || [];
      
      // Generate stats based on answers
      const stats: CharacterStats = {
        quantumCharisma: 20,
        absurdityResistance: 20,
        sarcasmLevel: 20,
        timeWarping: 20,
        cosmicLuck: 20,
      };
      
      // Process answers to modify stats
      answers.forEach((answerIndex: number, questionIndex: number) => {
        if (questions[questionIndex] && questions[questionIndex].options[answerIndex]) {
          const option = questions[questionIndex].options[answerIndex];
          const effectName = option.effect;
          const effectValue = option.value * 20; // Convert to percentage (1-4 becomes 20-80%)
          
          if (stats[effectName as keyof CharacterStats] !== undefined) {
            stats[effectName as keyof CharacterStats] += effectValue;
            
            // Cap at 100
            if (stats[effectName as keyof CharacterStats] > 100) {
              stats[effectName as keyof CharacterStats] = 100;
            }
          }
        }
      });
      
      // Generate random name
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const name = `${firstName}${lastName}`;
      
      // Generate random class
      const characterClass = characterClasses[Math.floor(Math.random() * characterClasses.length)];
      
      // Get random image from array
      const imageUrl = characterImageUrls[Math.floor(Math.random() * characterImageUrls.length)];
      
      // Create character
      const newCharacter: CharacterType = {
        name,
        class: characterClass,
        imageUrl,
        stats,
      };
      
      setCharacter(newCharacter);
      setIsGenerating(false);
      
      toast.success("¡Personaje cósmico generado con éxito!", {
        icon: <Sparkles className="h-5 w-5" />,
      });
    };
    
    generateCharacter();
  }, [location.state, navigate]);
  
  const handleBack = () => {
    navigate("/personality");
  };
  
  const handleContinue = () => {
    if (character) {
      navigate("/adventure", { state: { character } });
    }
  };
  
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <StarryBackground />
      <CosmicParticles />
      
      <div className="max-w-4xl w-full mx-auto z-10">
        <div className="mb-8 text-center">
          <NeonTitle variant="green" size="lg">Tu Personaje Cósmico</NeonTitle>
          <p className="text-white/70 mt-2">
            Basado en tus respuestas hemos creado un perfil único para tu aventura
          </p>
        </div>
        
        <div className="flex flex-col items-center justify-center min-h-[500px]">
          {isGenerating ? (
            <div className="text-center p-10">
              <div className="relative w-20 h-20 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full border-4 border-t-cosmic-magenta border-r-cosmic-cyan border-b-cosmic-green border-l-transparent animate-cosmic-spin"></div>
                <Sparkles className="absolute inset-0 m-auto h-8 w-8 text-white animate-pulse-glow" />
              </div>
              <p className="text-lg text-white/80">Generando tu identidad cósmica...</p>
            </div>
          ) : character ? (
            <div className="animate-[scale-in_0.5s_ease_forwards]">
              <CharacterCard character={character} />
            </div>
          ) : (
            <div className="text-center">
              <p className="text-lg text-red-400">Oops, algo salió mal en el generador de personajes.</p>
              <p className="mt-2">Por favor intenta nuevamente.</p>
            </div>
          )}
        </div>
        
        <div className="mt-8 flex justify-between">
          <CosmicButton variant="secondary" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </CosmicButton>
          
          {character && !isGenerating && (
            <CosmicButton variant="primary" onClick={handleContinue}>
              Iniciar Aventura
              <ArrowRight className="ml-2 h-4 w-4" />
            </CosmicButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterCreation;
