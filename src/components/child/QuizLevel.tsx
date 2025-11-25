import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Sparkles,
  Gift,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Quiz Questions Data for levels 4+
const quizData = {
  4: {
    question: "What makes a rainbow appear in the sky?",
    hint: "It happens when sunlight shines through tiny water drops!",
    options: [
      { id: "a", text: "Clouds", icon: "☁️" },
      { id: "b", text: "Sunlight and Rain", icon: "🌈", isCorrect: true },
      { id: "c", text: "Wind", icon: "💨" },
      { id: "d", text: "Snow", icon: "❄️" },
    ],
  },
  5: {
    question: "What do bees collect from flowers?",
    hint: "They use it to make honey!",
    options: [
      { id: "a", text: "Water", icon: "💧" },
      { id: "b", text: "Nectar", icon: "🍯", isCorrect: true },
      { id: "c", text: "Leaves", icon: "🍃" },
      { id: "d", text: "Dirt", icon: "🪨" },
    ],
  },
  6: {
    question: "Which animal can live both in water and on land?",
    hint: "Think of a jumping green creature!",
    options: [
      { id: "a", text: "Fish", icon: "🐟" },
      { id: "b", text: "Bird", icon: "🐦" },
      { id: "c", text: "Frog", icon: "🐸", isCorrect: true },
      { id: "d", text: "Cat", icon: "🐱" },
    ],
  },
  7: {
    question: "What do plants need to grow?",
    hint: "Three things: water, sunlight, and...",
    options: [
      { id: "a", text: "Candy", icon: "🍬" },
      { id: "b", text: "Soil", icon: "🌱", isCorrect: true },
      { id: "c", text: "Music", icon: "🎵" },
      { id: "d", text: "TV", icon: "📺" },
    ],
  },
  8: {
    question: "What is the hottest planet in our solar system?",
    hint: "It's the second planet from the Sun!",
    options: [
      { id: "a", text: "Mercury", icon: "☿️" },
      { id: "b", text: "Venus", icon: "♀️", isCorrect: true },
      { id: "c", text: "Mars", icon: "♂️" },
      { id: "d", text: "Jupiter", icon: "♃" },
    ],
  },
  9: {
    question: "What causes the ocean tides?",
    hint: "Look up at the night sky!",
    options: [
      { id: "a", text: "The Moon", icon: "🌙", isCorrect: true },
      { id: "b", text: "The Wind", icon: "💨" },
      { id: "c", text: "Fish", icon: "🐠" },
      { id: "d", text: "Boats", icon: "⛵" },
    ],
  },
  10: {
    question: "What do caterpillars turn into?",
    hint: "They get beautiful wings!",
    options: [
      { id: "a", text: "Bird", icon: "🐦" },
      { id: "b", text: "Butterfly", icon: "🦋", isCorrect: true },
      { id: "c", text: "Bee", icon: "🐝" },
      { id: "d", text: "Spider", icon: "🕷️" },
    ],
  },
  11: {
    question: "What is the largest land animal?",
    hint: "It has a long trunk!",
    options: [
      { id: "a", text: "Lion", icon: "🦁" },
      { id: "b", text: "Giraffe", icon: "🦒" },
      { id: "c", text: "Elephant", icon: "🐘", isCorrect: true },
      { id: "d", text: "Bear", icon: "🐻" },
    ],
  },
  12: {
    question: "What do we call frozen water?",
    hint: "You can skate on it!",
    options: [
      { id: "a", text: "Steam", icon: "💨" },
      { id: "b", text: "Ice", icon: "🧊", isCorrect: true },
      { id: "c", text: "Snow", icon: "❄️" },
      { id: "d", text: "Cloud", icon: "☁️" },
    ],
  },
  13: {
    question: "Which force pulls things down to Earth?",
    hint: "It's what keeps us from floating away!",
    options: [
      { id: "a", text: "Magnetism", icon: "🧲" },
      { id: "b", text: "Gravity", icon: "🌍", isCorrect: true },
      { id: "c", text: "Electricity", icon: "⚡" },
      { id: "d", text: "Wind", icon: "💨" },
    ],
  },
  14: {
    question: "What gas do plants give off that we breathe?",
    hint: "It's what keeps us alive!",
    options: [
      { id: "a", text: "Carbon Dioxide", icon: "💨" },
      { id: "b", text: "Nitrogen", icon: "🌫️" },
      { id: "c", text: "Oxygen", icon: "🌿", isCorrect: true },
      { id: "d", text: "Helium", icon: "🎈" },
    ],
  },
  15: {
    question: "What is the fastest land animal?",
    hint: "It has spots and runs super fast!",
    options: [
      { id: "a", text: "Lion", icon: "🦁" },
      { id: "b", text: "Cheetah", icon: "🐆", isCorrect: true },
      { id: "c", text: "Horse", icon: "🐎" },
      { id: "d", text: "Rabbit", icon: "🐰" },
    ],
  },
};

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
  { id: 4, emoji: "👑", name: "Crown" },
  { id: 5, emoji: "🎓", name: "Grad Cap" },
];

