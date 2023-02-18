import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
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
}
