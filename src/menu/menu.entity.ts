import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 菜单
 */
@Entity()
export class Menu {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  /**
   * 父节点
   */
  @Index('menu_parent_index')
  @Column({ length: 36, nullable: true })
  parent: string;

  /**
   * 内部名称
   */
  @Index('menu_name_index', { unique: true })
  @Column({ length: 256, nullable: false })
  name: string;

  /**
   * 显示名称
   */
  @Column({ length: 256, nullable: false })
  title: string;
}
