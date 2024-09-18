
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CodeIcon,
  ShareIcon,
  UserIcon,
  Github,
  TwitterIcon,
  LinkedinIcon,
} from "lucide-react";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const session = await getServerSession(authOptions);

  // Redirect to '/home' if the user is already signed in
  if (session) {
    redirect("/home");
  }

  return (
    <div className="flex flex-col min-h-screen text-white">
      {/* Background Grid */}
      <div className="fixed inset-0 z-0">
        <div className="relative h-full w-full bg-slate-950">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-4 p-4 lg:px-6 h-14 flex items-center border-b border-gray-800">
        <Link className="flex items-center" href="/">
          <CodeIcon className="h-6 w-6 text-purple-400" />
          <span className="ml-2 text-lg font-bold text-purple-400">
            ProjectHub
          </span>
        </Link>
        <nav className="ml-auto flex gap-4">
          <Link href="/signin">
            <Button variant="secondary">Sign In</Button>
          </Link>
          <Link href="/home">
            <Button variant="secondary">Home</Button>
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32  px-4 md:px-6">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-purple-400">
              Showcase Your Projects to the World
            </h1>
            <p className="mx-auto max-w-2xl mt-4 text-xl text-gray-300 md:text-2xl">
              Add your projects, share your profile, and connect with other
              developers. Your coding journey, all in one place.
            </p>
            <div className="mt-8 space-x-4">
              <Link href="/signup">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  Get Started
                </Button>
              </Link>
              <Link href="#features">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-purple-400 border-purple-400 hover:bg-purple-400/20"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-900/50"
        >
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-purple-400">
              Key Features
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-purple-600 rounded-full shadow-lg">
                  <CodeIcon className="h-10 w-10 text-white" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-purple-400">
                  Add Projects
                </h3>
                <p className="mt-2 text-gray-300">
                  Easily add and showcase your coding projects with detailed
                  descriptions and tags.
                </p>
              </div>
              {/* Feature 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-purple-600 rounded-full shadow-lg">
                  <ShareIcon className="h-10 w-10 text-white" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-purple-400">
                  Share Profile
                </h3>
                <p className="mt-2 text-gray-300">
                  Get a unique profile link to share your portfolio with
                  potential employers or collaborators.
                </p>
              </div>
              {/* Feature 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-purple-600 rounded-full shadow-lg">
                  <UserIcon className="h-10 w-10 text-white" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-purple-400">
                  Connect with Developers
                </h3>
                <p className="mt-2 text-gray-300">
                  Discover projects from other developers and build your
                  professional network.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-purple-400">
              How It Works
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-purple-600 text-white text-2xl font-bold shadow-lg">
                  1
                </div>
                <h3 className="mt-4 text-xl font-bold text-purple-400">
                  Sign Up
                </h3>
                <p className="mt-2 text-gray-300">
                  Create your account and set up your developer profile.
                </p>
              </div>
              {/* Step 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-purple-600 text-white text-2xl font-bold shadow-lg">
                  2
                </div>
                <h3 className="mt-4 text-xl font-bold text-purple-400">
                  Add Projects
                </h3>
                <p className="mt-2 text-gray-300">
                  Upload your projects with descriptions, screenshots, and links.
                </p>
              </div>
              {/* Step 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-purple-600 text-white text-2xl font-bold shadow-lg">
                  3
                </div>
                <h3 className="mt-4 text-xl font-bold text-purple-400">
                  Share & Connect
                </h3>
                <p className="mt-2 text-gray-300">
                  Share your profile and connect with other developers in the
                  community.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-purple-400">
                Ready to Showcase Your Work?
              </h2>
              <p className="mx-auto max-w-xl mt-4 text-xl text-gray-300 md:text-2xl">
                Join our community of developers and start sharing your projects
                today.
              </p>
              <div className="w-full max-w-md mt-8">
                <form className="flex space-x-2">
                  <Input
                    className="flex-1 bg-gray-800 text-white placeholder-gray-400 border-gray-700"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Link href="/signup">
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Get Started
                    </Button>
                  </Link>
                </form>
                <p className="mt-2 text-sm text-gray-400">
                  By signing up, you agree to our{" "}
                  <Link
                    className="underline hover:text-purple-400"
                    href="/terms"
                  >
                    Terms & Conditions
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 flex flex-col sm:flex-row items-center justify-between py-6 w-full px-4 md:px-6 border-t border-gray-800">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} ProjectHub. All rights reserved.
        </p>
        <div className="flex items-center mt-4 sm:mt-0 space-x-4">
          <Link
            className="text-sm text-gray-400 hover:text-purple-400"
            href="/terms"
          >
            Terms of Service
          </Link>
          <Link
            className="text-sm text-gray-400 hover:text-purple-400"
            href="/privacy"
          >
            Privacy Policy
          </Link>
        </div>
        <div className="flex space-x-4 mt-4 sm:mt-0">
          <a
            href="https://github.com/pranav-gandesree"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-purple-400"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href="https://x.com/pranav8267"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-purple-400"
          >
            <TwitterIcon className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </a>
          <a
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-purple-400"
          >
            <LinkedinIcon className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
