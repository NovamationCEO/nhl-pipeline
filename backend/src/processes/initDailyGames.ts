import axios from 'axios';
import { GameService } from '../services/game.service';
import { TeamService } from '../services/team.service';
import { Game } from '../entities/game.entity';
import { getMatch } from 'src/utilities/getMatch';
import { checkTodaysTeams } from './checkTodaysTeams';
import { checkTodaysGames } from './checkTodaysGames';

export async function initDailyGames(
  gameService: GameService,
  teamService: TeamService,
): Promise<true | string> {
  let games: Game[];

  try {
    const response = await axios.get(
      'https://statsapi.web.nhl.com/api/v1/schedule',
    );
    games = await gameService.formatGamesForToday(response);
    console.info(games.length + ' games Found. \n', games);
  } catch (err) {
    return err.toString();
  }

  if (!games || !games.length) {
    return 'No games found today.';
  }

  const nhlIds = games.map((game) => game.nhlId);
  const existing = await gameService.findByNhlIds(nhlIds);

  if (!games.every((game) => getMatch(game, existing, 'nhlId'))) {
    await checkTodaysTeams(games, teamService);
  }

  await checkTodaysGames(games, gameService);

  return true;
}
