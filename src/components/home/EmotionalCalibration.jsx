import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, Target } from 'lucide-react';

const moods = [
  {
    id: 'anxious',
    label: 'Anxious',
    emoji: '😰',
    prescription: 'Mindful Focus Training',
    activity: 'Start with memory exercises to slow down cognitive pace.',
    duration: '15 min session',
    path: '/activities/logic',
  },
  {
    id: 'fragmented',
    label: 'Fragmented',
    emoji: '🌪️',
    prescription: 'Cognitive Reconnection',
    activity: 'Run a word search matrix to anchor divided attention.',
    duration: '20 min session',
    path: '/activities/logic/word-search',
  },
  {
    id: 'bored',
    label: 'Bored',
    emoji: '😐',
    prescription: 'Intellectual Stimulation',
    activity: 'Play a layer of high-difficulty Sudoku to trigger challenge.',
    duration: '25 min session',
    path: '/activities/logic/sudoku',
  },
];

function MoodSelector({ selectedMoodId, onSelectMood }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center md:text-left">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white uppercase italic tracking-tight">How are you feeling?</h3>
        <p className="mt-1.5 text-sm text-slate-500 dark:text-zinc-400 font-medium">Select your current mental state to calibrate the system:</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {moods.map((mood) => (
          <button
            key={mood.id}
            onClick={() => onSelectMood(mood.id)}
            className={`rounded-2xl border-2 p-6 transition-all duration-300 cursor-pointer text-center group ${
              selectedMoodId === mood.id
                ? 'border-indigo-600 dark:border-cyan-500 bg-indigo-50/50 dark:bg-cyan-500/10 shadow-lg shadow-indigo-500/10 dark:shadow-cyan-500/20'
                : 'border-slate-200/60 dark:border-zinc-800/80 bg-white/30 dark:bg-zinc-800/20 hover:border-indigo-500/40 dark:hover:border-cyan-500/40 hover:bg-white/80 dark:hover:bg-zinc-800/40'
            }`}
          >
            <div className="text-4xl group-hover:scale-110 transition-transform duration-300">{mood.emoji}</div>
            <div className="mt-3 text-lg font-black text-slate-800 dark:text-white uppercase italic tracking-tight">{mood.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function PrescriptionCard({ mood }) {
  const navigate = useNavigate();

  if (!mood) {
    return (
      <div className="mt-8 rounded-2xl border border-dashed border-slate-200 dark:border-zinc-800 p-8 text-center text-slate-400 dark:text-zinc-500 font-semibold text-sm">
        Select a mood above to generate a customized digital calibration.
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-[2rem] border-2 border-indigo-600/40 dark:border-cyan-500/50 bg-gradient-to-br from-indigo-500/5 to-cyan-500/5 dark:from-cyan-500/5 dark:to-blue-500/5 p-8 shadow-inner animate-slide-up">
      <div className="flex items-center gap-3">
        <CheckCircle className="h-6 w-6 text-emerald-500" />
        <h3 className="text-2xl font-black text-slate-800 dark:text-white uppercase italic tracking-tight">Your UpScroll Prescription</h3>
      </div>

      <div className="mt-6 space-y-6">
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 dark:text-zinc-500">
            Recommended Session
          </div>
          <div className="mt-2 text-2xl font-black text-indigo-600 dark:text-cyan-400 uppercase italic tracking-tight">
            {mood.prescription}
          </div>
        </div>

        <div className="border-t border-slate-200/60 dark:border-zinc-800/80 pt-4">
          <div className="flex items-start gap-3">
            <Target className="mt-1 h-5 w-5 text-indigo-600 dark:text-purple-400 flex-shrink-0" />
            <div>
              <div className="text-sm font-bold text-slate-700 dark:text-zinc-300">{mood.activity}</div>
              <div className="mt-1.5 flex items-center gap-2 text-xs text-slate-500 dark:text-zinc-400 font-bold uppercase tracking-wider">
                <Clock className="h-4 w-4" />
                {mood.duration}
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate(mood.path)}
          className="w-full rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-cyan-500 dark:to-indigo-500 py-4 font-extrabold text-xs uppercase tracking-widest text-white transition-all hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-[1.01] cursor-pointer"
        >
          Start Session Now
        </button>
      </div>
    </div>
  );
}

export default function EmotionalCalibration() {
  const [selectedMoodId, setSelectedMoodId] = useState(null);
  const selectedMood = moods.find((m) => m.id === selectedMoodId);

  return (
    <section className="relative py-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto z-10 w-full">
      <div className="space-y-16">
        <header className="reveal-on-scroll text-center space-y-4">
          <h2 className="text-xs font-black uppercase tracking-[0.25em] text-indigo-600 dark:text-cyan-400">
            Mental Regulation
          </h2>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">
            Emotional Calibration System
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-base text-slate-500 dark:text-zinc-400 leading-relaxed">
            Match screen interactions directly to your feelings. Reset cognitive focus with personalized, scientific feedback.
          </p>
        </header>

        {/* Main Content */}
        <div className="reveal-on-scroll mx-auto max-w-3xl">
          <div className="glass-panel rounded-[2.5rem] border border-slate-200/50 dark:border-zinc-800/80 p-8 md:p-12 shadow-xl backdrop-blur-md">
            <MoodSelector selectedMoodId={selectedMoodId} onSelectMood={setSelectedMoodId} />
            <PrescriptionCard mood={selectedMood} />
          </div>
        </div>

        {/* Info Cards */}
        <div className="reveal-on-scroll grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          <div className="glass-panel rounded-3xl border border-slate-200/50 dark:border-zinc-800/80 p-6 text-center backdrop-blur-md shadow-md">
            <div className="text-3xl font-black text-indigo-600 dark:text-cyan-400">78%</div>
            <div className="mt-2 text-xs font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500">Better mood in 1 week</div>
          </div>

          <div className="glass-panel rounded-3xl border border-slate-200/50 dark:border-zinc-800/80 p-6 text-center backdrop-blur-md shadow-md">
            <div className="text-3xl font-black text-purple-600 dark:text-purple-400">2.3x</div>
            <div className="mt-2 text-xs font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500">Faster focus vs meditation</div>
          </div>

          <div className="glass-panel rounded-3xl border border-slate-200/50 dark:border-zinc-800/80 p-6 text-center backdrop-blur-md shadow-md">
            <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">45m</div>
            <div className="mt-2 text-xs font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500">Optimal weekly count</div>
          </div>
        </div>
      </div>
    </section>
  );
}
