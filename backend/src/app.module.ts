import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerController } from './controllers/player.controller';
import { TeamController } from './controllers/team.controller';
import { Player } from './entities/player.entity';
import { Team } from './entities/team.entity';
import { PlayerService } from './services/player.service';
import { TeamService } from './services/team.service';
import * as mysql from 'mysql2';
import * as cron from 'node-cron';
import { GameController } from './controllers/game.controller';
import { GameService } from './services/game.service';
import { Game } from './entities/game.entity';
import { initDailyGames } from './processes/initDailyGames';

@Module({
  imports: [
    TypeOrmModule.forFeature([Player, Team, Game]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'pipeline_app',
      password: 'Keep Your Stick',
      database: 'nhl_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      driver: mysql,
    }),
  ],
  controllers: [
    AppController,
    PlayerController,
    TeamController,
    GameController,
  ],
  providers: [AppService, PlayerService, TeamService, GameService],
})
export class AppModule {
  // constructor(private processService: ProcessService) {
  //   cron.schedule('0 0,12 * * *', () => {
  //     this.processService.initDailyGames();
  //   });
  // }
  constructor(
    private gameService: GameService,
    private teamService: TeamService,
  ) {
    initDailyGames(gameService, teamService);
  }
}
