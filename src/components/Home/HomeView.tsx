// src/components/Home/HomeView.tsx
import { BookOpen, Target, ClipboardList } from "lucide-react";
import { SearchBar } from "../shared/SearchBar";

interface HomeViewProps {
  onModeSelect: (
    mode: "explore" | "playground" | "test",
    query?: string
  ) => void;
}

type mode = "explore" | "playground" | "test";

export const HomeView = ({ onModeSelect }: HomeViewProps) => {
  const modes = [
    {
      icon: BookOpen,
      title: "Explore",
      description: "Learn new concepts with simple explanations",
      action: "explore",
      placeholder: "What do you want to learn about?",
    },
    {
      icon: Target,
      title: "Practice",
      description: "Test your knowledge with interactive questions",
      action: "playground",
      placeholder: "What topic would you like to practice?",
    },
    {
      icon: ClipboardList,
      title: "Test",
      description: "Take a full test and get your predicted rank",
      action: "test",
      placeholder: "Enter subject for test",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="grid gap-8">
        {modes.map((mode) => (
          <div
            key={mode.title}
            className="card hover:bg-gray-800/50 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <mode.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2">{mode.title}</h2>
                <p className="text-gray-400 mb-4">{mode.description}</p>
                <SearchBar
                  placeholder={mode.placeholder}
                  onSearch={(query) => onModeSelect(mode.action as mode, query)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
