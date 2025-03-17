import { IAluno, NewAluno } from './aluno.model';

export const sampleWithRequiredData: IAluno = {
  id: 8806,
  nome: 'boo tomorrow',
};

export const sampleWithPartialData: IAluno = {
  id: 17813,
  nome: 'hot morbidity salty',
  serie: 3,
  faculdadePreferida: 'via whoa passionate',
  cursoPreferido: 'slowly sheepishly',
};

export const sampleWithFullData: IAluno = {
  id: 25732,
  nome: 'oof near likewise',
  serie: 1,
  jaFezEnem: false,
  faculdadePreferida: 'joshingly abaft',
  cursoPreferido: 'premeditation aha how',
};

export const sampleWithNewData: NewAluno = {
  nome: 'energetically yet webbed',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
