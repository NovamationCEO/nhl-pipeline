import axios from 'axios';
import { LiveGame } from '../types/LiveGame';
import { LiveGameResponse } from '../types/LiveGameResponse';
import { formatLiveGames } from '../utilities/formatLiveGames';

export async function queryLive(nhlId: number): Promise<LiveGame | undefined> {
  const apiUrl = `https://statsapi.web.nhl.com/api/v1/game/${nhlId}/feed/live`;

  try {
    const response = await axios.get(apiUrl);
    const data: LiveGameResponse = response?.data;

    if (!data) {
      throw new Error('No data found at ' + apiUrl);
    }

    return formatLiveGames(data);
  } catch (err) {
    console.error(err);
  }
}
