"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const frameworks = [
  {
    value: "Web2",
    label: "Web2",
  },
  {
    value: "Blockchain",
    label: "Blockchain",
  },
  {
    value: "AI/ML",
    label: "AI/ML",
  },
  {
    value: "App Development",
    label: "App Development",
  },
]

interface FilterOptionsProps {
  selectedCategory: string; 
  onCategorySelect: (category: string) => void; 
}


export function FilterOptions({ selectedCategory, onCategorySelect }: FilterOptionsProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[200px] justify-between bg-transparent"
        >
          {selectedCategory || "Select framework..."}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                onSelect={() => {
                  onCategorySelect(framework.value);
                  setOpen(false);
                }}
              >
                {framework.label}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
