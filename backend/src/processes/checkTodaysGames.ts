import { ActiveGame } from '../entities/activeGame.entity';
import { ActiveGameService } from '../services/activeGame.service';
import { getTimeString } from '../services/getTimeString';
import { Game } from '../entities/game.entity';
import { GameService } from '../services/game.service';
import { getMatch } from '../utilities/getMatch';

export async function checkTodaysGames(
  newGames: Game[],
  gameService: GameService,
  activeGameService: ActiveGameService,
) {
  const gameNhlIds = newGames.map((game) => game.nhlId);
  const knownGames = await gameService.findByNhlIds(gameNhlIds);

  for (const newGame of newGames) {
    const match = getMatch(newGame, knownGames, 'nhlId');
    const gameName = newGame.homeTeam + ' v ' + newGame.awayTeam;

    if (!match) {
      try {
        console.info('Found new game: ' + gameName);
        await gameService.create(newGame);
        console.info('Created DB entry for ' + gameName);
      } catch (err) {
        console.error(err);
      }

      const newActiveGame: ActiveGame = {
        nhlId: newGame.nhlId,
        status: newGame.status,
        startTime: newGame.gameTime,
        lastUpdated: getTimeString(),
      };

      try {
        await activeGameService.create(newActiveGame);
        console.info('Added to Active Game list.\n');
      } catch (err) {
        console.log(err);
      }
      continue;
    }

    const updateKeys = ['status', 'homeScore', 'awayScore'];

    if (updateKeys.every((key) => newGame[key] === match[key])) {
      continue;
    }

    try {
      const response = await gameService.update(match.id, newGame);
      const msg = ' DB entry for ' + gameName + ' (' + match.id + ')\n';

      response.affected === 1
        ? console.info('Updated' + msg)
        : console.error('Did not update' + msg);
    } catch (err) {
      console.error(err);
    }
  }
}
