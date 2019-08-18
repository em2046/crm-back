import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './menu.entity';
import { Repository } from 'typeorm';
import { MenuCreateDto } from './dto/menu-create.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {}

  /**
   * 查找全部菜单
   */
  async findAll(): Promise<Menu[]> {
    return await this.menuRepository.find();
  }

  /**
   * 新建菜单
   * @param createMenuDto 菜单信息
   */
  async create(createMenuDto: MenuCreateDto): Promise<Menu> {
    //region 检查重复名称
    const foundMenuName = await this.menuRepository.findOne({
      name: createMenuDto.name,
    });
    if (foundMenuName) {
      throw new NotAcceptableException('名称已经存在');
    }
    //endregion

    return await this.menuRepository.save(createMenuDto);
  }
}
