import { IsNotEmpty, IsOptional, Length } from 'class-validator';
import { User } from '../../../user/user.entity';
import { Label } from '../../../label/label.entity';

export class SaleCreateDto {
  @IsNotEmpty()
  @Length(1, 64)
  readonly title: string;

  @IsOptional()
  @Length(0, 4096)
  readonly description: string;

  @IsNotEmpty()
  readonly assignee: User;

  @IsNotEmpty()
  label: Label;
}
