import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/auth/SignUp';
import Login from './pages/auth/Login';
import FactStation from './pages/FactStation';
import MemoryGame from './pages/games/MemoryGame';
import Sudoku from './pages/games/Sudoku';
import WordSearch from './pages/games/WordSearch';
import FlipFlop from './pages/games/FlipFlop';
import CreativeThinking from './pages/creativeStation/CreativeThinking';
import CaptionWriting from './pages/creativeStation/Caption';
import StoryWriting from './pages/creativeStation/Story';
import Journal from './pages/creativeStation/Journaling';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

function App() {
 
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <Router>
      
      <div className="min-h-screen w-full bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
        
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        <main className="w-full ">
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/activities/fact-station" element={<FactStation />} />
            <Route path="/activities/logic" element={<MemoryGame />} />
            <Route path="/activities/logic/sudoku" element={<Sudoku />} />
            <Route path="/activities/logic/word-search" element={<WordSearch />} />
            <Route path="/activities/logic/flip-flop" element={<FlipFlop />} />
            <Route path="/activities/creative" element={<CreativeThinking />} />
            <Route path="/activities/creative/caption" element={<CaptionWriting />} />
            <Route path="/activities/creative/story" element={<StoryWriting/>} />
            <Route path="/activities/creative/journal" element={<Journal/>} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;