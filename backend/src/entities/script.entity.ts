import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user.entity';
import { Genre } from './genre.entity';

@Entity()
export class Script {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column('real')
  price: number;

  @ManyToOne(() => User, (user) => user.scripts)
  writer: User;

  @ManyToMany(() => Genre, (genre) => genre.scripts, { cascade: true })
  @JoinTable()
  genres: Genre[];
}