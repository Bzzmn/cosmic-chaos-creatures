
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import StarryBackground from '@/components/StarryBackground';
import CosmicParticles from '@/components/CosmicParticles';
import CosmicButton from '@/components/CosmicButton';
import NeonTitle from '@/components/NeonTitle';
import GalaxyCard from '@/components/GalaxyCard';
import TypewriterText from '@/components/TypewriterText';
import CharacterCard from '@/components/CharacterCard';
import { ArrowLeft, ArrowRight, Star, Rocket, Zap } from 'lucide-react';

interface StoryStep {
  narrative: string;
  options: {
    text: string;
    outcome: string;
    nextStep: number;
    icon: React.ReactNode;
  }[];
}

const Adventure: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [showOutcome, setShowOutcome] = useState<string | null>(null);
  const [storyComplete, setStoryComplete] = useState<boolean>(false);
  const character = location.state?.character;
  
  // Check if we have a character
  useEffect(() => {
    if (!character) {
      navigate('/personality');
    }
  }, [character, navigate]);
  
  // Story content - would ideally come from an API/generator
  const storySteps: StoryStep[] = [
    {
      narrative: `Te despiertas en una nave espacial con destino al Restaurante del Fin del Universo. El capitán anuncia que tendremos que hacer un pequeño desvío por un agujero de gusano. De repente, las luces parpadean y suena una alarma. "Pasajeros, mantengan la calma", dice una voz robótica, "Estamos experimentando dificultades técnicas..."`,
      options: [
        {
          text: "Ofrecer ayuda al capitán",
          outcome: `Te diriges al puente. El capitán, un pingüino con traje espacial, te mira sorprendido: "Oh, ${character?.name}, ¡justo a tiempo! Necesitamos un ${character?.class} con urgencia." Te entrega un destornillador cuántico y señala una consola llena de botones parpadeantes.`,
          nextStep: 1,
          icon: <Rocket className="h-5 w-5" />
        },
        {
          text: "Quedarte en tu asiento y pedir otra bebida",
          outcome: `Pides otra Gargleblaster Pangaláctico. El camarero robot te trae uno y dice: "La última bebida antes del fin... temporal del viaje". Mientras bebes, la nave da un giro inesperado y terminas flotando por el pasillo central para diversión de los otros pasajeros.`,
          nextStep: 2,
          icon: <Zap className="h-5 w-5" />
        }
      ]
    },
    {
      narrative: `Tienes el destornillador cuántico en la mano mientras el pingüino-capitán observa nervioso. "Necesitamos reconectar el motor de improbabilidad antes de que nos quedemos atrapados en la dimensión de los jueves eternos", te explica. La consola tiene dos cables sueltos: uno azul brillante y otro rosa fosforescente.`,
      options: [
        {
          text: "Conectar el cable azul al puerto principal",
          outcome: `Conectas el cable azul. La nave vibra, las luces cambian a un tono púrpura, y por un momento todos a bordo se transforman en pequeñas salamandras cantantes antes de volver a la normalidad. El capitán aplaude con sus aletas: "¡Brillante! Hemos tomado un atajo interdimensional."`,
          nextStep: 3,
          icon: <Star className="h-5 w-5" />
        },
        {
          text: "Conectar el cable rosa y cruzar los dedos",
          outcome: `Al conectar el cable rosa, la gravedad de la nave se invierte momentáneamente. Todo y todos caen hacia el techo. El pingüino-capitán desliza hacia ti una insignia: "Felicidades, ahora eres el nuevo oficial de orientación gravitacional. No teníamos uno hasta ahora."`,
          nextStep: 3,
          icon: <Rocket className="h-5 w-5" />
        }
      ]
    },
    {
      narrative: `Mientras la bebida hace efecto, sientes que puedes entender las conversaciones de las plantas ornamentales de la nave. Una de ellas, un cactus con corbata, se queja de la falta de humedad. De repente, la nave se sacude y el capitán anuncia: "Por favor, todos los pasajeros con habilidades de negociación intergaláctica repórtense en la escotilla 7."`,
      options: [
        {
          text: "Ignorar el anuncio y seguir escuchando a las plantas",
          outcome: `Las plantas te revelan el secreto de la fotosíntesis emocional y te regalan una pequeña semilla que, según ellas, crecerá en cualquier ambiente y te protegerá de pensamientos tristes. La guardas en tu bolsillo justo cuando la nave se estabiliza.`,
          nextStep: 3,
          icon: <Zap className="h-5 w-5" />
        },
        {
          text: "Ir a la escotilla 7, fingiendo saber de negociación",
          outcome: `En la escotilla encuentras al capitán negociando con una nube de gas inteligente que ha confundido la nave con su prima lejana. Tu absurda interpretación de un experto en relaciones gaseosas convence a la nube de que los libere, impresionando a toda la tripulación.`,
          nextStep: 3,
          icon: <Star className="h-5 w-5" />
        }
      ]
    },
    {
      narrative: `Finalmente, la nave se estabiliza y llegáis a vuestro destino: El Restaurante del Fin del Universo. El maître, un ser con cinco ojos y un elegante smoking, te reconoce: "Ah, ${character?.name}, el famoso ${character?.class}. Su mesa está lista junto al ventanal con vistas al apocalipsis cósmico de esta noche. ¿Desea ver el menú o prefiere la especialidad sorpresa del chef?"`,
      options: [
        {
          text: "Ver el menú detalladamente",
          outcome: `El menú está escrito en 17 idiomas simultáneamente y cambia cada vez que parpadeas. Finalmente pides "algo que no trate de comerme primero". Te sirven un plato que canta ópera cada vez que lo pinchas. Es delicioso y te hace sentir temporalmente omnisciente.`,
          nextStep: 4,
          icon: <Rocket className="h-5 w-5" />
        },
        {
          text: "Probar la especialidad sorpresa",
          outcome: `El chef, un pulpo brillante con sombrero de cocinero, trae personalmente un plato cubierto. Al destaparse, revela un postre que se parece sospechosamente a ti, hecho de algo parecido a la gelatina. "Es un honor-reflejo", explica el chef. "Sabe a tu recuerdo favorito". Y curiosamente, así es.`,
          nextStep: 4,
          icon: <Star className="h-5 w-5" />
        }
      ]
    },
    {
      narrative: `Mientras disfrutas de la comida, el universo comienza su espectáculo final fuera de la ventana. Galaxias se comprimen, estrellas explotan en cámara lenta, y todo se reduce a un punto de luz brillante antes de reiniciarse para la próxima sesión. Un androide se acerca a tu mesa con una pequeña caja: "Para conmemorar su visita, ofrecemos la oportunidad de llevar consigo un recuerdo eterno en forma de NFT. ¿Le interesaría preservar su identidad cósmica en la blockchain universal?"`,
      options: [
        {
          text: "Aceptar el NFT cósmico",
          outcome: `El androide sonríe y toma una captura de tu esencia. "Su identidad ha sido inmortalizada en la blockchain universal. Incluso después de este ciclo del universo, ${character?.name} el ${character?.class} permanecerá en el registro cósmico." Te entrega una tarjeta holográfica con un código QR multidimensional.`,
          nextStep: -1, // End of story
          icon: <Zap className="h-5 w-5" />
        },
        {
          text: "Declinar amablemente, prefiriendo mantener tu misterio",
          outcome: `"Sabio decision", dice el androide con un guiño. "Algunos prefieren permanecer como leyendas no registradas." Te entrega una pequeña llave dorada de todas formas. "Para la próxima vez que visite. La puerta trasera siempre estará abierta para ${character?.name}, el enigmático ${character?.class}."`,
          nextStep: -1, // End of story
          icon: <Rocket className="h-5 w-5" />
        }
      ]
    }
  ];
  
  const handleChooseOption = (option: any) => {
    // Show outcome
    setShowOutcome(option.outcome);
    
    // After delay, go to next step or finish
    setTimeout(() => {
      if (option.nextStep >= 0) {
        setCurrentStep(option.nextStep);
        setShowOutcome(null);
      } else {
        // Story complete
        setStoryComplete(true);
      }
    }, 6000);
  };
  
  const handleMintNFT = () => {
    toast.success("¡Prepárate para mintear tu NFT cósmico!", {
      description: "Conecta tu wallet para continuar.",
      icon: <Star className="h-5 w-5" />,
      action: {
        label: "Conectar",
        onClick: () => {
          toast.info("¡Funcionalidad de minteo en desarrollo!", {
            description: "Esta función estará disponible en la próxima actualización.",
          });
        },
      },
    });
  };
  
  const handleBackToStart = () => {
    navigate('/');
  };
  
  const currentStoryStep = storySteps[currentStep];
  
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <StarryBackground />
      <CosmicParticles />
      
      <div className="max-w-5xl w-full mx-auto z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Character sidebar */}
        <div className="order-2 lg:order-1">
          {character && (
            <CharacterCard character={character} className="sticky top-8" />
          )}
        </div>
        
        {/* Main story content */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          <div className="mb-8 text-center">
            <NeonTitle variant="magenta" size="lg">La Aventura Cósmica</NeonTitle>
          </div>
          
          {/* Progress bar */}
          <div className="h-1 w-full bg-white/10 rounded-full mb-8">
            <div 
              className="h-full bg-cosmic-magenta rounded-full" 
              style={{ width: `${(currentStep / (storySteps.length - 1)) * 100}%` }}
            />
          </div>
          
          {storyComplete ? (
            <div className="text-center space-y-6">
              <GalaxyCard hasGlow glowColor="green" className="min-h-[14rem] flex flex-col justify-center">
                <div className="p-4">
                  <h3 className="text-2xl font-space font-bold text-cosmic-green mb-4">
                    ¡Aventura Completada!
                  </h3>
                  <p className="mb-4">
                    Has sobrevivido a tu visita al Restaurante del Fin del Universo y has creado
                    una historia única para {character?.name}, el {character?.class}.
                  </p>
                  <p className="text-white/70">
                    ¿Quieres inmortalizar tu personaje como un NFT cósmico?
                  </p>
                </div>
              </GalaxyCard>
              
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
                <CosmicButton variant="primary" onClick={handleMintNFT}>
                  <Star className="mr-2 h-4 w-4" />
                  ¡Llévalo al Multiverso!
                </CosmicButton>
                
                <CosmicButton variant="secondary" onClick={handleBackToStart}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver al Inicio
                </CosmicButton>
              </div>
            </div>
          ) : showOutcome ? (
            <GalaxyCard hasGlow glowColor="magenta" className="min-h-[14rem] flex flex-col justify-center">
              <div className="p-4">
                <TypewriterText 
                  text={showOutcome} 
                  className="text-lg"
                  speed={30}
                />
              </div>
            </GalaxyCard>
          ) : (
            <div className="space-y-6">
              <GalaxyCard hasGlow glowColor="cyan" className="min-h-[14rem] flex flex-col justify-center">
                <div className="p-4">
                  <TypewriterText 
                    text={currentStoryStep.narrative} 
                    className="text-lg"
                    speed={20}
                  />
                </div>
              </GalaxyCard>
              
              <div className="grid grid-cols-1 gap-4">
                {currentStoryStep.options.map((option, index) => (
                  <button 
                    key={index} 
                    onClick={() => handleChooseOption(option)}
                    className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-left hover:bg-white/5 transition-colors flex items-center"
                  >
                    <div className="h-10 w-10 rounded-full flex items-center justify-center bg-cosmic-magenta/20 mr-4">
                      {option.icon}
                    </div>
                    <span>{option.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Adventure;
