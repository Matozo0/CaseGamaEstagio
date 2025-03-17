import { IMeta, NewMeta } from './meta.model';

export const sampleWithRequiredData: IMeta = {
  id: 17187,
  area: 'HUMANAS',
  nota: 402,
};

export const sampleWithPartialData: IMeta = {
  id: 15622,
  area: 'MATEMATICA',
  nota: 554,
};

export const sampleWithFullData: IMeta = {
  id: 32703,
  area: 'LINGUAGENS',
  nota: 209,
};

export const sampleWithNewData: NewMeta = {
  area: 'NATUREZA',
  nota: 880,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
