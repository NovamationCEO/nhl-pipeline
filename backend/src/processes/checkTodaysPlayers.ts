import { Player } from 'src/entities/player.entity';
import { PlayerService } from 'src/services/player.service';
import { getMatch } from '../utilities/getMatch';

export async function checkTodaysPlayers(
  newPlayers: Player[],
  playerService: PlayerService,
) {
  const playerNhlIds = newPlayers.map((game) => game.nhlId);
  const knownGames = await playerService.findByNhlIds(playerNhlIds);

  for (const newPlayer of newPlayers) {
    const match = getMatch(newPlayer, knownGames, 'nhlId');

    if (!match) {
      try {
        console.info('Found new player: ' + newPlayer.fullName);
        await playerService.create(newPlayer);
        console.info('Created DB entry for ' + newPlayer.fullName + '\n');
      } catch (err) {
        console.error(err);
      }
      continue;
    }

    // If these change, it will ripple back through time to affect historical data.
    // That might just be a 'live with it,' for today.
    const updateKeys = ['primaryNumber', 'active', 'currentTeam', 'position'];

    if (updateKeys.every((key) => newPlayer[key] === match[key])) {
      continue;
    }

    try {
      const response = await playerService.update(match.id, newPlayer);
      const msg =
        ' DB entry for ' + newPlayer.fullName + ' (' + match.id + ')\n';

      response.affected === 1
        ? console.info('Updated' + msg)
        : console.error('Did not update' + msg);
    } catch (err) {
      console.error(err);
    }
  }
}
