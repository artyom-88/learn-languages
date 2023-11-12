import type { IWord } from '@learn-languages/common';
import { Language } from '@learn-languages/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';

export type WordDocument = HydratedDocument<Word>;

@Schema()
export class Word implements IWord {
  @Prop()
  name!: string;

  @Prop()
  lang!: Language;

  @Prop()
  description?: string[];

  @Prop()
  examples?: string[];
}

export const WordSchema = SchemaFactory.createForClass(Word);
