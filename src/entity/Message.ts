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
  
  @CreateDateColumn({ name: 'sendAt' }) 'sendAt': Date;

  @Column()
  subject: string;

  @Column()
  body: string;

  @Column({ type: 'boolean', default: false})
  sent: boolean;
}