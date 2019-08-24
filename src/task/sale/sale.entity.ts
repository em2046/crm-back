import { Entity } from 'typeorm';
import { Task } from '../task.entity';

/**
 * 销售
 */
@Entity()
export class Sale extends Task {}
