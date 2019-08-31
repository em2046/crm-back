import { Entity } from 'typeorm';
import { Task } from '../task.entity';

/**
 * 投诉
 */
@Entity()
export class Complaint extends Task {}
