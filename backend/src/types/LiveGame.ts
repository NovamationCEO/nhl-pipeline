import { LivePlay } from './LivePlay';

export type LiveGame = {
  nhlId: string;
  timeString: string;
  status: string;
  plays: LivePlay[];
  home: number;
  away: number;
};
