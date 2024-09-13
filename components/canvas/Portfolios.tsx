// 'use client'

// import React, { useState, useEffect } from 'react'
// import { motion } from 'framer-motion'
// import { Github, Globe, Sparkles } from 'lucide-react'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { useSession } from 'next-auth/react'
// import Link from 'next/link'

// export default function PortfolioHub() {
//   const [githubLink, setGithubLink] = useState('')
//   const [portfolioLink, setPortfolioLink] = useState('')
//   const [submissions, setSubmissions] = useState<{ github: string; portfolio: string }[]>([])

//   const { data: session } = useSession()

//   // Load submissions from localStorage
//   useEffect(() => {
//     const savedSubmissions = localStorage.getItem('submissions')
//     if (savedSubmissions) {
//       setSubmissions(JSON.parse(savedSubmissions))
//     }
//   }, [])

//   // Save submissions to localStorage
//   useEffect(() => {
//     if (submissions.length > 0) {
//       localStorage.setItem('submissions', JSON.stringify(submissions))
//     }
//   }, [submissions])

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (githubLink && portfolioLink) {
//       const newSubmission = { github: githubLink, portfolio: portfolioLink }
//       setSubmissions([...submissions, newSubmission])
//       setGithubLink('')
//       setPortfolioLink('')
//     }
//   }

//   return (
//     <div className="min-h-screen bg-background text-foreground">
//       <motion.div
//         className="container mx-auto px-4 py-16"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <Card className="w-full max-w-3xl mx-auto">
//           <CardHeader>
//             <CardTitle className="text-4xl font-bold text-center text-purple-500">
//               <motion.span
//                 initial={{ opacity: 0, scale: 0.5 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.5, delay: 0.2 }}
//               >
//                 projektHub
//               </motion.span>
//             </CardTitle>
//             <CardDescription className="text-center text-xl mt-4">
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.4 }}
//               >
//                 All portfolios in one place. Get inspired, inspire others.
//               </motion.div>
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.6 }}
//                 className="mt-2 text-purple-400"
//               >
//                 <Sparkles className="inline-block mr-2" />
//                 Unleash your creativity, showcase your brilliance!
//               </motion.div>
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <Input
//                   type="url"
//                   placeholder="GitHub Link"
//                   value={githubLink}
//                   onChange={(e) => setGithubLink(e.target.value)}
//                   required
//                   className="flex-grow"
//                 />
//                 <Input
//                   type="url"
//                   placeholder="Portfolio Link"
//                   value={portfolioLink}
//                   onChange={(e) => setPortfolioLink(e.target.value)}
//                   required
//                   className="flex-grow"
//                 />
//               </div>
//               <Button type="submit" className="w-full bg-purple-500 hover:bg-purple-600">
//                 Submit
//               </Button>
//             </form>
//           </CardContent>
//         </Card>

//         <motion.div
//           className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5, delay: 0.8 }}
//         >
//           {submissions.map((submission, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.3, delay: index * 0.1 }}
//             >
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="text-lg font-semibold text-slate-200">Portfolio #{index + 1}</CardTitle>
//                   {session ? (
//                     <Link href={`/${session?.user?.name}`} className='hover:underline'>
//                       <CardTitle className="text-lg font-semibold text-slate-200">{session?.user?.name}</CardTitle>
//                     </Link>
//                   ) : (
//                     <CardTitle className="text-lg font-semibold text-slate-200">Anonymous</CardTitle>
//                   )}
//                 </CardHeader>
//                 <CardContent className="flex justify-start gap-2">
//                   <Button asChild variant="outline" className="w-full">
//                     <a href={submission.github} target="_blank" rel="noopener noreferrer">
//                       <Github className="mr-2 h-4 w-4" />
//                       GitHub
//                     </a>
//                   </Button>
//                   <Button asChild variant="outline" className="w-full">
//                     <a href={submission.portfolio} target="_blank" rel="noopener noreferrer">
//                       <Globe className="mr-2 h-4 w-4" />
//                       Portfolio
//                     </a>
//                   </Button>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ))}
//         </motion.div>
//       </motion.div>
//     </div>
//   )
// }











