import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  @Index()
  nhlId: number;

  @Column()
  fullName: string;

  @Column()
  primaryNumber: string;

  @Column()
  active: boolean;

  @Column()
  currentTeam: number;

  @Column()
  birthdate: Date;

  @Column()
  position: string;
}
