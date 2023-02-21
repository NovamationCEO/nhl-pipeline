import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';
import { Player } from '../entities/player.entity';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  async create(player: Player): Promise<Player> {
    return this.playerRepository.save(player);
  }

  async findById(id: number): Promise<Player> {
    return this.playerRepository.findOneBy({ id });
  }

  async findByNhlId(id: string): Promise<Player> {
    return this.playerRepository.findOneBy({ nhlId: id });
  }

  async findByNhlIds(ids: string[]): Promise<Player[]> {
    return this.playerRepository.findBy({ nhlId: In(ids) });
  }

  async findByTeam(id: number): Promise<Player[]> {
    return this.playerRepository.findBy({ currentTeam: id, active: true });
  }

  async update(id: number, player: Partial<Player>): Promise<UpdateResult> {
    return this.playerRepository.update(id, player);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.playerRepository.delete({ id });
  }
}
