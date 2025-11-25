import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

const badges = [
  {
    id: 1,
    emoji: "🏆",
    name: "Champion",
    description: "Complete 10 levels",
    earned: true,
  },
  {
    id: 2,
    emoji: "⭐",
    name: "Star Learner",
    description: "Get all quiz answers correct",
    earned: true,
  },
  {
    id: 3,
    emoji: "🔥",
    name: "Hot Streak",
    description: "7 day learning streak",
    earned: true,
  },
  {
    id: 4,
    emoji: "🎨",
    name: "Artist",
    description: "Create 5 artworks",
    earned: true,
  },
  {
    id: 5,
    emoji: "🚀",
    name: "Space Master",
    description: "Complete all Space Explorer levels",
    earned: true,
  },
  {
    id: 6,
    emoji: "🧪",
    name: "Chemistry Master",
    description: "Complete all Chemistry Lab levels",
    earned: false,
  },
  {
    id: 7,
    emoji: "🐻",
    name: "Animals & Plants Master",
    description: "Complete all Plants & Animals levels",
    earned: false,
  },
  {
    id: 8,
    emoji: "⚡",
    name: "Motion & Energy Master",
    description: "Complete all Motion & Energy levels",
    earned: false,
  },
  {
    id: 9,
    emoji: "🌟",
    name: "Rising Star",
    description: "Reach level 50",
    earned: false,
  },
  {
    id: 10,
    emoji: "💡",
    name: "Quick Thinker",
    description: "Complete 5 levels in a row",
    earned: true,
  },
  {
    id: 11,
    emoji: "🎯",
    name: "Perfect Score",
    description: "Get 100% on 10 quizzes",
    earned: false,
  },
  {
    id: 12,
    emoji: "🌈",
    name: "Explorer",
    description: "Try all 4 science topics",
    earned: true,
  },
  {
    id: 13,
    emoji: "📊",
    name: "Data Master",
    description: "Complete 20 levels total",
    earned: false,
  },
  {
    id: 14,
    emoji: "🧠",
    name: "Brain Power",
    description: "Answer 100 questions correctly",
    earned: false,
  },
  {
    id: 15,
    emoji: "🎓",
    name: "Graduate",
    description: "Complete all levels in all topics",
    earned: false,
  },
  {
    id: 16,
    emoji: "🌍",
    name: "World Explorer",
    description: "Unlock all animals",
    earned: false,
  },
];

export default function BadgesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/child/dashboard")}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <span className="text-4xl">🏆</span>
              <h1
                className="text-3xl text-black"
                style={{ fontFamily: "Comic Sans MS, cursive" }}
              >
                My Badges
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 max-w-6xl mx-auto">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.id}
              className="h-full"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: index * 0.05,
              }}
              whileHover={{
                scale: badge.earned ? 1.1 : 1,
                rotate: badge.earned ? [0, -5, 5, -5, 0] : 0,
                transition: { duration: 0.3 },
              }}
            >
              <Card
                className={`rounded-2xl border-0 transition-all h-full flex flex-col ${
                  badge.earned
                    ? "shadow-xl bg-gradient-to-br from-purple-100 via-pink-100 to-purple-200 border-4 border-purple-300"
                    : "shadow-md bg-gray-100 opacity-60"
                }`}
              >
                <CardContent className="p-4 text-center flex flex-col justify-between h-full">
                  <div>
                    <motion.div
                      className="text-4xl mb-2"
                      animate={
                        badge.earned
                          ? {
                              rotate: [0, -10, 10, -10, 0],
                              scale: [1, 1.1, 1, 1.1, 1],
                            }
                          : {}
                      }
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                    >
                      {badge.emoji}
                    </motion.div>
                    <h3
                      className={`mb-1 text-xs ${badge.earned ? "text-purple-900" : "text-gray-600"}`}
                      style={{
                        fontFamily: "Comic Sans MS, cursive",
                      }}
                    >
                      {badge.name}
                    </h3>
                    <p
                      className={`text-[10px] ${badge.earned ? "text-purple-700" : "text-gray-500"}`}
                      style={{
                        fontFamily: "Comic Sans MS, cursive",
                      }}
                    >
                      {badge.description}
                    </p>
                  </div>

                  {/* The status badge stays at the bottom now */}
                  <div>
                    {badge.earned && (
                      <motion.div
                        className="mt-2 inline-block px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-[10px]"
                        style={{
                          fontFamily: "Comic Sans MS, cursive",
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: index * 0.05 + 0.3,
                          type: "spring",
                        }}
                      >
                        ✓ Earned
                      </motion.div>
                    )}
                    {!badge.earned && (
                      <div
                        className="mt-2 inline-block px-2 py-0.5 bg-gray-200 text-gray-600 rounded-full text-[10px]"
                        style={{
                          fontFamily: "Comic Sans MS, cursive",
                        }}
                      >
                        🔒 Locked
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}