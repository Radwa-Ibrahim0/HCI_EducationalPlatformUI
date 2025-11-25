import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Lock,
  CheckCircle2,
  Play,
  Star,
  Trophy,
} from "lucide-react";
import chemistryLabImage from "figma:asset/68a9acf528718f6068bab2b1ae25cd8d18c46dae.png";
import spaceImage from "figma:asset/03862b3125866cb9a48fe7b6c1a95676f555f868.png";
import plantsAnimalsImage from "figma:asset/48441a60652e466f8415c7e490b1a52aef685374.png";
import motionEnergyImage from "figma:asset/0354ecccafa3ff1ee20bc7cb3dd650aabca15393.png";

// 15 Levels with reduced vertical spacing (compacted Y axis)
const initialLevels = [
  {
    id: 1,
    label: "1",
    unlocked: true,
    completed: false,
    x: 10,
    y: 90,
  },
  {
    id: 2,
    label: "2",
    unlocked: false,
    completed: false,
    x: 30,
    y: 86,
  },
  {
    id: 3,
    label: "3",
    unlocked: false,
    completed: false,
    x: 50,
    y: 88,
  },
  {
    id: 4,
    label: "4",
    unlocked: false,
    completed: false,
    x: 70,
    y: 84,
  },
  {
    id: 5,
    label: "5",
    unlocked: false,
    completed: false,
    x: 90,
    y: 75,
    isBoss: true,
  },
  {
    id: 6,
    label: "6",
    unlocked: false,
    completed: false,
    x: 80,
    y: 65,
  },
  {
    id: 7,
    label: "7",
    unlocked: false,
    completed: false,
    x: 60,
    y: 60,
  },
  {
    id: 8,
    label: "8",
    unlocked: false,
    completed: false,
    x: 40,
    y: 62,
  },
  {
    id: 9,
    label: "9",
    unlocked: false,
    completed: false,
    x: 20,
    y: 55,
  },
  {
    id: 10,
    label: "10",
    unlocked: false,
    completed: false,
    x: 10,
    y: 42,
    isBoss: true,
  },
  {
    id: 11,
    label: "11",
    unlocked: false,
    completed: false,
    x: 30,
    y: 35,
  },
  {
    id: 12,
    label: "12",
    unlocked: false,
    completed: false,
    x: 50,
    y: 30,
  },
  {
    id: 13,
    label: "13",
    unlocked: false,
    completed: false,
    x: 70,
    y: 32,
  },
  {
    id: 14,
    label: "14",
    unlocked: false,
    completed: false,
    x: 85,
    y: 22,
  },
  {
    id: 15,
    label: "15",
    unlocked: false,
    completed: false,
    x: 50,
    y: 8,
    isBoss: true,
  },
];

