import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { GameEventService } from '../services/gameEvent.service';
import { GameEvent } from '../entities/gameEvent.entity';

@Controller('gameEvent')
export class GameEventController {
  constructor(private readonly gameEventService: GameEventService) {}

  @Post()
  async create(@Body() gameEvent: GameEvent): Promise<GameEvent> {
    return this.gameEventService.create(gameEvent);
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<GameEvent> {
    return this.gameEventService.findById(id);
  }

  @Get('nhl/:id')
  async findByNhlId(@Param('id') id: number): Promise<GameEvent> {
    return this.gameEventService.findByNhlId(id);
  }

  @Get('game/nhl/:id')
  async findByGameNhlId(@Param('id') id: number): Promise<GameEvent[]> {
    return this.gameEventService.findByGameNhlId(id);
  }

  @Post(':id')
  async update(
    @Param('id') id: number,
    @Body() gameEvent: GameEvent,
  ): Promise<UpdateResult> {
    return this.gameEventService.update(id, gameEvent);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.gameEventService.remove(id);
  }
}
