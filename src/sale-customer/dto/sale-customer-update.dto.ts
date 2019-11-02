import { IsOptional} from 'class-validator';

export class SaleCustomerUpdateDto {
  @IsOptional()
  readonly finished: boolean;
}
