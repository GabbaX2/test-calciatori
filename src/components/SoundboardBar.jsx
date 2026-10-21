import React, { useState } from 'react';
import {
  playWhistle,
  playCrowdCheer,
  playPackOpening,
  speakCatchphrase
} from '../utils/soundEffects';
import { Volume2, VolumeX, Sparkles, Megaphone } from 'lucide-react';

export const SoundboardBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePhrase, setActivePhrase] = useState(null);

  const sounds = [
    { label: '🛑 Fischio', action: () => playWhistle(), desc: 'Arbitro' },
    { label: '🏟️ Coro Stadio', action: () => playCrowdCheer(), desc: 'Tifosi' },
    { label: '⚡ SIUUUU!', action: () => speakCatchphrase('siuuu'), desc: 'CR7' },
    { label: '🎙️ Berlino!', action: () => speakCatchphrase('berlino'), desc: 'Caressa' },
    { label: '⚽ Sciabolata', action: () => speakCatchphrase('sciabolata'), desc: 'Piccinini' },
    { label: '🥄 Cucchiaio', action: () => speakCatchphrase('cucchiaio'), desc: 'Totti' },
    { label: '🤬 Gullo!', action: () => speakCatchphrase('gullo'), desc: 'Graziani' },
    { label: '🍝 Mamma Pasta!', action: () => speakCatchphrase('pasta'), desc: 'Scarpari' },
  ];

  const handleTrigger = (item) => {
    setActivePhrase(item.label);
    item.action();
    setTimeout(() => setActivePhrase(null), 1200);
  };

  return (
    <div className="bg-slate-950/80 border-b border-slate-800/80 backdrop-blur-md px-3 py-2 text-xs">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 overflow-x-auto no-scrollbar py-0.5">
        <div className="flex items-center gap-1.5 text-yellow-400 font-black uppercase text-[11px] whitespace-nowrap mr-2">
          <Megaphone className="w-3.5 h-3.5 text-yellow-400" />
          <span>EFFETTI STADIO:</span>
        </div>

        <div className="flex items-center gap-1.5 flex-nowrap">
          {sounds.map((s) => (
            <button
              key={s.label}
              type="button"
              onClick={() => handleTrigger(s)}
              className={`px-2.5 py-1 rounded-full border transition-all text-[11px] font-bold whitespace-nowrap flex items-center gap-1 ${
                activePhrase === s.label
                  ? 'bg-yellow-400 text-black border-yellow-300 scale-105 shadow-[0_0_12px_rgba(250,204,21,0.6)]'
                  : 'bg-slate-900/90 text-slate-300 border-slate-700/60 hover:bg-slate-800 hover:text-white hover:border-yellow-500/50'
              }`}
            >
              <span>{s.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
