import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  @Index()
  nhlId: string;

  @Column()
  gameDate: string;

  @Column()
  gameTime: Date;

  @Column()
  awayTeam: string;

  @Column()
  homeTeam: string;

  @Column()
  status: string;

  @Column()
  awayScore: number;

  @Column()
  homeScore: number;

  @Column()
  assists: number;

  @Column()
  hits: number;

  @Column()
  penaltyMinutes: number;
}
