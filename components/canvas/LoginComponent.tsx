import { Code2, Users } from "lucide-react";

export function LoginComponent() {
  return (
    <div className="relative w-full max-w-xl z-10">
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl"></div>
      
      <div className="relative space-y-8 p-8">
        <h1 className="text-5xl font-bold tracking-tight text-purple-400 [text-shadow:_0_2px_10px_rgb(168_85_247_/_20%)]">
          ProjektHub 
        </h1>
        
        <div className="space-y-8">
          <div className="transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-start space-x-4">
              <div className="rounded-xl bg-purple-400/10 p-3 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                <Code2 className="h-6 w-6 text-purple-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-purple-400">
                  For Developers
                </h3>
                <p className="text-purple-400/70 leading-relaxed">
                  Share your work, collaborate on projects, and connect with other
                  developers in a thriving community of innovators.
                </p>
              </div>
            </div>
          </div>

          <div className="transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-start space-x-4">
              <div className="rounded-xl bg-purple-400/10 p-3 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                <Users className="h-6 w-6 text-purple-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-purple-400">
                  For Recruiters
                </h3>
                <p className="text-purple-400/70 leading-relaxed">
                  Find exceptional talent, review portfolios, and connect with
                  skilled developers who match your requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}