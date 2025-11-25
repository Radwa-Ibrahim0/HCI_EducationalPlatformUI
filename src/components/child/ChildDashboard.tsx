import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  Award,
  Pencil,
  Flame,
  Sparkles,
  Palette,
  X,
  Smile,
  Crown,
  Shirt,
  Trophy,
  ArrowLeft,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { motion, AnimatePresence } from "motion/react";
import Whiteboard from "./Whiteboard";
import ArtGallery from "./ArtGallery";
import chemistryLabImage from "figma:asset/68a9acf528718f6068bab2b1ae25cd8d18c46dae.png";
import spaceImage from "figma:asset/03862b3125866cb9a48fe7b6c1a95676f555f868.png";
import plantsAnimalsImage from "figma:asset/48441a60652e466f8415c7e490b1a52aef685374.png";
import motionEnergyImage from "figma:asset/0354ecccafa3ff1ee20bc7cb3dd650aabca15393.png";

const activities = [
  {
    id: 1,
    title: "Space Explorer",
    image: spaceImage,
    color: "from-purple-400 to-indigo-600",
    route: "/child/progress/space",
    description:
      "Explore the vastness of space and learn about planets, stars, and galaxies.",
  },
  {
    id: 2,
    title: "Chemistry Lab",
    image: chemistryLabImage,
    color: "from-pink-400 to-pink-600",
    route: "/child/progress/chemistry",
    description:
      "Conduct experiments and learn about chemical reactions and elements.",
  },
  {
    id: 3,
    title: "Plants & Animals",
    image: plantsAnimalsImage,
    color: "from-blue-400 to-cyan-600",
    route: "/child/progress/nature",
    description:
      "Discover the wonders of nature through plants and animals.",
  },
  {
    id: 4,
    title: "Motion & Energy",
    image: motionEnergyImage,
    color: "from-orange-400 to-red-600",
    route: "/child/progress/motion",
    description:
      "Understand the principles of motion and energy in everyday objects.",
  },
];

const avatars = [
  {
    id: 1,
    emoji: "🐱",
    name: "Oliver",
    color: "from-orange-400 to-orange-600",
  },
  {
    id: 2,
    emoji: "🐶",
    name: "Lily",
    color: "from-blue-400 to-blue-600",
  },
  {
    id: 3,
    emoji: "🦖",
    name: "Leo",
    color: "from-lime-400 to-lime-600",
  },
];

const hats = [
  { id: 1, emoji: "🎩", name: "Top Hat", unlocked: true },
  { id: 2, emoji: "👑", name: "Crown", unlocked: true },
  { id: 3, emoji: "🧢", name: "Cap", unlocked: true },
  {
    id: 4,
    emoji: "🎓",
    name: "Graduation Cap",
    unlocked: false,
  },
  { id: 5, emoji: "👒", name: "Sun Hat", unlocked: false },
  { id: 6, emoji: "⛑️", name: "Helmet", unlocked: true },
];

const accessories = [
  { id: 1, emoji: "😎", name: "Sunglasses", unlocked: true },
  { id: 2, emoji: "🎀", name: "Bow", unlocked: true },
  { id: 3, emoji: "👓", name: "Glasses", unlocked: true },
  { id: 4, emoji: "🎭", name: "Mask", unlocked: false },
  { id: 5, emoji: "💎", name: "Diamond", unlocked: false },
  { id: 6, emoji: "⭐", name: "Star", unlocked: true },
];

const clothes = [
  { id: 1, emoji: "👕", name: "T-Shirt", unlocked: true },
  { id: 2, emoji: "👔", name: "Tie", unlocked: true },
  { id: 3, emoji: "🎽", name: "Jersey", unlocked: true },
  { id: 4, emoji: "🦺", name: "Vest", unlocked: false },
  { id: 5, emoji: "👘", name: "Kimono", unlocked: false },
  { id: 6, emoji: "🧥", name: "Jacket", unlocked: true },
];

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
    emoji: "📚",
    name: "Bookworm",
    description: "Read 20 stories",
    earned: false,
  },
  {
    id: 6,
    emoji: "🧪",
    name: "Scientist",
    description: "Complete all science levels",
    earned: false,
  },
  {
    id: 7,
    emoji: "🎵",
    name: "Music Master",
    description: "Finish music course",
    earned: false,
  },
  {
    id: 8,
    emoji: "🌟",
    name: "Rising Star",
    description: "Reach level 50",
    earned: false,
  },
];

