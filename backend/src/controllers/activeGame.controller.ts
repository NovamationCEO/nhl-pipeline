import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import axios from 'axios';
import { formatGamesForToday } from '../utilities/formatGamesForToday';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Game } from '../entities/game.entity';
import { ActiveGameService } from '../services/activeGame.service';
import { ActiveGame } from '../entities/activeGame.entity';

@Controller('game')
export class ActiveGameController {
  constructor(private readonly activeGameService: ActiveGameService) {}

  @Get()
  async getGamesForToday(): Promise<Game[]> {
    const response = await axios.get(
      'https://statsapi.web.nhl.com/api/v1/schedule',
    );
    return formatGamesForToday(response);
  }

  @Post()
  async create(@Body() activeGame: ActiveGame): Promise<ActiveGame> {
    return this.activeGameService.create(activeGame);
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<ActiveGame> {
    return this.activeGameService.findById(id);
  }

  @Get('nhl/:id')
  async findByNhlId(@Param('id') id: number): Promise<ActiveGame> {
    return this.activeGameService.findByNhlId(id);
  }

  @Post(':id')
  async update(
    @Param('id') id: number,
    @Body() activeGame: ActiveGame,
  ): Promise<UpdateResult> {
    return this.activeGameService.update(id, activeGame);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.activeGameService.remove(id);
  }
}
