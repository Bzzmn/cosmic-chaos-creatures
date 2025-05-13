import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import StarryBackground from '@/components/StarryBackground';
import CosmicParticles from '@/components/CosmicParticles';
import CosmicButton from '@/components/CosmicButton';
import NeonTitle from '@/components/NeonTitle';
import GalaxyCard from '@/components/GalaxyCard';
import TypewriterText from '@/components/TypewriterText';
import CharacterCard from '@/components/CharacterCard';
import CharactersProgressCard from '@/components/CharactersProgressCard';
import LatestCharacterSlider from '@/components/LatestCharacterSlider';
import { Sparkles, Coffee, BookOpen, Dices, Award, Rocket } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useAuth } from '@/hooks/useAuth';

const AdventureQuotes = [
  "¡Enfréntate a un camarero de cinco cabezas en el Bar Milliways!",
  "Discute sobre filosofía con un colchón inteligente de Squornshellous Zeta",
  "Huye de la Bestia Voraz de Traal sin una toalla",
  "Negocia con un Vogon para evitar que lea su poesía",
  "Descubre el significado de la vida, el universo y todo lo demás"
];

const Landing: React.FC = () => {
  const [showQuote, setShowQuote] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Sample character for preview
  const sampleCharacter = {
    name: "Zaphod Tralfamadoriano",
    class: "Astronauta Absurdo",
    imageUrl: "/placeholder.svg",
    stats: {
      quantumCharisma: 85,
      absurdityResistance: 70,
      sarcasmLevel: 92,
      timeWarping: 60,
      cosmicLuck: 78
    }
  };
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowQuote(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (typingComplete && quoteIndex < AdventureQuotes.length - 1) {
      const timer = setTimeout(() => {
        setQuoteIndex(prev => prev + 1);
        setTypingComplete(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [typingComplete, quoteIndex]);
  
  const handleCheckGalaxy = () => {
    toast.info("No hay otra cosa en el universo como el Restaurante del Fin del Mundo", {
      description: "¡Conecta tu wallet para acceder a la galaxia!",
      icon: <Coffee className="h-5 w-5" />,
    });
  };
  
  const handleShowCharacterPreview = () => {
    setShowPreview(true);
  };
  
  const handleStartAdventure = () => {
    if (isAuthenticated) {
      // If user is authenticated, go directly to personality test
      navigate('/personality');
    } else {
      // If not authenticated, go to auth page
      navigate('/auth');
    }
  };
  
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <StarryBackground />
      <CosmicParticles />
      
      {/* Main content */}
      <div className="max-w-5xl w-full mx-auto text-center z-10 space-y-12">
        <div className="space-y-6 animate-float">
          <div className="inline-block mb-2">
            <Sparkles className="inline-block h-8 w-8 text-cosmic-cyan" />
          </div>
          
          <NeonTitle variant="magenta" size="xl" className="mb-3">
            El Restaurante del Fin del Universo
          </NeonTitle>
          
          <h2 className="text-xl md:text-2xl font-space font-medium text-cosmic-cyan">
            🛸 Tu portal a aventuras cósmicamente absurdas
          </h2>
          
          {showQuote && (
            <div className="opacity-0 animate-[fade-in_1s_ease_forwards] mt-4 h-20">
              <TypewriterText
                text={AdventureQuotes[quoteIndex]}
                speed={40}
                className="text-lg md:text-xl italic text-cosmic-green font-space"
                onComplete={() => setTypingComplete(true)}
              />
            </div>
          )}
          
          <div className="max-w-2xl mx-auto opacity-0 animate-[fade-in_1.5s_ease_forwards] delay-500">
            <p className="text-white/80 px-4">
              Crea tu personaje galáctico, vive historias aleatorias generadas por IA y 
              embárcate en una travesía por los rincones más extraños del multiverso.
              ¿Estás listo para la aventura más ridículamente entretenida de tu vida?
            </p>
          </div>
        </div>
        
        <div className="flex flex-col items-center space-y-6">
          <CosmicButton 
            variant="primary" 
            size="lg" 
            className="animate-pulse-glow"
            onClick={handleStartAdventure}
          >
            <span className="text-xl">¡Comienza Tu Aventura!</span>
          </CosmicButton>
          
          <div className="flex gap-4 items-center">
            <button 
              onClick={handleShowCharacterPreview}
              className="text-cosmic-cyan hover:text-cosmic-magenta transition-colors underline underline-offset-4"
            >
              Ver ejemplo de personaje
            </button>
            
            <span className="text-white/40">•</span>
            
            <button 
              onClick={handleCheckGalaxy}
              className="text-cosmic-cyan hover:text-cosmic-magenta transition-colors underline underline-offset-4"
            >
              Explorar la galaxia
            </button>
          </div>
        </div>
        
        {/* Character Progress Card */}
        <div className="mt-8 animate-fade-in">
          <CharactersProgressCard />
        </div>
        
        {/* Latest Characters Slider - NEW SECTION */}
        <div className="mt-8 animate-fade-in">
          <LatestCharacterSlider />
        </div>
        
        {/* Testimonials Section */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
            <GalaxyCard hasGlow glowColor="cyan" className="transform hover:scale-105 transition-transform">
              <div className="text-center p-4">
                <p className="italic text-white/80">
                  "Mi personaje 'Marvin, el Optimista Depresivo' me llevó a través de 
                  una aventura con puertas existenciales. ¡5/5 estrellas! Le daría 6 
                  si hubiera tenido mejor servicio."
                </p>
                <p className="mt-3 text-cosmic-cyan">— Viajero Galáctico #42</p>
              </div>
            </GalaxyCard>
            
            <GalaxyCard hasGlow glowColor="magenta" className="transform hover:scale-105 transition-transform">
              <div className="text-center p-4">
                <p className="italic text-white/80">
                  "¡No hay nada más divertido que escapar de la policía intergaláctica 
                  mientras tu personaje intenta razonar con un sándwich parlante! 
                  Altamente improbable y totalmente recomendado."
                </p>
                <p className="mt-3 text-cosmic-magenta">— Ex-presidente de la Galaxia</p>
              </div>
            </GalaxyCard>
          </div>
        </div>
        
        {/* Adventure Steps */}
        <div className="mt-10">
          <h3 className="text-2xl font-space font-medium text-cosmic-green mb-8">Tu Viaje Interestelar</h3>
          
          <div className="flex flex-col md:flex-row gap-3 justify-center items-center md:items-start mb-10 px-4">
            <div className="flex flex-col items-center max-w-[200px]">
              <div className="w-14 h-14 bg-cosmic-magenta/20 rounded-full flex items-center justify-center mb-3">
                <Dices className="h-7 w-7 text-cosmic-magenta" />
              </div>
              <h4 className="font-space font-medium mb-1">Paso 1</h4>
              <p className="text-center text-sm text-white/70">Crea tu alter ego galáctico con un test de personalidad absurdo</p>
            </div>
            
            <div className="hidden md:block w-10 h-0.5 bg-cosmic-cyan/30 my-8" />
            
            <div className="flex flex-col items-center max-w-[200px]">
              <div className="w-14 h-14 bg-cosmic-cyan/20 rounded-full flex items-center justify-center mb-3">
                <BookOpen className="h-7 w-7 text-cosmic-cyan" />
              </div>
              <h4 className="font-space font-medium mb-1">Paso 2</h4>
              <p className="text-center text-sm text-white/70">Vive una aventura narrativa generada por inteligencia artificial</p>
            </div>
            
            <div className="hidden md:block w-10 h-0.5 bg-cosmic-cyan/30 my-8" />
            
            <div className="flex flex-col items-center max-w-[200px]">
              <div className="w-14 h-14 bg-cosmic-green/20 rounded-full flex items-center justify-center mb-3">
                <Award className="h-7 w-7 text-cosmic-green" />
              </div>
              <h4 className="font-space font-medium mb-1">Paso 3</h4>
              <p className="text-center text-sm text-white/70">Mintea tu personaje como NFT y llévalo al multiverso</p>
            </div>
          </div>
        </div>
        
        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <GalaxyCard className="transform hover:scale-105 transition-transform">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 flex items-center justify-center bg-cosmic-magenta/20 rounded-full mb-4">
                <Rocket className="h-6 w-6 text-cosmic-magenta" />
              </div>
              <h3 className="font-space font-medium text-lg mb-2">Aventura Cósmica</h3>
              <p className="text-sm text-white/70">Viaja por historias aleatorias y absurdas llenas de humor, aliens ridículos y situaciones imposibles</p>
            </div>
          </GalaxyCard>
          
          <GalaxyCard className="transform hover:scale-105 transition-transform">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 flex items-center justify-center bg-cosmic-cyan/20 rounded-full mb-4">
                <Sparkles className="h-6 w-6 text-cosmic-cyan" />
              </div>
              <h3 className="font-space font-medium text-lg mb-2">Personajes Únicos</h3>
              <p className="text-sm text-white/70">Recibe un alter ego con estadísticas absurdas e imagen generada por IA que se adapta a tu personalidad</p>
            </div>
          </GalaxyCard>
          
          <GalaxyCard className="transform hover:scale-105 transition-transform">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 flex items-center justify-center bg-cosmic-green/20 rounded-full mb-4">
                <Coffee className="h-6 w-6 text-cosmic-green" />
              </div>
              <h3 className="font-space font-medium text-lg mb-2">Llévalo al Multiverso</h3>
              <p className="text-sm text-white/70">Conserva tu personaje y todas sus aventuras como un NFT para la posteridad cósmica</p>
            </div>
          </GalaxyCard>
        </div>
      </div>
      
      <footer className="absolute bottom-4 text-center w-full text-xs text-white/50">
        Inspirado en la obra de Douglas Adams © {new Date().getFullYear()}
      </footer>

      {/* Character Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-md bg-cosmic-dark border-cosmic-cyan/30">
          <div className="py-4">
            <h3 className="text-xl font-space text-cosmic-cyan text-center mb-4">Personaje de Ejemplo</h3>
            <CharacterCard character={sampleCharacter} />
            <p className="text-center mt-6 text-sm text-white/70">
              Crea tu propio personaje y únete a la aventura más ridícula de la galaxia
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Landing;
