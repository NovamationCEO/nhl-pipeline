import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  nhlId: number;

  @Column()
  link: string;

  @Column()
  gameDate: Date;

  @Column()
  awayTeam: number;

  @Column()
  homeTeam: number;
}
