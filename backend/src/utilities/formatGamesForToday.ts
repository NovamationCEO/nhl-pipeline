import { AxiosResponse } from 'axios';
import { Game } from '../entities/game.entity';
import { GameResponseType } from '../types/GameResponseType';

export function formatGamesForToday(response: AxiosResponse<any, any>) {
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
      assists: 0,
      hits: 0,
      penaltyMinutes: 0,
    };
  });

  return games;
}
