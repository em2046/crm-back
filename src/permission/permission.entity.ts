import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { IsDefined, IsOptional, IsString, Length } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';

const { CREATE, UPDATE } = CrudValidationGroups;

/**
 * 权限
 */
@Entity()
export class Permission {
  @IsOptional({ always: true })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  /**
   * 权限名称
   */
  @IsOptional({ groups: [UPDATE] })
  @IsDefined({ groups: [CREATE] })
  @IsString({ always: true })
  @Length(2, 256, { always: true })
  @Index('permission_name_index', { unique: true })
  @Column({ length: 256, nullable: false })
  name: string;

  /**
   * 权限显示名称
   */
  @IsOptional({ groups: [UPDATE] })
  @IsDefined({ groups: [CREATE] })
  @IsString({ always: true })
  @Length(1, 64, { always: true })
  @Column({ length: 64 })
  title: string;
}
