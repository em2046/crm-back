import { IsEmail, IsOptional, Length } from 'class-validator';
import { Role } from '../../role/role.entity';

export class UserUpdateDto {
  @IsOptional()
  @Length(4, 256)
  readonly name: string;

  @IsOptional()
  @Length(0, 64)
  readonly realName: string;

  @IsOptional()
  @Length(0, 512)
  @IsEmail()
  readonly email: string;

  @IsOptional()
  readonly roles: Role[];
}
