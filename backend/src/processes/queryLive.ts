import axios from 'axios';
import { formatLiveGames } from '../utilities/formatLiveGames';

export async function queryLive(nhlId: number, lastUpdate: string) {
  const apiUrl = `https://statsapi.web.nhl.com/api/v1/game/${nhlId}/feed/live/diffPatch?startTimecode=${lastUpdate}`;

  try {
    const response = await axios.get(apiUrl);
    const data = response?.data;

    if (!data) {
      throw new Error('No data found at ' + apiUrl);
    }

    return formatLiveGames(data);
  } catch (err) {
    console.error(err);
  }
}
