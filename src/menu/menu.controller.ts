import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuCreateDto } from './dto/menu-create.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @UseGuards(AuthGuard())
  @Get()
  findAll() {
    return this.menuService.findAll();
  }

  @UseGuards(AuthGuard())
  @Post()
  create(@Body() createMenuDto: MenuCreateDto) {
    return this.menuService.create(createMenuDto);
  }
}
