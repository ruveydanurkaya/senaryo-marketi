import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Script } from './script.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  purchaseDate: Date;

  @ManyToOne(() => User, (user) => user.orders)
  buyer: User;

  @ManyToOne(() => Script)
  script: Script;
}