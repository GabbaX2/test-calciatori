import React, { useState } from 'react';
import { quizQuestions } from '../data/quizQuestions';
import { playClick, playWhistle } from '../utils/soundEffects';
import { ArrowLeft, ArrowRight, Play, Flame, HelpCircle, User, Hash, Clock } from 'lucide-react';

export const QuizView = ({ onQuizComplete, initialProfile = { name: '', number: '10' } }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: initialProfile.name || '',
    number: initialProfile.number || '10',
    motto: ''
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  // Base starting vector
  const baseline = { tec: 50, ign: 50, not: 50, ego: 50, fol: 50, pro: 50 };

  const handleStart = (e) => {
    e.preventDefault();
    if (!userProfile.name.trim()) {
      setUserProfile(prev => ({ ...prev, name: 'Bomber Anonimo' }));
    }
    playWhistle();
    setHasStarted(true);
  };

  const currentQ = quizQuestions[currentQuestionIndex];
  const selectedOptionId = answers[currentQ.id];

  const handleSelectOption = (optionId) => {
    playClick();
    const updatedAnswers = {
      ...answers,
      [currentQ.id]: optionId
    };
    setAnswers(updatedAnswers);

    // Auto-advance with slight delay for satisfying click feel
    setTimeout(() => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        // Compute final vector
        calculateFinalResult(updatedAnswers);
      }
    }, 280);
  };

  const calculateFinalResult = (finalAnswers) => {
    const finalVector = { ...baseline };

    quizQuestions.forEach(q => {
      const optId = finalAnswers[q.id];
      if (optId) {
        const option = q.options.find(o => o.id === optId);
        if (option && option.effects) {
          finalVector.tec = Math.min(100, Math.max(10, finalVector.tec + option.effects.tec));
          finalVector.ign = Math.min(100, Math.max(10, finalVector.ign + option.effects.ign));
          finalVector.not = Math.min(100, Math.max(10, finalVector.not + option.effects.not));
          finalVector.ego = Math.min(100, Math.max(10, finalVector.ego + option.effects.ego));
          finalVector.fol = Math.min(100, Math.max(10, finalVector.fol + option.effects.fol));
          finalVector.pro = Math.min(100, Math.max(10, finalVector.pro + option.effects.pro));
        }
      }
    });

    onQuizComplete({
      userVector: finalVector,
      userProfile: {
        name: userProfile.name.trim() || 'Il Bomber',
        number: userProfile.number || '10',
        motto: userProfile.motto
      }
    });
  };

  // STEP 0: PRE-QUIZ ONBOARDING
  if (!hasStarted) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4">
        {/* Hero Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-bold mb-4">
            <Flame className="w-4 h-4" />
            <span>100 CALCIATORI • 10 DOMANDE • 1 CARTA FUT</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black fut-font text-white uppercase tracking-tight leading-tight mb-3">
            Quale dei 100 Calciatori Iconici Sei?
          </h1>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6 font-medium">
            Sei più <strong>Moscardelli</strong> con la birra a bordocampo, <strong>Cassano</strong> coi cornetti alla crema,
            <strong> Gattuso</strong> che divora l'erba, <strong>Totti</strong> col cucchiaio o un bug di FIFA tipo <strong>Doumbia</strong>?
            Rispondi a 10 situazioni ignoranti e lascia che il VAR emetta la sentenza definitiva!
          </p>

          {/* Form */}
          <form onSubmit={handleStart} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-yellow-400" />
                  Nome o Soprannome da Calcetto *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Es: Er Cobra, Tatanka, Pippo..."
                  value={userProfile.name}
                  onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold placeholder-slate-500 focus:outline-none focus:border-yellow-400 transition"
                  maxLength={25}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5 text-yellow-400" />
                  N° Maglia (1-99)
                </label>
                <input
                  type="number"
                  min="1"
                  max="99"
                  value={userProfile.number}
                  onChange={(e) => setUserProfile({ ...userProfile, number: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold text-center focus:outline-none focus:border-yellow-400 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-black font-black fut-font text-xl uppercase tracking-wider shadow-[0_10px_25px_rgba(250,204,21,0.4)] hover:scale-[1.01] active:scale-[0.99] transition flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5 fill-black" />
              <span>FISCHIO D'INIZIO (1° MINUTO)</span>
            </button>
          </form>

          {/* Footer Highlights */}
          <div className="grid grid-cols-3 gap-2 mt-6 pt-6 border-t border-slate-800/80 text-center text-xs text-slate-400">
            <div>
              <span className="block font-black text-white text-base">100/100</span>
              <span>Calciatori Nel Database</span>
            </div>
            <div>
              <span className="block font-black text-yellow-400 text-base">6 Assi</span>
              <span>Algoritmo Euclideo</span>
            </div>
            <div>
              <span className="block font-black text-cyan-400 text-base">100% Free</span>
              <span>Condividi su WhatsApp</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // STEP 1-10: THE QUIZ MATCH
  const progressPercent = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      {/* Stadium Clock Scoreboard Header */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 mb-5 shadow-lg flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-yellow-400 text-black font-black text-sm">
              {currentQ.minute}
            </span>
            <div>
              <span className="text-white uppercase font-black tracking-wide block">
                {currentQ.stage}
              </span>
              <span className="text-[11px] text-slate-500">
                Domanda {currentQuestionIndex + 1} di {quizQuestions.length}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono">
            <span className="text-yellow-400">{userProfile.name}</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px]">
              #{userProfile.number}
            </span>
          </div>
        </div>

        {/* Match Timer Progress Bar */}
        <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-yellow-500 to-amber-400 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl relative">
        <h2 className="text-xl md:text-2xl font-black text-white fut-font tracking-tight mb-2">
          {currentQ.title}
        </h2>
        <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6 font-medium">
          {currentQ.scenario}
        </p>

        {/* Options Grid */}
        <div className="space-y-3">
          {currentQ.options.map((option) => {
            const isSelected = selectedOptionId === option.id;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelectOption(option.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-start gap-3.5 group ${
                  isSelected
                    ? 'bg-yellow-400/20 border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.2)]'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-950'
                }`}
              >
                {/* Option Letter Pin */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-yellow-400 text-black'
                      : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-white'
                  }`}
                >
                  {option.id}
                </div>

                {/* Option Content */}
                <div className="flex-1">
                  <p className="text-sm md:text-base text-slate-200 font-medium leading-snug">
                    {option.text}
                  </p>
                  <span className="inline-block mt-1.5 px-2 py-0.5 rounded text-[11px] font-bold bg-white/5 text-yellow-400/90 border border-white/5">
                    {option.vibe}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-800">
          <button
            type="button"
            disabled={currentQuestionIndex === 0}
            onClick={() => {
              playClick();
              setCurrentQuestionIndex(prev => Math.max(0, prev - 1));
            }}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Minuto Precedente</span>
          </button>

          {selectedOptionId && currentQuestionIndex < quizQuestions.length - 1 && (
            <button
              type="button"
              onClick={() => {
                playClick();
                setCurrentQuestionIndex(prev => prev + 1);
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1.5 transition"
            >
              <span>Avanti</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
