// Web Audio API engine sound synthesizer for Duke motorcycle throttle revs
class EngineRevSynthesizer {
  private ctx: AudioContext | null = null;
  private isRevving = false;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playRev(baseFreq = 120, duration = 1.4) {
    if (this.isRevving) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      this.isRevving = true;
      const now = this.ctx.currentTime;

      // Master gain node
      const masterGain = this.ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, now);
      masterGain.gain.linearRampToValueAtTime(0.25, now + 0.1);
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      masterGain.connect(this.ctx.destination);

      // Low pass filter for engine growl
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(baseFreq * 2.5, now);
      filter.frequency.exponentialRampToValueAtTime(baseFreq * 8, now + 0.35);
      filter.frequency.exponentialRampToValueAtTime(baseFreq * 2, now + duration);
      filter.Q.value = 4.0;
      filter.connect(masterGain);

      // Waveshaper for cylinder explosion distortion
      const distortion = this.ctx.createWaveShaper();
      distortion.curve = this.makeDistortionCurve(16);
      distortion.connect(filter);

      // Primary Cylinder Oscillator (Sawtooth)
      const osc1 = this.ctx.createOscillator();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(baseFreq, now); // Idle RPM
      osc1.frequency.exponentialRampToValueAtTime(baseFreq * 2.8, now + 0.38); // Throttle blip
      osc1.frequency.exponentialRampToValueAtTime(baseFreq * 0.9, now + duration); // Spin down
      osc1.connect(distortion);

      // Secondary Harmonic Oscillator (Square) for sub-bass punch
      const osc2 = this.ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(baseFreq * 0.5, now);
      osc2.frequency.exponentialRampToValueAtTime(baseFreq * 1.4, now + 0.38);
      osc2.frequency.exponentialRampToValueAtTime(baseFreq * 0.5, now + duration);
      osc2.connect(distortion);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + duration);
      osc2.stop(now + duration);

      // Mini exhaust pop on decel
      setTimeout(() => {
        if (!this.ctx) return;
        const popNow = this.ctx.currentTime;
        const popOsc = this.ctx.createOscillator();
        const popGain = this.ctx.createGain();
        popOsc.type = 'sawtooth';
        popOsc.frequency.setValueAtTime(80, popNow);
        popGain.gain.setValueAtTime(0.12, popNow);
        popGain.gain.exponentialRampToValueAtTime(0.001, popNow + 0.08);
        popOsc.connect(popGain);
        popGain.connect(this.ctx.destination);
        popOsc.start(popNow);
        popOsc.stop(popNow + 0.08);
      }, (duration * 0.5) * 1000);

      setTimeout(() => {
        this.isRevving = false;
      }, duration * 1000);
    } catch {
      this.isRevving = false;
    }
  }

  private makeDistortionCurve(amount = 20): Float32Array {
    const k = amount;
    const nSamples = 44100;
    const curve = new Float32Array(nSamples);
    const deg = Math.PI / 180;
    for (let i = 0; i < nSamples; ++i) {
      const x = (i * 2) / nSamples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }
}

export const engineSound = new EngineRevSynthesizer();
