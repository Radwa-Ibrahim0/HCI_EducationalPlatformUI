import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
  ArrowLeft,
  Pencil,
  Eraser,
  Undo2,
  Redo2,
  Trash2,
  Download,
  ImagePlus,
  Sparkles,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const colors = [
  { name: "Black", value: "#000000" },
  { name: "Red", value: "#ef4444" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Green", value: "#10b981" },
  { name: "Yellow", value: "#fbbf24" },
  { name: "Purple", value: "#a855f7" },
  { name: "Orange", value: "#f97316" },
  { name: "Pink", value: "#ec4899" },
];

const drawingSuggestions = [
  "Try drawing a colorful rainbow with light refraction!",
  "How about drawing a solar system with all the planets?",
  "Can you draw a volcano erupting with lava?",
  "Draw a plant cell with all its parts!",
  "Try drawing the water cycle - evaporation, clouds, and rain!",
  "Can you draw a magnet attracting metal objects?",
  "How about drawing a food chain in nature?",
  "Draw atoms bonding together to make molecules!",
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
    emoji: "",
    name: "Leo",
    color: "from-lime-400 to-lime-600",
  },
];

export default function Whiteboard() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState("#000000");
  const [currentTool, setCurrentTool] = useState<
    "pen" | "eraser"
  >("pen");
  const [lineWidth, setLineWidth] = useState(5);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showSuggestion, setShowSuggestion] = useState(true);
  const [suggestion, setSuggestion] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(() => {
    // Get selected avatar from localStorage or default to first avatar
    const saved = localStorage.getItem("selectedAvatar");
    return saved ? JSON.parse(saved) : avatars[0];
  });

  useEffect(() => {
    // Set a random drawing suggestion
    const randomSuggestion =
      drawingSuggestions[
        Math.floor(Math.random() * drawingSuggestions.length)
      ];
    setSuggestion(randomSuggestion);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      // Fill with white background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    return () =>
      window.removeEventListener("resize", setCanvasSize);
  }, []);

  const startDrawing = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
  ) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x =
      "touches" in e
        ? e.touches[0].clientX - rect.left
        : e.clientX - rect.left;
    const y =
      "touches" in e
        ? e.touches[0].clientY - rect.top
        : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
  ) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x =
      "touches" in e
        ? e.touches[0].clientX - rect.left
        : e.clientX - rect.left;
    const y =
      "touches" in e
        ? e.touches[0].clientY - rect.top
        : e.clientY - rect.top;

    ctx.strokeStyle =
      currentTool === "eraser" ? "#ffffff" : currentColor;
    ctx.lineWidth = currentTool === "eraser" ? 20 : lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const downloadDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "my-drawing.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  const saveToGallery = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Save to localStorage (simulating gallery storage)
    const imageData = canvas.toDataURL();
    const savedArt = JSON.parse(
      localStorage.getItem("artGallery") || "[]",
    );
    savedArt.push({
      id: Date.now(),
      image: imageData,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      title: `Masterpiece ${savedArt.length + 1}`,
    });
    localStorage.setItem(
      "artGallery",
      JSON.stringify(savedArt),
    );

    // Show celebration popup
    setShowCelebration(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
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
                <span className="text-4xl">✏️</span>
                <h1
                  className="text-3xl text-black"
                  style={{
                    fontFamily: "Comic Sans MS, cursive",
                  }}
                >
                  My Whiteboard
                </h1>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={saveToGallery}
                className="rounded-full gap-2 bg-purple-500 hover:bg-purple-600 text-white"
                style={{ fontFamily: "Comic Sans MS, cursive" }}
              >
                <ImagePlus className="w-4 h-4" />
                Add to Gallery
              </Button>
              <Button
                variant="outline"
                onClick={downloadDrawing}
                className="rounded-full gap-2"
                style={{ fontFamily: "Comic Sans MS, cursive" }}
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Side by Side Layout */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Toolbar - Left Side */}
          <Card className="w-64 p-4 rounded-2xl border-4 border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50 shadow-2xl h-fit sticky top-6">
            <h2
              className="text-2xl text-black mb-3 text-center"
              style={{ fontFamily: "Comic Sans MS, cursive" }}
            >
              🖌️Tools
            </h2>

            {/* Tools */}
            <div className="flex gap-2 mb-2">
              <Button
                size="lg"
                variant={
                  currentTool === "pen" ? "default" : "outline"
                }
                onClick={() => setCurrentTool("pen")}
                className="flex-1 rounded-full"
                style={{ fontFamily: "Comic Sans MS, cursive" }}
              >
                <Pencil className="w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant={
                  currentTool === "eraser"
                    ? "default"
                    : "outline"
                }
                onClick={() => setCurrentTool("eraser")}
                className="flex-1 rounded-full"
                style={{ fontFamily: "Comic Sans MS, cursive" }}
              >
                <Eraser className="w-5 h-5" />
              </Button>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mb-4">
              <Button
                variant="outline"
                className="flex-1 rounded-full"
                title="Undo"
                style={{ fontFamily: "Comic Sans MS, cursive" }}
              >
                <Undo2 className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                className="flex-1 rounded-full"
                title="Redo"
                style={{ fontFamily: "Comic Sans MS, cursive" }}
              >
                <Redo2 className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                onClick={clearCanvas}
                className="flex-1 rounded-full text-red-500 hover:text-red-600 hover:bg-red-50"
                title="Clear All"
                style={{ fontFamily: "Comic Sans MS, cursive" }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            {/* Colors */}
            <div className="mb-4">
              <h3
                className="text-lg text-black mb-2 text-center"
                style={{ fontFamily: "Comic Sans MS, cursive" }}
              >
                🎨 Colors
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => {
                      setCurrentColor(color.value);
                      setCurrentTool("pen");
                    }}
                    className={`w-12 h-12 rounded-full border-4 transition-transform hover:scale-110 ${
                      currentColor === color.value &&
                      currentTool === "pen"
                        ? "border-purple-500 scale-110"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Line Width */}
            {currentTool === "pen" && (
              <div className="mb-4">
                <h3
                  className="text-lg text-black mb-2 text-center"
                  style={{
                    fontFamily: "Comic Sans MS, cursive",
                  }}
                >
                  📏 Size
                </h3>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={lineWidth}
                  onChange={(e) =>
                    setLineWidth(Number(e.target.value))
                  }
                  className="w-full"
                />
                <p
                  className="text-center text-sm text-black mt-2"
                  style={{
                    fontFamily: "Comic Sans MS, cursive",
                  }}
                >
                  {lineWidth}px
                </p>
              </div>
            )}
          </Card>

          {/* Canvas - Right Side */}
          <div className="flex-1">
            <h2
              className="text-4xl text-black mb-4 text-center"
              style={{ fontFamily: "Comic Sans MS, cursive" }}
            >
              Create your masterpiece!
            </h2>
            <Card className="overflow-hidden rounded-2xl border-4 border-gray-300 shadow-2xl">
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-full bg-white"
                style={{
                  height: "500px",
                  touchAction: "none",
                  cursor:
                    currentTool === "pen"
                      ? "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23000000' stroke-width='2'><path d='M12 19l7-7 3 3-7 7-3-3z'/><path d='M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z'/><path d='M2 2l7.586 7.586'/></svg>\") 2 18, crosshair"
                      : "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23000000' stroke-width='2'><rect x='3' y='3' width='18' height='18' rx='2'/><path d='M3 9h18'/><path d='M9 21V9'/></svg>\") 10 10, crosshair",
                }}
              />
            </Card>

            {/* Mascot with Drawing Suggestion */}
            <div className="fixed bottom-6 right-6 flex items-end gap-4 z-40">
              {/* Speech Bubble */}
              <AnimatePresence>
                {showSuggestion && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: 20 }}
                    className="relative bg-white rounded-3xl p-4 shadow-xl border-4 border-purple-300 max-w-xs"
                  >
                    {/* Close Button */}
                    <button
                      onClick={() => setShowSuggestion(false)}
                      className="absolute -top-2 -right-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-full p-1.5 shadow-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <p
                      className="text-lg text-black"
                      style={{
                        fontFamily: "Comic Sans MS, cursive",
                      }}
                    >
                      {suggestion}
                    </p>

                    {/* Speech bubble tail */}
                    <div className="absolute -bottom-3 right-8 w-6 h-6 bg-white border-r-4 border-b-4 border-purple-300 transform rotate-45"></div>
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
                onClick={() => setShowSuggestion(true)}
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
          </div>
        </div>
      </main>

      {/* Celebration Popup */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowCelebration(false)}
          >
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 10 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-3xl p-8 max-w-md mx-4 shadow-2xl border-4 border-purple-300 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowCelebration(false)}
                className="absolute -top-2 -right-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-full p-1.5 shadow-lg transition-colors z-10"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Confetti Effect */}
              <div className="text-center mb-6">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 10, 0] }}
                  transition={{ duration: 0.5, repeat: 3 }}
                  className="text-8xl mb-4"
                >
                  🎉
                </motion.div>
                <h2
                  className="text-4xl text-black mb-2"
                  style={{
                    fontFamily: "Comic Sans MS, cursive",
                  }}
                >
                  Amazing Work!
                </h2>
                <p
                  className="text-xl text-black"
                  style={{
                    fontFamily: "Comic Sans MS, cursive",
                  }}
                >
                  Your masterpiece has been saved to the
                  gallery! 🌟
                </p>
              </div>

              {/* Mascot celebrating with sparkles */}
              <div className="flex justify-center items-center mb-6 relative">
                {/* Left Sparkle */}
                <motion.div
                  animate={{
                    y: [-8, 8, -8],
                    rotate: [0, 15, -15, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                  className="absolute left-16 top-2"
                >
                  <Sparkles className="w-10 h-10 text-yellow-400" />
                </motion.div>

                {/* Mascot */}
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

                {/* Right Sparkle */}
                <motion.div
                  animate={{
                    y: [12, -12, 12],
                    rotate: [-15, 15, -15],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                  }}
                  className="absolute right-20 bottom-4"
                >
                  <Sparkles className="w-8 h-8 text-pink-400" />
                </motion.div>
              </div>

              {/* Button */}
              <Button
                onClick={() => navigate("/child/gallery")}
                className="w-full py-6 text-xl rounded-full bg-purple-500 hover:bg-purple-600 text-white"
                style={{ fontFamily: "Comic Sans MS, cursive" }}
              >
                Go to Gallery 🖼️
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}