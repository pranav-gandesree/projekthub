

'use client'


import { Button } from '@/components/ui/button';
import { BookmarkIcon } from 'lucide-react';

interface BookmarkProps {
  projectId: number;
  userId: string;
  isBookmarked: boolean;
  onToggle: (projectId: number) => void;
}

const Bookmark = ({ projectId, userId, isBookmarked, onToggle }: BookmarkProps) => {
  const handleToggle = async () => {
    try {
      const action = isBookmarked ? 'remove' : 'add';
      const response = await fetch(`/api/users/${userId}/bookmarks/${action}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectId }),
      });

      if (!response.ok) {
        throw new Error('Failed to update bookmark');
      }

      onToggle(projectId);
    } catch (error) {
      console.error('Error handling bookmark:', error);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      <BookmarkIcon className={`h-5 w-5 ${isBookmarked ? 'text-purple-500 fill-purple-500' : 'text-gray-500'}`} />
    </Button>
  );
};

export default Bookmark;
