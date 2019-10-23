import { IsNotEmpty, IsOptional, IsUUID, Length } from 'class-validator';

export class ComplaintUpdateDto {
  @IsNotEmpty()
  @Length(1, 64)
  readonly title: string;

  @IsOptional()
  @Length(0, 4096)
  readonly description: string;

  @IsOptional()
  @IsUUID()
  readonly assignee: string;
}
