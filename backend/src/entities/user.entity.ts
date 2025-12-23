import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Script } from './script.entity';
import { Order } from './order.entity';

// Kullanıcı rollerini bir ENUM (sabit liste) olarak tanımlıyoruz.
export enum UserRole {
  WRITER = 'writer',
  DIRECTOR = 'director',
  ADMIN = 'admin',
}

@Entity() //Veritabanı tabloları
export class User {
  @PrimaryGeneratedColumn()
  id: number; //ID

  @Column()
  username: string;

  @Column({ unique: true }) //Benzersiz email
  email: string;

  @Column()
  password: string;

  @Column({
      type: 'simple-enum',
      enum: UserRole,
      default: UserRole.WRITER }) // Rol seçilmezse otomatik 'writer' olur.
  role: UserRole;

  // İLİŞKİ 1: Bir kullanıcının (Yazarın) birden çok senaryosu olabilir.
  // Burada 'script.writer' diyerek karşı taraftaki bağlantı noktasını gösteriyoruz.
  @OneToMany(() => Script, (script) => script.writer)
  scripts: Script[];

// İLİŞKİ 2: Bir kullanıcının (Yönetmenin) birden çok senaryo alabilir.
  @OneToMany(() => Order, (order) => order.buyer)
  orders: Order[];
}