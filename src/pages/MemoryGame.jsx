import React from 'react';
import ActivityCard from '../components/ui/Activities';

const MemoryGame = () => {
  const games = [
    {
      title: "Sudoku",
      description: "Classical 9x9 grid puzzles",
      bgColor: "bg-blue-300", 
      path: "/activities/logic/sudoku"
    },
    {
      title: "Word Search",
      description: "Find hidden patterns",
      bgColor: "bg-blue-300",
      path: "/activities/logic/word-search"
    },
    {
      title: "Flip FLop",
      description: "turn the cards to match the pairs",
      bgColor: "bg-blue-300",
      path: "/activities/logic/flip-flop"
    }
  ];
  
  return(
    <div className="min-h-[80vh] pt-32 px-6 flex flex-col items-center bg-white dark:bg-black transition-colors">
      <div className="max-w-6xl w-full text-center space-y-8">
        
        <div className="space-y-4">
          <h1 className="text-5xl font-black uppercase italic tracking-tighter text-black dark:text-white">
            Memory & Logic
          </h1>
          <p className="text-xl text-zinc-500 dark:text-zinc-400 font-medium">
            Select a quest to sharpen your cognitive functions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {games.map((game, index) => (
            <ActivityCard key={index} {...game} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemoryGame;