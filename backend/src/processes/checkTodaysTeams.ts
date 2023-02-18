import axios from 'axios';
import { Game } from 'src/entities/game.entity';
import { TeamService } from '../services/team.service';

export async function checkTodaysTeams(
  games: Game[],
  teamService: TeamService,
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
        const nt = response?.data?.teams?.[0];
        const newTeam = {
          nhlId: nt.id,
          name: nt.name,
          teamName: nt.teamName,
          shortName: nt.shortName,
          abbreviation: nt.abbreviation,
          officialSiteUrl: nt.officialSiteUrl,
        };

        console.info('Found new team: ' + newTeam.name);
        await teamService.create(newTeam);
        console.info('Created DB entry for ' + newTeam.teamName);
      } catch (err) {
        console.error(err);
      }
    }
  }
}
