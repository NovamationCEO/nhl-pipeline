import { Controller, Post, Body, Delete, Get, Param } from '@nestjs/common';
import { UpdateResult, DeleteResult } from 'typeorm';
import { Team } from '../entities/team.entity';
import { TeamService } from '../services/team.service';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  async create(@Body() team: Team): Promise<Team> {
    return this.teamService.create(team);
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Team> {
    return this.teamService.findById(id);
  }

  @Get('nhl/:id')
  async findByNhlId(@Param('id') id: number): Promise<Team> {
    return this.teamService.findByNhlId(id);
  }

  @Post(':id')
  async update(
    @Param('id') id: number,
    @Body() team: Team,
  ): Promise<UpdateResult> {
    return this.teamService.update(id, team);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.teamService.remove(id);
  }
}
