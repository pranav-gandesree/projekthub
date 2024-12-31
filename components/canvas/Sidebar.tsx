"use client";

import React, { useState } from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import {
  Menu,
  Home,
  LogOut,
  User,
  FilePlus,
  FileText,
  Bookmark,
  Briefcase,
  MessageSquareText,
} from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { ChatBubbleIcon } from "@radix-ui/react-icons";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <button className="p-2 rounded-md focus:outline-none text-purple-500 lg:fixed lg:top-4 lg:right-4">
            <Menu size={28} />
          </button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="w-64 bg-gray-900 text-white shadow-lg border-r-4 border-gray-700 flex flex-col p-4"
        >
          <nav className="mt-6">
            <ul className="space-y-4">
              <li>
                <Link
                  href="/"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white"
                >
                  <Home size={20} />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  href={`/${session?.user?.name}`}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white"
                >
                  <User size={20} />
                  <span>Profile</span>
                </Link>
              </li>
              <li>
                <Link
                  href={`/${session?.user?.name}/projects`}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white"
                >
                  <FileText size={20} />
                  <span>Projects</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/new"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white"
                >
                  <FilePlus size={20} />
                  <span>New Project</span>
                </Link>
              </li>
              <li>
                <Link
                  href={`/${session?.user?.name}/bookmarks`}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white"
                >
                  <Bookmark size={20} />
                  <span>Bookmarks</span>
                </Link>
              </li>
              <li>
                <Link
                  href={`/${session?.user?.name}/inbox`}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white"
                >
                  <MessageSquareText size={20} />
                  <span>Inbox</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolios"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white"
                >
                  <Briefcase size={20} />
                  <span>Portfolios</span>
                </Link>
              </li>
              <li>
                <button
                  className="flex items-center space-x-2 text-gray-300 hover:text-white"
                  onClick={() => signOut()}
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </nav>

          {session?.user?.email && (
            <div className="mt-auto pt-4 border-t border-gray-600">
              <span className="block text-gray-400 text-sm">
                {session.user.email}
              </span>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Sidebar;
