import { IsNotEmpty, IsOptional, IsUUID, Length } from 'class-validator';
import { User } from '../../../user/user.entity';

export class ComplaintCreateDto {
  @IsNotEmpty()
  @Length(1, 64)
  readonly title: string;

  @IsOptional()
  @Length(0, 4096)
  readonly description: string;

  @IsNotEmpty()
  readonly assignee: User;
}
