import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Script } from './script.entity';
import { Order } from './order.entity';

export enum UserRole {
  WRITER = 'writer',
  DIRECTOR = 'director',
  ADMIN = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number; //ID

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
      type: 'simple-enum',
      enum: UserRole,
      default: UserRole.WRITER })
  role: UserRole;

  @OneToMany(() => Script, (script) => script.writer)
  scripts: Script[];

  @OneToMany(() => Order, (order) => order.buyer)
  orders: Order[];
}