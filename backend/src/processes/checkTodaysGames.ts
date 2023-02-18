import { Game } from '../entities/game.entity';
import { GameService } from '../services/game.service';
import { getMatch } from '../utilities/getMatch';

export async function checkTodaysGames(
  games: Game[],
  gameService: GameService,
) {
  const gameNhlIds = games.map((game) => game.nhlId);
  const knownGames = await gameService.findByNhlIds(gameNhlIds);

  for (const game of games) {
    const match = getMatch(game, knownGames, 'nhlId');
    const gameName = game.homeTeam + ' v ' + game.awayTeam;

    if (!match) {
      try {
        console.info('Found new game: ' + gameName);
        await gameService.create(game);
        console.info('Created DB entry for ' + gameName + '\n');
      } catch (err) {
        console.error(err);
      }
      continue;
    }

    const updateKeys = ['nhlId', 'status', 'homeScore', 'awayScore'];

    updateKeys.forEach((key) =>
      console.log(Number(game[key]), Number(match[key])),
    );

    if (updateKeys.every((key) => game[key] === match[key])) {
      continue;
    }

    try {
      const response = await gameService.update(match.id, game);
      const msg = ' DB entry for ' + gameName + ' (' + match.id + ')\n';

      response.affected === 1
        ? console.info('Updated' + msg)
        : console.error('Did not update' + msg);
    } catch (err) {
      console.error(err);
    }
  }
}
