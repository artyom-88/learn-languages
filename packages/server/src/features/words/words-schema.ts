import { Language } from '@learn-languages/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Cat>;

@Schema()
export class Cat {
  @Prop()
  name!: string;

  @Prop()
  lang!: Language;

  @Prop()
  description!: string[];

  @Prop()
  examples!: string[];
}

export const CatSchema = SchemaFactory.createForClass(Cat);
