import { AxiosResponse } from 'axios';
import { Player } from 'src/entities/player.entity';
import { Game } from '../entities/game.entity';
import { GameResponseType } from '../types/GameResponseType';

export function formatPlayersForToday(response: AxiosResponse<any, any>) {
  const data = response?.data?.teams;
  if (!data) {
    return [];
  }

  let players: Partial<Player>[] = [];

  data.forEach((team) => {
    team.roster.roster.forEach((player) => {
      const newPlayer = {
        nhlId: player.person.id,
        fullName: player.person.fullName,
        primaryNumber: player.jerseyNumber,
        position: player.position.name,
        currentTeam: team.id,
      };
      players = players.concat(newPlayer);
    });
  });

  console.log(players);
  console.log('QUIJIBO');

  const games: any[] = data.games.map((nhlGame: GameResponseType) => {
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
