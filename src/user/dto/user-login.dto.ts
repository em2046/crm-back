import { IsAscii, IsNotEmpty, Length } from 'class-validator';
import Utils from '../../utils/utils';

export class UserLoginDto {
  @IsNotEmpty()
  @Length(4, 256)
  readonly name: string;

  @IsNotEmpty()
  @Length(4, 256)
  @IsAscii({ message: Utils.errorMessage.isAscii('密码') })
  readonly password: string;
}
