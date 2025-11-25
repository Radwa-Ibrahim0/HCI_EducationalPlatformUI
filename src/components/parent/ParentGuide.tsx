import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
  HelpCircle,
  CheckCircle2,
  Shield,
  BarChart3,
  Bell,
  Clock,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";

export default function ParentGuide() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <HelpCircle className="w-4 h-4" />
          Parent Guide
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Welcome to Spectrum Parent Portal
          </DialogTitle>
          <DialogDescription className="text-base">
            Your guide to monitoring and supporting your child's
            learning journey
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Getting Started */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              Getting Started
            </h3>
            <div className="space-y-2 text-gray-700">
              <p>After creating your account:</p>
              <p>
                • Customize settings to match your family's
                needs
              </p>
              <p>
                • Explore the dashboard to see your child's
                progress
              </p>
            </div>
          </div>

          {/* Key Features */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Key Features
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <BarChart3 className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Progress Tracking
                      </h4>
                      <p className="text-sm text-gray-700 mt-1">
                        View detailed analytics on your child's
                        learning activities, quiz scores, and
                        skill development across all categories.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-200 bg-purple-50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Screen Time Management
                      </h4>
                      <p className="text-sm text-gray-700 mt-1">
                        Set daily limits and monitor usage in
                        real-time. Bedtime mode automatically
                        restricts access during sleep hours.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Safety Controls
                      </h4>
                      <p className="text-sm text-gray-700 mt-1">
                        Enable content filtering and safe search
                        to ensure age-appropriate learning
                        content for your child.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Bell className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Achievement Notifications
                      </h4>
                      <p className="text-sm text-gray-700 mt-1">
                        Receive updates when your child earns
                        badges, completes levels, or reaches
                        important milestones.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Learning Categories */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Learning Categories
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                <div className="text-2xl mb-1">🚀</div>
                <p className="font-medium text-gray-900 text-sm">
                  Space Explorer
                </p>
                <p className="text-xs text-gray-600">
                  Astronomy & Space
                </p>
              </div>
              <div className="p-3 bg-pink-50 rounded-lg border border-pink-200">
                <div className="text-2xl mb-1">🧪</div>
                <p className="font-medium text-gray-900 text-sm">
                  Chemistry Lab
                </p>
                <p className="text-xs text-gray-600">
                  Science & Experiments
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-2xl mb-1">🐘</div>
                <p className="font-medium text-gray-900 text-sm">
                  Plants & Animals
                </p>
                <p className="text-xs text-gray-600">
                  Nature & Biology
                </p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div className="text-2xl mb-1">🚴</div>
                <p className="font-medium text-gray-900 text-sm">
                  Motion & Energy
                </p>
                <p className="text-xs text-gray-600">
                  Physics & Mechanics
                </p>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Tips for Success
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                ✨ Celebrate achievements together to encourage
                continued learning
              </li>
              <li>
                ✨ Review their art gallery to see their
                creative work
              </li>
              <li>
                ✨ Set appropriate screen time limits based on
                your child's age
              </li>
              <li>
                ✨ Check the Progress tab weekly to identify
                areas of strength
              </li>
              <li>
                ✨ Use the Skills Development chart to track
                growth over time
              </li>
            </ul>
          </div>

          {/* Need Help */}
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-700">
              Have questions or need assistance?
              <br />
              <span className="text-blue-600 font-medium">
                Contact our support team
              </span>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}