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
import { AuthGuard } from '@nestjs/passport';
import { ComplaintCreateDto } from './dto/complaint-create.dto';
import { ComplaintService } from './complaint.service';
import { ComplaintMutateDto } from './dto/complaint-mutate.dto';
import { ComplaintFindAllDto } from './dto/complaint-find-all.dto';
import { ComplaintUpdateDto } from './dto/complaint-update.dto';
import { Permissions } from '../../permissions.decorator';

@Controller('complaint')
export class ComplaintController {
  constructor(private readonly complaintService: ComplaintService) {}

  /**
   * 查询全部投诉
   */
  @UseGuards(AuthGuard())
  @Get()
  findAll(@Query() complaintFindAllDto: ComplaintFindAllDto) {
    return this.complaintService.findAll(complaintFindAllDto);
  }

  /**
   * 查询某个投诉
   */
  @UseGuards(AuthGuard())
  @Get(':uuid')
  findOne(@Param('uuid') uuid) {
    return this.complaintService.findOne(uuid);
  }

  /**
   * 创建投诉
   */
  @UseGuards(AuthGuard())
  @Permissions('task_create')
  @Post()
  create(@Body() complaintCreateDto: ComplaintCreateDto) {
    return this.complaintService.create(complaintCreateDto);
  }

  @UseGuards(AuthGuard())
  @Patch(':uuid/update')
  update(@Param('uuid') uuid, @Body() complaintUpdateDto: ComplaintUpdateDto) {
    return this.complaintService.update(uuid, complaintUpdateDto);
  }

  /**
   * 分配
   * @param uuid 编号
   * @param complaintMutateDto 数据
   */
  @UseGuards(AuthGuard())
  @Patch(':uuid/assign')
  assign(@Param('uuid') uuid, @Body() complaintMutateDto: ComplaintMutateDto) {
    return this.complaintService.assign(uuid, complaintMutateDto);
  }

  /**
   * 完成
   * @param uuid 编号
   * @param complaintMutateDto 数据
   */
  @UseGuards(AuthGuard())
  @Patch(':uuid/finish')
  finish(@Param('uuid') uuid, @Body() complaintMutateDto: ComplaintMutateDto) {
    return this.complaintService.finish(uuid, complaintMutateDto);
  }

  @UseGuards(AuthGuard())
  @Delete(':uuid')
  remove(@Param('uuid') uuid) {
    return this.complaintService.remove(uuid);
  }
}
