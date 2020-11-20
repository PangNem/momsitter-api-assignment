import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Parent extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  desired_baby_age: number;

  @Column()
  request_infomation: string;
}
