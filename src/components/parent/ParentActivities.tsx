import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Button } from "../ui/button";
import { CheckCircle, Beaker, Rocket, Star, Sparkles, Leaf, Zap } from "lucide-react";
import { toast } from "sonner";

// Activities/Missions Data
const activitiesData = [
  {
    id: 1,
    title: "Volcano Experiment",
    category: "Chemistry",
    emoji: "🌋",
    duration: "30 min",
    difficulty: "Easy",
    color: "from-red-500 to-orange-500",
    bgColor: "bg-red-50",
    borderColor: "border-red-300",
    description:
      "Create an erupting volcano using baking soda and vinegar! Watch the chemical reaction create lava-like foam.",
    materials: [
      "Baking soda",
      "Vinegar",
      "Food coloring",
      "Dish soap",
      "Small bottle or cup",
    ],
    steps: [
      "Place bottle in center of tray",
      "Add 2 tbsp baking soda to bottle",
      "Add drops of food coloring and dish soap",
      "Pour vinegar and watch it erupt!",
    ],
  },
  {
    id: 2,
    title: "Stargazing Night",
    category: "Space",
    emoji: "🔭",
    duration: "45 min",
    difficulty: "Easy",
    color: "from-indigo-500 to-purple-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-300",
    description:
      "Explore the night sky together! Identify constellations and learn about the stars and planets visible tonight.",
    materials: [
      "Stargazing app (optional)",
      "Blanket",
      "Flashlight with red filter",
      "Star chart",
    ],
    steps: [
      "Find a dark spot away from lights",
      "Let eyes adjust for 10-15 minutes",
      "Locate the North Star and Big Dipper",
      "Identify 3 constellations together",
    ],
  },
  {
    id: 3,
    title: "Plant Growth Race",
    category: "Nature",
    emoji: "🌱",
    duration: "10 days",
    difficulty: "Medium",
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-300",
    description:
      "Plant beans in different conditions and observe which grows fastest! Learn about what plants need to thrive.",
    materials: [
      "Bean seeds (6-9)",
      "Small pots (3)",
      "Soil",
      "Water",
      "Sunny windowsill",
    ],
    steps: [
      "Plant 3 beans in each pot",
      "Put one in sunlight, one in shade, one in dark",
      "Water regularly and measure growth daily",
      "Record observations in a journal",
    ],
  },
  {
    id: 4,
    title: "Rainbow in a Glass",
    category: "Physics",
    emoji: "🌈",
    duration: "20 min",
    difficulty: "Medium",
    color: "from-pink-500 to-purple-500",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-300",
    description:
      "Create a rainbow using sugar water density! Stack different colored layers to see the rainbow effect.",
    materials: [
      "5 clear glasses",
      "Sugar",
      "Water",
      "Food coloring",
      "Spoon",
      "Tall glass",
    ],
    steps: [
      "Make 5 sugar solutions with different concentrations",
      "Add different food coloring to each",
      "Carefully layer densest (most sugar) to lightest",
      "Watch the rainbow form!",
    ],
  },
  {
    id: 5,
    title: "Static Electricity Magic",
    category: "Physics",
    emoji: "⚡",
    duration: "15 min",
    difficulty: "Easy",
    color: "from-yellow-400 to-orange-500",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-300",
    description:
      "Bend water with static electricity! Rub a balloon on your hair and watch it attract water from a faucet.",
    materials: ["Balloon", "Wool cloth or your hair", "Running water tap"],
    steps: [
      "Inflate balloon and tie it",
      "Rub balloon on hair for 30 seconds",
      "Turn on water to thin stream",
      "Hold balloon near water and watch it bend!",
    ],
  },
  {
    id: 6,
    title: "Crystal Garden",
    category: "Chemistry",
    emoji: "💎",
    duration: "3-5 days",
    difficulty: "Hard",
    color: "from-cyan-500 to-blue-600",
    bgColor: "bg-cyan-50",
    borderColor: "border-cyan-300",
    description:
      "Grow beautiful crystals overnight! Create stunning salt or sugar crystals and learn about crystallization.",
    materials: [
      "Epsom salt or table salt",
      "Boiling water",
      "Glass jar",
      "String",
      "Pencil",
      "Food coloring (optional)",
    ],
    steps: [
      "Dissolve salt in boiling water until saturated",
      "Add food coloring if desired",
      "Tie string to pencil, hang in jar",
      "Wait 24-48 hours for crystals to form",
    ],
  },
  {
    id: 7,
    title: "Paper Airplane Contest",
    category: "Engineering",
    emoji: "✈️",
    duration: "40 min",
    difficulty: "Easy",
    color: "from-blue-400 to-cyan-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-300",
    description:
      "Design and build paper airplanes! Test different designs and see which flies the farthest.",
    materials: [
      "Paper (8-10 sheets)",
      "Ruler",
      "Tape measure",
      "Open space",
    ],
    steps: [
      "Research 3 different airplane designs",
      "Build each design carefully",
      "Test fly each airplane 3 times",
      "Measure distances and declare a winner!",
    ],
  },
  {
    id: 8,
    title: "Shadow Science",
    category: "Light & Shadow",
    emoji: "🔦",
    duration: "25 min",
    difficulty: "Easy",
    color: "from-gray-600 to-slate-700",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-300",
    description:
      "Explore how shadows work! Use a flashlight to create shadow puppets and learn about light and darkness.",
    materials: [
      "Flashlight",
      "White wall or sheet",
      "Various objects",
      "Hands for shadow puppets",
    ],
    steps: [
      "Set up flashlight and white surface",
      "Experiment with distance from light source",
      "Create shadow puppets with hands",
      "Measure and compare shadow sizes",
    ],
  },
];

