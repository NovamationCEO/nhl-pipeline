import { AxiosResponseHeaders } from 'axios';
import { ClientRequest } from 'http';

// export type gamesForTodayResponse = {
//   status: number;
//   statusText: string;
//   headers: AxiosResponseHeaders;
//   config: any;
//   request: ClientRequest;
//   data: gamesForTodayGamesResponse;
// };

// export type gamesForTodayGamesResponse = counts & {
//   copyright: string;
//   metaData: {
//     timeStamp: string;
//   };
//   wait: number;
//   dates: counts & { date: string; games: GameResponseType }[];
// };

// type counts = {
//   totalItems: number;
//   totalEvents: number;
//   totalGames: number;
//   totalMatches: number;
// };

export type GameResponseType = {
  gamePk: number;
  link: string;
  gameType: string;
  season: string;
  gameDate: string;
  status: {
    abstractGameState: string;
    codedGameState: number;
    detailedState: string;
    statusCode: number;
    startTimeTBD: boolean;
  };
  teams: { away: TeamType; home: TeamType };
  venue: { id: number; name: string; link: string };
  content: { link: string };
};

type TeamType = {
  leagueRecord: { wins: number; losses: number; ot: number; type: string };
  score: number;
  team: { id: number; name: string; link: string };
};
