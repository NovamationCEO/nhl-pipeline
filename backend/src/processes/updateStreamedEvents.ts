import { ActiveGame } from '../entities/activeGame.entity';
import { Game } from '../entities/game.entity';
import { GameEvent } from '../entities/gameEvent.entity';
import { ActiveGameService } from '../services/activeGame.service';
import { GameService } from '../services/game.service';
import { GameEventService } from '../services/gameEvent.service';

export async function updateStreamedEvents(
  plays: GameEvent[],
  gameEventService: GameEventService,
  storedGame: Game,
  gameService: GameService,
  activeGame: ActiveGame,
  activeGameService: ActiveGameService,
): Promise<void> {
  // Newest Event doesn't seem to be working as expected.  Sadly adding back in checking.
  const storedEvents = await gameEventService.findByGameNhlId(storedGame.nhlId);

  for (const play of plays) {
    if (storedEvents.findIndex((event) => event.nhlId === play.nhlId) >= 0) {
      continue;
    }
    await gameEventService.create(play);
  }

  const newestEvent = plays.reduce((order, play) => {
    return Math.max(order, play.eventOrder);
  }, -1);

  if (newestEvent != activeGame.newestEvent) {
    await activeGameService.update(activeGame.id, { newestEvent });
  }

  const assists = plays.reduce((count, play) => {
    return count + play.assists;
  }, 0);

  const hits = plays.reduce((count, play) => {
    return count + play.hits;
  }, 0);

  if (assists != storedGame.assists || hits != storedGame.hits) {
    await gameService.update(storedGame.id, { assists, hits });
  }
}
