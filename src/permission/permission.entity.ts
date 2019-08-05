import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  /**
   * 权限名称
   */
  @Index('permission_name_index', { unique: true })
  @Column({ length: 256, nullable: false })
  name: string;

  /**
   * 权限显示名称
   */
  @Column({ length: 64 })
  title: string;
}
