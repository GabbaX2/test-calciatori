import React, { useState } from 'react';
import { FutCard } from './FutCard';
import { Share2, RefreshCw, BookOpen, Flame, Skull, Users, Copy, Check, MessageSquare } from 'lucide-react';
import { playClick, playCrowdCheer } from '../utils/soundEffects';

export const ResultView = ({
  resultData,
  onResetQuiz,
  onViewAlbum,
  onSelectPlayerModal
}) => {
  const [copied, setCopied] = useState(false);

  const { topMatch, tridente, nemico, userProfile, userVector } = resultData;
  const mainPlayer = topMatch.player;

  // Build shareable URL: ?user=Nome&num=10&id=id_calciatore
  const baseUrl = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : '';
  const shareParams = new URLSearchParams({
    user: userProfile.name || 'Bomber',
    num: userProfile.number || '10',
    id: mainPlayer.id.toString()
  });
  const shareUrl = `${baseUrl}?${shareParams.toString()}`;

  const shareText = `⚽ *HO FATTO IL BOMBERTEST 100!* ⚽\nIl mio alter-ego calcistico è *${mainPlayer.name}* (OVR ${mainPlayer.ovr}) con il *${topMatch.affinity}%* di affinità!\n"${mainPlayer.quote}"\n\nE tu che scarpone sei? Fai il test e sfidami:\n${shareUrl}`;

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

  const handleNativeShare = async () => {
    playClick();
    if (navigator.share) {
      try {
        await navigator.share({
          title: `BomberTest 100 - Sono ${mainPlayer.name}!`,
          text: `Ho fatto il BomberTest 100 ed è risultato che sono ${mainPlayer.name} (OVR ${mainPlayer.ovr}) al ${topMatch.affinity}%!`,
          url: shareUrl
        });
      } catch (err) {
        // User cancelled share
      }
    } else {
      handleShareWhatsApp();
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Top Victory Ribbon */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-black text-xs uppercase tracking-wider mb-3">
          <Flame className="w-4 h-4 fill-emerald-400" />
          <span>VERDETTO DEFINITIVO EMESSO DAL VAR</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-black fut-font text-white uppercase tracking-tight">
          Il Tuo Alter Ego È <span className="text-yellow-400">{mainPlayer.name}</span>!
        </h1>
        <p className="text-slate-300 text-sm md:text-base mt-2 max-w-xl mx-auto">
          Complimenti <strong>{userProfile.name}</strong> #{userProfile.number}: la scienza del calcio d'osteria e l'algoritmo a 6 assi hanno decretato il tuo gemello separato alla nascita.
        </p>
      </div>

      {/* Main Giant FUT Card */}
      <div className="flex justify-center mb-8">
        <FutCard
          player={mainPlayer}
          userProfile={userProfile}
          affinityScore={topMatch.affinity}
          userVector={userVector}
          interactive={true}
          size="normal"
        />
      </div>

      {/* WhatsApp & Social Share Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 mb-10 shadow-xl">
        <h3 className="text-sm font-black uppercase text-slate-300 mb-3 flex items-center justify-center gap-2">
          <Share2 className="w-4 h-4 text-emerald-400" />
          <span>CONDIVIDI LA TUA CARTA SUI GRUPPI WHATSAPP DEL CALCETTO</span>
        </h3>

        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 min-w-[220px] py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-sm uppercase tracking-wide flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition"
          >
            <MessageSquare className="w-4 h-4 fill-black" />
            <span>Condividi su WhatsApp</span>
          </button>

          {typeof navigator !== 'undefined' && navigator.share && (
            <button
              type="button"
              onClick={handleNativeShare}
              className="py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition"
            >
              <Share2 className="w-4 h-4" />
              <span>Condividi...</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleCopyLink}
            className="py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm flex items-center justify-center gap-2 transition"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Link Copiato!</span>
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

      {/* I Tuoi Compagni di Tridente (#2 e #3) */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-2">
          <Users className="w-5 h-5 text-yellow-400" />
          <h2 className="text-xl font-black fut-font text-white uppercase tracking-wide">
            I Tuoi Compagni di Tridente (2° e 3° Posto)
          </h2>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          I due calciatori più compatibili con il tuo stile di gioco: con loro faresti sfracelli in campo e grigliate leggendarie a fine partita.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tridente.map((item, idx) => (
            <div
              key={item.player.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-3 hover:border-slate-700 transition"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{item.player.avatarEmoji}</span>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-yellow-400 text-black">
                      #{idx + 2}
                    </span>
                    <h4 className="font-black text-white text-base">
                      {item.player.name}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-400 italic">
                    "{item.player.nickname}"
                  </p>
                  <span className="text-[11px] text-emerald-400 font-bold">
                    {item.affinity}% affinità
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectPlayerModal(item.player)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition"
              >
                Vedi Carta
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Il Tuo Nemico Giurato (#100) */}
      <div className="bg-red-950/20 border border-red-900/40 rounded-3xl p-6 mb-10">
        <div className="flex items-center gap-2 mb-2">
          <Skull className="w-5 h-5 text-red-500" />
          <h2 className="text-xl font-black fut-font text-red-400 uppercase tracking-wide">
            Il Tuo Nemico Giurato in Campo (#100)
          </h2>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          Il calciatore con la personalità più opposta alla tua nel database di 100 calciatori. Se vi incrociaste sul campo volerebbero scivolate assassine entro i primi trenta secondi!
        </p>

        <div className="bg-black/40 border border-red-900/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <span className="text-4xl">{nemico.player.avatarEmoji}</span>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-red-600 text-white">
                  #100 NEMICO
                </span>
                <h4 className="font-black text-white text-lg">
                  {nemico.player.name}
                </h4>
                <span className="text-xs text-slate-400">OVR {nemico.player.ovr}</span>
              </div>
              <p className="text-xs text-red-300 italic mt-0.5">
                "{nemico.player.quote}"
              </p>
              <span className="text-[11px] text-slate-500 block mt-1">
                Incompatibilità caratteriale: {100 - nemico.affinity}%
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectPlayerModal(nemico.player)}
            className="px-4 py-2 rounded-xl bg-red-900/40 hover:bg-red-900/70 text-red-200 border border-red-800/50 text-xs font-bold transition flex-shrink-0"
          >
            Vedi Nemico
          </button>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-slate-800">
        <button
          type="button"
          onClick={onResetQuiz}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Rifai il Test</span>
        </button>

        <button
          type="button"
          onClick={onViewAlbum}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-black font-black text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-cyan-600/20"
        >
          <BookOpen className="w-4 h-4" />
          <span>Esplora Tutti i 100 Bomber</span>
        </button>
      </div>
    </div>
  );
};
