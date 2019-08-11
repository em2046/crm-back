import {
  IsAscii,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
} from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty()
  @Length(4, 256)
  readonly name: string;

  @IsOptional()
  @Length(0, 64)
  readonly realName: string;

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
