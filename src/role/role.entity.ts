import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Permission } from '../permission/permission.entity';
import { Length } from 'class-validator';

/**
 * 角色
 */
@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  /**
   * 角色名称
   */
  @Length(2, 256)
  @Index('role_name_index', { unique: true })
  @Column({ length: 256, nullable: false })
  name: string;

  /**
   * 角色显示名称
   */
  @Length(0, 64)
  @Column({ length: 64 })
  title: string;

  /**
   * 权限
   */
  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Permission[];
}
