import axios from 'axios';
import { GameService } from '../services/game.service';
import { TeamService } from '../services/team.service';
import { Game } from '../entities/game.entity';
import { getMatch } from '../utilities/getMatch';
import { checkTodaysTeams } from './checkTodaysTeams';
import { checkTodaysGames } from './checkTodaysGames';
import { getTodaysPlayers } from './getTodaysPlayers';
import { formatGamesForToday } from '../utilities/formatGamesForToday';
import { formatPlayersForToday } from '../utilities/formatPlayersForToday';
import { Player } from '../entities/player.entity';
import { PlayerService } from '../services/player.service';

export async function initDailyGames(
  gameService: GameService,
  teamService: TeamService,
  playerService: PlayerService,
): Promise<true | string> {
  let games: Game[];

  try {
    const response = await axios.get(
      'https://statsapi.web.nhl.com/api/v1/schedule',
    );
    games = formatGamesForToday(response);
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

  const todaysPlayers = await getTodaysPlayers(games);

  return true;
}
