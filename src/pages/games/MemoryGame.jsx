import React from "react";
import ActivityCard from "../../components/ui/Activities";

const MemoryGame = () => {
  const games = [
    {
      title: "Sudoku",
      description: "Classical 9x9 grid puzzles to test your logical deduction skills.",
      bgColor: "bg-blue-300", 
      path: "/activities/logic/sudoku"
    },
    {
      title: "Word Search",
      description: "Find hidden patterns in a sea of letters to boost your recognition.",
      bgColor: "bg-rose-300",
      path: "/activities/logic/word-search"
    },
    {
      title: "Flip Flop",
      description: "A fast-paced memory matching game to sharpen your focus.",
      bgColor: "bg-cyan-300",
      path: "/activities/logic/flip-flop"
    }
  ];

  return (
    <div className="min-h-[80vh] pt-12 px-6 flex flex-col items-center bg-white dark:bg-black transition-colors">
      <div className="max-w-6xl w-full text-center space-y-8">
        
        {/* Header*/}
        <div className="space-y-4">
          <h1 className="text-5xl font-black uppercase italic tracking-tighter text-black dark:text-white">
            Memory & Logic
          </h1>
          <p className="text-xl text-zinc-500 dark:text-zinc-400 font-medium">
            Select a quest to sharpen your cognitive functions.
          </p>
        </div>

        {/*Activities*/}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {games.map((game, index) => (
            <ActivityCard 
              key={index} 
              title={game.title}
              description={game.description}
              bgColor={game.bgColor}
              path={game.path}
            />
          ))}
        </div>

        {/* back */}
        <button 
          onClick={() => window.history.back()}
          className="mt-16 text-sm font-black uppercase tracking-widest border-b-2 border-black dark:border-white hover:opacity-50 transition-opacity"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default MemoryGame;