export default function ProgressMap() {
  const navigate = useNavigate();
  const { category } = useParams();
  
  // State to track levels dynamically based on localStorage
  const [levelStates, setLevelStates] = useState(initialLevels);

  // Load progress from localStorage when component mounts or category changes
  useEffect(() => {
    if (!category) return;
    
    const storageKey = `progress_${category}`;
    const savedProgress = localStorage.getItem(storageKey);
    
    if (savedProgress) {
      try {
        const completedLevels = JSON.parse(savedProgress);
        
        // Update level states based on saved progress
        const updatedLevels = initialLevels.map((level, index) => {
          const isCompleted = completedLevels.includes(level.id);
          const shouldBeUnlocked = index === 0 || completedLevels.includes(initialLevels[index - 1].id);
          
          return {
            ...level,
            completed: isCompleted,
            unlocked: shouldBeUnlocked,
          };
        });
        
        setLevelStates(updatedLevels);
      } catch (e) {
        console.error("Error loading progress:", e);
        // Initialize with no completed levels - start fresh
        localStorage.setItem(storageKey, JSON.stringify([]));
        setLevelStates(initialLevels);
      }
    } else {
      // First time visiting this adventure - start fresh with no completed levels
      localStorage.setItem(storageKey, JSON.stringify([]));
      setLevelStates(initialLevels);
    }
  }, [category]);

  const getCategoryInfo = () => {
    switch (category) {
      case "space":
        return {
          title: "Space Explorer",
          emoji: "🚀",
          bgGradient: "from-indigo-50 via-purple-50 to-pink-50",
          pathColor: "#a78bfa",
          accentColor: "#c084fc",
          nodeColor: "bg-purple-400",
          nodeShadow: "border-purple-700",
          bgImage: spaceImage,
        };
      case "chemistry":
        return {
          title: "Chemistry Lab",
          emoji: "🧪",
          bgGradient: "from-pink-50 via-red-50 to-rose-50",
          pathColor: "#f9a8d4",
          accentColor: "#ec4899",
          nodeColor: "bg-pink-400",
          nodeShadow: "border-pink-700",
          bgImage: chemistryLabImage,
        };
      case "nature":
        return {
          title: "Plants & Animals",
          emoji: "🐘",
          bgGradient: "from-blue-50 via-green-50 to-teal-50",
          pathColor: "#60a5fa",
          accentColor: "#3b82f6",
          nodeColor: "bg-blue-400",
          nodeShadow: "border-blue-700",
          bgImage: plantsAnimalsImage,
        };
      case "motion":
        return {
          title: "Motion & Energy",
          emoji: "🚴",
          bgGradient: "from-orange-50 via-yellow-50 to-red-50",
          pathColor: "#fb923c",
          accentColor: "#f97316",
          nodeColor: "bg-orange-400",
          nodeShadow: "border-orange-700",
          bgImage: motionEnergyImage,
        };
      default:
        return {
          title: "Learning Path",
          emoji: "⭐",
          bgGradient: "from-gray-50 via-slate-50 to-zinc-50",
          pathColor: "#a78bfa",
          accentColor: "#c084fc",
          nodeColor: "bg-purple-400",
          nodeShadow: "border-purple-700",
        };
    }
  };

  const info = getCategoryInfo();

  const currentLevel =
    levelStates.find((l) => l.unlocked && !l.completed) ||
    levelStates[levelStates.length - 1];

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${info.bgGradient}`}
    >
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/child/dashboard")}
              className="rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="w-6 h-6 text-black" />
            </Button>
            <div className="flex items-center gap-3">
              <span className="text-4xl">{info.emoji}</span>
              <div>
                <h1
                  className="text-3xl text-black"
                  style={{
                    fontFamily: "Comic Sans MS, cursive",
                  }}
                >
                  {info.title}
                </h1>
                <p className="text-black text-sm">
                  Level {currentLevel.id} of {levelStates.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Map */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Container background set to gray (slate-50) */}
        <div className="relative rounded-3xl shadow-2xl p-8 min-h-[700px] overflow-hidden bg-slate-50 border-4 border-white/50">
          {info.bgImage && (
            <img
              src={info.bgImage}
              alt={info.title}
              className="absolute inset-0 w-full h-full object-cover rounded-3xl opacity-30"
            />
          )}
          <svg
            className="absolute inset-0 w-full h-full"
            style={{ minHeight: "700px", zIndex: 0 }}
          >
            <defs>
              <filter id="glow">
                <feGaussianBlur
                  stdDeviation="4"
                  result="coloredBlur"
                />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {levelStates.slice(0, -1).map((level, index) => {
              const next = levelStates[index + 1];
              const isCompleted = level.completed;
              return (
                <g key={`path-${level.id}`}>
                  <line
                    x1={`${level.x}%`}
                    y1={`${level.y}%`}
                    x2={`${next.x}%`}
                    y2={`${next.y}%`}
                    stroke="rgba(0,0,0,0.08)"
                    strokeWidth="16"
                    strokeLinecap="round"
                  />
                  <line
                    x1={`${level.x}%`}
                    y1={`${level.y}%`}
                    x2={`${next.x}%`}
                    y2={`${next.y}%`}
                    stroke={
                      isCompleted ? info.accentColor : "#cbd5e1"
                    }
                    strokeWidth="12"
                    strokeDasharray={
                      isCompleted ? "0" : "20, 10"
                    }
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                </g>
              );
            })}
          </svg>

          {/* Level Nodes */}
          {levelStates.map((level, index) => {
            const shouldBeUnlocked =
              index === 0 || levelStates[index - 1].completed;
            const isUnlocked = shouldBeUnlocked;
            const isCurrent = level === currentLevel;
            const isBoss = level.isBoss;

            return (
              <div
                key={level.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-10"
                style={{
                  left: `${level.x}%`,
                  top: `${level.y}%`,
                }}
              >
                <div
                  className={
                    isCurrent && isUnlocked
                      ? "animate-bounce"
                      : ""
                  }
                >
                  <button
                    onClick={() => {
                      if (isUnlocked) {
                        // Save current category for level completion tracking
                        localStorage.setItem("currentAdventureCategory", category || "space");
                        navigate(
                          `/child/${level.id <= 3 ? "level" : "quiz"}/${level.id}`,
                        );
                      }
                    }}
                    disabled={!isUnlocked}
                    className={`
                        relative flex items-center justify-center transition-all active:translate-y-1
                        ${isBoss ? "w-20 h-20" : "w-16 h-16"} 
                        rounded-2xl border-b-8 shadow-xl
                        ${
                          level.completed
                            ? "bg-yellow-400 border-yellow-600 hover:bg-yellow-300"
                            : isUnlocked
                              ? `${info.nodeColor} ${info.nodeShadow} hover:brightness-110`
                              : "bg-slate-200 border-slate-300 cursor-not-allowed text-slate-400"
                        }
                    `}
                  >
                    {/* Shine Effect */}
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-white opacity-20 rounded-t-xl pointer-events-none"></div>

                    {/* Content */}
                    <div className="flex flex-col items-center justify-center">
                      {level.completed ? (
                        // Completed State
                        isBoss ? (
                          <Trophy className="w-8 h-8 text-black" />
                        ) : (
                          <Star className="w-8 h-8 fill-black text-black" />
                        )
                      ) : (
                        // Locked & Unlocked State (Number always visible)
                        <span
                          className={`${level.completed ? "text-black" : isUnlocked ? "text-black" : "text-slate-400"} ${isBoss ? "text-3xl" : "text-2xl"} font-black`}
                        >
                          {level.label}
                        </span>
                      )}
                    </div>

                    {/* Locked Badge (Small lock icon in corner) */}
                    {!isUnlocked && (
                      <div className="absolute -bottom-2 -right-2 bg-slate-400 rounded-full p-1 border-2 border-white">
                        <Lock className="w-3 h-3 text-white" />
                      </div>
                    )}

                    {/* Completed Badge */}
                    {level.completed && (
                      <div className="absolute -top-3 -right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white z-20">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                    )}

                    {/* Play Button for Current Level */}
                    {isCurrent &&
                      isUnlocked &&
                      !level.completed && (
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-pulse z-20">
                          <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                        </div>
                      )}
                  </button>

                  {/* Stars underneath completed levels */}
                  {level.completed && (
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-1">
                      <Star className="w-3 h-3 fill-yellow-500 text-yellow-600" />
                      <Star className="w-3 h-3 fill-yellow-500 text-yellow-600" />
                      <Star className="w-3 h-3 fill-yellow-500 text-yellow-600" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}