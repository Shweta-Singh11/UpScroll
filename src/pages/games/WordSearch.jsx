import React, { useState, useEffect, useCallback, useRef } from "react";
import { RotateCcw, Zap, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GRID_SIZE = 10;

const WordSearch = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [grid, setGrid] = useState([]);
  const [words, setWords] = useState([]);
  const [wordsFound, setWordsFound] = useState([]);
  const [foundCells, setFoundCells] = useState([]);
  const [timer, setTimer] = useState(60);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState("idle");
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState(null);
  const [currentSelection, setCurrentSelection] = useState([]);
  const [gameAttempts, setGameAttempts] = useState(0);
  const [showAura, setShowAura] = useState(false);
  const [totalAuraPoints, setTotalAuraPoints] = useState(null);
  const syncStarted = useRef(false);
  const gridRef = useRef(null);
  const username = localStorage.getItem("username") || "Explorer";

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) setEmail(storedEmail);
  }, [gameState]);

  useEffect(() => {
    const handleFocus = () => {
      const storedEmail = localStorage.getItem("email");
      if (storedEmail) setEmail(storedEmail);
    };
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const fetchWords = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/games/wordsearch/generate`,
      );
      const data = await response.json();
      setWords(data.map((w) => w.toUpperCase()));
    } catch (error) {
      console.error("Backend fetch failed, using fallbacks");
      setWords(
        [
          "REACT",
          "NODE",
          "BRAIN",
          "LOGIC",
          "DOOM",
          "VOID",
          "SOUL",
          "SPACE",
          "MEMORY",
          "FACTS",
        ].map((w) => w.toUpperCase()),
      );
    }
  };

const syncGameStats = async (
    finalWords = wordsFound,
    attempts = gameAttempts
  ) => {
    if (syncStarted.current) return;
    const currentEmail = email || localStorage.getItem("email");
    if (currentEmail && !email) setEmail(currentEmail);
    syncStarted.current = true;

    try {
      const emailParam = currentEmail ? `email=${encodeURIComponent(currentEmail)}&` : "";
      
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/games/wordsearch/submit?${emailParam}wordsFound=${finalWords.length}&gameAttempts=${attempts}`,
        { method: "POST" }
      );

      if (!response.ok) throw new Error("Sync failed");
      const playerData = await response.json();
      
      setTotalAuraPoints(playerData.totalAuraPoints || 0);
      setScore(playerData.auraGained || 0);
    } catch (error) {
      console.error("Backend Sync Error:", error);
      syncStarted.current = false;
    }
  };

  // Initial grid
  const generateInitialGrid = useCallback(() => {
    let newGrid = Array(GRID_SIZE)
      .fill(null)
      .map(() =>
        Array(GRID_SIZE)
          .fill(null)
          .map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26))),
      );
    setGrid(newGrid);
  }, []);

  const generateGameGrid = useCallback(() => {
    let newGrid = Array(GRID_SIZE)
      .fill(null)
      .map(() => Array(GRID_SIZE).fill(""));
    words.forEach((word) => {
      let placed = false;
      let attempts = 0;
      while (!placed && attempts < 50) {
        const isHorizontal = Math.random() > 0.5;
        const row = Math.floor(
          Math.random() * (isHorizontal ? GRID_SIZE : GRID_SIZE - word.length),
        );
        const col = Math.floor(
          Math.random() * (isHorizontal ? GRID_SIZE - word.length : GRID_SIZE),
        );
        let fits = true;
        for (let i = 0; i < word.length; i++) {
          const char =
            newGrid[isHorizontal ? row : row + i][isHorizontal ? col + i : col];
          if (char !== "" && char !== word[i]) fits = false;
        }
        if (fits) {
          for (let i = 0; i < word.length; i++) {
            newGrid[isHorizontal ? row : row + i][
              isHorizontal ? col + i : col
            ] = word[i];
          }
          placed = true;
        }
        attempts++;
      }
    });
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (newGrid[r][c] === "")
          newGrid[r][c] = String.fromCharCode(
            65 + Math.floor(Math.random() * 26),
          );
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
    if (gameState === "playing" && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    } else if (timer === 0 && gameState === "playing") {
      setGameState("lost");
      syncGameStats();
    }
    return () => clearInterval(interval);
  }, [gameState, timer]);

  useEffect(() => {
    if (
      words.length > 0 &&
      wordsFound.length === words.length &&
      gameState === "playing"
    ) {
      setGameState("won");
    }
  }, [wordsFound, words, gameState]);

  useEffect(() => {
    let isSubscribed = true;
    if ((gameState === "won" || gameState === "lost") && isSubscribed) {
      syncGameStats();
    }

    return () => {
      isSubscribed = false; //prevents double-calls
    };
  }, [gameState]);

  // Interaction
  const handlePointerDown = (r, c) => {
    if (gameState !== "playing") return;
    setIsSelecting(true);
    setSelectionStart({ r, c });
    setCurrentSelection([{ r, c }]);
  };

  const handlePointerMove = (e) => {
    if (!isSelecting || !selectionStart) return;

    // Support both mouse and touch coordinates
    const x = e.clientX || (e.touches && e.touches[0].clientX);
    const y = e.clientY || (e.touches && e.touches[0].clientY);

    const element = document.elementFromPoint(x, y);
    if (!element) return;

    const r = parseInt(element.getAttribute("data-row"));
    const c = parseInt(element.getAttribute("data-col"));

    if (isNaN(r) || isNaN(c)) return;

    if (r === selectionStart.r || c === selectionStart.c) {
      const newSelection = [];
      const rowStart = Math.min(selectionStart.r, r),
        rowEnd = Math.max(selectionStart.r, r);
      const colStart = Math.min(selectionStart.c, c),
        colEnd = Math.max(selectionStart.c, c);
      for (let i = rowStart; i <= rowEnd; i++) {
        for (let j = colStart; j <= colEnd; j++)
          newSelection.push({ r: i, c: j });
      }
      setCurrentSelection(newSelection);
    }
  };

  const handlePointerUp = () => {
    if (!isSelecting) return;
    setIsSelecting(false);
    const selected = currentSelection
      .map((cell) => grid[cell.r][cell.c])
      .join("");
    const reversed = selected.split("").reverse().join("");
    if (
      (words.includes(selected) || words.includes(reversed)) &&
      !wordsFound.includes(selected) &&
      !wordsFound.includes(reversed)
    ) {
      const final = words.includes(selected) ? selected : reversed;
      setWordsFound((prev) => [...prev, final]);
      setFoundCells((prev) => [...prev, ...currentSelection]);
      setScore((prev) => Math.min(prev + 100 / words.length, 100));
    }
    setCurrentSelection([]);
  };

  const handleStart = () => {
    if (gameAttempts >= 3) {
      setGameState("max_attempts");
      return;
    }
    syncStarted.current = false;
    setGameAttempts((prev) => prev + 1);
    generateGameGrid();
    setTimer(60);
    setScore(0);
    setWordsFound([]);
    setFoundCells([]);
    setGameState("playing");
  };

  return (
    <div
      className="min-h-screen w-full pt-12 md:pt-24 pb-12 px-4 md:px-6 relative overflow-hidden bg-[#1a1818] text-white font-sans"
      onPointerUp={handlePointerUp}
    >
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-violet-500/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-[120px]"></div>

      <div className="max-w-6xl mt-4 md:mt-2 mx-auto relative z-10">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-zinc-500 hover:text-white transition-all mb-8 group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">
            Exit
          </span>
        </button>
        <header className="text-center mb-8 md:mb-16">
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none mb-2">
            Word{" "}
            <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent pr-4">
              SEARCH
            </span>
          </h1>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-widest">
            <Zap size={12} fill="currentColor" />
            <span>Welcome! {username}</span>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-6 md:gap-12 items-center lg:items-start justify-center">
          {/* Word List */}
          <div className="w-full lg:w-64 bg-[#111]/50 backdrop-blur-xl p-4 md:p-6 rounded-xl border border-white/10 shadow-2xl">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-4 text-center">
              Words List
            </h3>
            <div className="flex flex-wrap lg:flex-col gap-2 justify-center">
              {words.map((word, idx) => (
                <span
                  key={idx}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all border ${
                    wordsFound.includes(word)
                      ? "bg-emerald-400/10 text-emerald-400 border-emerald-400/30 line-through opacity-90"
                      : "bg-white/5 text-zinc-400 border-white/5"
                  }`}
                >
                  {word}
                </span>
              ))}
            </div>
          </div>

          {/* Grid Area */}
          <div className="relative flex flex-col items-center w-full max-w-[95vw] sm:max-w-md mx-auto">
            <div
              ref={gridRef}
              onPointerMove={handlePointerMove}
              className="grid grid-cols-10 gap-1 md:gap-1.5 p-2 md:p-3 bg-[#111]/50 backdrop-blur-xl rounded-3xl border border-white/10 touch-none select-none w-full"
            >
              {grid.map((row, rIdx) =>
                row.map((letter, cIdx) => {
                  const isSelected = currentSelection.some(
                    (c) => c.r === rIdx && c.c === cIdx,
                  );
                  const isFound = foundCells.some(
                    (c) => c.r === rIdx && c.c === cIdx,
                  );

                  return (
                    <div
                      key={`${rIdx}-${cIdx}`}
                      data-row={rIdx}
                      data-col={cIdx}
                      onPointerDown={() => handlePointerDown(rIdx, cIdx)}
                      className={`aspect-square flex items-center justify-center rounded-lg md:rounded-xl font-black transition-all duration-150 border text-[10px] xs:text-xs md:text-sm
                      ${isSelected ? "bg-cyan-500 text-black border-cyan-400 scale-95" : isFound ? "bg-violet-500/50 text-violet-400" : "bg-white/5 text-zinc-500"}`}
                    >
                      {letter}
                    </div>
                  );
                }),
              )}

              {/* Rules Overlay */}
              {gameState === "idle" && (
                <div className="absolute inset-0 bg-[#050505]/95 backdrop-blur-xl flex items-center justify-center z-20 p-2 md:p-4 rounded-3xl md:rounded-[2.5rem]">
                  <div className="w-full max-h-full flex flex-col items-center justify-between overflow-y-auto animate-in fade-in zoom-in duration-300 scrollbar-hide">
                    <div className="text-center mt-2">
                      <h3 className="text-sm md:text-xl font-black italic uppercase tracking-tighter text-white flex items-center justify-center gap-2 pb-1 md:pb-4">
                        <span className="w-4 h-4 md:w-8 md:h-8 rounded bg-cyan-500 flex items-center justify-center text-black not-italic text-[10px] md:text-sm">
                          !
                        </span>
                        Game Rules
                      </h3>

                      <ul className="space-y-4 mb-10 text-left">
                        {[
                          "Maximum of 3 attempts allowed.",
                          "Found words earn 1 aura each.",
                          "1st Attempt: Full score yield.",
                          "2nd Attempt: -1 aura penalty.",
                          "3rd Attempt: -2 aura penalty.",
                          "Last attempt determines Aura Points.",
                          "Only listed words are valid data.",
                        ].map((rule, i) => (
                          <li
                            key={i}
                            className="flex gap-3 items-start text-[10px] font-black text-zinc-400 uppercase tracking-widest leading-tight"
                          >
                            <span className="text-cyan-400">▶</span>
                            {rule}
                          </li>
                        ))}
                      </ul>

                      <button
                        onClick={handleStart}
                        className="w-full py-5 bg-white text-black rounded-2xl font-black uppercase tracking-widest shadow-xl hover:bg-cyan-400 transition-all active:scale-95 group flex items-center justify-center gap-3"
                      >
                        Let's Begin!
                        <Zap size={18} className="fill-current" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex gap-4">
              <button
                onClick={handleStart}
                className="group mt-10 px-8 py-4 bg-[#111] border border-white/10 rounded-full flex items-center gap-3 shadow-2xl hover:border-cyan-500 transition-all active:scale-95"
              >
                <span className="text-cyan-400 group-hover:rotate-180 transition-transform duration-500">
                  <RotateCcw size={20} />
                </span>
                <span className="text-xs font-black uppercase tracking-widest text-zinc-400 group-hover:text-white">
                  Restart
                </span>
              </button>

              <button
                onClick={() => setShowAura(true)}
                disabled={totalAuraPoints === null}
                className="mt-10 px-8 py-4 bg-white text-black rounded-full flex items-center gap-3 shadow-xl hover:bg-cyan-400 transition-all active:scale-95 text-xs font-black uppercase tracking-widest disabled:opacity-20"
              >
                {totalAuraPoints !== null
                  ? `Your Aura Score: ${totalAuraPoints}`
                  : "Check Aura Points"}
              </button>
            </div>
          </div>

          {/* Right Side Metrics */}
          <div className="w-full lg:w-64 space-y-4">
            {[
              {
                label: "Time Remaining",
                val: `${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, "0")}`,
                color:
                  timer < 20 ? "text-rose-500 animate-pulse" : "text-white",
              },
              {
                label: "Progress",
                val: `${Math.round(score)}%`,
                color: "text-cyan-400",
              },
              {
                label: "Attempts",
                val: gameAttempts,
                color: "text-violet-400",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-6 bg-[#111]/50 backdrop-blur-xl rounded-4xl border border-white/10 shadow-2xl text-center"
              >
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">
                  {stat.label}
                </p>
                <p
                  className={`text-4xl font-black italic tracking-tighter ${stat.color}`}
                >
                  {stat.val}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Result */}
      {(gameState === "won" || gameState === "lost") && (
        <div className="fixed inset-0 bg-[#050505]/90 backdrop-blur-xl flex items-center justify-center z-50 p-6">
          <div className="bg-[#111] p-12 rounded-[3rem] shadow-2xl text-center max-w-sm w-full border border-white/10">
            <h2
              className={`text-5xl font-black mb-6 uppercase italic tracking-tighter ${gameState === "won" ? "text-emerald-400" : "text-rose-500"}`}
            >
              {gameState === "won" ? "GOOD JOB!" : "TIME'S UP!"}
            </h2>
            <p className="text-zinc-400 font-bold uppercase tracking-tight text-[15px] mb-10 leading-relaxed">
              {gameState === "won"
                ? `Congratulations, ${username}. Your Score is ${score}.`
                : score > 0
                  ? `You can do better, ${username}. Score: ${score}.`
                  : "Syncing results..."}
            </p>
            {(!email || email === "") && (
              <div className="mb-8 p-6 bg-cyan-500/5 border border-cyan-500/20 rounded-2xl animate-in fade-in slide-in-from-bottom-2">
                <p className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em] mb-4">
                  To save your Aura Points
                </p>
                <button
                  onClick={() => navigate("/signup")}
                  className="w-full py-3 bg-cyan-500 text-black text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-white transition-all shadow-[0_5px_15px_rgba(34,211,238,0.3)]"
                >
                  Sign Up Now
                </button>
              </div>
            )}
            <button
              onClick={handleStart}
              className="w-full py-5 bg-white text-black rounded-2xl font-black uppercase tracking-widest shadow-xl hover:bg-zinc-200 transition-all active:scale-95"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Max Attempts Reached  */}
      {gameState === "max_attempts" && (
        <div className="fixed inset-0 bg-[#050505]/95 backdrop-blur-2xl flex items-center justify-center z-100 p-6">
          <div className="bg-[#111] p-12 rounded-[3rem] shadow-[0_0_100px_-20px_rgba(244,63,94,0.3)] text-center max-w-sm w-full border border-rose-500/20">
            <div className="w-20 h-20 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-blue-500/20">
              <Zap
                size={40}
                className="text-blue-500 fill-blue-500 animate-pulse"
              />
            </div>

            <h2 className="text-2xl font-black text-blue-500 font-sans mb-4 uppercase tracking-tighter leading-none">
              MAX ATTEMPTS REACHED
            </h2>

            <p className="text-zinc-500 font-bold uppercase tracking-tight text-[15px] mb-10 leading-relaxed">
              {username}, you have utilized all 3 permitted attempts for this
              session.
            </p>

            <div className="space-y-4">
              <button
                onClick={() => navigate("/")}
                className="w-full py-5 bg-white text-black rounded-2xl font-black uppercase tracking-widest shadow-xl hover:bg-blue-500 hover:text-white transition-all active:scale-95"
              >
                Return
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WordSearch;
