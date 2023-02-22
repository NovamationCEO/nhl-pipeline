import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity()
export class GameEvent {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  @Index()
  nhlId: number;

  @Column()
  @Index()
  gameNhlId: number;

  @Column()
  eventName: string;

  @Column()
  eventOrder: number;

  @Column()
  headline: string;

  @Column()
  assists: number;

  @Column()
  hits: number;

  @Column()
  goals: number;

  @Column()
  home: number;

  @Column()
  away: number;

  @Column()
  timestamp: Date;

  @Column()
  period: number;

  @Column()
  periodTime: string;

  @Column()
  periodTimeRemaining: string;
}
