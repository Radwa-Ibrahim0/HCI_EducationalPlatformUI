import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  ArrowLeft,
  Play,
  CheckCircle2,
  XCircle,
  Sparkles,
  X,
  Gift,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Science Questions Data
const levelData = [
  {
    id: 1,
    timestamp: 3,
    question:
      "What does a plant need from the sky to make food?",
    hint: "It's yellow, super hot, and bright!",
    options: [
      { id: "a", text: "Moonlight", icon: "🌙" },
      {
        id: "b",
        text: "Sunlight",
        icon: "☀️",
        isCorrect: true,
      },
      { id: "c", text: "Starlight", icon: "✨" },
      { id: "d", text: "Lightning", icon: "⚡" },
    ],
  },
  {
    id: 2,
    timestamp: 8,
    question: "Which planet is known as the 'Red Planet'?",
    hint: "It starts with the letter M and sounds like 'Bars'!",
    options: [
      { id: "a", text: "Earth", icon: "🌍" },
      { id: "b", text: "Venus", icon: "🌕" },
      { id: "c", text: "Mars", icon: "🔴", isCorrect: true },
      { id: "d", text: "Jupiter", icon: "🪐" },
    ],
  },
];

const TOTAL_DURATION = 12;

// Default avatars for fallback
const defaultAvatars = [
  {
    id: 1,
    emoji: "🐱",
    name: "Oliver",
    color: "from-orange-400 to-orange-600",
  },
];

// Rewards Data
const rewards = [
  { id: 1, emoji: "🎩", name: "Top Hat" },
  { id: 2, emoji: "🧢", name: "Cool Cap" },
  { id: 3, emoji: "🎀", name: "Pink Bow" },
];

