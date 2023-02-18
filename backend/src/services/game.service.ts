import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AxiosResponse } from 'axios';
import { GameResponseType } from 'src/types/GameResponseType';
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

  async update(id: number, game: Partial<Game>): Promise<UpdateResult> {
    return this.gameRepository.update(id, game);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.gameRepository.delete({ id });
  }

  formatGamesForToday(response: AxiosResponse<any, any>) {
    const data = response?.data?.dates?.[0];
    if (!data) {
      return [];
    }

    const games: Game[] = data.games.map((nhlGame: GameResponseType) => {
      if (!nhlGame) return undefined;
      return {
        nhlId: nhlGame.gamePk,
        gameDate: data.date,
        gameTime: new Date(nhlGame.gameDate),
        homeTeam: nhlGame.teams.home.team.id,
        awayTeam: nhlGame.teams.away.team.id,
        status: nhlGame.status.statusCode,
        homeScore: nhlGame.teams.home.score,
        awayScore: nhlGame.teams.away.score,
      };
    });

    return games;
  }
}
