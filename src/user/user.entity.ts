import { IsEnum } from 'class-validator';
import { Parent } from '../parent/parent.entity';
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
import { MemberType } from './user.enum';

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
  @IsEnum(MemberType)
  member_type: MemberType;

  @OneToOne(() => Sitter)
  @JoinColumn({ name: 'sitter_id' })
  sitter: Sitter;

  @OneToOne(() => Parent)
  @JoinColumn({ name: 'parent_id' })
  parent: Parent;
}
