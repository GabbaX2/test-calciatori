import React from 'react';
import { getPlayerById } from '../data/playersDatabase';
import { Flame, Trophy, Play } from 'lucide-react';

export const SharedFriendBanner = ({ sharedData, onStartQuiz, onViewSharedCard }) => {
  if (!sharedData || !sharedData.id) return null;

  const player = getPlayerById(sharedData.id);
  const friendName = sharedData.user || 'Il tuo amico';
  const jerseyNum = sharedData.num ? `#${sharedData.num}` : '';

  return (
    <div className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-500 text-black px-4 py-2.5 shadow-lg border-b border-yellow-400">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs sm:text-sm font-bold">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span className="text-xl">🏆</span>
          <div>
            <span>
              <strong className="uppercase underline">{friendName}</strong> {jerseyNum} ha fatto il BomberTest ed è risultato:{' '}
              <strong className="text-black bg-white/40 px-2 py-0.5 rounded-md uppercase">
                {player.name} (OVR {player.ovr})
              </strong>!
            </span>
            <span className="block text-[11px] text-amber-950 font-normal">
              "{player.quote.substring(0, 75)}..."
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {onViewSharedCard && (
            <button
              type="button"
              onClick={onViewSharedCard}
              className="px-3 py-1.5 rounded-lg bg-black/80 text-yellow-300 hover:bg-black text-xs font-black transition-all shadow"
            >
              👀 Guarda la sua Carta
            </button>
          )}
          <button
            type="button"
            onClick={onStartQuiz}
            className="px-3.5 py-1.5 rounded-lg bg-black text-white hover:bg-slate-900 text-xs font-black transition-all shadow flex items-center gap-1.5 animate-bounce"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>SFIDALO NEL TEST!</span>
          </button>
        </div>
      </div>
    </div>
  );
};
