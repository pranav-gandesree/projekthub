'use client'

import React, { useState } from "react";

const DropdownMenu = ({ onDelete, isOwner, isAuthenticated }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!isAuthenticated || !isOwner) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full text-white hover:bg-gray-700/80 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <circle cx="12" cy="5" r="1.5" />
          <circle cx="12" cy="12" r="1.5" />
          <circle cx="12" cy="19" r="1.5" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 bg-gray-800 text-gray-200 shadow-lg rounded w-40">
          <div
            onClick={() => console.log("Edit clicked")}
            className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-700 rounded cursor-pointer"
          >
            ✏️ <span>Edit</span>
          </div>
          <div
            onClick={onDelete}
            className="flex items-center space-x-2 px-3 py-2 hover:bg-red-600 rounded cursor-pointer"
          >
            🗑️ <span>Delete</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
