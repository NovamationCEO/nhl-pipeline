import { Controller, Post, Body } from '@nestjs/common';
import { Team } from '../entities/team.entity';
import { TeamService } from '../services/team.service';

@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  async create(@Body() team: Team): Promise<Team> {
    return this.teamService.create(team);
  }
}
