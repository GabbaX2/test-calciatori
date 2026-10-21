import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SoundboardBar } from './components/SoundboardBar';
import { SharedFriendBanner } from './components/SharedFriendBanner';
import { QuizView } from './components/QuizView';
import { VarScreen } from './components/VarScreen';
import { ResultView } from './components/ResultView';
import { AlbumView } from './components/AlbumView';
import { PlayerModal } from './components/PlayerModal';
import { getPlayerById, matchUserToPlayers } from './data/playersDatabase';

export default function App() {
  const [currentView, setCurrentView] = useState('quiz'); // 'quiz' | 'var' | 'result' | 'album'
  const [userProfile, setUserProfile] = useState({ name: '', number: '10' });
  const [userVector, setUserVector] = useState(null);
  const [resultData, setResultData] = useState(null);
  const [sharedData, setSharedData] = useState(null);
  const [modalPlayer, setModalPlayer] = useState(null);

  // Read URL query params on load (e.g. ?user=Mario&num=10&id=1)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const user = params.get('user');
      const num = params.get('num');
      const id = params.get('id');

      if (id) {
        setSharedData({ user: user || 'Amico', num: num || '10', id });
      }
    }
  }, []);

  const handleQuizComplete = ({ userVector: vector, userProfile: profile }) => {
    setUserVector(vector);
    setUserProfile(profile);

    // Compute top matches using Euclidean distance matching across all 100 players
    const matchResults = matchUserToPlayers(vector);
    setResultData({
      ...matchResults,
      userProfile: profile,
      userVector: vector
    });

    // Switch to VAR screen
    setCurrentView('var');
  };

  const handleVarComplete = () => {
    setCurrentView('result');
  };

  const handleResetQuiz = () => {
    setCurrentView('quiz');
  };

  const handleViewSharedCard = () => {
    if (sharedData && sharedData.id) {
      const player = getPlayerById(sharedData.id);
      setModalPlayer(player);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-yellow-500 selection:text-black">
      {/* Top Navigation & Brand */}
      <Navbar
        currentView={currentView}
        onViewChange={(view) => setCurrentView(view)}
        onResetQuiz={handleResetQuiz}
      />

      {/* Stadium Soundboard Bar */}
      <SoundboardBar />

      {/* Shared Friend Banner (if opened via WhatsApp link) */}
      {sharedData && (
        <SharedFriendBanner
          sharedData={sharedData}
          onStartQuiz={() => setCurrentView('quiz')}
          onViewSharedCard={handleViewSharedCard}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {/* VAR Screen Overlay */}
        {currentView === 'var' && (
          <VarScreen onComplete={handleVarComplete} />
        )}

        {/* View 1: Quiz */}
        {currentView === 'quiz' && (
          <QuizView
            onQuizComplete={handleQuizComplete}
            initialProfile={userProfile}
          />
        )}

        {/* View 2: Result */}
        {currentView === 'result' && resultData && (
          <ResultView
            resultData={resultData}
            onResetQuiz={handleResetQuiz}
            onViewAlbum={() => setCurrentView('album')}
            onSelectPlayerModal={(player) => setModalPlayer(player)}
          />
        )}

        {/* View 3: Album 100 */}
        {currentView === 'album' && (
          <AlbumView
            defaultUserName={userProfile.name}
            defaultUserNum={userProfile.number}
          />
        )}
      </main>

      {/* Global Player Modal (if open) */}
      {modalPlayer && (
        <PlayerModal
          player={modalPlayer}
          onClose={() => setModalPlayer(null)}
          defaultUserName={userProfile.name}
          defaultUserNum={userProfile.number}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 px-4 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-2 text-slate-400 font-bold">
            <span>⚽ BomberTest 100</span>
            <span>•</span>
            <span>Tutti i 100 Calciatori Presenti nel Database</span>
            <span>•</span>
            <span>100% Client-Side</span>
          </div>
          <p>
            Ispirato a EA Sports FC Ultimate Team, Calciatori Brutti, Mai Dire Gol e alla leggendaria nostalgia della Serie A anni '90-2000.
          </p>
          <p className="text-[11px] text-slate-600">
            Nessun joystick PlayStation 2 né tibia di difensore è stata maltrattata durante la creazione di questa applicazione.
          </p>
        </div>
      </footer>
    </div>
  );
}
