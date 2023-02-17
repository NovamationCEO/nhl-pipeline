import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Team } from '../entities/team.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  async create(team: Team): Promise<Team> {
    return this.teamRepository.save(team);
  }

  async findById(id: number): Promise<Team> {
    return this.teamRepository.findOneBy({ id });
  }

  async findByNhlId(id: number): Promise<Team> {
    return this.teamRepository.findOneBy({ nhlId: id });
  }

  async update(id: number, team: Partial<Team>): Promise<UpdateResult> {
    return this.teamRepository.update(id, team);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.teamRepository.delete({ id });
  }
}
