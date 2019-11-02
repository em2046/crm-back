import { IsNotEmpty, IsOptional, Length } from 'class-validator';
import { User } from '../../../user/user.entity';

export class SaleUpdateDto {
  @IsNotEmpty()
  @Length(1, 64)
  readonly title: string;

  @IsOptional()
  @Length(0, 4096)
  readonly description: string;

  @IsOptional()
  readonly assignee: User;
}
