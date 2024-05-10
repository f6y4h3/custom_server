import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  sex: number;

  @Column({ unique: true , nullable: false })
  account: string;

  @Column({ readonly: true })
  password: string;
}
