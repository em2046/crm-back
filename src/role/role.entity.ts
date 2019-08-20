import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Permission } from '../permission/permission.entity';
import { IsDefined, IsOptional, IsString, Length } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';

const { CREATE, UPDATE } = CrudValidationGroups;

/**
 * 角色
 */
@Entity()
export class Role {
  @IsOptional({ always: true })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  /**
   * 角色名称
   */
  @IsOptional({ groups: [UPDATE] })
  @IsDefined({ groups: [CREATE] })
  @IsString({ always: true })
  @Length(2, 256)
  @Index('role_name_index', { unique: true })
  @Column({ length: 256, nullable: false })
  name: string;

  /**
   * 角色显示名称
   */
  @IsOptional({ groups: [UPDATE] })
  @IsDefined({ groups: [CREATE] })
  @IsString({ always: true })
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
