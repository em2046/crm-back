import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Permission } from '../permission/permission.entity';

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
  @Index('role_name_index', { unique: true })
  @Column({ length: 256, nullable: false })
  name: string;

  /**
   * 角色显示名称
   */
  @Column({ length: 64 })
  title: string;

  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Permission[];
}
