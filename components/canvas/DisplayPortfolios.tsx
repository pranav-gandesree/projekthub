'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import Link from 'next/link'
import { GitHubLogoIcon, GlobeIcon } from '@radix-ui/react-icons'
import React from 'react'

interface Submission {
  uploadedBy: string
  githubLink: string
  portfolioLink: string
}

interface SubmissionsDisplayProps {
  submissions: Submission[]
}

const DisplayPortfolios: React.FC<SubmissionsDisplayProps> = ({ submissions }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-white">Portfolio Submissions</h2>
      {Array.isArray(submissions) && submissions.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {submissions.map((submission, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-bold text-white flex items-center justify-between">
                    <span>Portfolio #{index + 1}</span>
                    {submission.uploadedBy && submission.uploadedBy !== 'Anonymous' ? (
                      <Link href={`/${submission.uploadedBy}`}>
                        <span className="text-sm font-medium text-purple-400 hover:text-blue-300 transition-colors duration-200">
                          @{submission.uploadedBy}
                        </span>
                      </Link>
                    ) : (
                      <span className="text-sm font-medium text-gray-400">Anonymous</span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      asChild
                      variant="outline"
                      className="flex-1 bg-gray-700 hover:bg-purple-500 text-white border-gray-600 hover:border-gray-500"
                    >
                      <a href={submission.githubLink} target="_blank" rel="noopener noreferrer">
                        <GitHubLogoIcon className="mr-2 h-4 w-4" />
                        GitHub
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="flex-1 bg-gray-700 hover:bg-purple-500 text-white border-gray-600 hover:border-gray-500"
                    >
                      <a href={submission.portfolioLink} target="_blank" rel="noopener noreferrer">
                        <GlobeIcon className="mr-2 h-4 w-4" />
                        Portfolio
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.p
          className="text-center mt-8 text-xl text-gray-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          No portfolios submitted yet.
        </motion.p>
      )}
    </div>
  )
}

export default DisplayPortfolios