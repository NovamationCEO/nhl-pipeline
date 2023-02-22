import axios from 'axios';
import { GameService } from '../services/game.service';
import { TeamService } from '../services/team.service';
import { Game } from '../entities/game.entity';
import { getMatch } from '../utilities/getMatch';
import { checkTodaysTeams } from './checkTodaysTeams';
import { checkTodaysGames } from './checkTodaysGames';
import { getTodaysPlayers } from './getTodaysPlayers';
import { formatGamesForToday } from '../utilities/formatGamesForToday';
import { PlayerService } from '../services/player.service';
import { checkTodaysPlayers } from './checkTodaysPlayers';
import { ActiveGameService } from '../services/activeGame.service';
import * as cron from 'node-cron';
import { checkActiveGames } from './checkActiveGames';
import { GameEventService } from '../services/gameEvent.service';

export async function initDailyGames(
  isInitial: boolean,
  gameService: GameService,
  teamService: TeamService,
  playerService: PlayerService,
  activeGameService: ActiveGameService,
  gameEventService: GameEventService,
): Promise<boolean> {
  let games: Game[];

  try {
    const response = await axios.get(
      'https://statsapi.web.nhl.com/api/v1/schedule',
    );
    games = formatGamesForToday(response);
    console.info(games.length + ' games Found. \n');
  } catch (err) {
    return err.toString();
  }

  if (!games || !games.length) {
    console.info('No games found today.');
    return false;
  }

  const nhlIds = games.map((game) => game.nhlId);
  const existing = await gameService.findByNhlIds(nhlIds);

  if (!games.every((game) => getMatch(game, existing, 'nhlId'))) {
    await checkTodaysTeams(games, teamService);
  }

  await checkTodaysGames(games, gameService, activeGameService);

  const todaysPlayers = await getTodaysPlayers(games);
  await checkTodaysPlayers(todaysPlayers, playerService);

  if (isInitial) {
    try {
      activeGameService.initializeOnServerRestart();
      console.info('Initialized Active Games after server restart.');
    } catch (err) {
      console.error('Unable to initialize Active Games after server restart.');
      console.error(err);
    }
    cron.schedule('*/5 * * * *', () => {
      checkActiveGames(activeGameService, gameService, gameEventService);
    });
  }
  return true;
}
