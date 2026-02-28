import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
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
import OurStory from './pages/OurStory';
import OurTeam from './pages/OurTeam';

function App() {

  return (
    <Router>
      
      <div className="min-h-screen w-full bg-[#050505] text-white selection:bg-blue-500/30">
        <Navbar/>
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
            <Route path="/StorySection" element={<OurStory />} />
            <Route path="/TeamSection" element={<OurTeam />} />
          </Routes>
        </main>

        <Footer />
        <Analytics />
      </div>
    </Router>
  );
}

export default App;