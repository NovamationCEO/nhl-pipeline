import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity()
export class ActiveGame {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  @Index()
  nhlId: string;

  @Column()
  startTime: Date;

  @Column()
  status: string;

  @Column()
  lastUpdated: string;

  @Column()
  streaming: boolean;
}
