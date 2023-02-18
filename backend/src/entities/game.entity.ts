import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  nhlId: number;

  @Column()
  gameDate: string;

  @Column()
  gameTime: Date;

  @Column()
  awayTeam: number;

  @Column()
  homeTeam: number;

  @Column()
  status: number;

  @Column()
  awayScore: number;

  @Column()
  homeScore: number;
}
