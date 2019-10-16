import { IsNotEmpty, Length } from 'class-validator';

export class SearchDto {
  @IsNotEmpty()
  @Length(1, 64)
  readonly keyword: string;
}
