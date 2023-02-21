import { LiveDataResponse } from './LiveDataResponse';

export type LiveGameResponse = {
  gamePk: number;
  link: string;
  metaData: {
    wait: number;
    timeStamp: string;
  };
  gameData: GameData;
  liveData: LiveDataResponse;
};

type GameData = {
  game: {
    pk: number;
    season: string;
    type: string;
  };
  datatime: {
    datetime: string;
  };
  status: {
    abstractGameState: string;
    codedGameState: string;
    detailedState: string;
    statusCode: string;
    startTimeTBD: boolean;
  };
  teams: {
    away: TeamData;
    home: TeamData;
  };
  players: { [x: string]: PlayerData };
  venue: {
    id: number;
    name: string;
    link: string;
  };
};

type TeamData = {
  id: number;
  name: string;
  link: string;
  venue: {
    id: number;
    name: string;
    link: string;
    city: string;
    timeZone: { id: string; offset: number; tz: string };
  };
  abbreviation: string;
  triCode: string;
  teamName: string;
  locationName: string;
  firstYearOfPlay: string;
  division: {
    id: number;
    name: string;
    nameShort: string;
    link: string;
    abbreviation: string;
  };
  conference: {
    id: number;
    name: string;
    link: string;
  };
  franchise: { franchiseId: number; teamName: string; link: string };
  shortName: string;
  officialSiteUrl: string;
  franchiseId: number;
  active: boolean;
};

type PlayerData = {
  id: number;
  fullName: string;
  link: string;
  firstName: string;
  lastName: string;
  primaryNumber: string;
  birthDate: string;
  currentAge: number;
  birthCity: string;
  birthCountry: string;
  nationality: string;
  height: string;
  weight: number;
  active: boolean;
  alternateCaptain: boolean;
  captain: boolean;
  rookie: boolean;
  shootsCatches: string;
  rosterStatus: string;
  currentTeam: { id: number; name: string; link: string; triCode: string };
  primaryPosition: {
    code: string;
    name: string;
    type: string;
    abbreviation: string;
  };
  birthStateProvince?: string;
};
