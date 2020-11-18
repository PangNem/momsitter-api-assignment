import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sitter extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  careable_baby_age: number;

  @Column()
  self_introduction: string;
}
