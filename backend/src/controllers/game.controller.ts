import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import axios from 'axios';
import { formatGamesForToday } from '../utilities/formatGamesForToday';
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
    return formatGamesForToday(response);
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
  async findByNhlId(@Param('id') id: string): Promise<Game> {
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
