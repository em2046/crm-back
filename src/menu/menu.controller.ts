import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuCreateDto } from './dto/menu-create.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  /**
   * 查找全部菜单
   */
  @UseGuards(AuthGuard())
  @Get()
  findAll() {
    return this.menuService.findAll();
  }

  /**
   * 新建菜单
   * @param createMenuDto 菜单信息
   */
  @UseGuards(AuthGuard())
  @Post()
  create(@Body() createMenuDto: MenuCreateDto) {
    return this.menuService.create(createMenuDto);
  }
}
