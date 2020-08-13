import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { UserGender } from './user.types';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
    unique: true,
  })
  name: string;

  @Column('int')
  age: number;

  @Column({
    type: 'enum',
    enum: UserGender,
    default: UserGender.MALE,
  })
  gender: UserGender;
}
