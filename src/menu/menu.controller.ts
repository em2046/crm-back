import { Body, Controller, Get, Post } from '@nestjs/common';
import { MenuService } from './menu.service';
import { Menu } from './menu.entity';
import { MenuCreateDto } from './dto/menu-create.dto';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  findAll(): Promise<Menu[]> {
    return this.menuService.findAll();
  }

  @Post()
  create(@Body() createMenuDto: MenuCreateDto) {
    return this.menuService.create(createMenuDto);
  }
}
