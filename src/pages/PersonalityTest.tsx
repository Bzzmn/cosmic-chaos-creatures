
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import StarryBackground from '@/components/StarryBackground';
import CosmicParticles from '@/components/CosmicParticles';
import CosmicButton from '@/components/CosmicButton';
import NeonTitle from '@/components/NeonTitle';
import GalaxyCard from '@/components/GalaxyCard';
import TypewriterText from '@/components/TypewriterText';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface Question {
  question: string;
  options: {
    text: string;
    emoji: string;
    value: number;
    effect: string;
    feedback: string;
  }[];
}

const PersonalityTest: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState<string | null>(null);
  
  const questions: Question[] = [
    {
      question: "Estás en un bar interestelar y un alien con 6 brazos te pide prestado tu último crédito galáctico. ¿Qué haces?",
      options: [
        {
          text: "Le presto mi crédito porque soy generoso",
          emoji: "🪙",
          value: 1,
          effect: "quantumCharisma",
          feedback: "El alien resulta ser un estafador de la galaxia de Andrómeda. Has perdido tu dinero, pero has ganado una historia que contar."
        },
        {
          text: "Le pregunto para qué lo quiere antes de decidir",
          emoji: "🤔",
          value: 2,
          effect: "absurdityResistance",
          feedback: "El alien te explica que necesita llamar a su madre. Luego de una hora escuchando sobre los problemas familiares de una especie extraterrestre, te arrepientes."
        },
        {
          text: "Le digo que ya los gasté todos en agua embotellada",
          emoji: "💧",
          value: 3,
          effect: "sarcasmLevel",
          feedback: "El alien se ríe y te regala su colección de tapas de botella interdimensionales. Al parecer apreciaba tu sentido del humor."
        },
        {
          text: "Le ofrezco cinco créditos si puede adivinar mi planeta natal",
          emoji: "🌍",
          value: 4,
          effect: "cosmicLuck",
          feedback: "De alguna manera, el alien adivina no sólo tu planeta sino la ciudad exacta donde creciste. Ahora le debes 5 créditos y una explicación."
        }
      ]
    },
    {
      question: "Encuentras un dispositivo que permite viajar en el tiempo pero sólo funciona una vez. ¿Qué harías?",
      options: [
        {
          text: "Viajar al futuro para ver los números ganadores de la lotería",
          emoji: "💰",
          value: 3,
          effect: "timeWarping",
          feedback: "Viajas al futuro y descubres que la lotería fue abolida y reemplazada por un sistema de rifa basado en quién puede sostener la respiración por más tiempo."
        },
        {
          text: "Ir al pasado a conocer a mis ancestros",
          emoji: "👵",
          value: 2,
          effect: "absurdityResistance",
          feedback: "Viajas al pasado y descubres que tu tatarabuelo era en realidad un robot disfrazado. La historia familiar cobra mucho más sentido ahora."
        },
        {
          text: "Visitar el restaurante al final del universo",
          emoji: "🍽️",
          value: 4,
          effect: "cosmicLuck",
          feedback: "El restaurante tiene una promoción especial: 2x1 en postres cósmicos. Lástima que viniste solo y no puedes aprovecharla."
        },
        {
          text: "Venderlo al mejor postor",
          emoji: "💼",
          value: 1,
          effect: "quantumCharisma",
          feedback: "Lo vendes por una cantidad astronómica pero te pagan en una moneda que solo es válida en un planeta que fue destruido ayer."
        }
      ]
    },
    {
      question: "Te ofrecen ser el primer humano en probar una comida alienígena que se mueve sola en el plato. ¿Cómo reaccionas?",
      options: [
        {
          text: "La como sin dudar, la vida es una aventura",
          emoji: "😋",
          value: 4,
          effect: "absurdityResistance",
          feedback: "La comida tenía consciencia propia y ahora vive en tu estómago contándote chistes malos mientras intentas dormir."
        },
        {
          text: "Pregunto si sabe a pollo",
          emoji: "🍗",
          value: 2,
          effect: "sarcasmLevel",
          feedback: "El chef alienígena se ofende profundamente. Aparentemente comparar su creación con 'pollo' es un insulto en 7 galaxias distintas."
        },
        {
          text: "Pido salsa picante para distraer mi paladar",
          emoji: "🌶️",
          value: 3,
          effect: "quantumCharisma",
          feedback: "La salsa picante hace que la comida deje de moverse y empiece a cantar ópera. Es el espectáculo más extraño que has presenciado durante una cena."
        },
        {
          text: "La fotografío para mis redes sociales espaciales",
          emoji: "📸",
          value: 1,
          effect: "cosmicLuck",
          feedback: "Tu foto se vuelve viral y ahora eres famoso como 'el humano que no se atrevió'. Los memes sobre ti llegaron hasta la galaxia de Andrómeda."
        }
      ]
    },
    {
      question: "Una inteligencia artificial te ofrece la respuesta a cualquier pregunta del universo. ¿Qué le preguntas?",
      options: [
        {
          text: "¿Cuál es el sentido de la vida?",
          emoji: "🤯",
          value: 2,
          effect: "absurdityResistance",
          feedback: "La IA te responde '42' y luego se apaga permanentemente. Sientes que deberías haber leído más ciencia ficción."
        },
        {
          text: "¿Dónde dejé mis llaves la semana pasada?",
          emoji: "🔑",
          value: 1,
          effect: "sarcasmLevel",
          feedback: "La IA procesa la pregunta durante 3 días y luego te dice que están en el bolsillo de la chaqueta que no has usado en meses. Efectivamente, allí estaban."
        },
        {
          text: "¿Cuándo se acabará el universo exactamente?",
          emoji: "⏰",
          value: 4,
          effect: "timeWarping",
          feedback: "La IA te da la fecha exacta: casualmente coincide con tu próximo cumpleaños. Qué forma de arruinar los planes de fiesta."
        },
        {
          text: "¿Cuáles son los números de la lotería de mañana?",
          emoji: "🎰",
          value: 3,
          effect: "cosmicLuck",
          feedback: "La IA te da los números perfectos. Lamentablemente, la lotería decide cambiar su sistema de números justo ese día, por primera vez en 50 años."
        }
      ]
    }
  ];
  
  const handleAnswer = (answerIndex: number) => {
    const answer = questions[currentQuestion].options[answerIndex];
    
    // Save answer
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
    
    // Show feedback
    setShowFeedback(answer.feedback);
    
    // Show toast
    toast.success(`Has ganado +${answer.value * 25}% de ${translateEffect(answer.effect)}!`, {
      icon: answer.emoji,
    });
    
    // After delay, go to next question or finish
    setTimeout(() => {
      setShowFeedback(null);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Calculate character stats and navigate to character page
        navigate('/character-creation', { 
          state: { answers, questions } 
        });
      }
    }, 3000);
  };
  
  const translateEffect = (effect: string) => {
    switch(effect) {
      case 'quantumCharisma': return 'Carisma Cuántico';
      case 'absurdityResistance': return 'Resistencia al Absurdo';
      case 'sarcasmLevel': return 'Nivel de Sarcasmo';
      case 'timeWarping': return 'Distorsión Temporal';
      case 'cosmicLuck': return 'Suerte Cósmica';
      default: return effect;
    }
  };
  
  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      navigate('/');
    }
  };
  
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <StarryBackground />
      <CosmicParticles />
      
      <div className="max-w-3xl w-full mx-auto z-10">
        <div className="mb-8 text-center">
          <NeonTitle variant="cyan" size="lg">Test de Personalidad Cósmica</NeonTitle>
          <div className="mt-4 mb-6">
            <div className="flex justify-center items-center">
              {questions.map((_, index) => (
                <div 
                  key={index}
                  className={`h-2 w-12 mx-1 rounded-full ${index === currentQuestion ? 'bg-cosmic-cyan' : index < currentQuestion ? 'bg-cosmic-green' : 'bg-white/20'}`}
                />
              ))}
            </div>
            <p className="mt-2 text-white/70 text-sm">
              Pregunta {currentQuestion + 1} de {questions.length}
            </p>
          </div>
        </div>
        
        <GalaxyCard hasGlow glowColor="cyan" className="mb-6 min-h-[12rem]">
          <div className="h-full flex flex-col justify-center">
            {showFeedback ? (
              <div className="text-center p-4">
                <TypewriterText 
                  text={showFeedback} 
                  className="text-lg text-cosmic-green italic"
                />
              </div>
            ) : (
              <h3 className="text-xl text-center font-medium mb-4">
                <TypewriterText text={questions[currentQuestion].question} />
              </h3>
            )}
          </div>
        </GalaxyCard>
        
        {!showFeedback && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button 
                key={index} 
                onClick={() => handleAnswer(index)}
                className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-left hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{option.emoji}</span>
                  <span>{option.text}</span>
                </div>
              </button>
            ))}
          </div>
        )}
        
        <div className="mt-8 flex justify-between">
          <CosmicButton variant="secondary" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </CosmicButton>
          
          <div className="flex-grow" />
        </div>
      </div>
    </div>
  );
};

export default PersonalityTest;
