import axios from 'axios';
import { PlayerResponseType } from '../types/PlayerResponseType';
import { formatNewPlayer } from '../utilities/formatNewPlayer';
import { Player } from '../entities/player.entity';
import { PlayerService } from '../services/player.service';
import { getMatch } from '../utilities/getMatch';

export async function checkTodaysPlayers(
  todaysPlayers: Partial<Player>[],
  playerService: PlayerService,
) {
  const playerNhlIds = todaysPlayers.map((game) => game.nhlId);
  const knownPlayers = await playerService.findByNhlIds(playerNhlIds);

  const newPlayerList = [];
  let recognizedPlayerCount = 0;

  for (const newPlayer of todaysPlayers) {
    const match = getMatch(newPlayer, knownPlayers, 'nhlId');

    if (!match) {
      newPlayerList.push(newPlayer.nhlId);
      continue;
    }

    recognizedPlayerCount++;

    // If these change, it will ripple back through time to affect historical data.
    // That might just be a 'live with it,' for today.
    const updateKeys = ['primaryNumber', 'currentTeam', 'position'];

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

  console.log(
    'Recognized ' +
      recognizedPlayerCount +
      ' players out of ' +
      todaysPlayers.length,
  );

  if (!newPlayerList.length) {
    return;
  }

  console.info('Meeting new players.  This may take a while. \n');

  const payloads = [];
  const playerNames = [];
  let count = 1;
  for (const newPlayerId of newPlayerList) {
    try {
      const response = await axios.get(
        `https://statsapi.web.nhl.com/api/v1/people/${newPlayerId}`,
      );
      const playerData: PlayerResponseType = response?.data;

      if (!playerData) {
        throw new Error(
          `No response from https://statsapi.web.nhl.com/api/v1/people/${newPlayerId}`,
        );
      }

      const newPlayer = formatNewPlayer(playerData);
      payloads.push(newPlayer);
      process.stdout.write(`\r${count}`);
      count++;
    } catch (err) {
      console.error(err);
    }
  }

  console.info('\nSaving new players. \n');

  for (const payload of payloads) {
    try {
      await playerService.create(payload);
      playerNames.push(payload.fullName);
    } catch (err) {
      console.error(err);
    }
  }

  console.info(
    '\nAdded ' +
      playerNames.length +
      ' new players of an expected ' +
      payloads.length +
      '.',
  );
  console.info('A warm welcome to ' + playerNames.join(', ') + '\n');
}
