import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Sparkles,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  ArrowLeft,
  GraduationCap,
} from "lucide-react";
import { toast } from "sonner";

export default function ParentAuth() {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<"login" | "signup">(
    "login",
  );

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);

  // --- LOGIN STATE ---
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // --- SIGNUP STATE ---
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("");
  const [schoolYear, setSchoolYear] = useState("Year 2");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail && loginPassword) {
      localStorage.setItem("isParentLoggedIn", "true");
      localStorage.setItem("parentName", "Parent");
      toast.success("Welcome back to the Parent Portal");
      navigate("/parent/dashboard");
    } else {
      toast.error("Please enter your email and password.");
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !signupName ||
      !signupEmail ||
      !signupPassword ||
      !childName ||
      !childAge ||
      !schoolYear
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    const account = {
      name: signupName,
      email: signupEmail,
      password: signupPassword,
      childName: childName,
      childAge: childAge,
      schoolYear: schoolYear,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "parentAccount",
      JSON.stringify(account),
    );
    localStorage.setItem("isParentLoggedIn", "true");
    localStorage.setItem("parentName", signupName);

    toast.success("Account created successfully!");
    navigate("/parent/dashboard");
  };

  return (
    <div className="h-screen flex bg-white font-sans overflow-hidden">
      {/* LEFT SIDE: Dark Blue Column */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 text-white flex-col p-10 justify-between">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600 rounded-full blur-[100px]" />
        </div>

        {/* TOP LEFT: Back Button */}
        <div className="relative z-10">
          <Button
            variant="outline"
            onClick={() => navigate("/child")}
            className="border-slate-700 bg-slate-800/50 text-slate-200 hover:bg-slate-800 hover:text-white gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Child Portal
          </Button>
        </div>

        {/* CENTER: Marketing Copy */}
        <div className="relative z-10 space-y-6 max-w-lg">
          <h1 className="text-4xl font-bold leading-tight">
            Empowering parents,
            <br />
            inspiring students.
          </h1>
          <p className="text-slate-400 text-lg">
            Spectrum provides you with the tools to monitor
            progress, manage curriculum, and ensure a safe
            digital environment.
          </p>

          <div className="space-y-4 pt-4 border-t border-slate-800/50">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0" />
              <span className="text-slate-300">
                Real-time Activity Analytics
              </span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-purple-400 flex-shrink-0" />
              <span className="text-slate-300">
                Curated, Safe Educational Content
              </span>
            </div>
          </div>
        </div>

        {/* BOTTOM: Footer */}
        <div className="relative z-10 text-sm text-slate-600">
          © 2024 Spectrum Education.
        </div>
      </div>

      {/* RIGHT SIDE: Credentials Column */}
      <div className="flex-1 flex flex-col relative bg-white h-full">
        {/* TOP RIGHT: Logo */}
        <div className="absolute top-8 right-8 z-20 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full shadow-md flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl text-slate-900 tracking-tight">
            Spectrum
          </span>
        </div>

        {/* Mobile Back Button (Visible only on small screens) */}
        <div className="lg:hidden absolute top-8 left-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/child")}
            size="icon"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </div>

        {/* CENTER: Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-500">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                {authMode === "login"
                  ? "Parent Login"
                  : "Create Account"}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {authMode === "login"
                  ? "Please login to access the dashboard."
                  : "Enter details to get started."}
              </p>
            </div>

            <form
              onSubmit={
                authMode === "login"
                  ? handleLogin
                  : handleSignup
              }
              className="space-y-4"
            >
              {/* SIGN UP FIELDS (Compact Grid) */}
              {authMode === "signup" && (
                <div className="grid grid-cols-2 gap-3">
                  {/* Row 1: Names */}
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="signup-name"
                      className="text-xs"
                    >
                      Parent's Name
                    </Label>
                    <Input
                      id="signup-name"
                      value={signupName}
                      onChange={(e) =>
                        setSignupName(e.target.value)
                      }
                      placeholder="John Doe"
                      className="h-9 bg-slate-50"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="child-name"
                      className="text-xs"
                    >
                      Child's Name
                    </Label>
                    <Input
                      id="child-name"
                      value={childName}
                      onChange={(e) =>
                        setChildName(e.target.value)
                      }
                      placeholder="Emma"
                      className="h-9 bg-slate-50"
                    />
                  </div>

                  {/* Row 2: Age & Year */}
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="child-age"
                      className="text-xs"
                    >
                      Age
                    </Label>
                    <Input
                      id="child-age"
                      type="number"
                      min="3"
                      max="18"
                      value={childAge}
                      onChange={(e) =>
                        setChildAge(e.target.value)
                      }
                      placeholder="8"
                      className="h-9 bg-slate-50"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="school-year"
                      className="text-xs"
                    >
                      School Year
                    </Label>
                    <div className="relative">
                      <select
                        id="school-year"
                        value={schoolYear}
                        onChange={(e) =>
                          setSchoolYear(e.target.value)
                        }
                        className="flex h-9 w-full items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-3 py-1 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 appearance-none"
                      >
                        <option value="Year 2">Year 2</option>
                        <option value="Year 3">Year 3</option>
                        <option value="Year 4">Year 4</option>
                        <option value="Year 5">Year 5</option>
                        <option value="Year 6">Year 6</option>
                      </select>
                      <GraduationCap className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
              )}

              {/* COMMON FIELDS */}
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={
                    authMode === "login"
                      ? loginEmail
                      : signupEmail
                  }
                  onChange={(e) =>
                    authMode === "login"
                      ? setLoginEmail(e.target.value)
                      : setSignupEmail(e.target.value)
                  }
                  placeholder="parent@spectrum.edu"
                  className="h-10 bg-white border-slate-200 focus:border-purple-500"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs">
                    Password
                  </Label>
                  {authMode === "login" && (
                    <a
                      href="#"
                      className="text-[10px] font-medium text-purple-600 hover:text-purple-500 uppercase tracking-wide"
                    >
                      Forgot password?
                    </a>
                  )}
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={
                      authMode === "login"
                        ? loginPassword
                        : signupPassword
                    }
                    onChange={(e) =>
                      authMode === "login"
                        ? setLoginPassword(e.target.value)
                        : setSignupPassword(e.target.value)
                    }
                    placeholder="••••••••"
                    className="h-10 bg-white border-slate-200 focus:border-purple-500 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-10 mt-2 bg-slate-900 hover:bg-slate-800 text-white font-medium shadow-md transition-all hover:scale-[1.01]"
              >
                {authMode === "login" ? (
                  <>
                    Login{" "}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-100" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-400">
                  Or
                </span>
              </div>
            </div>

            <div className="text-center text-sm mt-4">
              <span className="text-slate-500">
                {authMode === "login"
                  ? "Don't have an account? "
                  : "Already have an account? "}
              </span>
              <button
                onClick={() => {
                  setAuthMode(
                    authMode === "login" ? "signup" : "login",
                  );
                }}
                className="font-semibold text-purple-700 hover:text-purple-600 hover:underline"
              >
                {authMode === "login" ? "Sign up" : "Log in"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}