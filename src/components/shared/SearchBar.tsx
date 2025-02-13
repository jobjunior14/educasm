/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/shared/SearchBar.tsx
import React, { useState, KeyboardEvent, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // You'll need to install framer-motion

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  centered?: boolean;
  title?: string;
  initialValue?: string;
  className?: string;
  suggestions?: Array<{ text: string; icon: string }>;
  onSubmit?: (query: string) => void;
  buttonText?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "What do you want to learn?",
  centered = false,
  title,
  initialValue = "",
  className,
  suggestions = [],
}) => {
  const [query, setQuery] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      // Save to recent searches
      const updated = [
        searchQuery,
        ...recentSearches.filter((s) => s !== searchQuery),
      ].slice(0, 3);
      setRecentSearches(updated);
      localStorage.setItem("recentSearches", JSON.stringify(updated));
      onSearch(searchQuery.trim());
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch(query);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    handleSearch(suggestion);
    setShowSuggestions(false);
  };

  // Add keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        document.querySelector<HTMLInputElement>('input[type="text"]')?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown as any);
    return () => window.removeEventListener("keydown", handleKeyDown as any);
  }, []);

  return (
    <div
      className={`w-full max-w-3xl ${centered ? "mx-auto text-center" : ""}`}
    >
      {centered && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-white mb-8">{title}</h1>
        </motion.div>
      )}
      <div className={`relative group ${centered ? "mx-auto" : ""}`}>
        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onKeyPress={handleKeyPress}
            onFocus={() => {
              setIsFocused(true);
              setShowSuggestions(true);
            }}
            onBlur={() => {
              setIsFocused(false);
              // Delay hiding suggestions to allow clicking them
              setTimeout(() => setShowSuggestions(false), 200);
            }}
            placeholder={placeholder}
            className={`w-full pl-4 pr-24 py-4 bg-gray-800/80 border border-gray-700/50 
              rounded-2xl shadow-lg
              text-gray-200 placeholder-gray-400 text-lg
              focus:outline-none focus:ring-2 focus:ring-primary/20
              transition-all duration-300 ease-in-out
              hover:bg-gray-800/90 hover:border-gray-600/50
              ${
                isFocused ? "border-primary/50 shadow-lg shadow-primary/10" : ""
              }
              transform ${isFocused ? "scale-[1.02]" : "scale-100"}
              ${className}`}
          />
        </motion.div>

        {/* Icons */}
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center space-x-3">
          {query && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setQuery("")}
              className="text-gray-400 hover:text-gray-299 transition-all duration-200"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.button>
          )}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="text-gray-400 group-hover:text-primary transition-colors duration-200"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </motion.div>
        </div>

        {/* Suggestions Dropdown */}
        <AnimatePresence>
          {showSuggestions && (isFocused || query) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute w-full mt-2 py-2 bg-gray-800/95 rounded-xl shadow-xl border border-gray-700/50 z-50"
            >
              {recentSearches.length > 0 && (
                <div className="px-4 py-2">
                  <div className="text-xs text-gray-500 mb-2">
                    Recent Searches
                  </div>
                  {recentSearches.map((search, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSearch(search)}
                      className="w-full text-left px-2 py-2 text-gray-300 hover:bg-gray-700/50 rounded-lg transition-colors duration-150"
                    >
                      <span className="mr-2">🕒</span> {search}
                    </button>
                  ))}
                  <div className="border-t border-gray-700/50 my-2" />
                </div>
              )}
              <div className="px-4">
                <div className="text-xs text-gray-500 mb-2">Suggestions</div>
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(suggestion.text)}
                    className="w-full text-left px-2 py-2 text-gray-300 hover:bg-gray-700/50 rounded-lg transition-colors duration-150"
                  >
                    <span className="mr-2">{suggestion.icon}</span>{" "}
                    {suggestion.text}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {centered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 space-y-2"
        >
          <p className="text-gray-400 text-sm"></p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <span></span>
            {suggestions.map(({ text, icon }, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleSearch(text)}
                className="text-gray-400 hover:text-primary transition-colors duration-200"
              >
                <span className="mr-1">{icon}</span>
                {text}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};
