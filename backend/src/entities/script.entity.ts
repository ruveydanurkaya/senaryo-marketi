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
  content: string; // Senaryo özeti veya tam metni

  @Column('real')
  price: number;

  // 1:N -> Bir senaryo sadece bir yazara aittir.
  @ManyToOne(() => User, (user) => user.scripts)
  writer: User;

  // M:N -> Bir senaryonun birden çok türü olabilir (Örn: Dram ve Suç)
  @ManyToMany(() => Genre, (genre) => genre.scripts, { cascade: true })
  @JoinTable() // Ara tabloyu otomatik oluşturur.
  genres: Genre[];
}