import { Entity, JoinTable, ManyToMany } from 'typeorm';
import { Task } from '../task.entity';
import { Customer } from '../../customer/customer.entity';

/**
 * 销售
 */
@Entity()
export class Sale extends Task {
  @ManyToMany(() => Customer)
  @JoinTable()
  customers: Customer[];
}
