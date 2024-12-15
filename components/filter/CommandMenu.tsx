
'use client';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
  CommandSeparator,
} from '@/components/ui/command';
import { Bookmark, LogOut, NotebookPen, NotebookText } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { useSession } from "next-auth/react";
 

interface CommandMenuProps {
  icon: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  loading: boolean;
  results: any[];
  onResultClick: (username: string) => void;
}

export function CommandMenu({
  open,
  icon,
  onOpenChange,
  searchTerm,
  onSearchTermChange,
  results,
  onResultClick,
}: CommandMenuProps) {
  const router = useRouter();
  const { data: session } = useSession();

  const handleResultClick = (username: string) => {
    onResultClick(username);
    onOpenChange(false);
  };

  const handleShortcut = useCallback(
    (route: string) => {
      if (route.startsWith('http')) {
        window.location.href = route;
      } else {
        router.push(route);
      }
    },
    [router],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (open && e.ctrlKey) {
        const shortcuts = {
          c: '/home',
          b: `${session?.user.name}/bookmarks`,
          p: `${session?.user.name}/projects`,
          s: 'https://projects.100xdevs.com/',
        };

        const key = e.key.toLowerCase() as keyof typeof shortcuts;
        if (shortcuts[key]) {
          e.preventDefault();
          handleShortcut(shortcuts[key]);
        }
      }
    },
    [open, handleShortcut],
  );


  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);


  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Type a command or search..."
        value={searchTerm}
        onValueChange={onSearchTermChange}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandSeparator />

        <CommandGroup heading="Search Results">
          {results.map((result: any) => (
            <CommandItem
              key={result.id}
              onSelect={() => handleResultClick(result.username)}
            >
              {result.username}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />
        <CommandGroup heading="Suggestions">
          <CommandItem onSelect={() => handleShortcut('/home')}>
            <NotebookPen className="mr-2 h-4 w-4" />
            <span>Home</span>
          </CommandItem>
          <CommandItem onSelect={() => signOut()}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log Out</span>
          </CommandItem>
        </CommandGroup>
        
        <CommandGroup heading="Hotkeys">
          <CommandItem onSelect={() => handleShortcut(`${session?.user.name}/projects`)}>
            <NotebookText className="mr-2 h-4 w-4" />
            <span>Projects</span>
            <CommandShortcut>{icon}P</CommandShortcut>
          </CommandItem>
        
          <CommandItem onSelect={() => handleShortcut(`${session?.user.name}/bookmarks`)}>
            <Bookmark className="mr-2 h-4 w-4" />
            <span>Bookmarks</span>
            <CommandShortcut>{icon}B</CommandShortcut>
          </CommandItem>
        </CommandGroup>


      </CommandList>

    </CommandDialog>
  );
}
