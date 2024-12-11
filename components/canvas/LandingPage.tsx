import Link from "next/link";
import { Button } from "@/components/ui/button";
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

  if (session) {
    redirect("/home");
  }

  return (
    <div className="flex flex-col min-h-screen text-white">
      <div className="fixed inset-0 z-0">
        <div className="relative h-full w-full bg-slate-950">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        </div>
      </div>

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

      <main className="flex-1 relative z-10">
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

        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-900/50"
        >
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-purple-400">
              Key Features
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
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

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-purple-400">
              How It Works
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
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

              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-purple-600 text-white text-2xl font-bold shadow-lg">
                  2
                </div>
                <h3 className="mt-4 text-xl font-bold text-purple-400">
                  Add Projects
                </h3>
                <p className="mt-2 text-gray-300">
                  Upload your projects with descriptions, screenshots, and
                  links.
                </p>
              </div>

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
      </main>
    </div>
  );
}
