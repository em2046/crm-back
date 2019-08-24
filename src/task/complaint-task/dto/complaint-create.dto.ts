import { IsNotEmpty, IsOptional, IsUUID, Length } from 'class-validator';

export class ComplaintCreateDto {
  @IsNotEmpty()
  @Length(1, 64)
  readonly title: string;

  @IsOptional()
  @Length(1, 4096)
  readonly description: string;

  @IsNotEmpty()
  @IsUUID()
  readonly assignee: string;
}
