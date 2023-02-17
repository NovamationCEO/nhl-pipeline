import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Player } from './entities/player.entity';
import { Team } from './entities/team.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'pipeline_app',
  password: 'Keep Your Stick',
  database: 'nhl_db',
  synchronize: true,
  logging: false,
  entities: [Player, Team],
  migrations: [],
  subscribers: [],
});
