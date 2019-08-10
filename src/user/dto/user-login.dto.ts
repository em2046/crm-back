import { IsAscii, IsNotEmpty, Length } from 'class-validator';

export class UserLoginDto {
  @IsNotEmpty()
  @Length(4, 256)
  readonly name: string;

  @IsNotEmpty()
  @Length(4, 256)
  @IsAscii()
  readonly password: string;
}