export default function QuizLevel() {
  const navigate = useNavigate();
  const { id } = useParams();
  const currentLevelId = parseInt(id, 10) || 4;

  // State
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerStatus, setAnswerStatus] = useState("idle");
  const [showMascotHelp, setShowMascotHelp] = useState(false);
  const [activeHint, setActiveHint] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showRewardSelect, setShowRewardSelect] = useState(false);

  // Get Mascot from LocalStorage
  const [selectedAvatar] = useState(() => {
    const saved = localStorage.getItem("selectedAvatar");
    return saved ? JSON.parse(saved) : defaultAvatars[0];
  });

  const currentQuiz = quizData[currentLevelId];

  // Reset component state when the level id changes
  useEffect(() => {
    setSelectedAnswer(null);
    setAnswerStatus("idle");
    setShowMascotHelp(false);
    setActiveHint(null);
    setQuizCompleted(false);
    setShowRewardSelect(false);
  }, [currentLevelId]);

  // Handle Answer
  const handleAnswerClick = (option) => {
    if (answerStatus === "correct" || showMascotHelp) return;

    setSelectedAnswer(option.id);

    if (option.isCorrect) {
      setAnswerStatus("correct");
      setActiveHint(null);

      setTimeout(() => {
        setQuizCompleted(true);
      }, 1500);
    } else {
      setAnswerStatus("wrong");
      setTimeout(() => {
        setShowMascotHelp(true);
      }, 600);
    }
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

    // Persist the claimed reward
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

    // Navigate back to the progress map for the current category
    navigate(`/child/progress/${currentCategory}`);
  };

  if (!currentQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl mb-4" style={{ fontFamily: "Comic Sans MS, cursive" }}>
            Quiz not found! 🤔
          </h1>
          <Button onClick={() => navigate("/child/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

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
              <span className="text-4xl">🎯</span>
              <h1 className="text-3xl text-black">
                Level {currentLevelId}: Quiz Challenge
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="relative w-full bg-gradient-to-br from-white to-purple-50 rounded-3xl shadow-2xl overflow-hidden border-4 border-white p-8">
          {/* Decorative Blobs */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-yellow-200 rounded-full opacity-30"></div>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-200 rounded-full opacity-30"></div>

          <div className="relative z-10">
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-1 bg-purple-100 text-purple-600 rounded-full text-sm mb-4 tracking-wider border border-purple-200">
                QUIZ LEVEL {currentLevelId}
              </span>
              <h2 className="text-4xl text-slate-800 leading-tight">
                {currentQuiz.question}
              </h2>
            </div>

            {/* Hint Display */}
            {activeHint && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 bg-yellow-50 border-2 border-yellow-200 p-4 rounded-xl flex items-center gap-3"
              >
                <span className="text-3xl">💡</span>
                <p className="text-yellow-800 text-lg">{activeHint}</p>
              </motion.div>
            )}

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {currentQuiz.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswerClick(option)}
                  disabled={answerStatus === "correct"}
                  className={`
                    relative p-6 rounded-2xl border-b-4 transition-all active:scale-95 text-left flex items-center gap-4
                    ${
                      selectedAnswer === option.id
                        ? option.isCorrect
                          ? "bg-green-100 border-green-500 text-green-800"
                          : "bg-red-100 border-red-500 text-red-800"
                        : "bg-white border-slate-200 hover:border-purple-300 hover:bg-purple-50 text-slate-700"
                    }
                  `}
                >
                  <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-sm border border-slate-100">
                    {option.icon}
                  </div>
                  <span className="text-xl flex-1">{option.text}</span>

                  {selectedAnswer === option.id && (
                    <div className="absolute right-4">
                      {option.isCorrect ? (
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                      ) : (
                        <XCircle className="w-8 h-8 text-red-600" />
                      )}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Mascot Help Popup */}
          <AnimatePresence>
            {showMascotHelp && (
              <div className="fixed bottom-6 right-6 flex items-end gap-4 z-50">
                {/* Speech Bubble */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: 20 }}
                  className="relative bg-white rounded-3xl p-6 shadow-xl border-4 border-purple-300 max-w-xs"
                >
                  <div className="text-center">
                    <h3 className="text-xl text-orange-900 mb-2">
                      Tricky one?
                    </h3>
                    <p className="text-orange-700 mb-4">
                      Want a little hint?
                    </p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-green-500 hover:bg-green-600 text-white rounded-full flex-1"
                        onClick={() => {
                          setActiveHint(currentQuiz.hint);
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
                    <span className="text-5xl">{selectedAvatar.emoji}</span>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Completion & Reward Popups */}
          <AnimatePresence>
            {quizCompleted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              >
                {!showRewardSelect ? (
                  // Celebration Screen
                  <motion.div
                    key="celebration"
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 10 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="bg-white rounded-3xl p-8 max-w-md mx-4 shadow-2xl border-4 border-purple-300 relative text-center"
                  >
                    <div className="mb-6">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 10, 0] }}
                        transition={{ duration: 0.5, repeat: 3 }}
                        className="text-8xl mb-4"
                      >
                        🎉
                      </motion.div>
                      <h2 className="text-4xl text-black mb-2">
                        Perfect Score!
                      </h2>
                      <p className="text-xl text-slate-600">
                        You aced the quiz! 🌟
                      </p>
                    </div>

                    <div className="flex justify-center items-center mb-8 relative h-32">
                      <motion.div
                        animate={{
                          y: [-8, 8, -8],
                          rotate: [0, 15, -15, 0],
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
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
                        transition={{ duration: 1.8, repeat: Infinity }}
                        className="absolute right-8 bottom-4"
                      >
                        <Sparkles className="w-8 h-8 text-pink-400" />
                      </motion.div>
                    </div>

                    <Button
                      onClick={() => setShowRewardSelect(true)}
                      className="w-full py-6 text-xl rounded-full bg-purple-500 hover:bg-purple-600 text-white shadow-lg shadow-purple-200 transition-transform hover:scale-105"
                    >
                      Claim Your Reward 🎁
                    </Button>
                  </motion.div>
                ) : (
                  // Reward Selection Screen
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
                      {rewards.slice(0, 5).map((reward) => (
                        <button
                          key={reward.id}
                          onClick={() => handleClaimReward(reward)}
                          className="flex flex-col items-center gap-2 group"
                        >
                          <div className="w-24 h-24 bg-yellow-50 rounded-2xl border-2 border-yellow-200 flex items-center justify-center text-5xl shadow-sm transition-all group-hover:scale-110 group-hover:border-yellow-400 group-hover:shadow-md">
                            {reward.emoji}
                          </div>
                          <span className="font-bold text-slate-700 group-hover:text-yellow-600 text-sm">
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
