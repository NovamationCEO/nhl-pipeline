import { ActiveGameService } from 'src/services/activeGame.service';
import { GameService } from '../services/game.service';
import { streamGame } from './streamGame';

export async function checkActiveGames(
  activeGameService: ActiveGameService,
  gameService: GameService,
) {
  const activeGames = await activeGameService.getAll();

  for (const game of activeGames) {
    const isComplete = ['5', '6', '7'].includes(game.status);

    if (isComplete) {
      await activeGameService.remove(game.id);
      continue;
    }

    if (game.streaming) {
      continue;
    }

    const timeToStartPolling =
      new Date(game.startTime).getTime() - 5 * 60 * 1000;
    const startPolling = timeToStartPolling >= Date.now();

    if (startPolling && !game.streaming) {
      activeGameService.update(game.id, { streaming: true });
      streamGame(game, activeGameService, gameService);
    }
  }
}
