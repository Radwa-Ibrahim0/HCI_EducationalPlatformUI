import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Sparkles, User } from "lucide-react";
import { motion } from "motion/react";
import backgroundImage from "figma:asset/196a4a9b2cf2ab63c97d762bd597697ab91096aa.png";

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
    emoji: "🐻",
    name: "Leo",
    color: "from-lime-400 to-lime-600",
  },
];

export default function ChildLanding() {
  const navigate = useNavigate();
  const [selectedAvatar, setSelectedAvatar] = useState<
    number | null
  >(null);
  const [isLaunching, setIsLaunching] = useState(false);

  const handleStartNow = () => {
    if (selectedAvatar) {
      // Save selected avatar to localStorage
      const avatar = avatars.find(
        (a) => a.id === selectedAvatar,
      );
      if (avatar) {
        localStorage.setItem(
          "selectedAvatar",
          JSON.stringify(avatar),
        );
      }

      setIsLaunching(true);
      setTimeout(() => {
        navigate("/child/dashboard");
      }, 1200); // Navigate after animation completes
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-white">
      {/* Background image with reduced opacity */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      {/* Removed overlay as we want lighter background */}

      {/* Decorative shapes */}
      {/* Removed decorative shapes as we have background image */}

      {/* Parent Portal Link - Top Left */}
      <div className="absolute top-8 left-8 z-20">
        <Button
          variant="outline"
          onClick={() => navigate("/parent")}
          className="bg-white/90 backdrop-blur-sm hover:bg-white border-2 border-purple-800 gap-2 rounded-full px-6"
        >
          <User className="w-4 h-4" />
          Parent Portal
        </Button>
      </div>

      {/* Logo */}
      <div className="absolute top-8 right-8 flex items-center gap-3">
        <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-purple-900" />
        </div>
        <span
          className="text-2xl text-purple-950"
          style={{ fontFamily: "Comic Sans MS, cursive" }}
        >
          Spectrum
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center mb-12">
          <h1
            className="text-6xl mb-4 text-black"
            style={{ fontFamily: "Comic Sans MS, cursive" }}
          >
            Welcome, Explorer!
          </h1>
          {/* <p className="text-2xl text-black" style={{ fontFamily: 'Comic Sans MS, cursive' }}>Choose your character</p> */}
        </div>

        {/* Avatar placeholders */}
        <div className="flex gap-12 mb-12">
          {avatars.map((avatar) => (
            <div
              key={avatar.id}
              onClick={() => setSelectedAvatar(avatar.id)}
              className={`flex flex-col items-center gap-3 cursor-pointer transform transition-all ${
                selectedAvatar === avatar.id
                  ? "scale-125"
                  : "scale-100 hover:scale-110"
              }`}
            >
              <div
                className={`w-40 h-40 rounded-full bg-gradient-to-br ${avatar.color} shadow-xl flex items-center justify-center relative ${
                  selectedAvatar === avatar.id
                    ? "ring-8 ring-yellow-400 ring-offset-4 ring-offset-purple-200"
                    : ""
                }`}
              >
                <span className="text-6xl">{avatar.emoji}</span>
                {selectedAvatar === avatar.id && (
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                    <span className="text-2xl">✓</span>
                  </div>
                )}
              </div>
              <span
                className={`text-xl text-black`}
                style={{ fontFamily: "Comic Sans MS, cursive" }}
              >
                {avatar.name}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          animate={
            isLaunching
              ? {
                  scale: [1, 1.1, 0.95, 1.05, 1],
                  opacity: [1, 1, 1, 0.8, 0],
                }
              : {}
          }
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <Button
            size="lg"
            disabled={selectedAvatar === null}
            className={`px-12 py-6 text-2xl rounded-full shadow-2xl transition-all ${
              selectedAvatar
                ? "bg-purple-500 hover:bg-purple-600 text-white transform hover:scale-105"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            style={{ fontFamily: "Comic Sans MS, cursive" }}
            onClick={handleStartNow}
          >
            <span className="flex items-center gap-3">
              🚀
              {selectedAvatar
                ? "Start Now!"
                : "Choose a Character First"}
            </span>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}