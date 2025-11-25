import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  Palette,
  Settings,
  Clock,
  Shield,
  TrendingUp,
  Moon,
  Bell,
  User,
  LogOut,
  Activity,
  Zap,
  Star,
  Trophy,
  Sparkles,
  BarChart3,
  Award,
  Download,
  X,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Globe,
  RefreshCw,
  Beaker,
  Rocket,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";
import ParentGuide from "./ParentGuide";
import ParentActivities from "./ParentActivities";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { motion, AnimatePresence } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

// --- ART GALLERY ASSETS ---
import houseDrawing from "figma:asset/98f8c421c9c73fe487ea4e35a3eee261095c7dbe.png";
import catDrawing from "figma:asset/41c10b1bf826e3ad651cf56fb43f25a6c2720e01.png";
import birdDrawing from "figma:asset/ca195c2edbc3503ebd9accfdbf0c06d63c44c753.png";
import treeDrawing from "figma:asset/b059cd25525d337b0c6177d57723efc71893ffdb.png";
import mouseDrawing from "figma:asset/03a08cf0b23b02bedc9fcb98ed16356b5ac976ff.png";
import rainbowDrawing from "figma:asset/3b9e01f34957d73eded8241d3405f382ca528d29.png";
import whaleDrawing from "figma:asset/a274ca28f98902dac05dea8e5123e27830efc7dd.png";
import carDrawing from "figma:asset/61fb430f2bc5aa89a5810960af75f82200ce4a86.png";

// --- MOCK DATA ---
const weeklyProgressData = [
  { day: "Mon", hours: 1.5, activities: 4 },
  { day: "Tue", hours: 2, activities: 5 },
  { day: "Wed", hours: 1, activities: 3 },
  { day: "Thu", hours: 2.5, activities: 6 },
  { day: "Fri", hours: 1.5, activities: 4 },
  { day: "Sat", hours: 3, activities: 8 },
  { day: "Sun", hours: 2, activities: 5 },
];

const categoryProgressData = [
  {
    category: "Space Explorer",
    progress: 85,
    color: "#8b5cf6",
  },
  { category: "Chemistry Lab", progress: 65, color: "#db2777" },
  {
    category: "Plants & Animals",
    progress: 70,
    color: "#2563eb",
  },
  {
    category: "Motion & Energy",
    progress: 55,
    color: "#ea580c",
  },
];

const skillsData = [
  { skill: "Problem Solving", value: 85 },
  { skill: "Critical Thinking", value: 75 },
  { skill: "Creativity", value: 90 },
  { skill: "Memory", value: 70 },
  { skill: "Focus", value: 80 },
];

const defaultArtworks = [
  {
    id: 1,
    title: "My Dream House",
    date: "Nov 20, 2025",
    image: houseDrawing,
    likes: 15,
  },
  {
    id: 2,
    title: "Happy Cat",
    date: "Nov 19, 2025",
    image: catDrawing,
    likes: 18,
  },
  {
    id: 3,
    title: "Blue Bird",
    date: "Nov 18, 2025",
    image: birdDrawing,
    likes: 12,
  },
  {
    id: 4,
    title: "Tree & Flower",
    date: "Nov 17, 2025",
    image: treeDrawing,
    likes: 16,
  },
  {
    id: 5,
    title: "Little Mouse",
    date: "Nov 16, 2025",
    image: mouseDrawing,
    likes: 14,
  },
  {
    id: 6,
    title: "Rainbow Sky",
    date: "Nov 15, 2025",
    image: rainbowDrawing,
    likes: 20,
  },
  {
    id: 7,
    title: "Blue Whale",
    date: "Nov 14, 2025",
    image: whaleDrawing,
    likes: 22,
  },
  {
    id: 8,
    title: "Pink Car",
    date: "Nov 13, 2025",
    image: carDrawing,
    likes: 19,
  },
];

