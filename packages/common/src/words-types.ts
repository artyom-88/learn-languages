import type { Language } from './common-types';

export interface IWord {
  readonly _id?: string;

  readonly name: string;

  readonly lang: Language;

  readonly description?: string[];

  readonly examples?: string[];
}
