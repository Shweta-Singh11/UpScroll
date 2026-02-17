import React, { useState, useEffect, useCallback } from 'react';

const GRID_SIZE = 10; //username,wordsfound,gameAttempts

const WordSearch = () => {
  const [grid, setGrid] = useState([]);
  const [words, setWords] = useState([]); 
  const [wordsFound, setWordsFound] = useState([]);
  const [foundCells, setFoundCells] = useState([]);
  const [timer, setTimer] = useState(60);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [gameState, setGameState] = useState('idle');
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState(null); 
  const [currentSelection, setCurrentSelection] = useState([]);
  
  const fetchWords = async () => {
    try {
      const response = await fetch("http://<MY_WIFI_IP>:8080/api/users/{username}/wordsearch?wordsFound={number}&gameAttempts={number}");
      const data = await response.json(); 
      setWords(data.map(w => w.toUpperCase()));
    } catch (error) {
      console.error("Backend fetch failed, using fallbacks");
      setWords(["REACT", "NODE", "BRAIN", "LOGIC", "DOOM", "VOID", "SOUL", "SPACE","MEMORY","FACTS"].map(w => w.toUpperCase()));
    }
  };

// Initial grid
  const generateInitialGrid = useCallback(() => {
    let newGrid = Array(GRID_SIZE).fill(null).map(() => 
      Array(GRID_SIZE).fill(null).map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26)))
    );
    setGrid(newGrid);
  }, []);

  const generateGameGrid = useCallback(() => {
    let newGrid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''));
    words.forEach(word => {
      let placed = false;
      let attempts = 0;
      while (!placed && attempts < 50) {
        const isHorizontal = Math.random() > 0.5;
        const row = Math.floor(Math.random() * (isHorizontal ? GRID_SIZE : GRID_SIZE - word.length));
        const col = Math.floor(Math.random() * (isHorizontal ? GRID_SIZE - word.length : GRID_SIZE));
        let fits = true;
        for (let i = 0; i < word.length; i++) {
          const char = newGrid[isHorizontal ? row : row + i][isHorizontal ? col + i : col];
          if (char !== '' && char !== word[i]) fits = false;
        }
        if (fits) {
          for (let i = 0; i < word.length; i++) {
            newGrid[isHorizontal ? row : row + i][isHorizontal ? col + i : col] = word[i];
          }
          placed = true;
        }
        attempts++;
      }
    });
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (newGrid[r][c] === '') newGrid[r][c] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      }
    }
    setGrid(newGrid);
  }, [words]);

  useEffect(() => { 
    fetchWords(); 
    generateInitialGrid();
  }, [generateInitialGrid]);

// Timer
  useEffect(() => {
    let interval;
    if (gameState === 'playing' && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    } else if (timer === 0 && gameState === 'playing') {
      setGameState('lost');
    }
    return () => clearInterval(interval);
  }, [gameState, timer]);

  useEffect(() => {
    if (words.length > 0 && wordsFound.length === words.length && gameState === 'playing') {
      setGameState('won');
    }
  }, [wordsFound, words, gameState]);

