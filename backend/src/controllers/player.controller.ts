import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { CronService } from 'src/cron/cron.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Player } from '../entities/player.entity';
import { PlayerService } from '../services/player.service';

@Controller('player')
export class PlayerController {
  constructor(
    private readonly playerService: PlayerService,
    private readonly cronService: CronService,
  ) {}

  @Post()
  async create(@Body() player: Player): Promise<Player> {
    return this.playerService.create(player);
  }

  @Get()
  async cronIt(): Promise<any> {
    return this.cronService.fetchDataFromApi();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Player> {
    return this.playerService.findById(id);
  }

  @Get('nhl/:id')
  async findByNhlId(@Param('id') id: number): Promise<Player> {
    return this.playerService.findByNhlId(id);
  }

  @Get('team/:id')
  async findByTeamId(@Param('id') id: number): Promise<Player[]> {
    return this.playerService.findByTeam(id);
  }

  @Post(':id')
  async update(
    @Param('id') id: number,
    @Body() player: Player,
  ): Promise<UpdateResult> {
    return this.playerService.update(id, player);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.playerService.remove(id);
  }
}
