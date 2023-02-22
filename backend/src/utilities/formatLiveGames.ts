import { LiveGame } from 'src/types/LiveGame';
import { LivePlay } from 'src/types/LivePlay';
import { LiveGameResponse } from '../types/LiveGameResponse';

export function formatLiveGames(
  res: LiveGameResponse,
  newestEvent: number,
): LiveGame | undefined {
  const allPlays = res?.liveData?.plays?.allPlays;
  if (!allPlays || !allPlays.length) {
    return undefined;
  }
  const cherryPickedPlays = allPlays
    .filter((play) => play.about.eventId > newestEvent)
    .map((play) => {
      const roles = play.players?.map((player) => player.playerType) || [];

      const newPlay: LivePlay = {
        event: play.result.event,
        eventId: play.about.eventId,
        eventOrder: play.about.eventIdx,
        headline: play.result.description,
        assists: roles.filter((r) => r.toUpperCase() === 'ASSIST').length,
        hits: roles.filter((r) => r.toUpperCase() === 'HITTEE').length,
        goals: roles.filter((r) => r.toUpperCase() === 'SCORER').length,
        home: play.about.goals.home,
        away: play.about.goals.away,
        timestamp: new Date(play.about.dateTime),
        period: play.about.period,
        periodTime: play.about.periodTime,
        periodTimeRemaining: play.about.periodTimeRemaining,
      };

      const isInteresting =
        newPlay.periodTime === '00:00' ||
        newPlay.assists + newPlay.hits + newPlay.goals > 0;

      return isInteresting ? newPlay : undefined;
    });

  const formattedGame = {
    nhlId: res.gamePk,
    timeString: res.metaData.timeStamp,
    status: res.gameData.status.statusCode,
    plays: cherryPickedPlays.filter((i) => i),
    home: res.liveData.plays.currentPlay.about.goals.home,
    away: res.liveData.plays.currentPlay.about.goals.away,
  };

  return formattedGame;
}
