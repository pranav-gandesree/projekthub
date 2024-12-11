
import { Rocket, Target } from "lucide-react";

export function SignUpInfo() {
  return (
    <div className="relative w-full max-w-xl">
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl"></div>
      
      <div className="relative space-y-8 p-8">
        <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-purple-400 text-transparent bg-clip-text [text-shadow:_0_2px_10px_rgb(52,211,153,0.2)]">
          Join DevConnect
        </h1>
        
        <div className="space-y-8">
          <div className="transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-start space-x-4">
              <div className="rounded-xl bg-emerald-400/10 p-3 shadow-[0_0_15px_rgba(52,211,153,0.15)]">
                <Rocket className="h-6 w-6 text-emerald-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-violet-400">
                  Launch Your Career
                </h3>
                <p className="text-violet-400/70 leading-relaxed">
                  Create your developer profile, showcase your projects, and connect
                  with companies that match your aspirations and skills.
                </p>
              </div>
            </div>
          </div>

          <div className="transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-start space-x-4">
              <div className="rounded-xl bg-purple-400/10 p-3 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                <Target className="h-6 w-6 text-purple-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-purple-400">
                  Find Opportunities
                </h3>
                <p className="text-purple-400/70 leading-relaxed">
                  Get discovered by top companies, receive personalized job matches,
                  and take control of your professional journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}