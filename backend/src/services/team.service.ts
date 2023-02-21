import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';
import { Team } from '../entities/team.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  async create(team: Partial<Team>): Promise<Team> {
    return this.teamRepository.save(team);
  }

  async findById(id: number): Promise<Team> {
    return this.teamRepository.findOneBy({ id });
  }

  async findByNhlId(id: string): Promise<Team> {
    return this.teamRepository.findOneBy({ nhlId: id });
  }

  async findByNhlIds(ids: string[]): Promise<Team[]> {
    return this.teamRepository.findBy({ nhlId: In(ids) });
  }

  async update(id: number, team: Partial<Team>): Promise<UpdateResult> {
    return this.teamRepository.update(id, team);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.teamRepository.delete({ id });
  }
}