interface ParentActivitiesProps {
  childName: string;
}

export default function ParentActivities({ childName }: ParentActivitiesProps) {
  const [completedActivities, setCompletedActivities] = useState<number[]>([]);

  useEffect(() => {
    // Load completed activities from localStorage
    const saved = localStorage.getItem("completedParentActivities");
    if (saved) {
      setCompletedActivities(JSON.parse(saved));
    }
  }, []);

  const toggleActivity = (id: number) => {
    let updated: number[];
    if (completedActivities.includes(id)) {
      updated = completedActivities.filter((activityId) => activityId !== id);
      toast.info("Activity marked as incomplete");
    } else {
      updated = [...completedActivities, id];
      toast.success("Great job! Activity completed! 🎉");
    }
    setCompletedActivities(updated);
    localStorage.setItem("completedParentActivities", JSON.stringify(updated));
  };

  const completedCount = completedActivities.length;
  const totalCount = activitiesData.length;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Beaker className="w-7 h-7 text-purple-500" />
            Family Activities & Experiments
          </h2>
          <p className="text-slate-600 mt-1">
            Fun hands-on activities to do together with {childName}
          </p>
        </div>
        <Card className="border-0 shadow-md bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              <div>
                <p className="text-xs opacity-90">Completed</p>
                <p className="text-xl font-bold">
                  {completedCount}/{totalCount}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activitiesData.map((activity) => {
          const isCompleted = completedActivities.includes(activity.id);

          return (
            <Card
              key={activity.id}
              className={`border-2 ${activity.borderColor} ${
                isCompleted ? "opacity-75" : ""
              } shadow-lg rounded-2xl overflow-hidden transition-all hover:scale-105 hover:shadow-xl relative`}
            >
              {/* Completed Badge */}
              {isCompleted && (
                <div className="absolute top-3 right-3 z-10 bg-green-500 text-white rounded-full p-2 shadow-lg">
                  <CheckCircle className="w-5 h-5" />
                </div>
              )}

              {/* Header with gradient */}
              <div
                className={`p-4 bg-gradient-to-r ${activity.color} text-white`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{activity.emoji}</span>
                  <div>
                    <h3 className="font-bold text-lg leading-tight">
                      {activity.title}
                    </h3>
                    <p className="text-xs opacity-90">{activity.category}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <CardContent className="p-4 space-y-4">
                {/* Meta Info */}
                <div className="flex gap-2 text-xs">
                  <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-full">
                    ⏱️ {activity.duration}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full ${
                      activity.difficulty === "Easy"
                        ? "bg-green-100 text-green-700"
                        : activity.difficulty === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {activity.difficulty}
                  </span>
                </div>

                {/* Description */}
                <p className="text-slate-700 text-sm leading-relaxed">
                  {activity.description}
                </p>

                {/* Materials */}
                <div>
                  <p className="font-semibold text-slate-900 text-sm mb-2">
                    📦 Materials:
                  </p>
                  <ul className="text-xs text-slate-600 space-y-1">
                    {activity.materials.slice(0, 3).map((material, idx) => (
                      <li key={idx} className="flex items-center gap-1">
                        <span className="text-purple-500">•</span> {material}
                      </li>
                    ))}
                    {activity.materials.length > 3 && (
                      <li className="text-slate-400 italic">
                        +{activity.materials.length - 3} more...
                      </li>
                    )}
                  </ul>
                </div>

                {/* Steps Preview */}
                <div>
                  <p className="font-semibold text-slate-900 text-sm mb-2">
                    📝 Steps:
                  </p>
                  <ol className="text-xs text-slate-600 space-y-1">
                    {activity.steps.slice(0, 2).map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="font-semibold text-purple-500 min-w-[16px]">
                          {idx + 1}.
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                    {activity.steps.length > 2 && (
                      <li className="text-slate-400 italic pl-5">
                        +{activity.steps.length - 2} more steps...
                      </li>
                    )}
                  </ol>
                </div>

                {/* Action Button */}
                <Button
                  onClick={() => toggleActivity(activity.id)}
                  className={`w-full rounded-xl transition-all ${
                    isCompleted
                      ? "bg-slate-200 text-slate-700 hover:bg-slate-300"
                      : "bg-gradient-to-r " +
                        activity.color +
                        " text-white hover:opacity-90"
                  }`}
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark as Incomplete
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Mark as Complete
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
