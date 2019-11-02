import { IsOptional } from 'class-validator';

export class SaleFindAllDto {
  @IsOptional()
  page: string;

  @IsOptional()
  limit: string;
}
