import {
  IsAscii,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
} from 'class-validator';
import { Role } from '../../role/role.entity';
import Utils from '../../utils/utils';

export class UserCreateDto {
  @IsNotEmpty()
  @Length(4, 256)
  readonly name: string;

  @IsOptional()
  @Length(0, 64)
  readonly realName: string;

  @IsNotEmpty()
  @Length(0, 512)
  @IsEmail({}, { message: Utils.errorMessage.isEmail('邮箱地址') })
  readonly email: string;

  @IsNotEmpty()
  @Length(4, 256)
  @IsAscii({ message: Utils.errorMessage.isAscii('密码') })
  readonly password: string;

  @IsOptional()
  @Length(0, 4096)
  readonly avatar: string;

  @IsOptional()
  readonly roles: Role[];
}