const factsOfTheDay = [
  "Did you know? The sun is so big that 1.3 million Earths can fit inside it!",
  "Fun fact: Honey never spoils! Archaeologists found 3000-year-old honey in Egyptian tombs that was still edible.",
  "Amazing! Octopuses have three hearts and blue blood!",
  "Wow! A bolt of lightning is five times hotter than the surface of the sun!",
  "Cool fact: Butterflies can taste with their feet!",
  "Did you know? Water can boil and freeze at the same time in a special condition called the triple point!",
  "Fun fact: A group of flamingos is called a 'flamboyance'!",
];

export default function ChildDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("activities");
  const [avatarSubTab, setAvatarSubTab] = useState("hats");
  const [streak, setStreak] = useState(7);
  const [displayedStreak, setDisplayedStreak] = useState(0);
  const [showStreakAnimation, setShowStreakAnimation] =
    useState(false);
  const [hasIncrementedStreak, setHasIncrementedStreak] =
    useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(() => {
    const saved = localStorage.getItem("selectedAvatar");
    return saved ? JSON.parse(saved) : avatars[0];
  });
  const [selectedHat, setSelectedHat] = useState<number | null>(
    () => {
      const saved = localStorage.getItem("avatarCustomization");
      return saved ? JSON.parse(saved).hatId : 2;
    },
  );
  const [selectedAccessory, setSelectedAccessory] = useState<
    number | null
  >(() => {
    const saved = localStorage.getItem("avatarCustomization");
    return saved ? JSON.parse(saved).accessoryId : 1;
  });
  const [selectedClothes, setSelectedClothes] = useState<
    number | null
  >(1);
  const [factOfTheDay] = useState(() => {
    return factsOfTheDay[
      Math.floor(Math.random() * factsOfTheDay.length)
    ];
  });
  const [showFact, setShowFact] = useState(true);

  const currentHat = hats.find((h) => h.id === selectedHat);
  const currentAccessory = accessories.find(
    (a) => a.id === selectedAccessory,
  );
  const currentClothes = clothes.find(
    (c) => c.id === selectedClothes,
  );

  useEffect(() => {
    if (!hasIncrementedStreak) {
      setStreak(8);
      setHasIncrementedStreak(true);
    }
  }, [hasIncrementedStreak]);

  useEffect(() => {
    let current = 0;
    const increment = streak / 20;
    const timer = setInterval(() => {
      current += increment;
      if (current >= streak) {
        setDisplayedStreak(streak);
        clearInterval(timer);
        setShowStreakAnimation(true);
        setTimeout(() => setShowStreakAnimation(false), 800);
      } else {
        setDisplayedStreak(Math.floor(current));
      }
    }, 50);

    return () => clearInterval(timer);
  }, [streak]);

  const handleActivityClick = (route: string) => {
    navigate(route);
  };

  const handleTabChange = (value: string) => {
    if (value === "whiteboard") {
      navigate("/child/whiteboard");
    } else if (value === "gallery") {
      navigate("/child/gallery");
    } else if (value === "avatar") {
      navigate("/child/avatar");
    } else if (value === "badges") {
      navigate("/child/badges");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/users")} // Or navigate(-1)
              className="mr-2"
            >
              <ArrowLeft className="w-6 h-6 text-purple-950" />
            </Button>
            {/* Navigation Tabs */}
            <div className="flex-1">
              <div
                className="bg-purple-100 p-1 rounded-xl inline-flex gap-1"
                style={{ fontFamily: "Comic Sans MS, cursive" }}
              >
                <button
                  onClick={() => navigate("/child/dashboard")}
                  className="gap-2 rounded-lg px-4 py-2 bg-white flex items-center gap-2"
                >
                  <Award className="w-4 h-4" />
                  Activities
                </button>
                <button
                  onClick={() => navigate("/child/whiteboard")}
                  className="gap-2 rounded-lg px-4 py-2 hover:bg-white/50 flex items-center gap-2"
                >
                  <Pencil className="w-4 h-4" />
                  Whiteboard
                </button>
                <button
                  onClick={() => navigate("/child/gallery")}
                  className="gap-2 rounded-lg px-4 py-2 hover:bg-white/50 flex items-center gap-2"
                >
                  <Palette className="w-4 h-4" />
                  Art Gallery
                </button>
                <button
                  onClick={() => navigate("/child/avatar")}
                  className="gap-2 rounded-lg px-4 py-2 hover:bg-white/50 flex items-center gap-2"
                >
                  <Smile className="w-4 h-4" />
                  My Avatar
                </button>
                <button
                  onClick={() => navigate("/child/badges")}
                  className="gap-2 rounded-lg px-4 py-2 hover:bg-white/50 flex items-center gap-2"
                >
                  <Trophy className="w-4 h-4" />
                  My Badges
                </button>
              </div>
            </div>

            {/* Day Streak */}
            <motion.div
              className="flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full"
              animate={
                showStreakAnimation
                  ? {
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, -5, 0],
                    }
                  : {}
              }
              transition={{ duration: 0.5 }}
            >
              <Flame className="w-5 h-5 text-orange-500" />
              <span
                className="text-orange-700"
                style={{ fontFamily: "Comic Sans MS, cursive" }}
              >
                {displayedStreak} Day Streak! 🔥
              </span>
            </motion.div>

            {/* Logo Circle with Name */}

            <button
              onClick={() => navigate("/users")} // Add navigation here
              className="flex items-center gap-2 flex-shrink-0 hover:opacity-80 transition-opacity" // Add hover effect
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-700 to-pink-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span
                className="text-2xl text-purple-950"
                style={{ fontFamily: "Comic Sans MS, cursive" }}
              >
                Spectrum
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <h2
            className="text-5xl text-black"
            style={{ fontFamily: "Comic Sans MS, cursive" }}
          >
            Choose Your Adventure!
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {activities.map((activity) => (
            <Card
              key={activity.id}
              className="overflow-hidden cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl border-0 rounded-2xl"
              onClick={() =>
                handleActivityClick(activity.route)
              }
            >
              <div
                className={`h-48 bg-gradient-to-br ${activity.color} relative overflow-hidden`}
              >
                <ImageWithFallback
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-full object-cover opacity-70 mix-blend-overlay"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl">
                    {activity.id === 1 && "🚀"}
                    {activity.id === 2 && "🧪"}
                    {activity.id === 3 && "🐘"}
                    {activity.id === 4 && "🚴"}
                  </span>
                </div>
              </div>
              <CardHeader className="text-center pb-6 pt-3">
                <CardTitle
                  className="text-3xl text-black"
                  style={{
                    fontFamily: "Comic Sans MS, cursive",
                  }}
                >
                  {activity.title}
                </CardTitle>
                <CardDescription className="text-gray-500 mt-2">
                  {activity.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </main>

      {/* Mascot with Fact of the Day - Bottom Right */}
      {activeTab === "activities" && (
        <motion.div
          className="fixed bottom-8 right-8 z-40 flex items-end gap-4"
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            delay: 0.5,
            duration: 0.8,
            type: "spring",
          }}
        >
          {/* Speech Bubble */}
          <AnimatePresence>
            {showFact && (
              <motion.div
                className="bg-white rounded-2xl shadow-xl p-4 max-w-sm relative border-4 border-purple-300"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3, type: "spring" }}
              >
                <button
                  onClick={() => setShowFact(false)}
                  className="absolute -top-2 -right-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-full p-1.5 shadow-lg transition-colors z-10"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="absolute -right-3 bottom-8 w-0 h-0 border-t-[15px] border-t-transparent border-l-[20px] border-l-purple-300 border-b-[15px] border-b-transparent"></div>
                <div className="absolute -right-2 bottom-8 w-0 h-0 border-t-[13px] border-t-transparent border-l-[18px] border-l-white border-b-[13px] border-b-transparent"></div>

                <h3
                  className="text-purple-900 mb-2"
                  style={{
                    fontFamily: "Comic Sans MS, cursive",
                  }}
                >
                  💡 Fact of the Day
                </h3>
                <p
                  className="text-gray-700 text-sm"
                  style={{
                    fontFamily: "Comic Sans MS, cursive",
                  }}
                >
                  {factOfTheDay}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mascot Avatar */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            }}
            className="flex-shrink-0 cursor-pointer"
            onClick={() => setShowFact(true)}
          >
            <div
              className={`w-24 h-24 rounded-full bg-gradient-to-br ${selectedAvatar.color} shadow-2xl flex items-center justify-center border-4 border-white`}
            >
              <span className="text-5xl">
                {selectedAvatar.emoji}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}