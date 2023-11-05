import { Language } from './common-types';

export interface IWord {
  readonly name: string;

  readonly lang: Language;

  readonly description?: string[];

  readonly examples?: string[];
}
