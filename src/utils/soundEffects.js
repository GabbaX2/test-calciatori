// Web Audio API Synthesizer & Web Speech API for Stadio Experience

let audioCtx = null;

const getAudioContext = () => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

/**
 * Double sharp referee whistle with realistic trill & harmonics
 */
export const playWhistle = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();

  // Modulator for whistle trill (frequency jitter)
  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  lfo.frequency.setValueAtTime(32, now);
  lfoGain.gain.setValueAtTime(45, now);

  osc1.type = 'sine';
  osc2.type = 'triangle';

  osc1.frequency.setValueAtTime(2800, now);
  osc2.frequency.setValueAtTime(2950, now);

  lfo.connect(osc1.frequency);
  lfo.connect(osc2.frequency);

  // Envelope: two quick whistle bursts
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.3, now + 0.04);
  gain.gain.setValueAtTime(0.3, now + 0.22);
  gain.gain.linearRampToValueAtTime(0.01, now + 0.28);
  gain.gain.linearRampToValueAtTime(0.35, now + 0.32);
  gain.gain.setValueAtTime(0.35, now + 0.65);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);

  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(ctx.destination);

  lfo.start(now);
  osc1.start(now);
  osc2.start(now);

  lfo.stop(now + 0.85);
  osc1.stop(now + 0.85);
  osc2.stop(now + 0.85);
};

/**
 * Stadium crowd cheer & roar synthesized with shaped white noise
 */
export const playCrowdCheer = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  const bufferSize = ctx.sampleRate * 2.5;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  // Brownish/pink filtered noise
  let lastOut = 0.0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    data[i] = (lastOut + 0.02 * white) / 1.02;
    lastOut = data[i];
    data[i] *= 3.5;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(800, ctx.currentTime);
  filter.Q.setValueAtTime(1.2, ctx.currentTime);

  const gain = ctx.createGain();
  const now = ctx.currentTime;
  gain.gain.setValueAtTime(0.01, now);
  gain.gain.linearRampToValueAtTime(0.4, now + 0.5);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 2.5);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start(now);
};

/**
 * VAR check scanner beep sequence
 */
export const playVarBeep = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const tones = [880, 1174, 1318];

  tones.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const startTime = now + idx * 0.14;

    osc.type = 'square';
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.12, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.1);
  });
};

/**
 * FUT Pack Reveal fanfare / bass boom + shiny chime
 */
export const playPackOpening = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Deep sub-bass boom
  const subOsc = ctx.createOscillator();
  const subGain = ctx.createGain();
  subOsc.type = 'sine';
  subOsc.frequency.setValueAtTime(140, now);
  subOsc.frequency.exponentialRampToValueAtTime(35, now + 0.8);

  subGain.gain.setValueAtTime(0.6, now);
  subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

  subOsc.connect(subGain);
  subGain.connect(ctx.destination);
  subOsc.start(now);
  subOsc.stop(now + 1.2);

  // Shimmering chimes arpeggio
  const chords = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
  chords.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const t = now + 0.2 + idx * 0.08;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);

    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.18, t + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.9);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + 0.9);
  });
};

/**
 * Tactile UI click
 */
export const playClick = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(900, now);
  osc.frequency.exponentialRampToValueAtTime(200, now + 0.05);

  gain.gain.setValueAtTime(0.1, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.05);
};

/**
 * Web Speech API shouting iconic Italian stadium slogans
 */
export const speakCatchphrase = (phraseKey) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  const phrases = {
    berlino: "Andiamo a Berlino, Beppe! Andiamo a Berlino!",
    sciabolata: "Sciabolata morbida... clamoroso al Cibali!",
    siuuu: "S I U U U U U U U U U!",
    proprioLui: "Proprio lui! Non ci posso credere, proprio lui!",
    gullo: "Gulloooo! Se fai ancora quella cazzata ti mangio il cuore!",
    pasta: "Mamma, butta la pasta che ho segnato di nuovo!",
    cucchiaio: "Mo je faccio er cucchiaio!",
    varDecision: "Controllo VAR completato: verdetto convalidato!"
  };

  const textToSpeak = phrases[phraseKey] || phraseKey;

  window.speechSynthesis.cancel(); // Stop prior speeches
  const utterance = new SpeechSynthesisUtterance(textToSpeak);
  utterance.lang = 'it-IT';
  utterance.rate = 1.05;
  utterance.pitch = 1.15;
  utterance.volume = 1.0;

  // Try to find an Italian voice
  const voices = window.speechSynthesis.getVoices();
  const itVoice = voices.find(v => v.lang.startsWith('it') || v.lang.includes('IT'));
  if (itVoice) {
    utterance.voice = itVoice;
  }

  window.speechSynthesis.speak(utterance);
};
