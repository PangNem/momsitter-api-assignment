import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Sitter } from '../sitter/sitter.entity';

enum memberType {
  SITTER = 'SITTER',
  PARENT = 'PARENT',
}

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  birth: number;

  @Column()
  gender: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  member_type: memberType;

  @OneToOne(() => Sitter)
  @JoinColumn({ name: 'sitter_id' })
  sitter: Sitter;
}
