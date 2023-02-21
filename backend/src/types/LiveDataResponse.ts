import { AnyObj } from './AnyObj';

export type LiveDataResponse = {
  plays: {
    allPlays?: AllPlaysEntity[] | null;
    scoringPlays?: number[] | null;
    penaltyPlays?: number[] | null;
    playsByPeriod?:
      | { startIndex: number; plays?: number[] | null; endIndex: number }[]
      | null;
    currentPlay: CurrentPlay;
  };
  linescore: Linescore;
  boxscore: Boxscore;
  decisions: AnyObj;
};

export type AllPlaysEntity = {
  result: {
    event: string;
    eventCode: string;
    eventTypeId: string;
    description: string;
    secondaryType?: string | null;
    penaltySeverity?: string | null;
    penaltyMinutes?: number | null;
    strength?: { code: string; name: string } | null;
    emptyNet?: boolean | null;
  };
  about: About;
  coordinates: { x?: number | null; y?: number | null };
  players?: PlayerData[] | null;
  team?: TeamData | null;
};

type HumanData = {
  id: number;
  fullName: string;
  link: string;
};

export type PlayerData = {
  player: HumanData;
  playerType: string;
  seasonTotal?: number | null;
};

type TeamData = {
  id: number;
  name: string;
  link: string;
  triCode: string;
  abbreviation?: string;
};

type About = {
  eventIdx: number;
  eventId: number;
  period: number;
  periodType: string;
  ordinalNum: string;
  periodTime: string;
  periodTimeRemaining: string;
  dateTime: string;
  goals: { away: number; home: number };
};

type CurrentPlay = {
  players?: PlayerData[] | null;
  result: {
    event: string;
    eventCode: string;
    eventTypeId: string;
    description: string;
  };
  about: About;
  coordinates: { x: number; y: number };
  team: TeamData;
};

// ----

export type Linescore = {
  currentPeriod: number;
  currentPeriodOrdinal: string;
  currentPeriodTimeRemaining: string;
  periods?: PeriodData[] | null;
  shootoutInfo: {
    home: { scores: number; attempts: number };
    away: { scores: number; attempts: number };
  };
  teams: { away: TeamSummary; home: TeamSummary };
  powerPlayStrength: string;
  hasShootout: boolean;
  intermissionInfo: {
    intermissionTimeRemaining: number;
    intermissionTimeElapsed: number;
    inIntermission: boolean;
  };
  powerPlayInfo: {
    situationTimeRemaining: number;
    situationTimeElapsed: number;
    inSituation: boolean;
  };
};
type PeriodData = {
  periodType: string;
  startTime: string;
  endTime?: string | null;
  num: number;
  ordinalNum: string;
  home: { goals: number; shotsOnGoal: number; rinkSide: string };
  away: { goals: number; shotsOnGoal: number; rinkSide: string };
};

type TeamSummary = {
  team: TeamData;
  goals: number;
  shotsOnGoal: number;
  goaliePulled: boolean;
  numSkaters: number;
  powerPlay: boolean;
};

// ---

type Boxscore = {
  teams: { away: BoxTeamType; home: BoxTeamType };
  officials?: { official: HumanData; officialType: string }[] | null;
};

type BoxTeamType = {
  team: TeamData;
  teamStats: {
    teamSkaterStats: {
      goals: number;
      pim: number;
      shots: number;
      powerPlayPercentage: string;
      powerPlayGoals: number;
      powerPlayOpportunities: number;
      faceOffWinPercentage: string;
      blocked: number;
      takeaways: number;
      giveaways: number;
      hits: number;
    };
  };
  players: { [x: string]: BoxTeamPlayers };
  goalies?: number[] | null;
  skaters?: number[] | null;
  onIce?: number[] | null;
  onIcePlus?:
    | { playerId: number; shiftDuration: number; stamina: number }[]
    | null;
  scratches?: number[] | null;
  penaltyBox?: null[] | null;
  coaches?: { fullName: string; link: string; position: PositionData }[] | null;
};

type BoxTeamPlayers = {
  person: {
    id: number;
    fullName: string;
    link: string;
    shootsCatches: string;
    rosterStatus: string;
  };
  jerseyNumber: string;
  position?: PositionData;
  stats?: {
    skaterStats?: {
      timeOnIce: string;
      assists: number;
      goals: number;
      shots: number;
      hits: number;
      powerPlayGoals: number;
      powerPlayAssists: number;
      penaltyMinutes: number;
      faceOffPct: number;
      faceOffWins: number;
      faceoffTaken: number;
      takeaways: number;
      giveaways: number;
      shortHandedGoals: number;
      shortHandedAssists: number;
      blocked: number;
      plusMinus: number;
      evenTimeOnIce: string;
      powerPlayTimeOnIce: string;
      shortHandedTimeOnIce: string;
    };
  };
  goalieStats: {
    timeOnIce: string;
    assists: number;
    goals: number;
    pim: number;
    shots: number;
    saves: number;
    powerPlaySaves: number;
    shortHandedSaves: number;
    evenSaves: number;
    shortHandedShotsAgainst: number;
    evenShotsAgainst: number;
    powerPlayShotsAgainst: number;
    savePercentage?: number;
    powerPlaySavePercentage?: number;
    evenStrengthSavePercentage?: number;
  };
};

type PositionData = {
  code: string;
  name: string;
  type: string;
  abbreviation: string;
};
