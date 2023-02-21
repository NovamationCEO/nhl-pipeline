import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  @Index()
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
