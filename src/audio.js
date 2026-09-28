// Web Audio API Sound Synthesizer for zero-latency, realistic feedback

let audioCtx = null;
let soundEnabled = true;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setSoundEnabled(enabled) {
  soundEnabled = enabled;
}

export function getSoundEnabled() {
  return soundEnabled;
}

// White noise buffer for crisp mechanical hammer transient clicks
let typewriterNoiseBuffer = null;

function getTypewriterNoise(ctx) {
  if (!typewriterNoiseBuffer) {
    const bufferSize = Math.floor(ctx.sampleRate * 0.08); // 80ms noise
    typewriterNoiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = typewriterNoiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
  }
  return typewriterNoiseBuffer;
}

// Typewriter & Key Click Sound Synthesizer
export function playKeyClick(isSpace = false) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    if (isSpace) {
      // 1. Spacebar: Heavy typewriter carriage shift + platen roller thump
      // Escapement ratchet click (filtered noise)
      const noise = ctx.createBufferSource();
      noise.buffer = getTypewriterNoise(ctx);
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2400, now);
      filter.Q.setValueAtTime(2.0, now);
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.12, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start(now);
      noise.stop(now + 0.04);

      // Deep platen roller mechanical thock
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(175 + (Math.random() - 0.5) * 20, now);
      osc.frequency.exponentialRampToValueAtTime(55, now + 0.05);
      oscGain.gain.setValueAtTime(0.24, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.055);
      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.06);
    } else {
      // 2. Regular Key: Authentic sharp metal hammer strike on roller platen
      // Component A: Crisp hammer click transient (bandpass white noise snap)
      const noise = ctx.createBufferSource();
      noise.buffer = getTypewriterNoise(ctx);
      const bandpass = ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      // Slight pitch variance per keystroke for natural acoustic feel
      const clickPitch = 3800 + (Math.random() - 0.5) * 500;
      bandpass.frequency.setValueAtTime(clickPitch, now);
      bandpass.Q.setValueAtTime(2.5, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.22, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.022);

      noise.connect(bandpass);
      bandpass.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start(now);
      noise.stop(now + 0.025);

      // Component B: Typewriter keybar strike metallic chime / ping
      const strikeOsc = ctx.createOscillator();
      const strikeGain = ctx.createGain();
      strikeOsc.type = 'sine';
      const keyPitch = 1250 + (Math.random() - 0.5) * 220;
      strikeOsc.frequency.setValueAtTime(keyPitch, now);
      strikeOsc.frequency.exponentialRampToValueAtTime(280, now + 0.038);

      strikeGain.gain.setValueAtTime(0.14, now);
      strikeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      strikeOsc.connect(strikeGain);
      strikeGain.connect(ctx.destination);
      strikeOsc.start(now);
      strikeOsc.stop(now + 0.045);

      // Component C: Mechanical chassis clack body (low resonance)
      const bodyOsc = ctx.createOscillator();
      const bodyGain = ctx.createGain();
      bodyOsc.type = 'triangle';
      bodyOsc.frequency.setValueAtTime(360 + (Math.random() - 0.5) * 40, now);
      bodyOsc.frequency.exponentialRampToValueAtTime(95, now + 0.03);

      bodyGain.gain.setValueAtTime(0.1, now);
      bodyGain.gain.exponentialRampToValueAtTime(0.001, now + 0.032);

      bodyOsc.connect(bodyGain);
      bodyGain.connect(ctx.destination);
      bodyOsc.start(now);
      bodyOsc.stop(now + 0.035);
    }
  } catch {
    // Audio context may need user gesture
  }
}

// Typewriter Key Jam / Dull Clunk on Error
export function playErrorSound() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Typewriter mechanical jam / dull muffled thud
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.12);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(420, now);

    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.13);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.14);
  } catch {}
}

// Rewarding combo chime
export function playStreakChime(streak = 10) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C, E, G, High C
    const noteIndex = Math.min(Math.floor(streak / 5) % notes.length, notes.length - 1);
    const freq = notes[noteIndex];

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  } catch {}
}

// Radiant level up fanfare
export function playGlamourUp() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const arpeggio = [440, 554.37, 659.25, 880, 1108.73];
    arpeggio.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = now + idx * 0.06;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.08, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.2);
    });
  } catch {}
}

// Comical slide down on major drop
export function playGlamourDrop() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.25);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.26);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.26);
  } catch {}
}
