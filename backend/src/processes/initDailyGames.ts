import axios from 'axios';
import { Team } from 'src/entities/team.entity';
import { GameService } from 'src/services/game.service';
import { TeamService } from 'src/services/team.service';
import { Game } from '../entities/game.entity';

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
  } catch (err) {
    return err.toString();
  }

  if (!games || !games.length) {
    return 'No games found today.';
  }

  console.log(games);

  const nhlIds = games.map((game) => game.nhlId);

  const existing = await gameService.findByNhlIds(nhlIds);

  console.log('---');
  console.log(existing);

  if (
    !games.every((game) =>
      existing.find((savedData) => savedData.nhlId === game.nhlId),
    )
  ) {
    const teamIds = games
      .map((game) => game.homeTeam)
      .concat(games.map((game) => game.awayTeam));

    const knownTeams = await teamService.findByNhlIds(teamIds);

    for (const nhlId of teamIds) {
      const match = knownTeams.findIndex((t) => t.nhlId === nhlId);
      if (match < 0) {
        try {
          const response = await axios.get(
            `https://statsapi.web.nhl.com/api/v1/teams/${nhlId}`,
          );
          console.log(response);
          const nt = response?.data?.teams?.[0];
          const newTeam = {
            nhlId: nt.id,
            name: nt.name,
            teamName: nt.teamName,
            shortName: nt.shortName,
            abbreviation: nt.abbreviation,
            officialSiteUrl: nt.officialSiteUrl,
          };

          console.log('Creating ', newTeam);
          await teamService.create(newTeam);
          console.log('Found new team: ', newTeam.name, '. Created DB entry.');
        } catch (err) {
          console.error(err);
        }
      }
    }
  }

  // for (const game of games) {
  //   const saved = existing.find((savedData) => savedData.nhlId === game.nhlId);

  //   if (!saved) {
  //     await this.gameService.create(game);
  //     return;
  //   }
  // }

  return true;
}
