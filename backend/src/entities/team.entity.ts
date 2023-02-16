import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
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
