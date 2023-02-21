import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActiveGame } from '../entities/activeGame.entity';
import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';
import { Game } from '../entities/game.entity';

@Injectable()
export class ActiveGameService {
  constructor(
    @InjectRepository(Game)
    private readonly activeGameRepository: Repository<ActiveGame>,
  ) {}

  async create(activeGame: ActiveGame): Promise<ActiveGame> {
    return this.activeGameRepository.save(activeGame);
  }

  async getAll(): Promise<ActiveGame[]> {
    return this.activeGameRepository.find();
  }

  async findById(id: number): Promise<ActiveGame> {
    return this.activeGameRepository.findOneBy({ id });
  }

  async findByNhlId(id: string): Promise<ActiveGame> {
    return this.activeGameRepository.findOneBy({ nhlId: id });
  }

  async findByNhlIds(ids: string[]): Promise<ActiveGame[]> {
    return this.activeGameRepository.findBy({ nhlId: In(ids) });
  }

  async update(
    id: number,
    activeGame: Partial<ActiveGame>,
  ): Promise<UpdateResult> {
    return this.activeGameRepository.update(id, activeGame);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.activeGameRepository.delete({ id });
  }
}
