import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { SaleCustomerUpdateDto } from './dto/sale-customer-update.dto';
import { SaleCustomerService } from './sale-customer.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('sale-customer')
export class SaleCustomerController {
  constructor(private readonly saleCustomerService: SaleCustomerService) {}

  @UseGuards(AuthGuard())
  @Patch(':uuid/update')
  update(
    @Param('uuid') uuid,
    @Body() saleCustomerUpdateDto: SaleCustomerUpdateDto,
  ) {
    return this.saleCustomerService.update(uuid, saleCustomerUpdateDto);
  }
}
