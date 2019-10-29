import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, Length } from 'class-validator';

@Entity()
export class Label {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  /**
   * 标题
   */
  @IsNotEmpty()
  @Length(1, 64)
  @Column({ length: 64, nullable: false })
  title: string;

  /**
   * 规则
   */
  @IsNotEmpty()
  @Column({ type: 'simple-json', nullable: false })
  rule: any;
}
