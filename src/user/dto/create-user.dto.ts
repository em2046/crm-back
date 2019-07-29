import { IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(4, 200)
  readonly name: string;

  @IsNotEmpty()
  @Length(0, 512)
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @Length(4, 200)
  readonly password: string;

  @IsOptional()
  @Length(0, 4096)
  readonly avatar: string;
}
