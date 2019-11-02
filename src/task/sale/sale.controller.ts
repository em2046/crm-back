import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleFindAllDto } from './dto/sale-find-all.dto';
import { SaleUpdateDto } from './dto/sale-update.dto';
import { SaleMutateDto } from './dto/sale-mutate.dto';
import { AuthGuard } from '@nestjs/passport';
import { SaleCreateDto } from './dto/sale-create.dto';

@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @UseGuards(AuthGuard())
  @Get()
  findAll(@Query() saleFindAllDto: SaleFindAllDto) {
    return this.saleService.findAll(saleFindAllDto);
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid) {
    return this.saleService.findOne(uuid);
  }

  @Patch(':uuid/update')
  update(@Param('uuid') uuid, @Body() saleUpdateDto: SaleUpdateDto) {
    return this.saleService.update(uuid, saleUpdateDto);
  }

  @Post()
  create(@Body() saleCreateDto: SaleCreateDto) {
    return this.saleService.create(saleCreateDto);
  }

  /**
   * 分配
   * @param uuid 编号
   * @param saleMutateDto 数据
   */
  @Patch(':uuid/assign')
  assign(@Param('uuid') uuid, @Body() saleMutateDto: SaleMutateDto) {
    return this.saleService.assign(uuid, saleMutateDto);
  }

  /**
   * 完成
   * @param uuid 编号
   * @param saleMutateDto 数据
   */
  @Patch(':uuid/finish')
  finish(@Param('uuid') uuid, @Body() saleMutateDto: SaleMutateDto) {
    return this.saleService.finish(uuid, saleMutateDto);
  }

  @UseGuards(AuthGuard())
  @Delete(':uuid')
  remove(@Param('uuid') uuid) {
    return this.saleService.remove(uuid);
  }
}
