import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  nhlId: number;

  @Column()
  fullName: string;

  @Column()
  primaryNumber: number;

  @Column()
  active: boolean;

  @Column()
  currentTeam: number;
}
