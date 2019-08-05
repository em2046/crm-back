import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './menu.entity';
import { Repository } from 'typeorm';
import { MenuCreateDto } from './dto/menu-create.dto';
import { HttpResult } from '../dto/http-result';
import { MenuCreateCode } from './enum/menu-create-code';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {}

  async findAll(): Promise<Menu[]> {
    return await this.menuRepository.find();
  }

  async create(
    createMenuDto: MenuCreateDto,
  ): Promise<HttpResult<MenuCreateCode, Menu>> {
    const foundMenuName = await this.menuRepository.findOne({
      name: createMenuDto.name,
    });
    if (foundMenuName) {
      return {
        code: MenuCreateCode.NAME_ALREADY_EXISTS,
        message: 'name already exists',
      };
    }

    const savedMenu = await this.menuRepository.save(createMenuDto);
    return {
      code: MenuCreateCode.SUCCESS,
      message: 'create menu success',
      data: savedMenu,
    };
  }
}
