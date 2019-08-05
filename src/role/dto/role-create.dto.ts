import { IsNotEmpty, Length } from 'class-validator';

export class RoleCreateDto {
  @IsNotEmpty()
  @Length(2, 256)
  readonly name: string;

  @IsNotEmpty()
  @Length(0, 64)
  readonly title: string;
}
