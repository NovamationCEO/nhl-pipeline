import axios from 'axios';
import { formatPlayersForToday } from 'src/utilities/formatPlayersForToday';
import { Game } from '../entities/game.entity';
import { Player } from '../entities/player.entity';
import { formatGamesForToday } from '../utilities/formatGamesForToday';

export async function getTodaysPlayers(games: Game[]): Promise<true | string> {
  const teamIds = games
    .map((game) => game.homeTeam)
    .concat(games.map((game) => game.awayTeam));

  const commaTeams = [...new Set(teamIds)].join(',');

  let players: Player[];

  try {
    const response = await axios.get(
      `https://statsapi.web.nhl.com/api/v1/teams?expand=team.roster&teamId=${commaTeams}`,
    );
    players = formatPlayersForToday(response);
  } catch (err) {
    return err.toString();
  }

  //   if (!games || !games.length) {
  //     return 'No games found today.';
  //   }

  //   const nhlIds = games.map((game) => game.nhlId);
  //   const existing = await gameService.findByNhlIds(nhlIds);

  //   if (!games.every((game) => getMatch(game, existing, 'nhlId'))) {
  //     await checkTodaysTeams(games, teamService);
  //   }

  //   await checkTodaysGames(games, gameService);

  //   const todaysPlayers = await getTodaysPlayers(games);

  return true;
}
