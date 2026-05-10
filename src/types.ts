
export type RealmStyle = 
  | 'quantum_dice' 
  | 'fluid_simulation' 
  | 'waveform_synth' 
  | 'mood_crystal' 
  | 'procedural_creature' 
  | 'catch_number' 
  | 'brushstroke_painter' 
  | 'cosmic_starfield' 
  | 'holographic_reactor' 
  | 'emotion_gauge';

export interface RealmData {
  id: number;
  number: number;
  style: RealmStyle;
  description: string;
}
