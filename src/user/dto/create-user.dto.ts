import {
  IsAscii,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(4, 256)
  readonly name: string;

  @IsNotEmpty()
  @Length(0, 512)
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @Length(4, 256)
  @IsAscii()
  readonly password: string;

  @IsOptional()
  @Length(0, 4096)
  readonly avatar: string;
}