export default function ScienceVideoLevel() {
  const navigate = useNavigate();
  const { id } = useParams();
  const currentLevelId = parseInt(id, 10) || 1;

  // State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentQuestionIdx, setCurrentQuestionIdx] =
    useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [levelCompleted, setLevelCompleted] = useState(false);
  const [showRewardSelect, setShowRewardSelect] =
    useState(false); // New state for reward popup

  // Quiz & Hint State
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerStatus, setAnswerStatus] = useState("idle");
  const [showMascotHelp, setShowMascotHelp] = useState(false);
  const [activeHint, setActiveHint] = useState(null);

  // Get Mascot from LocalStorage
  const [selectedAvatar] = useState(() => {
    const saved = localStorage.getItem("selectedAvatar");
    return saved ? JSON.parse(saved) : defaultAvatars[0];
  });

  // Reset component state when the level id changes (so navigating to next level is clean)
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setCurrentQuestionIdx(0);
    setShowQuiz(false);
    setLevelCompleted(false);
    setShowRewardSelect(false);
    setSelectedAnswer(null);
    setAnswerStatus("idle");
    setShowMascotHelp(false);
    setActiveHint(null);
  }, [currentLevelId]);

  // Timer Logic
  useEffect(() => {
    let interval;
    if (
      isPlaying &&
      !showQuiz &&
      !levelCompleted &&
      !showMascotHelp
    ) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const newTime = +(prev + 0.1).toFixed(1);

          const nextQuestion = levelData[currentQuestionIdx];
          if (
            nextQuestion &&
            newTime >= nextQuestion.timestamp
          ) {
            setIsPlaying(false);
            setShowQuiz(true);
            return nextQuestion.timestamp;
          }

          if (newTime >= TOTAL_DURATION) {
            setIsPlaying(false);
            setLevelCompleted(true);
            return TOTAL_DURATION;
          }

          return newTime;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [
    isPlaying,
    showQuiz,
    levelCompleted,
    currentQuestionIdx,
    showMascotHelp,
  ]);

  // Handle Answer
  const handleAnswerClick = (option) => {
    if (answerStatus === "correct" || showMascotHelp) return;

    setSelectedAnswer(option.id);

    if (option.isCorrect) {
      setAnswerStatus("correct");
      setActiveHint(null);

      setTimeout(() => {
        setShowQuiz(false);
        setSelectedAnswer(null);
        setAnswerStatus("idle");
        setCurrentQuestionIdx((prev) => prev + 1);
        setIsPlaying(true);
      }, 1500);
    } else {
      setAnswerStatus("wrong");
      setTimeout(() => {
        setShowMascotHelp(true);
      }, 600);
    }
  };

  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Handle Claiming Reward & Unlocking Level
  const handleClaimReward = (reward) => {
    // Get current category from localStorage (saved during navigation)
    const currentCategory = localStorage.getItem("currentAdventureCategory") || "space";
    const storageKey = `progress_${currentCategory}`;
    
    // Get existing completed levels for this category
    const savedProgress = localStorage.getItem(storageKey);
    let completedLevels = [];
    
    if (savedProgress) {
      try {
        completedLevels = JSON.parse(savedProgress);
      } catch (e) {
        completedLevels = [];
      }
    }
    
    // Add current level to completed levels if not already there
    if (!completedLevels.includes(currentLevelId)) {
      completedLevels.push(currentLevelId);
      localStorage.setItem(storageKey, JSON.stringify(completedLevels));
    }

    // 2. Persist the claimed reward (simple inventory)
    try {
      const savedRewards = JSON.parse(
        localStorage.getItem("science_rewards") || "[]",
      );
      savedRewards.push({
        level: currentLevelId,
        category: currentCategory,
        rewardId: reward.id,
        claimedAt: Date.now(),
      });
      localStorage.setItem(
        "science_rewards",
        JSON.stringify(savedRewards),
      );
    } catch (e) {
      // ignore JSON errors — fallback to overwriting cleanly
      localStorage.setItem(
        "science_rewards",
        JSON.stringify([
          {
            level: currentLevelId,
            category: currentCategory,
            rewardId: reward.id,
            claimedAt: Date.now(),
          },
        ]),
      );
    }

    // 3. Navigate back to the progress map for the current category
    navigate(`/child/progress/${currentCategory}`);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
      style={{ fontFamily: "Comic Sans MS, cursive" }}
    >
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5 text-black" />
            </Button>
            <div className="flex items-center gap-3">
              <span className="text-4xl">🧬</span>
              <h1 className="text-3xl text-black">
                Level {currentLevelId}: Science Explorer
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="relative w-full aspect-video bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-2xl overflow-hidden border-4 border-white flex items-center justify-center">
          {/* --- VIDEO SCREEN --- */}
          <div className="text-center w-full">
            {!isPlaying &&
            currentTime === 0 &&
            !levelCompleted ? (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <button
                  onClick={() => setIsPlaying(true)}
                  className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl transform transition-all hover:scale-110 hover:bg-purple-50"
                >
                  <Play className="w-12 h-12 text-purple-800 ml-2" />
                </button>
              </div>
            ) : isPlaying ? (
              <div className="text-white animate-pulse">
                <div className="text-6xl mb-6">🎥</div>
                <h2 className="text-3xl mb-2">
                  Video is Playing...
                </h2>
                <div className="mt-8 text-2xl font-mono bg-black/30 inline-block px-4 py-2 rounded-lg">
                  {formatTime(currentTime)} /{" "}
                  {formatTime(TOTAL_DURATION)}
                </div>
              </div>
            ) : (
              <div className="text-white opacity-50">
                <div className="text-6xl mb-6">⏸️</div>
              </div>
            )}
          </div>

          {/* --- QUIZ POPUP --- */}
          <AnimatePresence>
            {showQuiz && !levelCompleted && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
              >
                <div className="w-full max-w-2xl bg-white rounded-3xl border-4 border-purple-400 shadow-2xl overflow-hidden relative">
                  {/* Decorative Blobs */}
                  <div className="absolute -top-10 -left-10 w-32 h-32 bg-yellow-200 rounded-full opacity-50"></div>
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-200 rounded-full opacity-50"></div>

                  <div className="p-8 relative z-10">
                    <div className="text-center mb-8">
                      <span className="inline-block px-4 py-1 bg-purple-100 text-purple-600 rounded-full text-sm mb-2 tracking-wider border border-purple-200">
                        QUESTION {currentQuestionIdx + 1}
                      </span>
                      <h2 className="text-3xl text-slate-800 leading-tight mt-2">
                        {levelData[currentQuestionIdx]
                          ?.question ?? "No Question"}
                      </h2>
                    </div>

                    {/* Hint Display */}
                    {activeHint && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 bg-yellow-50 border-2 border-yellow-200 p-3 rounded-xl flex items-center gap-3"
                      >
                        <span className="text-2xl">💡</span>
                        <p className="text-yellow-800">
                          {activeHint}
                        </p>
                      </motion.div>
                    )}

                    {/* Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {levelData[
                        currentQuestionIdx
                      ]?.options?.map((option) => (
                        <button
                          key={option.id}
                          onClick={() =>
                            handleAnswerClick(option)
                          }
                          className={`
                            relative p-4 rounded-2xl border-b-4 transition-all active:scale-95 text-left flex items-center gap-4
                            ${
                              selectedAnswer === option.id
                                ? option.isCorrect
                                  ? "bg-green-100 border-green-500 text-green-800"
                                  : "bg-red-100 border-red-500 text-red-800"
                                : "bg-white border-slate-200 hover:border-purple-300 hover:bg-purple-50 text-slate-700"
                            }
                          `}
                        >
                          <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-sm border border-slate-100">
                            {option.icon}
                          </div>
                          <span className="text-lg flex-1">
                            {option.text}
                          </span>

                          {selectedAnswer === option.id && (
                            <div className="absolute right-4">
                              {option.isCorrect ? (
                                <CheckCircle2 className="w-6 h-6 text-green-600" />
                              ) : (
                                <XCircle className="w-6 h-6 text-red-600" />
                              )}
                            </div>
                          )}
                        </button>
                      )) ?? <div>No options available</div>}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* --- MASCOT HELP POPUP --- */}
          <AnimatePresence>
            {showMascotHelp && (
              <div className="absolute bottom-6 right-6 flex items-end gap-4 z-30">
                {/* Speech Bubble */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: 20 }}
                  className="relative bg-white rounded-3xl p-4 shadow-xl border-4 border-purple-300 max-w-xs"
                >
                  <button
                    onClick={() => setShowMascotHelp(false)}
                    className="absolute -top-2 -right-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-full p-1.5 shadow-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="text-center">
                    <h3 className="text-lg text-orange-900 mb-1">
                      Tricky one?
                    </h3>
                    <p className="text-orange-700 mb-3 text-sm">
                      Want a little hint?
                    </p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-green-500 hover:bg-green-600 text-white rounded-full flex-1"
                        onClick={() => {
                          setActiveHint(
                            levelData[currentQuestionIdx]
                              ?.hint ?? "No hint available",
                          );
                          setShowMascotHelp(false);
                          setAnswerStatus("idle");
                          setSelectedAnswer(null);
                        }}
                      >
                        Yes! 🙋‍♂️
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-orange-200 text-orange-700 hover:bg-orange-50 rounded-full"
                        onClick={() => {
                          setShowMascotHelp(false);
                          setAnswerStatus("idle");
                          setSelectedAnswer(null);
                        }}
                      >
                        No thanks
                      </Button>
                    </div>
                  </div>

                  <div className="absolute -bottom-3 right-8 w-6 h-6 bg-white border-r-4 border-b-4 border-purple-300 transform rotate-45"></div>
                </motion.div>

                {/* Mascot Avatar */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                  }}
                  className="flex-shrink-0"
                >
                  <div
                    className={`w-24 h-24 rounded-full bg-gradient-to-br ${selectedAvatar.color} shadow-2xl flex items-center justify-center border-4 border-white`}
                  >
                    <span className="text-5xl">
                      {selectedAvatar.emoji}
                    </span>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* --- CELEBRATION & REWARD POPUPS --- */}
          <AnimatePresence>
            {levelCompleted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              >
                {!showRewardSelect ? (
                  // --- 1. INITIAL CELEBRATION SCREEN ---
                  <motion.div
                    key="celebration"
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 10 }}
                    transition={{
                      type: "spring",
                      duration: 0.5,
                    }}
                    className="bg-white rounded-3xl p-8 max-w-md mx-4 shadow-2xl border-4 border-purple-300 relative text-center"
                  >
                    <div className="mb-6">
                      <motion.div
                        animate={{
                          rotate: [0, 10, -10, 10, 0],
                        }}
                        transition={{
                          duration: 0.5,
                          repeat: 3,
                        }}
                        className="text-8xl mb-4"
                      >
                        🎉
                      </motion.div>
                      <h2 className="text-4xl text-black mb-2">
                        Amazing Work!
                      </h2>
                      <p className="text-xl text-slate-600">
                        You finished the video lesson! 🌟
                      </p>
                    </div>

                    <div className="flex justify-center items-center mb-8 relative h-32">
                      <motion.div
                        animate={{
                          y: [-8, 8, -8],
                          rotate: [0, 15, -15, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                        }}
                        className="absolute left-8 top-2"
                      >
                        <Sparkles className="w-10 h-10 text-yellow-400" />
                      </motion.div>

                      <motion.div
                        animate={{
                          rotate: [0, -10, 10, -10, 0],
                          scale: [1, 1.1, 1, 1.1, 1],
                        }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          repeatDelay: 0.5,
                        }}
                      >
                        <div
                          className={`w-24 h-24 rounded-full bg-gradient-to-br ${selectedAvatar.color} shadow-2xl flex items-center justify-center border-4 border-white`}
                        >
                          <span className="text-5xl">
                            {selectedAvatar.emoji}
                          </span>
                        </div>
                      </motion.div>

                      <motion.div
                        animate={{
                          y: [12, -12, 12],
                          rotate: [-15, 15, -15],
                        }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                        }}
                        className="absolute right-8 bottom-4"
                      >
                        <Sparkles className="w-8 h-8 text-pink-400" />
                      </motion.div>
                    </div>

                    <Button
                      onClick={() => setShowRewardSelect(true)}
                      className="w-full py-6 text-xl rounded-full bg-purple-500 hover:bg-purple-600 text-white shadow-lg shadow-purple-200 transition-transform hover:scale-105"
                      style={{
                        fontFamily: "Comic Sans MS, cursive",
                      }}
                    >
                      Claim Your Reward 🎁
                    </Button>
                  </motion.div>
                ) : (
                  // --- 2. REWARD SELECTION SCREEN ---
                  <motion.div
                    key="reward"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white rounded-3xl p-8 max-w-lg mx-4 shadow-2xl border-4 border-yellow-400 relative text-center"
                  >
                    <div className="mb-6">
                      <Gift className="w-16 h-16 text-yellow-500 mx-auto mb-2" />
                      <h2 className="text-3xl text-black mb-2">
                        Choose Your Reward!
                      </h2>
                      <p className="text-slate-600">
                        Pick an accessory for your avatar:
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-8">
                      {rewards.map((reward) => (
                        <button
                          key={reward.id}
                          onClick={() =>
                            handleClaimReward(reward)
                          }
                          className="flex flex-col items-center gap-2 group"
                        >
                          <div className="w-24 h-24 bg-yellow-50 rounded-2xl border-2 border-yellow-200 flex items-center justify-center text-5xl shadow-sm transition-all group-hover:scale-110 group-hover:border-yellow-400 group-hover:shadow-md">
                            {reward.emoji}
                          </div>
                          <span className="font-bold text-slate-700 group-hover:text-yellow-600">
                            {reward.name}
                          </span>
                        </button>
                      ))}
                    </div>

                    <p className="text-sm text-slate-400">
                      Tap any item to claim & continue!
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}