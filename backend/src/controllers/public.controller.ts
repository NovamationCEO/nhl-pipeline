import { Controller, Get, Param } from '@nestjs/common';
import { gameStatus } from '../constants/gameStatus';
import { Game } from '../entities/game.entity';
import { GameEvent } from '../entities/gameEvent.entity';
import { ActiveGameService } from '../services/activeGame.service';
import { GameService } from '../services/game.service';
import { GameEventService } from '../services/gameEvent.service';
import { PlayerService } from '../services/player.service';
import { TeamService } from '../services/team.service';
import { AnyObj } from '../types/AnyObj';

@Controller('nhl')
export class PublicController {
  constructor(
    private readonly playerService: PlayerService,
    private readonly activeGameService: ActiveGameService,
    private readonly gameService: GameService,
    private readonly gameEventService: GameEventService,
    private readonly teamService: TeamService,
  ) {}

  @Get('games/today')
  async getTodaysGames() {
    const rawGames = await this.gameService.findByToday();
    if (!rawGames || !rawGames.length) {
      return { message: 'No games found today.' };
    }

    return this.gameFormatter(rawGames, this.teamService);
  }

  @Get('games/date/:date')
  async getGamesByDate(@Param('date') date: string) {
    const rawGames = await this.gameService.findByDate(date);
    if (!rawGames || !rawGames.length) {
      return {
        message: 'No games for for ' + date,
        suggestion: 'Format the date as YYYY-MM-DD',
      };
    }
    return this.gameFormatter(rawGames, this.teamService);
  }

  async gameFormatter(rawGames: Game[], teamService: TeamService) {
    const teamNhlIds = rawGames
      .map((game) => game.awayTeam)
      .concat(rawGames.map((game) => game.homeTeam));
    const teams = await teamService.findByNhlIds(teamNhlIds);

    return rawGames.map((game) => {
      const home = teams.find((team) => team.nhlId === game.homeTeam);
      const away = teams.find((team) => team.nhlId === game.awayTeam);
      return {
        id: game.nhlId,
        gameDate: game.gameDate,
        gameTime: game.gameTime,
        home: { name: home.name, score: game.homeScore, teamId: home.nhlId },
        away: { name: away.name, score: game.awayScore, teamId: away.nhlId },
        general: {
          assists: game.assists,
          hits: game.hits,
          goals: game.homeScore + game.awayScore,
        },
        status: gameStatus[game.status],
      };
    });
  }

  @Get('team/:id')
  async getTeam(@Param('id') nhlId: number) {
    const rawTeam = await this.teamService.findByNhlId(nhlId);

    if (!rawTeam) {
      return { message: 'No team found with id ' + nhlId + '.' };
    }

    return {
      id: rawTeam.nhlId,
      name: rawTeam.name,
      teamName: rawTeam.teamName,
      shortName: rawTeam.shortName,
      abbreviation: rawTeam.abbreviation,
      url: rawTeam.officialSiteUrl,
    };
  }

  @Get('team/:id/roster')
  async getTeamRoster(@Param('id') nhlId: number) {
    const rawPlayers = await this.playerService.findByTeam(nhlId);
    const team = await this.teamService.findByNhlId(nhlId);

    const players = rawPlayers.map((player) => {
      const age = this.calculateAge(player.birthdate);
      return {
        id: player.nhlId,
        name: player.fullName,
        number: player.primaryNumber,
        position: player.position,
        age: age,
      };
    });

    return {
      team: team.name,
      url: team.officialSiteUrl,
      players: players,
    };
  }

  calculateAge(birthdate: Date): number {
    const now = new Date();
    const birthYear = birthdate.getFullYear();
    const currentYear = now.getFullYear();
    let age = currentYear - birthYear;

    const birthdateThisYear = new Date(
      currentYear,
      birthdate.getMonth(),
      birthdate.getDate(),
    );
    if (now < birthdateThisYear) {
      age--;
    }

    return age;
  }

  @Get('game/:id')
  async getGameById(@Param('id') nhlId: number) {
    const rawGame = await this.gameService.findByNhlId(nhlId);

    if (!rawGame) {
      return { message: 'No game found with id ' + nhlId + '.' };
    }

    return this.gameFormatter([rawGame], this.teamService);
  }

  @Get('game/:id/events')
  async getGameWithEvents(@Param('id') nhlId: number) {
    const rawGame = await this.gameService.findByNhlId(nhlId);

    if (!rawGame) {
      return { message: 'No game found with id ' + nhlId + '.' };
    }

    const rawEvents =
      (await this.gameEventService.findByGameNhlId(nhlId)) || [];
    rawEvents.sort((a, b) => a.eventOrder - b.eventOrder);

    const game = this.gameFormatter([rawGame], this.teamService) as any;

    return { game, events: this.eventFormatter(rawEvents) };
  }

  eventFormatter(rawEvents: GameEvent[]): AnyObj {
    return rawEvents.map((event) => {
      return {
        event: event.headline,
        details: {
          eventName: event.eventName,
          period: event.period,
          periodTime: event.periodTime,
          timeRemaining: event.periodTimeRemaining,
          timestamp: event.timestamp,
        },
      };
    });
  }
}
