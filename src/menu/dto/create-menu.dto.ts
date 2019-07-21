import {
  IsNotEmpty,
  IsOptional,
  IsUUID,
  Length,
  Matches,
} from 'class-validator';

export class CreateMenuDto {
  @IsOptional()
  @IsUUID()
  readonly parent: string;

  @IsNotEmpty()
  @Length(2, 255)
  @Matches(/^[\w]+$/)
  readonly name: string;

  @IsNotEmpty()
  @Length(1, 255)
  readonly title: string;
}
