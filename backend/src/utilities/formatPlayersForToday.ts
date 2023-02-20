import { AxiosResponse } from 'axios';
import { Player } from '../entities/player.entity';

export function formatPlayersForToday(
  response: AxiosResponse<any, any>,
): Partial<Player>[] {
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

  return players;
}
