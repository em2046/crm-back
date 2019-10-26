import { IsNotEmpty, IsUUID } from 'class-validator';
import { User } from '../../../user/user.entity';

export class ComplaintMutateDto {
  @IsNotEmpty()
  readonly assignee: User;
}
