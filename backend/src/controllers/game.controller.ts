import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import axios from 'axios';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Game } from '../entities/game.entity';
import { GameService } from '../services/game.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  async getGamesForToday(): Promise<Game[]> {
    const response = await axios.get(
      'https://statsapi.web.nhl.com/api/v1/schedule',
    );
    return processGamesForToday(response);
  }

  @Post()
  async create(@Body() game: Game): Promise<Game> {
    return this.gameService.create(game);
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Game> {
    return this.gameService.findById(id);
  }

  @Get('nhl/:id')
  async findByNhlId(@Param('id') id: number): Promise<Game> {
    return this.gameService.findByNhlId(id);
  }

  @Post(':id')
  async update(
    @Param('id') id: number,
    @Body() game: Game,
  ): Promise<UpdateResult> {
    return this.gameService.update(id, game);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.gameService.remove(id);
  }
}

function processGamesForToday(response: any) {
  const data = response?.data?.dates?.[0];
  if (!data) {
    return [];
  }

  const today = data.date;
  console.log(data.games);
  const games: Game[] = data.games.map((nhlGame) => {
    return {
      nhlId: nhlGame.gamePk,
      gameDate: today,
      gameTime: new Date(nhlGame.gameDate),
      homeTeam: nhlGame.teams.home.team.id,
      awayTeam: nhlGame.teams.away.team.id,
      status: nhlGame.status.statusCode,
    };
  });

  return games;
}
