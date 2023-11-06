import type { IWord } from '@learn-languages/common';
import { Language } from '@learn-languages/common';
import { IsArray, IsNotEmpty, IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateWordDto implements Partial<IWord> {
  @ApiProperty({ type: 'array', description: 'A word description', isArray: true })
  @IsOptional()
  @IsArray()
  readonly description?: string[];

  @ApiProperty({ type: 'string', description: 'A word usage examples', isArray: true })
  @IsOptional()
  @IsArray()
  readonly examples?: string[];
}

export class CreateWordDto extends UpdateWordDto implements IWord {
  @ApiProperty({ type: 'string', description: 'A word itself', required: true })
  @IsNotEmpty()
  @IsString()
  readonly name!: string;

  @ApiProperty({ type: 'string', description: 'A word language', required: true })
  @IsNotEmpty()
  @IsString()
  readonly lang!: Language;
}
