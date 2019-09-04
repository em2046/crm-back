import { IsEmail, IsOptional, Length } from 'class-validator';
import { Role } from '../../role/role.entity';
import Utils from '../../utils/utils';

export class UserUpdateDto {
  @IsOptional()
  @Length(4, 256)
  readonly name: string;

  @IsOptional()
  @Length(0, 64)
  readonly realName: string;

  @IsOptional()
  @Length(0, 512)
  @IsEmail({}, { message: Utils.errorMessage.isEmail('邮箱地址') })
  readonly email: string;

  @IsOptional()
  readonly roles: Role[];
}
