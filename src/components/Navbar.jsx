import React from 'react';
import { Trophy, BookOpen, Sparkles, Flame, Volume2 } from 'lucide-react';

export const Navbar = ({ currentView, onViewChange, onResetQuiz }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0a0d14]/90 backdrop-blur-lg border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
        {/* Brand / Logo */}
        <div
          onClick={() => {
            onViewChange('quiz');
          }}
          className="flex items-center gap-2 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-yellow-500 via-amber-400 to-yellow-200 flex items-center justify-center shadow-[0_0_15px_rgba(234,179,8,0.4)] group-hover:scale-105 transition-transform">
            <span className="text-xl">⚽</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-lg md:text-xl font-black fut-font tracking-tight text-white leading-none">
                BOMBER<span className="text-yellow-400">TEST</span>
              </span>
              <span className="px-1.5 py-0.2 rounded bg-yellow-400 text-black font-black text-[10px] tracking-wide">
                100
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase hidden sm:inline">
              Il Test Definitivo Serie A & Cult
            </span>
          </div>
        </div>

        {/* View Switcher Buttons */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => onViewChange('quiz')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 ${
              currentView === 'quiz' || currentView === 'result'
                ? 'bg-yellow-400 text-black shadow-[0_0_20px_rgba(250,204,21,0.4)] scale-100'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>FAI IL TEST</span>
          </button>

          <button
            type="button"
            onClick={() => onViewChange('album')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 ${
              currentView === 'album'
                ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-100'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>ALBUM 100</span>
            <span className="ml-0.5 px-1.5 py-0.5 rounded-full text-[10px] bg-black/40 text-cyan-300 font-mono hidden md:inline">
              100/100
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
