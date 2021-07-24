import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  isSubscribed: boolean;
}
