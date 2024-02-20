import type { IWord } from '@learn-languages/common';
import { Language } from '@learn-languages/common';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateWordDto implements Partial<IWord> {
  @Field(() => [String], { nullable: true })
  readonly description?: string[];

  @Field(() => [String], { nullable: true })
  readonly examples?: string[];
}

@InputType()
export class CreateWordDto extends UpdateWordDto implements IWord {
  @Field()
  readonly name!: string;

  @Field(() => Language, { defaultValue: Language.EN, nullable: true })
  readonly lang!: Language;
}
