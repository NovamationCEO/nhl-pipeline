import { LiveDataResponse } from './LiveDataResponse';

export type LiveGameResponse = {
  gamePk: string;
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
    pk: string;
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
    id: string;
    name: string;
    link: string;
  };
};

type TeamData = {
  id: string;
  name: string;
  link: string;
  venue: {
    id: string;
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
    id: string;
    name: string;
    nameShort: string;
    link: string;
    abbreviation: string;
  };
  conference: {
    id: string;
    name: string;
    link: string;
  };
  franchise: { franchiseid: string; teamName: string; link: string };
  shortName: string;
  officialSiteUrl: string;
  franchiseid: string;
  active: boolean;
};

type PlayerData = {
  id: string;
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
  currentTeam: { id: string; name: string; link: string; triCode: string };
  primaryPosition: {
    code: string;
    name: string;
    type: string;
    abbreviation: string;
  };
  birthStateProvince?: string;
};
