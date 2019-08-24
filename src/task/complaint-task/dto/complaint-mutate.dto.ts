import { IsNotEmpty, IsUUID } from 'class-validator';

export class ComplaintMutateDto {
  @IsNotEmpty()
  @IsUUID()
  readonly assignee: string;
}
