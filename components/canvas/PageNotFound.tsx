import Link from 'next/link'
import { Home } from 'lucide-react'

export default function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-gray-100 overflow-hidden">
      <div className="text-center space-y-6 relative">
        <h1 className="text-9xl font-extrabold text-purple-400 animate-bounce">404</h1>
      
        <h2 className="text-3xl font-semibold text-gray-300 animate-pulse">
          Oops! Page not found
        </h2>
        <p className="text-lg text-gray-400 animate-fade-in">
           The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex justify-center space-x-4 animate-slide-up">
          <Link 
            href="/home"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-purple-400 rounded-md hover:bg-purple-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-400 transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Go back home
          </Link>
          
        </div>
      </div>
    </div>
  )
}

