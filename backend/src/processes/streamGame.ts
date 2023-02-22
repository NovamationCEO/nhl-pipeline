import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActiveGame } from '../entities/activeGame.entity';
import { ActiveGameService } from '../services/activeGame.service';
import { GameService } from '../services/game.service';
import { GameEventService } from '../services/gameEvent.service';
import { queryLive } from './queryLive';
import { updateStreamedEvents } from './updateStreamedEvents';

export function streamGame(
  activeGame: ActiveGame,
  activeGameService: ActiveGameService,
  gameService: GameService,
  gameEventService: GameEventService,
) {
  const endStatuses = ['5', '6', '7'];
  const obs = interval(5000) // emit a value every 5 seconds
    .pipe(
      switchMap(
        async () => await queryLive(activeGame.nhlId, activeGame.newestEvent),
      ),
    )
    .subscribe({
      next: async (freshGame) => {
        let storedActiveGame;
        let storedGame;

        try {
          storedActiveGame = await activeGameService.findByNhlId(
            activeGame.nhlId,
          );
        } catch (err) {
          console.error(
            'Unable to find activeGame with nhlId ' + activeGame.nhlId,
          );
          throw new Error(err);
        }

        if (endStatuses.includes(activeGame.status)) {
          obs.unsubscribe();
          return;
        }

        if (!freshGame) {
          return;
        }

        try {
          await activeGameService.update(storedActiveGame.id, {
            status: freshGame.status,
            lastUpdated: freshGame.timeString,
          });
        } catch (err) {
          console.error(
            'Unable to update activeGame with id ' + storedActiveGame.id,
          );
          throw new Error(err);
        }

        try {
          storedGame = await gameService.findByNhlId(activeGame.nhlId);
        } catch (err) {
          console.error('Cannot find game with nhlId ' + activeGame.nhlId);
          throw new Error(err);
        }

        try {
          updateStreamedEvents(
            freshGame.plays,
            gameEventService,
            storedGame,
            gameService,
            activeGame,
            activeGameService,
          );
        } catch (err) {
          console.error(err);
        }

        try {
          if (
            storedGame.homeScore != freshGame.home ||
            storedGame.awayScore != freshGame.away ||
            storedGame.status != freshGame.status
          ) {
            await gameService.update(storedGame.id, {
              homeScore: freshGame.home,
              awayScore: freshGame.away,
              status: freshGame.status,
            });
          }
        } catch (err) {
          console.error('Cannot update game with id ' + storedGame.id);
          throw new Error(err);
        }

        if (endStatuses.includes(freshGame.status)) {
          obs.unsubscribe();
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  return obs;
}