'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Github, Globe, Sparkles } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { SiTypescript, SiVisualstudiocode, SiGithub, SiSolana } from 'react-icons/si';


const floatAnimation = {
  initial: { y: 0 },
  animate: {
    y: [0, 20, 0],
    transition: {
      repeat: Infinity,
      duration: 5,
      ease: 'easeInOut',
    },
  },
};

export default function PortfolioPage() {
    const [githubLink, setGithubLink] = useState('')
  const [portfolioLink, setPortfolioLink] = useState('')
  const [submissions, setSubmissions] = useState<{ github: string; portfolio: string }[]>([])

  const { data: session } = useSession()

  // Load submissions from localStorage
  useEffect(() => {
    const savedSubmissions = localStorage.getItem('submissions')
    if (savedSubmissions) {
      setSubmissions(JSON.parse(savedSubmissions))
    }
  }, [])

  // Save submissions to localStorage
  useEffect(() => {
    if (submissions.length > 0) {
      localStorage.setItem('submissions', JSON.stringify(submissions))
    }
  }, [submissions])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (githubLink && portfolioLink) {
      const newSubmission = { github: githubLink, portfolio: portfolioLink }
      setSubmissions([...submissions, newSubmission])
      setGithubLink('')
      setPortfolioLink('')
    }
  }

  return (
    <>
    
    <motion.div
    className="absolute top-10 left-10 opacity-20"
    variants={floatAnimation}
    initial="initial"
    animate="animate"
  >
    <SiTypescript size={80} className="text-blue-500" />
  </motion.div>
  <motion.div
    className="absolute bottom-10 right-10 opacity-20"
    variants={floatAnimation}
    initial="initial"
    animate="animate"
  >
    <SiVisualstudiocode size={80} className="text-purple-500" />
  </motion.div>
  <motion.div
    className="absolute top-64 left-72 opacity-20"
    variants={floatAnimation}
    initial="initial"
    animate="animate"
  >
    <SiGithub size={45} className="text-purple-300" />
  </motion.div>
  <motion.div
      className="absolute bottom-50 right-60 opacity-20"
     variants={floatAnimation}
    initial="initial"
     animate="animate"
    >
      <SiSolana size={80} className="text-blue-300" />
 </motion.div>


    <div className="min-h-screen bg-background text-foreground">
      <motion.div
        className="container mx-auto px-4 py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-center text-purple-500">
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                projektHub
              </motion.span>
            </CardTitle>
            <CardDescription className="text-center text-xl mt-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                All portfolios in one place. Get inspired, inspire others.
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-2 text-purple-400"
              >
                <Sparkles className="inline-block mr-2" />
                Unleash your creativity, showcase your brilliance!
              </motion.div>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="url"
                  placeholder="GitHub Link"
                  value={githubLink}
                  onChange={(e) => setGithubLink(e.target.value)}
                  required
                  className="flex-grow"
                />
                <Input
                  type="url"
                  placeholder="Portfolio Link"
                  value={portfolioLink}
                  onChange={(e) => setPortfolioLink(e.target.value)}
                  required
                  className="flex-grow"
                />
              </div>
              <Button type="submit" className="w-full bg-purple-500 hover:bg-purple-600">
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>

        <motion.div
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {submissions.map((submission, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-slate-200">Portfolio #{index + 1}</CardTitle>
                  {session ? (
                    <Link href={`/${session?.user?.name}`} className='hover:underline'>
                      <CardTitle className="text-lg font-semibold text-slate-200">{session?.user?.name}</CardTitle>
                    </Link>
                  ) : (
                    <CardTitle className="text-lg font-semibold text-slate-200">Anonymous</CardTitle>
                  )}
                </CardHeader>
                <CardContent className="flex justify-start gap-2">
                  <Button asChild variant="outline" className="w-full">
                    <a href={submission.github} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <a href={submission.portfolio} target="_blank" rel="noopener noreferrer">
                      <Globe className="mr-2 h-4 w-4" />
                      Portfolio
                    </a>
                  </Button>
                </CardContent>
              </Card>
          
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
    </>
  )
}