// Interaction
  const handleMouseDown = (r, c) => {
    if (gameState !== 'playing') return;
    setIsSelecting(true);
    setSelectionStart({ r, c });
    setCurrentSelection([{ r, c }]);
  };

  const handleMouseEnter = (r, c) => {
    if (!isSelecting) return;
    if (r === selectionStart.r || c === selectionStart.c) {
      const newSelection = [];
      const rowStart = Math.min(selectionStart.r, r), rowEnd = Math.max(selectionStart.r, r);
      const colStart = Math.min(selectionStart.c, c), colEnd = Math.max(selectionStart.c, c);
      for (let i = rowStart; i <= rowEnd; i++) {
        for (let j = colStart; j <= colEnd; j++) newSelection.push({ r: i, c: j });
      }
      setCurrentSelection(newSelection);
    }
  };

  const handleMouseUp = () => {
    if (!isSelecting) return;
    setIsSelecting(false);
    const selected = currentSelection.map(cell => grid[cell.r][cell.c]).join('');
    const reversed = selected.split('').reverse().join('');
    if ((words.includes(selected) || words.includes(reversed)) && !wordsFound.includes(selected) && !wordsFound.includes(reversed)) {
      const final = words.includes(selected) ? selected : reversed;
      setWordsFound(prev => [...prev, final]);
      setFoundCells(prev => [...prev, ...currentSelection]);
      setScore(prev => Math.min(prev + (100 / words.length), 100));
    }
    setCurrentSelection([]);
  };

  const handleStart = () => {
    generateGameGrid();
    setTimer(60);
    setScore(0);
    setWordsFound([]);
    setFoundCells([]);
    setGameState('playing');
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans" onMouseUp={handleMouseUp}>
      <div className="max-w-6xl mx-auto px-6">
        <header className="text-center mb-10">
          <h1 className="text-5xl font-extrabold tracking-tight bg-linear-to-r from-purple-800 to-blue-500 bg-clip-text text-transparent mb-2">Word Search</h1>
          <p className="text-zinc-400 font-medium">Sharp eyes, sharp mind.</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-12 items-center justify-center">
          {/* list */}
          <div className="w-full lg:w-64 bg-white dark:bg-zinc-900 p-6 rounded-4xl shadow-sm border border-zinc-100 dark:border-zinc-800">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-4 text-center">Words</h3>
            <div className="flex flex-wrap lg:flex-col gap-2">
              {words.map((word, idx) => (
                <span key={idx} className={`px-4 py-1.5 rounded-xl text-sm font-bold text-center transition-all ${wordsFound.includes(word) ? 'bg-emerald-50 text-emerald-500 dark:bg-emerald-900/20 line-through' : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-500'}`}>
                  {word}
                </span>
              ))}
            </div>
          </div>

          {/* grid */}
          <div className="relative flex flex-col items-center">
            <div className="grid grid-cols-10 gap-2 p-4 bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-xl border border-zinc-100 dark:border-zinc-800 select-none relative overflow-hidden">
              {grid.map((row, rIdx) => 
                row.map((letter, cIdx) => {
                  const isSelected = currentSelection.some(c => c.r === rIdx && c.c === cIdx);
                  const isFound = foundCells.some(c => c.r === rIdx && c.c === cIdx);
                  return (
                    <div 
                      key={`${rIdx}-${cIdx}`}
                      onMouseDown={() => handleMouseDown(rIdx, cIdx)}
                      onMouseEnter={() => handleMouseEnter(rIdx, cIdx)}
                      className={`w-9 h-9 md:w-11 md:h-11 flex items-center justify-center rounded-xl font-bold text-lg transition-all duration-150
                        ${isSelected ? 'bg-blue-500 text-white shadow-lg' : isFound ? 'bg-emerald-400 text-white' : 'text-zinc-400 dark:text-zinc-500'}`}
                    >
                      {letter}
                    </div>
                  );
                })
              )}

              {/* start button */}
              {gameState === 'idle' && (
                <div className="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-20">
                  <button onClick={handleStart} className="px-12 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-full font-black uppercase tracking-widest shadow-2xl hover:scale-105 transition-transform">
                    Let's Begin!
                  </button>
                </div>
              )}
            </div>

            <button onClick={handleStart} className="group mt-10 px-8 py-3 bg-white dark:bg-zinc-900 
               border-2 border-zinc-200 dark:border-zinc-700 
               rounded-full flex items-center gap-3
               shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] 
               hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.15)]
               hover:border-blue-400 dark:hover:border-blue-500
               transition-all duration-300 active:scale-95">
                <span className="text-blue-500 group-hover:rotate-180 transition-transform duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                    <path d="M21 3v5h-5"/>
                    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                    <path d="M3 21v-5h5"/>
                  </svg>
                </span>
                <span className="text-sm font-black uppercase tracking-[0.15em] text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white">
                  Restart 
                </span>
            </button>
          </div>

          {/* side buttons */}
          <div className="w-full lg:w-64 space-y-4">
            <div className="p-6 bg-white dark:bg-zinc-900 rounded-4xl shadow-sm border border-zinc-100 dark:border-zinc-800 text-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Time</p>
              <p className={`text-4xl font-black ${timer < 20 ? 'text-rose-500 animate-pulse' : ''}`}>{Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</p>
            </div>
            <div className="p-6 bg-white dark:bg-zinc-900 rounded-4xl shadow-sm border border-zinc-100 dark:border-zinc-800 text-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Progress</p>
              <p className="text-4xl font-black text-blue-500">{Math.round(score)}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* win/lost */}
      {(gameState === 'won' || gameState === 'lost') && (
        <div className="fixed inset-0 bg-zinc-900/60 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <div className="bg-white dark:bg-zinc-900 p-12 rounded-[3rem] shadow-2xl text-center max-w-sm w-full border border-zinc-100 dark:border-zinc-800">
            <h2 className="text-4xl font-black mb-4 uppercase italic">
              {gameState === 'won' ? "Champion!" : "Time's Up"}
            </h2>
            <p className="text-zinc-500 font-medium mb-8">
              {gameState === 'won' ? "Good Job, you are a champion! You've cleared the digital void." : `Mission failed. You reached ${Math.round(score)}% completion.`}
            </p>
            <button onClick={handleStart} className={`w-full py-4 rounded-2xl font-bold shadow-lg transition-transform hover:scale-[1.02] ${gameState === 'won' ? 'bg-emerald-500 text-white' : 'bg-blue-600 text-white'}`}>
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WordSearch;