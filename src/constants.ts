
import { RealmData } from './types';

export const REALMS: RealmData[] = [
  { id: 10, number: 3, style: 'cosmic_starfield', description: 'Cosmic 3' },
  { id: 9, number: 1, style: 'holographic_reactor', description: 'Digital 1' },
  { id: 8, number: 4, style: 'waveform_synth', description: 'Vibrating 4' },
  { id: 7, number: 1, style: 'fluid_simulation', description: 'Liquid 1' },
  { id: 6, number: 5, style: 'catch_number', description: 'Kinetic 5' },
  { id: 5, number: 9, style: 'procedural_creature', description: 'Living 9' },
  { id: 4, number: 2, style: 'brushstroke_painter', description: 'Painted 2' },
  { id: 3, number: 6, style: 'mood_crystal', description: 'Crystal 6' },
  { id: 2, number: 5, style: 'quantum_dice', description: 'Quantum 5' },
];

export const REALM_1: RealmData = {
  id: 1,
  number: 3,
  style: 'emotion_gauge',
  description: 'Final 3'
};

export const FULL_SEQUENCE = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3];
