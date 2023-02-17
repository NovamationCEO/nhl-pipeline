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
