import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Script } from './script.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn() // Kayıt oluşturulduğu anın tarihini otomatik atar.
  purchaseDate: Date;

  // Çok seneryo -> Tek Kullanıcı alır
  // Satın alan yönetmen
  @ManyToOne(() => User, (user) => user.orders)
  buyer: User;

  // Satılan senaryo
  @ManyToOne(() => Script)
  script: Script;
}