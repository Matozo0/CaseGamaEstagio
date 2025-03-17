import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IAluno, NewAluno } from '../aluno.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAluno for edit and NewAlunoFormGroupInput for create.
 */
type AlunoFormGroupInput = IAluno | PartialWithRequiredKeyOf<NewAluno>;

type AlunoFormDefaults = Pick<NewAluno, 'id' | 'jaFezEnem'>;

type AlunoFormGroupContent = {
  id: FormControl<IAluno['id'] | NewAluno['id']>;
  nome: FormControl<IAluno['nome']>;
  serie: FormControl<IAluno['serie']>;
  jaFezEnem: FormControl<IAluno['jaFezEnem']>;
  faculdadePreferida: FormControl<IAluno['faculdadePreferida']>;
  cursoPreferido: FormControl<IAluno['cursoPreferido']>;
  user: FormControl<IAluno['user']>;
};

export type AlunoFormGroup = FormGroup<AlunoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AlunoFormService {
  createAlunoFormGroup(aluno: AlunoFormGroupInput = { id: null }): AlunoFormGroup {
    const alunoRawValue = {
      ...this.getFormDefaults(),
      ...aluno,
    };
    return new FormGroup<AlunoFormGroupContent>({
      id: new FormControl(
        { value: alunoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      nome: new FormControl(alunoRawValue.nome, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      serie: new FormControl(alunoRawValue.serie, {
        validators: [Validators.min(1), Validators.max(3)],
      }),
      jaFezEnem: new FormControl(alunoRawValue.jaFezEnem),
      faculdadePreferida: new FormControl(alunoRawValue.faculdadePreferida, {
        validators: [Validators.minLength(3)],
      }),
      cursoPreferido: new FormControl(alunoRawValue.cursoPreferido, {
        validators: [Validators.minLength(5)],
      }),
      user: new FormControl(alunoRawValue.user, {
        validators: [Validators.required],
      }),
    });
  }

  getAluno(form: AlunoFormGroup): IAluno | NewAluno {
    return form.getRawValue() as IAluno | NewAluno;
  }

  resetForm(form: AlunoFormGroup, aluno: AlunoFormGroupInput): void {
    const alunoRawValue = { ...this.getFormDefaults(), ...aluno };
    form.reset(
      {
        ...alunoRawValue,
        id: { value: alunoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): AlunoFormDefaults {
    return {
      id: null,
      jaFezEnem: false,
    };
  }
}
