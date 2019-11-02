import { IsNotEmpty} from 'class-validator';
import { User } from '../../../user/user.entity';

export class SaleMutateDto {
  @IsNotEmpty()
  readonly assignee: User;
}
