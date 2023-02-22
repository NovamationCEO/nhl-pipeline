import { GameEvent } from '../entities/gameEvent.entity';

export type LiveGame = {
  nhlId: number;
  timeString: string;
  status: string;
  plays: GameEvent[];
  home: number;
  away: number;
};
