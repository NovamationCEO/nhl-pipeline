import { LivePlay } from './LivePlay';

export type LiveGame = {
  nhlId: number;
  timeString: string;
  status: string;
  plays: LivePlay[];
  home: number;
  away: number;
};
