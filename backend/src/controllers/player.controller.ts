import { Controller, Post, Body } from '@nestjs/common';
import { Player } from 'src/entities/player.entity';
import { PlayerService } from 'src/services/player.service';

@Controller('players')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  async create(@Body() player: Player): Promise<Player> {
    return this.playerService.create(player);
  }
}
