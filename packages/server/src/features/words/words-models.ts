import { IWord, Language } from '@learn-languages/common';
import { IsArray, IsNotEmpty, IsString } from '@nestjs/class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWordDto implements IWord {
  @ApiProperty({ type: 'string', description: 'A word itself', required: true })
  @IsNotEmpty()
  @IsString()
  readonly name!: string;

  @ApiProperty({ type: 'string', description: 'A word language', required: true })
  @IsNotEmpty()
  @IsString()
  readonly lang!: Language;

  @ApiProperty({ type: 'array', description: 'A word description', isArray: true, required: false })
  @IsArray()
  readonly description?: string[];

  @ApiProperty({ type: 'string', description: 'A word usage examples', isArray: true, required: false })
  @IsArray()
  readonly examples?: string[];
}

export class UpdateWordDto extends PartialType(CreateWordDto) {}
