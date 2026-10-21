import React, { useEffect, useState } from 'react';
import { playVarBeep, playPackOpening, speakCatchphrase, playCrowdCheer } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import { ShieldCheck, Monitor, Crosshair, AlertTriangle } from 'lucide-react';

export const VarScreen = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // Play initial VAR sound
    playVarBeep();

    const t1 = setTimeout(() => {
      setPhase(1);
      playVarBeep();
    }, 700);

    const t2 = setTimeout(() => {
      setPhase(2);
      playVarBeep();
    }, 1500);

    const t3 = setTimeout(() => {
      setPhase(3);
    }, 2200);

    const finishTimeout = setTimeout(() => {
      // Fire confetti and reveal card fanfare
      playPackOpening();
      playCrowdCheer();
      speakCatchphrase('varDecision');

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Fallback if canvas-confetti issues
      }

      onComplete();
    }, 2700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(finishTimeout);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-[#06080d]/95 backdrop-blur-xl flex flex-col items-center justify-center p-4">
      {/* VAR Frame / Monitor Box */}
      <div className="relative w-full max-w-xl bg-slate-950 border-2 border-cyan-500/60 rounded-2xl p-6 shadow-[0_0_50px_rgba(6,182,212,0.3)] overflow-hidden">
        {/* Animated Scanline */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent h-16 w-full animate-var-scan pointer-events-none" />

        {/* Diagonal moving calibration lines (fuorigioco lines) */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-1/4 left-0 right-0 h-[1.5px] bg-red-500/80 transform rotate-2 animate-pulse" />
          <div className="absolute top-2/3 left-0 right-0 h-[1.5px] bg-cyan-400/80 transform -rotate-1" />
          <div className="absolute top-0 bottom-0 left-1/3 w-[1.5px] bg-blue-500/40" />
          <div className="absolute top-0 bottom-0 right-1/4 w-[1.5px] bg-emerald-500/50" />
        </div>

        {/* VAR Header */}
        <div className="flex items-center justify-between border-b border-cyan-900/60 pb-3 mb-6 relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-red-500 animate-ping" />
            <span className="text-red-500 font-black tracking-widest text-xs uppercase flex items-center gap-1.5">
              <Monitor className="w-4 h-4 inline" /> REC • SALA VAR LISSONE
            </span>
          </div>
          <span className="text-cyan-400 font-mono text-xs font-bold">
            FRAME: #06-09-2006
          </span>
        </div>

        {/* Central Display */}
        <div className="relative z-10 flex flex-col items-center text-center py-6">
          <div className="w-20 h-20 rounded-2xl bg-cyan-950/80 border border-cyan-400/40 flex items-center justify-center mb-5 shadow-inner shadow-cyan-500/20">
            <Crosshair className="w-10 h-10 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
          </div>

          <h3 className="text-2xl md:text-3xl font-black fut-font text-white uppercase tracking-wider mb-2 drop-shadow">
            {phase === 0 && '📡 CONTROLLO VAR IN CORSO...'}
            {phase === 1 && '📐 CALIBRAZIONE LINEE FUORIGIOCO...'}
            {phase === 2 && '🍺 VERIFICA TASSO ALCOLICO & TIBIA...'}
            {phase === 3 && '✅ VERDETTO CONFERMATO!'}
          </h3>

          <p className="text-sm text-cyan-300 font-mono tracking-tight max-w-md">
            {phase === 0 && 'L’arbitro si avvicina al monitor a bordocampo tra le proteste dei compagni.'}
            {phase === 1 && 'Analisi millimetrica della scivolata e del posizionamento dei tacchetti.'}
            {phase === 2 && 'Calcolo della compatibilità genetica con i 100 calciatori più ignoranti.'}
            {phase === 3 && 'Nessun dubbio per la terna arbitrale: abbiamo il tuo alter-ego!'}
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden mt-6 border border-cyan-900/50">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400 transition-all duration-500"
              style={{
                width: phase === 0 ? '25%' : phase === 1 ? '60%' : phase === 2 ? '85%' : '100%'
              }}
            />
          </div>
        </div>

        {/* Footer Warning */}
        <div className="mt-4 pt-3 border-t border-cyan-950 flex items-center justify-between text-[11px] text-slate-400 relative z-10">
          <span className="flex items-center gap-1 text-yellow-400/90 font-medium">
            <AlertTriangle className="w-3.5 h-3.5" />
            Decisione finale insindacabile
          </span>
          <span className="font-mono text-cyan-500">RISOLUZIONE 4K HDR</span>
        </div>
      </div>
    </div>
  );
};
