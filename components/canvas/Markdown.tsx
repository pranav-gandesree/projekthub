'use client'


import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';
import { useSession } from 'next-auth/react';
import { useToast } from "@/components/ui/use-toast";
import { Edit } from "lucide-react"

const MarkdownEditor: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { toast } = useToast();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchMarkdown = async () => {
      const userId = session?.user.id;
      const response = await fetch(`/api/markdown/getMarkdown?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setMarkdown(data.markdownData || '');
      }
    };

    fetchMarkdown();
  }, [session]);

  const handleMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);
  };

  const handleSave = async () => {
    const userId = session?.user.id;

    const response = await fetch('/api/markdown/saveMarkdown', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ markdownData: markdown, userId }),
    });

    if (response.ok) {
      toast({ title: "Markdown saved successfully" });
      setIsEditing(false);
    } else {
      toast({ title: "Error saving markdown" });
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      {isEditing ? (
        <div>
 
          <div className="flex justify-end gap-2 items-center mb-4">
            <button
              onClick={() => setIsEditing(false)}
              className="bg-slate-500 text-white px-4 py-2 rounded hover:bg-slate-600"
            >
              Preview
            </button>
            <button
              onClick={handleSave}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            >
              Save
            </button>
          </div>

          <textarea
            className="w-full h-64 p-2 border bg-transparent rounded text-slate-200 mb-4 font-mono"
            value={markdown}
            onChange={handleMarkdownChange}
            placeholder="Write your markdown here..."
          />

        </div>
      ) : (
        <div className='border border-slate-400 p-4 rounded-lg'>
          
          <div className='flex flex-row mb-4 items-center'>
          <p
           
            className="px-4 py-2 rounded flex items-center text-purple-700" >README.md
          </p>
          <Edit  className="mr-2 cursor-pointer"  onClick={() => setIsEditing(true)} size={18} /> 
          </div>

          <div className="prose prose-blue max-w-none m-4 text-white">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
            >
              {markdown}
            </ReactMarkdown>
          </div>
   
        </div>
      )}
    </div>
  );
};

export default MarkdownEditor;
