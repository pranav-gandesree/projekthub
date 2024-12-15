'use client';

import { useDebounce } from '@/hooks/useDebounce';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import { CommandMenu } from './CommandMenu';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  onResultClick?: (url: string) => void;
}

export function SearchBar({ onResultClick }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [commandSearchOpen, setCommandSearchOpen] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const router = useRouter();

  const fetchSearchResults = useCallback(async (query: string) => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setResults(data || []);
    } catch {
      console.error('Error fetching search results');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      fetchSearchResults(debouncedSearchTerm);
    } else {
      setResults([]);
    }
  }, [debouncedSearchTerm, fetchSearchResults]);

  const icon = useMemo(() => {
    return navigator.userAgent.toLowerCase().includes('mac') ? '⌘' : 'Ctrl + ';
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandSearchOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleResultClick = (url: string) => {
    if (onResultClick) onResultClick(url);
    setCommandSearchOpen(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      router.push(`/${searchTerm.trim()}`);
    }
  };

  return (
    <div className="relative flex w-full max-w-lg items-center bg-gray">
      <SearchIcon className="absolute left-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
      <Input
        type="text"
        placeholder="Search users"
        className="pl-10 pr-4 bg-slate-800 text-white"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyPress} 
      />
      <div className="absolute right-2 flex items-center gap-1 text-gray-500 text-sm pointer-events-none">
        <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-xs font-medium">
          Ctrl
        </kbd>
        <span className="text-xs">+</span>
        <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-xs font-medium">
          K
        </kbd>
      </div>

      <CommandMenu
         icon={icon}
        open={commandSearchOpen}
        onOpenChange={setCommandSearchOpen}
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        loading={loading}
        results={results}
        onResultClick={handleResultClick}
      />
    </div>
  );
}
