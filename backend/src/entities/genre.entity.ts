import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Script } from './script.entity';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Script, (script) => script.genres)
  scripts: Script[];
}