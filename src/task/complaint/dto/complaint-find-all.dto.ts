import { IsNotEmpty, IsOptional } from 'class-validator';

export class ComplaintFindAllDto {
  @IsOptional()
  page: string;

  @IsOptional()
  limit: string;
}
