'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import DisplayPortfolios from "./DisplayPortfolios"

type Submission = {
  githubLink: string;
  portfolioLink: string;
  uploadedBy: string;
};

export default function PortfolioPage() {
  const [githubLink, setGithubLink] = useState('');
  const [portfolioLink, setPortfolioLink] = useState('');
  const [submissions, setSubmissions] = useState<Submission[]>([]); // Ensure submissions is initialized as an array

  const { data: session } = useSession();

  // Fetch all portfolios from the backend
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch('/api/portfolios');
        const data = await response.json();
        console.log(data)
        
        // Ensure data is an array before setting it
        if (Array.isArray(data.portfolios)) {
          setSubmissions(data.portfolios);
        } else {
          console.error("Fetched data is not an array:", data);
        }
      } catch (error) {
        console.error('Error fetching portfolios:', error);
      }
    };

    fetchSubmissions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (githubLink && portfolioLink) {
      try {
        const newSubmission = {
          githubLink,
          portfolioLink,
          userId: session?.user?.id || null, // Send null for anonymous
        };

        const response = await fetch('/api/portfolios', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newSubmission),
        });

        if (response.ok) {
          const result = await response.json();
          console.log(result)
          setSubmissions([...submissions, result.newPortfolio]); // Update UI
          setGithubLink('');
          setPortfolioLink('');
        } else {
          console.error('Error submitting portfolio:', await response.json());
        }
      } catch (error) {
        console.error('Error submitting portfolio:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <motion.div className="container mx-auto px-4 py-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-center text-purple-500">projektHub</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input type="url" placeholder="GitHub Link" value={githubLink} onChange={(e) => setGithubLink(e.target.value)} required className="flex-grow" />
                <Input type="url" placeholder="Portfolio Link" value={portfolioLink} onChange={(e) => setPortfolioLink(e.target.value)} required className="flex-grow" />
              </div>
              <Button type="submit" className="w-full bg-purple-500 hover:bg-purple-600">Submit</Button>
            </form>
          </CardContent>
        </Card>


          <DisplayPortfolios submissions={submissions}/>
      </motion.div>
    </div>
  );
}
