import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';
import { GameEvent } from '../entities/gameEvent.entity';

@Injectable()
export class GameEventService {
  constructor(
    @InjectRepository(GameEvent)
    private readonly gameEventRepository: Repository<GameEvent>,
  ) {}

  async create(gameEvent: Partial<GameEvent>): Promise<GameEvent> {
    return this.gameEventRepository.save(gameEvent);
  }

  async findById(id: number): Promise<GameEvent> {
    return this.gameEventRepository.findOneBy({ id });
  }

  async findByNhlId(id: number): Promise<GameEvent> {
    return this.gameEventRepository.findOneBy({ nhlId: id });
  }

  async findByNhlIds(ids: number[]): Promise<GameEvent[]> {
    return this.gameEventRepository.findBy({ nhlId: In(ids) });
  }

  async findByGameNhlId(id: number): Promise<GameEvent[]> {
    return this.gameEventRepository.findBy({ nhlId: id });
  }

  async update(
    id: number,
    gameEvent: Partial<GameEvent>,
  ): Promise<UpdateResult> {
    return this.gameEventRepository.update(id, gameEvent);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.gameEventRepository.delete({ id });
  }
}
