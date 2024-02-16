import type { IWord } from '@learn-languages/common';
import { Language } from '@learn-languages/common';
import { IsArray, IsNotEmpty, IsOptional, IsString } from '@nestjs/class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class UpdateWordDto implements Partial<IWord> {
  @ApiProperty({ type: 'array', description: 'A word description', isArray: true })
  @IsOptional()
  @IsArray()
  @Field(() => [String], { nullable: true })
  readonly description?: string[];

  @ApiProperty({ type: 'string', description: 'A word usage examples', isArray: true })
  @IsOptional()
  @IsArray()
  @Field(() => [String], { nullable: true })
  readonly examples?: string[];
}

@InputType()
export class CreateWordDto extends UpdateWordDto implements IWord {
  @ApiProperty({ type: 'string', description: 'A word itself', required: true })
  @IsNotEmpty()
  @IsString()
  @Field()
  readonly name!: string;

  @ApiProperty({ type: 'string', description: 'A word language', required: true })
  @IsNotEmpty()
  @IsString()
  @Field(() => Language, { defaultValue: Language.EN, nullable: true })
  readonly lang!: Language;
}
