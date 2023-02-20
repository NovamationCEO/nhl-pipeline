import axios from 'axios';
import { formatPlayersForToday } from '../utilities/formatPlayersForToday';
import { Game } from '../entities/game.entity';
import { Player } from '../entities/player.entity';

export async function getTodaysPlayers(
  games: Game[],
): Promise<Partial<Player>[]> {
  const teamIds = games
    .map((game) => game.homeTeam)
    .concat(games.map((game) => game.awayTeam));

  const commaTeams = [...new Set(teamIds)].join(',');

  let players: Partial<Player>[];

  try {
    const response = await axios.get(
      `https://statsapi.web.nhl.com/api/v1/teams?expand=team.roster&teamId=${commaTeams}`,
    );
    players = formatPlayersForToday(response);
  } catch (err) {
    console.error(err);
    return [];
  }

  return players;
}
