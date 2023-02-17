import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerController } from './controllers/player.controller';
import { TeamController } from './controllers/team.controller';
import { DatabaseModule } from './database.module';
import { Player } from './entities/player.entity';
import { Team } from './entities/team.entity';
import { PlayerService } from './services/player.service';
import { TeamService } from './services/team.service';
import * as mysql from 'mysql2';

@Module({
  imports: [
    TypeOrmModule.forFeature([Player, Team]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'pipeline_app',
      password: 'Keep Your Stick',
      database: 'nhl_db',
      entities: [],
      synchronize: true,
      driver: mysql,
    }),
    DatabaseModule,
  ],
  controllers: [AppController, PlayerController, TeamController],
  providers: [AppService, PlayerService, TeamService],
})
export class AppModule {}
