import type { IWord } from '@learn-languages/common';
import { Language } from '@learn-languages/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';

export type WordDocument = HydratedDocument<Word>;

@Schema()
@ObjectType()
export class Word implements IWord {
  @Field(() => String, { nullable: true })
  _id?: string;

  @Prop()
  @Field()
  name!: string;

  @Prop()
  @Field(() => Language)
  lang!: Language;

  @Prop()
  @Field(() => [String], { nullable: true })
  description?: string[];

  @Prop()
  @Field(() => [String], { nullable: true })
  examples?: string[];
}

export const WordSchema = SchemaFactory.createForClass(Word);
