import React, { useState } from 'react';
import { FutCard } from './FutCard';
import { X, Share2, Copy, Check, MessageSquare, Sparkles } from 'lucide-react';
import { playClick } from '../utils/soundEffects';

export const PlayerModal = ({ player, onClose, defaultUserName = '', defaultUserNum = '10' }) => {
  const [customName, setCustomName] = useState(defaultUserName);
  const [customNum, setCustomNum] = useState(defaultUserNum);
  const [copied, setCopied] = useState(false);

  if (!player) return null;

  const baseUrl = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : '';
  const shareParams = new URLSearchParams({
    user: customName.trim() || 'Bomber',
    num: customNum || '10',
    id: player.id.toString()
  });
  const shareUrl = `${baseUrl}?${shareParams.toString()}`;

  const shareText = `⚽ *BOMBERTEST 100 - CARTA CONDIVISA!* ⚽\nEcco la carta di *${player.name}* (OVR ${player.ovr}) - "${player.nickname}"!\n"${player.quote}"\n\nFai il test e scopri quale dei 100 calciatori sei:\n${shareUrl}`;

  const handleShareWhatsApp = () => {
    playClick();
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(waUrl, '_blank');
  };

  const handleCopyLink = () => {
    playClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 md:p-4 overflow-y-auto">
      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-slate-950 border border-slate-800 rounded-3xl p-5 shadow-2xl my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Custom Name / Jersey Customizer */}
        <div className="mb-4 bg-slate-900 border border-slate-800 rounded-2xl p-3">
          <span className="text-[11px] font-bold text-yellow-400 uppercase tracking-wide block mb-1.5 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            Personalizza col tuo nome e condividi:
          </span>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Il tuo nome/soprannome"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white font-bold focus:border-yellow-400 focus:outline-none"
              maxLength={22}
            />
            <input
              type="number"
              placeholder="#"
              min="1"
              max="99"
              value={customNum}
              onChange={(e) => setCustomNum(e.target.value)}
              className="w-14 px-2 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white font-bold text-center focus:border-yellow-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Card Display */}
        <div className="flex justify-center mb-4">
          <FutCard
            player={player}
            userProfile={{ name: customName, number: customNum }}
            interactive={true}
            size="normal"
          />
        </div>

        {/* Share Buttons */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-wide flex items-center justify-center gap-1.5 shadow transition"
          >
            <MessageSquare className="w-4 h-4 fill-black" />
            <span>Condividi su WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={handleCopyLink}
            className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Copiato!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copia Link</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
