import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  nhlId: number;

  @Column()
  name: string;

  @Column()
  teamName: string;

  @Column()
  shortName: string;

  @Column()
  abbreviation: string;

  @Column()
  officialSiteUrl: string;
}
