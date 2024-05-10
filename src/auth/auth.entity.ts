import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  sex: number;

  @Column({ unique: true })
  account: string;

  @Column({ select: false })
  password: string;
}
