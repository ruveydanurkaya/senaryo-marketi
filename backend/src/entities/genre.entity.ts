import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Script } from './script.entity';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // İLİŞKİ: Bir türde birden çok senaryo olabilir (M:N)
  // Burada @JoinTable kullanmıyoruz çünkü Script tarafında kullandık.
  // Sadece Script entity'sindeki 'genres' alanını işaret ediyoruz.
  @ManyToMany(() => Script, (script) => script.genres)
  scripts: Script[];
}