export default function EnhancedParentDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  // Settings State
  const [bedtimeEnabled, setBedtimeEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] =
    useState(true);
  const [contentFilteringEnabled, setContentFilteringEnabled] =
    useState(true);
  const [safeSearchEnabled, setSafeSearchEnabled] =
    useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(true);
  const [autoUpdates, setAutoUpdates] = useState(true);

  // User data - PREFILLED DEFAULTS
  const [parentName, setParentName] = useState("John Doe");
  const [parentEmail, setParentEmail] = useState(
    "john.doe@example.com",
  );
  const [childName, setChildName] = useState("Emma");
  const [childAge, setChildAge] = useState("8");

  // Art Gallery State
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedImage, setSelectedImage] = useState<
    (typeof defaultArtworks)[0] | null
  >(null);
  const [artworks, setArtworks] = useState(defaultArtworks);
  const itemsPerPage = 8;

  // Screen Time Dialog
  const [showScreenTimeDialog, setShowScreenTimeDialog] =
    useState(false);
  const [screenTimeLimit, setScreenTimeLimit] = useState(60);

  // Activities State
  const [completedActivities, setCompletedActivities] = useState<number[]>([]);

  useEffect(() => {
    // Check if local storage has data, otherwise keep defaults
    const account = localStorage.getItem("parentAccount");
    if (account) {
      const parsed = JSON.parse(account);
      if (parsed.name) setParentName(parsed.name);
      if (parsed.email) setParentEmail(parsed.email);
      if (parsed.childName) setChildName(parsed.childName);
      if (parsed.childAge) setChildAge(parsed.childAge);
    }

    // Art Data
    const savedArtworks = localStorage.getItem("artGallery");
    if (savedArtworks) {
      const parsed = JSON.parse(savedArtworks);
      setArtworks([...parsed, ...defaultArtworks]);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isParentLoggedIn");
    toast.success("Logged out successfully");
    navigate("/parent");
  };

  const handleSaveSettings = () => {
    const account = JSON.parse(
      localStorage.getItem("parentAccount") || "{}",
    );
    account.name = parentName;
    account.email = parentEmail;
    account.childName = childName;
    account.childAge = childAge;
    localStorage.setItem(
      "parentAccount",
      JSON.stringify(account),
    );
    localStorage.setItem("childName", childName);
    toast.success("Settings saved successfully!");
  };

  // Gallery Logic
  const totalPages = Math.ceil(artworks.length / itemsPerPage);
  const displayedArtworks = artworks.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 font-sans text-slate-900 pb-12">
      {/* HEADER */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Navigation Pills */}
            <div className="flex-1 overflow-x-auto">
              <div className="bg-purple-50 p-1 rounded-xl inline-flex gap-1 whitespace-nowrap">
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`gap-2 rounded-lg px-4 py-2 flex items-center text-sm font-medium transition-all ${
                    activeTab === "dashboard"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab("progress")}
                  className={`gap-2 rounded-lg px-4 py-2 flex items-center text-sm font-medium transition-all ${
                    activeTab === "progress"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  Progress
                </button>
                <button
                  onClick={() => setActiveTab("gallery")}
                  className={`gap-2 rounded-lg px-4 py-2 flex items-center text-sm font-medium transition-all ${
                    activeTab === "gallery"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                  }`}
                >
                  <Palette className="w-4 h-4" />
                  Art Gallery
                </button>
                <button
                  onClick={() => setActiveTab("activities")}
                  className={`gap-2 rounded-lg px-4 py-2 flex items-center text-sm font-medium transition-all ${
                    activeTab === "activities"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                  }`}
                >
                  <Beaker className="w-4 h-4" />
                  Activities
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`gap-2 rounded-lg px-4 py-2 flex items-center text-sm font-medium transition-all ${
                    activeTab === "settings"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
              </div>
            </div>

            {/* Right: Actions & Clickable Logo */}
            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <ParentGuide />
              </div>

              <Button
                variant="outline"
                onClick={handleLogout}
                className="text-slate-700 border-slate-200 hover:bg-slate-50 gap-2 rounded-xl"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>

              <button
                onClick={() => navigate("/child")}
                className="flex items-center gap-2 flex-shrink-0 hover:opacity-90 transition-opacity"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-md ring-2 ring-white">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-slate-900 hidden lg:block">
                  Spectrum
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* DASHBOARD TAB */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* Welcome Text */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Welcome back, {parentName}! 👋
              </h2>
            </div>

            {/* Main Grid Layout - Left (58%) / Right (42%) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* LEFT COLUMN: Stats (6) + Graph */}
              <div className="lg:col-span-7 space-y-6">
                {/* Row 1: 6 Stats Cards (3x2) */}
                <div className="grid grid-cols-3 gap-4">
                  <Card className="border-0 shadow-md bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl">
                    <CardContent className="p-4 flex flex-col justify-between h-full min-h-[90px]">
                      <div className="flex justify-between items-start">
                        <p className="text-blue-100 text-xs font-medium uppercase">
                          Total Hours
                        </p>
                        <Clock className="w-5 h-5 text-blue-200 opacity-50" />
                      </div>
                      <p className="text-2xl font-bold">
                        45.5h
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-md bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl">
                    <CardContent className="p-4 flex flex-col justify-between h-full min-h-[90px]">
                      <div className="flex justify-between items-start">
                        <p className="text-green-100 text-xs font-medium uppercase">
                          Levels Done
                        </p>
                        <Trophy className="w-5 h-5 text-green-200 opacity-50" />
                      </div>
                      <p className="text-2xl font-bold">24</p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-md bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-2xl">
                    <CardContent className="p-4 flex flex-col justify-between h-full min-h-[90px]">
                      <div className="flex justify-between items-start">
                        <p className="text-purple-100 text-xs font-medium uppercase">
                          Avg. Score
                        </p>
                        <Star className="w-5 h-5 text-purple-200 opacity-50" />
                      </div>
                      <p className="text-2xl font-bold">92%</p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-md bg-gradient-to-br from-orange-400 to-red-500 text-white rounded-2xl">
                    <CardContent className="p-4 flex flex-col justify-between h-full min-h-[90px]">
                      <div className="flex justify-between items-start">
                        <p className="text-orange-100 text-xs font-medium uppercase">
                          Streak
                        </p>
                        <Zap className="w-5 h-5 text-orange-200 opacity-50" />
                      </div>
                      <p className="text-2xl font-bold">
                        7 Days
                      </p>
                    </CardContent>
                  </Card>

                  {/* New Stat: Books Read */}
                  <Card className="border-0 shadow-md bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-2xl">
                    <CardContent className="p-4 flex flex-col justify-between h-full min-h-[90px]">
                      <div className="flex justify-between items-start">
                        <p className="text-pink-100 text-xs font-medium uppercase">
                          Books Read
                        </p>
                        <BookOpen className="w-5 h-5 text-pink-200 opacity-50" />
                      </div>
                      <p className="text-2xl font-bold">12</p>
                    </CardContent>
                  </Card>

                  {/* New Stat: Art Created */}
                  <Card className="border-0 shadow-md bg-gradient-to-br from-cyan-500 to-teal-600 text-white rounded-2xl">
                    <CardContent className="p-4 flex flex-col justify-between h-full min-h-[90px]">
                      <div className="flex justify-between items-start">
                        <p className="text-cyan-100 text-xs font-medium uppercase">
                          Art Created
                        </p>
                        <Palette className="w-5 h-5 text-cyan-200 opacity-50" />
                      </div>
                      <p className="text-2xl font-bold">8</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Row 2: Graph */}
                <Card className="border-0 shadow-sm bg-white rounded-2xl">
                  <CardHeader className="py-3 px-4 border-b border-slate-50">
                    <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
                      <Activity className="w-4 h-4 text-purple-500" />
                      Weekly Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="h-[200px]">
                      <ResponsiveContainer
                        width="100%"
                        height="100%"
                      >
                        <BarChart data={weeklyProgressData}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#f1f5f9"
                            vertical={false}
                          />
                          <XAxis
                            dataKey="day"
                            stroke="#94a3b8"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 12 }}
                          />
                          <YAxis
                            stroke="#94a3b8"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 12 }}
                          />
                          <Tooltip
                            cursor={{ fill: "#f8fafc" }}
                            contentStyle={{
                              borderRadius: "8px",
                              border: "none",
                              boxShadow:
                                "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                            }}
                          />
                          <Bar
                            dataKey="hours"
                            fill="#8b5cf6"
                            name="Hours"
                            radius={[4, 4, 0, 0]}
                            barSize={30}
                          />
                          <Bar
                            dataKey="activities"
                            fill="#ec4899"
                            name="Activities"
                            radius={[4, 4, 0, 0]}
                            barSize={30}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* RIGHT COLUMN: All Controls & Settings (1 big column) */}
              <div className="lg:col-span-5 space-y-6">
                <Card className="border-0 shadow-sm bg-white rounded-2xl h-full">
                  <CardHeader className="py-3 px-5 border-b border-slate-50">
                    {" "}
                    {/* Reduced padding here */}
                    <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <Settings className="w-5 h-5 text-slate-600" />
                      Control Center
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="p-6 space-y-8">
                    {/* Section 1: Screen Time */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-slate-900 font-semibold">
                        <Clock className="w-5 h-5 text-purple-500" />
                        <h3>Screen Time Monitor</h3>
                      </div>

                      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                        <div className="flex justify-between items-end mb-2">
                          <div className="text-4xl font-bold text-slate-900">
                            45m
                          </div>
                          <div className="text-sm text-slate-500 mb-1">
                            of 60m limit
                          </div>
                        </div>
                        <div className="h-4 w-full bg-slate-200 rounded-full overflow-hidden mb-3">
                          <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 w-[75%] rounded-full" />
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setShowScreenTimeDialog(true)
                          }
                          className="w-full border-slate-200 hover:bg-white text-slate-700"
                        >
                          Change Limit
                        </Button>
                      </div>
                    </div>

                    <div className="h-px bg-slate-100" />

                    {/* Section 2: Toggles */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-slate-900 font-semibold">
                        <Shield className="w-5 h-5 text-purple-500" />
                        <h3>Restrictions</h3>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                              <Moon className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-900">
                                Bedtime Mode
                              </p>
                              <p className="text-xs text-slate-500">
                                8:00 PM - 7:00 AM
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={bedtimeEnabled}
                            onCheckedChange={setBedtimeEnabled}
                          />
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                              <Bell className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-900">
                                Alerts
                              </p>
                              <p className="text-xs text-slate-500">
                                Push notifications
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={notificationsEnabled}
                            onCheckedChange={
                              setNotificationsEnabled
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* PROGRESS TAB */}
        {activeTab === "progress" && (
          <div className="space-y-6">
            {/* Row 1: Categories (Moved Up - 4 in a row) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categoryProgressData.map((cat) => (
                <Card
                  key={cat.category}
                  className="border-0 shadow-md bg-white rounded-2xl overflow-hidden"
                >
                  <div
                    className="h-1.5 w-full"
                    style={{ backgroundColor: cat.color }}
                  />
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base font-bold text-slate-900">
                        {cat.category}
                      </CardTitle>
                      <span
                        className="font-bold text-lg"
                        style={{ color: cat.color }}
                      >
                        {cat.progress}%
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full bg-slate-100 rounded-full h-3 mb-2">
                      <div
                        className="h-3 rounded-full transition-all duration-500"
                        style={{
                          width: `${cat.progress}%`,
                          backgroundColor: cat.color,
                        }}
                      />
                    </div>
                    <p className="text-xs text-slate-400 text-right">
                      12 / 20 Levels
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Row 2: Radar & Badges */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Skills Radar (Left) */}
              <Card className="col-span-1 lg:col-span-5 border-0 shadow-md bg-white rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-slate-900">
                    Skills Overview
                  </CardTitle>
                  <CardDescription className="text-slate-500">
                    Development analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer
                    width="100%"
                    height={300}
                  >
                    <RadarChart
                      cx="50%"
                      cy="50%"
                      outerRadius="70%"
                      data={skillsData}
                    >
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis
                        dataKey="skill"
                        tick={{
                          fill: "#1e293b",
                          fontSize: 11,
                          fontWeight: 600,
                        }}
                      />
                      <PolarRadiusAxis
                        angle={30}
                        domain={[0, 100]}
                        tick={false}
                        axisLine={false}
                      />
                      <Radar
                        name={childName}
                        dataKey="value"
                        stroke="#8b5cf6"
                        fill="#8b5cf6"
                        fillOpacity={0.4}
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: "8px",
                          border: "none",
                          boxShadow:
                            "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                        }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Recent Badges (Right) */}
              <Card className="col-span-1 lg:col-span-7 border-0 shadow-md bg-white rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-slate-900 flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-500" />{" "}
                    Recent Badges
                  </CardTitle>
                  <CardDescription>
                    Latest achievements unlocked by {childName}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                    {[
                      {
                        emoji: "🏆",
                        name: "Champion",
                        date: "Nov 20",
                        bg: "bg-yellow-50",
                      },
                      {
                        emoji: "⭐",
                        name: "Star",
                        date: "Nov 18",
                        bg: "bg-blue-50",
                      },
                      {
                        emoji: "🔥",
                        name: "Streak",
                        date: "Nov 15",
                        bg: "bg-orange-50",
                      },
                      {
                        emoji: "🎨",
                        name: "Artist",
                        date: "Nov 12",
                        bg: "bg-purple-50",
                      },
                      {
                        emoji: "📚",
                        name: "Reader",
                        date: "Nov 10",
                        bg: "bg-green-50",
                      },
                      {
                        emoji: "🚀",
                        name: "Explorer",
                        date: "Nov 08",
                        bg: "bg-indigo-50",
                      },
                      {
                        emoji: "💡",
                        name: "Thinker",
                        date: "Nov 05",
                        bg: "bg-pink-50",
                      },
                      {
                        emoji: "🎵",
                        name: "Music",
                        date: "Nov 02",
                        bg: "bg-cyan-50",
                      },
                    ].map((badge, i) => (
                      <div
                        key={i}
                        className={`flex flex-col items-center justify-center p-4 rounded-2xl ${badge.bg} transition-transform hover:scale-105`}
                      >
                        <span className="text-3xl mb-2">
                          {badge.emoji}
                        </span>
                        <span className="font-bold text-sm text-slate-800">
                          {badge.name}
                        </span>
                        <span className="text-xs text-slate-500">
                          {badge.date}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* ART GALLERY TAB */}
        {activeTab === "gallery" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {displayedArtworks.map((artwork, index) => (
                <Card
                  key={artwork.id}
                  className="overflow-hidden rounded-3xl border-4 shadow-xl transform transition-all hover:scale-105 hover:-rotate-1 relative group cursor-pointer p-0"
                  style={{
                    borderColor: [
                      "#fbbf24",
                      "#ec4899",
                      "#8b5cf6",
                      "#10b981",
                      "#f97316",
                      "#3b82f6",
                    ][index % 6],
                    transform: `rotate(${index % 2 === 0 ? -1 : 1}deg)`,
                  }}
                  onClick={() => setSelectedImage(artwork)}
                >
                  <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      className="rounded-full bg-white hover:bg-gray-100 text-black shadow-lg border-2 border-gray-300 h-8 px-3"
                      style={{
                        fontFamily: "Comic Sans MS, cursive",
                      }}
                      onClick={async (e) => {
                        e.stopPropagation();
                        try {
                          const response = await fetch(
                            artwork.image,
                          );
                          const blob = await response.blob();
                          const url =
                            window.URL.createObjectURL(blob);
                          const link =
                            document.createElement("a");
                          link.href = url;
                          link.download = `${artwork.title}.jpg`;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                          window.URL.revokeObjectURL(url);
                        } catch (error) {
                          console.error(
                            "Download failed:",
                            error,
                          );
                        }
                      }}
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Save
                    </Button>
                  </div>
                  <div className="aspect-[16/9] relative bg-gradient-to-br from-purple-200 to-pink-200 overflow-hidden">
                    <ImageWithFallback
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="px-3 py-4 bg-purple-100">
                    <p
                      className="text-xs text-gray-700 m-0 leading-tight"
                      style={{
                        fontFamily: "Comic Sans MS, cursive",
                      }}
                    >
                      {artwork.date}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 pb-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setCurrentPage(Math.max(0, currentPage - 1))
                  }
                  disabled={currentPage === 0}
                  className="rounded-full w-10 h-10 border-purple-200 text-purple-700 hover:bg-purple-50"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <div className="flex items-center gap-2">
                  {Array.from(
                    { length: totalPages },
                    (_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          currentPage === i
                            ? "bg-purple-500 w-6"
                            : "bg-purple-200 hover:bg-purple-300"
                        }`}
                      />
                    ),
                  )}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setCurrentPage(
                      Math.min(totalPages - 1, currentPage + 1),
                    )
                  }
                  disabled={currentPage === totalPages - 1}
                  className="rounded-full w-10 h-10 border-purple-200 text-purple-700 hover:bg-purple-50"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            )}
          </div>
        )}

        {/* ACTIVITIES TAB */}
        {activeTab === "activities" && (
          <ParentActivities childName={childName} />
        )}

        {/* SETTINGS TAB */}
        {activeTab === "settings" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Column 1: Profile & Safety */}
            <div className="space-y-6">
              {/* Profile Settings */}
              <Card className="border-0 shadow-md bg-white rounded-2xl h-fit">
                <CardHeader>
                  <CardTitle className="text-slate-900 flex items-center gap-2">
                    <User className="w-5 h-5 text-purple-500" />
                    Profile Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="p-name"
                      className="text-slate-700"
                    >
                      Parent Name
                    </Label>
                    <Input
                      id="p-name"
                      value={parentName}
                      onChange={(e) =>
                        setParentName(e.target.value)
                      }
                      className="bg-slate-50 border-slate-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="c-name"
                      className="text-slate-700"
                    >
                      Child Name
                    </Label>
                    <Input
                      id="c-name"
                      value={childName}
                      onChange={(e) =>
                        setChildName(e.target.value)
                      }
                      className="bg-slate-50 border-slate-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="p-email"
                      className="text-slate-700"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="p-email"
                      value={parentEmail}
                      onChange={(e) =>
                        setParentEmail(e.target.value)
                      }
                      className="bg-slate-50 border-slate-200"
                    />
                  </div>
                  <Button
                    onClick={handleSaveSettings}
                    className="w-full bg-slate-900 text-white hover:bg-slate-800 rounded-xl mt-2"
                  >
                    Save Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Safety Filters */}
              <Card className="border-0 shadow-md bg-white rounded-2xl h-fit">
                <CardHeader>
                  <CardTitle className="text-slate-900 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-purple-500" />
                    Safety Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <p className="font-medium text-slate-900">
                        Strict Content Filter
                      </p>
                      <p className="text-xs text-slate-500">
                        Blocks all external links
                      </p>
                    </div>
                    <Switch
                      checked={contentFilteringEnabled}
                      onCheckedChange={
                        setContentFilteringEnabled
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <p className="font-medium text-slate-900">
                        Safe Search
                      </p>
                      <p className="text-xs text-slate-500">
                        Blur inappropriate images
                      </p>
                    </div>
                    <Switch
                      checked={safeSearchEnabled}
                      onCheckedChange={setSafeSearchEnabled}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Column 2: Notifications & General */}
            <div className="space-y-6">
              {/* Notifications */}
              <Card className="border-0 shadow-md bg-white rounded-2xl h-fit">
                <CardHeader>
                  <CardTitle className="text-slate-900 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-purple-500" />
                    Notifications & Reports
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <p className="font-medium text-slate-900">
                        Weekly Email Report
                      </p>
                      <p className="text-xs text-slate-500">
                        Summary sent every Sunday
                      </p>
                    </div>
                    <Switch
                      checked={weeklyReport}
                      onCheckedChange={setWeeklyReport}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <p className="font-medium text-slate-900">
                        Instant Alerts
                      </p>
                      <p className="text-xs text-slate-500">
                        Security & Awards
                      </p>
                    </div>
                    <Switch
                      checked={emailAlerts}
                      onCheckedChange={setEmailAlerts}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* General Preferences (Replaced Learning Focus) */}
              <Card className="border-0 shadow-md bg-white rounded-2xl h-fit">
                <CardHeader>
                  <CardTitle className="text-slate-900 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-purple-500" />
                    General Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <p className="font-medium text-slate-900">
                        Auto-updates
                      </p>
                      <p className="text-xs text-slate-500">
                        Keep app features new
                      </p>
                    </div>
                    <Switch
                      checked={autoUpdates}
                      onCheckedChange={setAutoUpdates}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-700">
                      Language
                    </Label>
                    <select className="w-full h-10 px-3 rounded-md border border-slate-200 bg-slate-50 text-slate-900 text-sm">
                      <option>English (UK)</option>
                      <option>English (US)</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 mt-2 cursor-pointer hover:bg-slate-100 transition-colors">
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 text-slate-500" />
                      <p className="font-medium text-slate-900 text-sm">
                        Reset All Settings
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      {/* Screen Time Dialog */}
      <Dialog
        open={showScreenTimeDialog}
        onOpenChange={setShowScreenTimeDialog}
      >
        <DialogContent className="sm:max-w-md bg-white text-slate-900 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" /> Adjust
              Time Limit
            </DialogTitle>
            <DialogDescription className="text-slate-500">
              Daily allowance for {childName}
            </DialogDescription>
          </DialogHeader>
          <div className="py-6 space-y-6">
            <div className="flex items-center justify-center">
              <span className="text-5xl font-bold text-slate-900">
                {screenTimeLimit}
              </span>
              <span className="text-lg text-slate-400 ml-2">
                min
              </span>
            </div>
            <input
              type="range"
              min="15"
              max="180"
              step="15"
              value={screenTimeLimit}
              onChange={(e) =>
                setScreenTimeLimit(parseInt(e.target.value))
              }
              className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-900"
            />
            <div className="flex justify-between text-xs text-slate-400 px-1">
              <span>15m</span>
              <span>3h</span>
            </div>
          </div>
          <DialogFooter className="flex-row gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => setShowScreenTimeDialog(false)}
              className="text-slate-700 border-slate-200 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              onClick={() => setShowScreenTimeDialog(false)}
              className="bg-slate-900 text-white hover:bg-slate-800 rounded-xl"
            >
              Save Limit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Image Popup */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-4 -right-4 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-full p-2 shadow-lg transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-purple-300">
                <ImageWithFallback
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
                <div className="p-4 bg-gradient-to-br from-white to-purple-50">
                  <p
                    className="text-center text-gray-400"
                    style={{
                      fontFamily: "Comic Sans MS, cursive",
                    }}
                  >
                    {selectedImage.date}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}