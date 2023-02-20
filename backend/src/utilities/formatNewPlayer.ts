import { Player } from '../entities/player.entity';
import { PlayerResponseType } from '../types/PlayerResponseType';

export function formatNewPlayer(playerData: PlayerResponseType): Player {
  const pd = playerData.people[0];

  return {
    nhlId: pd.id,
    fullName: pd.fullName,
    primaryNumber: pd.primaryNumber,
    active: pd.active,
    currentTeam: pd.currentTeam.id,
    birthdate: new Date(pd.birthDate),
    position: pd.primaryPosition.name,
  };
}
