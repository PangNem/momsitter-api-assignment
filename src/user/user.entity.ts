import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

enum memberType {
  SITTER = 'SITTER',
  PARENT = 'PARENT',
}

@Entity()
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
  user_id: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  member_type: memberType;
}
