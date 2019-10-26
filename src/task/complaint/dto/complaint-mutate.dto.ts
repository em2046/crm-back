import { IsNotEmpty, IsUUID } from 'class-validator';
import { User } from '../../../user/user.entity';

export class ComplaintMutateDto {
  @IsNotEmpty()
  @IsUUID()
  readonly assignee: User;
}
