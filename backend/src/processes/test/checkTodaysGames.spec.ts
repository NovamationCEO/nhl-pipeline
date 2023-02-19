import { Game } from '../../entities/game.entity';
import { GameService } from '../../services/game.service';
import { checkTodaysGames } from '../checkTodaysGames';
import { gamesInput } from './gamesInput';

jest.mock('../../services/game.service');

function addIds(games: Game[]): Game[] {
  let id = 3000;
  const response = JSON.parse(JSON.stringify(games));
  response.forEach((game) => {
    game.id = id;
    id++;
  });
  return response;
}

describe('checkTodaysGames', () => {
  let gameService: GameService;
  let mockConsole;
  let mockCreate;
  let mockUpdate;

  beforeEach(async () => {
    gameService = new GameService(null);
    mockConsole = jest.spyOn(console, 'info').mockImplementation();
    mockCreate = jest.spyOn(gameService, 'create').mockResolvedValue(undefined);
    mockUpdate = jest.spyOn(gameService, 'update').mockResolvedValue({
      raw: undefined,
      generatedMaps: undefined,
      affected: 1,
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should create new games when none exist', async () => {
    jest.spyOn(gameService, 'findByNhlIds').mockResolvedValue([]);

    await checkTodaysGames(gamesInput, gameService);
    expect(mockCreate).toHaveBeenCalledTimes(7);
    expect(mockConsole).toHaveBeenCalledTimes(14);
    expect(mockUpdate).toHaveBeenCalledTimes(0);
  });

  it('should create new games when some exist', async () => {
    const dbOutput = addIds([gamesInput[1], gamesInput[2], gamesInput[6]]);
    jest.spyOn(gameService, 'findByNhlIds').mockResolvedValue(dbOutput);

    await checkTodaysGames(gamesInput, gameService);
    expect(mockCreate).toHaveBeenCalledTimes(4);
    expect(mockConsole).toHaveBeenCalledTimes(8);
    expect(mockUpdate).toHaveBeenCalledTimes(0);
  });

  it('should not create any games', async () => {
    const dbOutput = addIds(gamesInput);
    jest.spyOn(gameService, 'findByNhlIds').mockResolvedValue(dbOutput);

    await checkTodaysGames(gamesInput, gameService);
    expect(mockCreate).toHaveBeenCalledTimes(0);
    expect(mockUpdate).toHaveBeenCalledTimes(0);
    expect(mockConsole).toHaveBeenCalledTimes(0);
  });

  it('should update three games', async () => {
    const dbOutput = addIds(gamesInput);
    dbOutput[0].status = dbOutput[0].status + 1;
    dbOutput[4].homeScore = dbOutput[4].homeScore + 2;
    dbOutput[5].awayScore = dbOutput[5].awayScore + 3;
    dbOutput[6].homeTeam = dbOutput[6].homeTeam + 2; //  Meaningless, should not trigger anything.

    jest.spyOn(gameService, 'findByNhlIds').mockResolvedValue(dbOutput);

    await checkTodaysGames(gamesInput, gameService);
    expect(mockCreate).toHaveBeenCalledTimes(0);
    expect(mockUpdate).toHaveBeenCalledTimes(3);
    expect(mockConsole).toHaveBeenCalledTimes(3);
  });
});
