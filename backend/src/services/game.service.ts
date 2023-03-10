import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';
import { Game } from '../entities/game.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
  ) {}

  async create(game: Game): Promise<Game> {
    return this.gameRepository.save(game);
  }

  async findById(id: number): Promise<Game> {
    return this.gameRepository.findOneBy({ id });
  }

  async findByNhlId(id: number): Promise<Game> {
    return this.gameRepository.findOneBy({ nhlId: id });
  }

  async findByNhlIds(ids: number[]): Promise<Game[]> {
    return this.gameRepository.findBy({ nhlId: In(ids) });
  }

  async findByToday(): Promise<Game[]> {
    const today = new Date().toISOString().substring(0, 10);
    return this.gameRepository.findBy({ gameDate: today });
  }

  async findByDate(dateString: string): Promise<Game[]> {
    return this.gameRepository.findBy({ gameDate: dateString });
  }

  async update(id: number, game: Partial<Game>): Promise<UpdateResult> {
    return this.gameRepository.update(id, game);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.gameRepository.delete({ id });
  }
}
