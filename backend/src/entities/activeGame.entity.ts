import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity()
export class ActiveGame {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  @Index()
  nhlId: number;

  @Column()
  startTime: Date;

  @Column()
  status: string;

  @Column()
  lastUpdated: string;

  @Column()
  streaming: boolean;

  @Column()
  newestEvent: number;
}
