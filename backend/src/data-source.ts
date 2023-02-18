import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { Game } from './entities/game.entity';
import { Player } from './entities/player.entity';
import { Team } from './entities/team.entity';

export const sharedDataSourceSettings = {
  type: 'mysql' as 'mysql' | 'mariadb',
  host: 'localhost',
  port: 3306,
  username: 'pipeline_app',
  password: 'Keep Your Stick',
  database: 'nhl_db',
  synchronize: true,
};

const dataSourceOptions: MysqlConnectionOptions = {
  ...sharedDataSourceSettings,
  logging: false,
  entities: [Player, Team, Game],
  migrations: [],
  subscribers: [],
};
export const AppDataSource = new DataSource(dataSourceOptions);
