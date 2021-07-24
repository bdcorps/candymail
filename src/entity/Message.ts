import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Message {

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'time' }) 'time': Date;

  @Column()
  template: string;

  @Column()
  sendFrom: string;

  @Column()
  sendTo: string;

  @Column()
  subject: string;

  @Column()
  body: string;

  @Column()
  sent: boolean;
}