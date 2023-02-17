import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { Player } from '../entities/player.entity';
import { PlayerService } from '../services/player.service';

@Controller('players')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  async create(@Body() player: Player): Promise<Player> {
    return this.playerService.create(player);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<string> {
    return 'getById ' + id;
  }
}
