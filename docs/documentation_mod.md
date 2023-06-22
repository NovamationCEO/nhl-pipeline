# NHL API Docs

Below you will find complete documentation to a public NHL API. You will not need the majority of these endpoints, they are provided for completeness. 

[Teams](#teams)

[People](#people)

[Game](#game)

[Game-IDs](#game-ids)

[Game Status](#game-status)

[Play Types](#play-types)

[Schedule](#schedule)

[Venues](#venues)


---

### <a name="teams"></a>Teams

`GET https://statsapi.web.nhl.com/api/v1/teams` Returns a list of data about
all teams including their id, venue details, division, conference and franchise information.

`GET https://statsapi.web.nhl.com/api/v1/teams/ID` Returns the same information as above just
for a single team instead of the entire league.

#### Modifiers
`?expand=team.roster` Shows roster of active players for the specified team 

`?expand=person.names` Same as above, but gives less info.

`?expand=team.schedule.next` Returns details of the upcoming game for a team

`?expand=team.schedule.previous` Same as above but for the last game played

`?expand=team.stats` Returns the teams stats for the season

`?expand=team.roster&season=20142015` Adding the season identifier shows the roster for that season

`?teamId=4,5,29` Can string team id together to get multiple teams

`?stats=statsSingleSeasonPlayoffs` Specify which stats to get. Not fully sure all of the values

```
{
  "copyright" : "NHL and the NHL Shield are registered trademarks of the National Hockey League. NHL and NHL team marks are the property of the NHL and its teams. © NHL 2018. All Rights Reserved.",
  "teams" : [ {
    "id" : 1,
    "name" : "New Jersey Devils",
    "link" : "/api/v1/teams/1",
    "venue" : {
      "name" : "Prudential Center",
      "link" : "/api/v1/venues/null",
      "city" : "Newark",
      "timeZone" : {
        "id" : "America/New_York",
        "offset" : -5,
        "tz" : "EST"
      }
    },
    "abbreviation" : "NJD",
    "teamName" : "Devils",
    "locationName" : "New Jersey",
    "firstYearOfPlay" : "1982",
    "division" : {
      "id" : 18,
      "name" : "Metropolitan",
      "link" : "/api/v1/divisions/18"
    },
    "conference" : {
      "id" : 6,
      "name" : "Eastern",
      "link" : "/api/v1/conferences/6"
    },
    "franchise" : {
      "franchiseId" : 23,
      "teamName" : "Devils",
      "link" : "/api/v1/franchises/23"
    },
    "shortName" : "New Jersey",
    "officialSiteUrl" : "http://www.truesince82.com",
    "franchiseId" : 23,
    "active" : true
  }, {
```

`GET https://statsapi.web.nhl.com/api/v1/teams/ID/roster` Returns entire roster for a team
including id value, name, jersey number and position details.

```
{
  "copyright" : "NHL and the NHL Shield are registered trademarks of the National Hockey League. NHL and NHL team marks are the property of the NHL and its teams. © NHL 2018. All Rights Reserved.",
  "roster" : [ {
    "person" : {
      "id" : 8477474,
      "fullName" : "Madison Bowey",
      "link" : "/api/v1/people/8477474"
    },
    "jerseyNumber" : "22",
    "position" : {
      "code" : "D",
      "name" : "Defenseman",
      "type" : "Defenseman",
      "abbreviation" : "D"
    }
  },
```

---

### <a name="people"></a>People
`GET https://statsapi.web.nhl.com/api/v1/people/ID` Gets details for a player, must
specify the id value in order to return data.
```
{
  "copyright" : "NHL and the NHL Shield are registered trademarks of the National Hockey League. NHL and NHL team marks are the property of the NHL and its teams. © NHL 2020. All Rights Reserved.",
  "people" : [ {
    "id" : 8476792,
    "fullName" : "Torey Krug",
    "link" : "/api/v1/people/8476792",
    "firstName" : "Torey",
    "lastName" : "Krug",
    "primaryNumber" : "47",
    "birthDate" : "1991-04-12",
    "currentAge" : 28,
    "birthCity" : "Livonia",
    "birthStateProvince" : "MI",
    "birthCountry" : "USA",
    "nationality" : "USA",
    "height" : "5' 9\"",
    "weight" : 186,
    "active" : true,
    "alternateCaptain" : false,
    "captain" : false,
    "rookie" : false,
    "shootsCatches" : "L",
    "rosterStatus" : "Y",
    "currentTeam" : {
      "id" : 6,
      "name" : "Boston Bruins",
      "link" : "/api/v1/teams/6"
    },
    "primaryPosition" : {
      "code" : "D",
      "name" : "Defenseman",
      "type" : "Defenseman",
      "abbreviation" : "D"
    }
  } ]
}

```
`GET https://statsapi.web.nhl.com/api/v1/people/ID/stats` Complex endpoint with
lots of append options to change what kind of stats you wish to obtain

`GET https://statsapi.web.nhl.com/api/v1/positions` Simple endpoint that 
obtains an array of eligible positions in the NHL


---

### <a name="game"></a>Game
`GET https://statsapi.web.nhl.com/api/v1/game/ID/feed/live` Returns all data about
a specified game id including play data with on-ice coordinates and post-game
details like first, second and third stars and any details about shootouts.  The
data returned is simply too large at often over 30k lines and is best explored
with a JSON viewer.

`GET https://statsapi.web.nhl.com/api/v1/game/ID/boxscore` Returns far less detail
than `feed/live` and is much more suitable for post-game details including goals,
shots, PIMs, blocked, takeaways, giveaways and hits.

`GET https://statsapi.web.nhl.com/api/v1/game/ID/linescore` Even fewer details than
boxscore. Has goals, shots on goal, powerplay and goalie pulled status, number of 
skaters and shootout information if applicable

`GET https://statsapi.web.nhl.com/api/v1/game/ID/feed/live/diffPatch?startTimecode=yyyymmdd_hhmmss`
Returns updates (like new play events, updated stats for boxscore, etc.) for the specified game ID
since the given startTimecode. If the startTimecode param is missing, returns an empty array.

---

#### <a name="game-ids">Game IDs
The first 4 digits identify the season of the game (ie. 2017 for the 2017-2018 season). The next 2 digits give the type of game, where 01 = preseason, 02 = regular season, 03 = playoffs, 04 = all-star. The final 4 digits identify the specific game number. For regular season and preseason games, this ranges from 0001 to the number of games played. (1271 for seasons with 31 teams (2017 and onwards) and 1230 for seasons with 30 teams). For playoff games, the 2nd digit of the specific number gives the round of the playoffs, the 3rd digit specifies the matchup, and the 4th digit specifies the game (out of 7).


#### <a name="game-status">Game Status

`GET https://statsapi.web.nhl.com/api/v1/gameStatus`

Returns a list of game status values

#### <a name="play-types">Play Types

`GET https://statsapi.web.nhl.com/api/v1/playTypes`

This shows all the possible play types found within the liveData/plays portion of the game feed

---

### <a name="schedule">Schedule

`GET https://statsapi.web.nhl.com/api/v1/schedule` Returns a list of data about the schedule for a specified date range. If no date range is specified, returns results from the current day.

#### Notes

Without any flags or modifiers this endpoint will NOT return pre-season games that occur on the current day. In order for pre-season games to show up the date must be specified as show below in the Modifiers section

#### Modifiers
`?expand=schedule.broadcasts` Shows the broadcasts of the game

`?expand=schedule.linescore` Linescore for completed games

`?expand=schedule.ticket` Provides the different places to buy tickets for the upcoming games

`?teamId=30,17` Limit results to a specific team(s). Team ids can be found through the teams endpoint

`?date=2018-01-09` Single defined date for the search

`?startDate=2018-01-09` Start date for the search

`?endDate=2018-01-12` End date for the search

`?season=20172018` Returns all games from specified season

`?gameType=R` Restricts results to only regular season games. Can be set to any value from [Game Types](#game-types) endpoint

`GET https://statsapi.web.nhl.com/api/v1/schedule?teamId=30` Returns Minnesota Wild games for the current day.

```
{
  "copyright" : "NHL and the NHL Shield are registered trademarks of the National Hockey League. NHL and NHL team marks are the property of the NHL and its teams. © NHL 2018. All Rights Reserved.",
  "totalItems" : 1,
  "totalEvents" : 0,
  "totalGames" : 1,
  "totalMatches" : 0,
  "wait" : 10,
  "dates" : [ {
    "date" : "2018-01-09",
    "totalItems" : 1,
    "totalEvents" : 0,
    "totalGames" : 1,
    "totalMatches" : 0,
    "games" : [ {
      "gamePk" : 2017020659,
      "link" : "/api/v1/game/2017020659/feed/live",
      "gameType" : "R",
      "season" : "20172018",
      "gameDate" : "2018-01-10T01:00:00Z",
      "status" : {
        "abstractGameState" : "Preview",
        "codedGameState" : "1",
        "detailedState" : "Scheduled",
        "statusCode" : "1",
        "startTimeTBD" : false
      },
      "teams" : {
        "away" : {
          "leagueRecord" : {
            "wins" : 21,
            "losses" : 16,
            "ot" : 4,
            "type" : "league"
          },
          "score" : 0,
          "team" : {
            "id" : 20,
            "name" : "Calgary Flames",
            "link" : "/api/v1/teams/20"
          }
        },
        "home" : {
          "leagueRecord" : {
            "wins" : 22,
            "losses" : 17,
            "ot" : 3,
            "type" : "league"
          },
          "score" : 0,
          "team" : {
            "id" : 30,
            "name" : "Minnesota Wild",
            "link" : "/api/v1/teams/30"
          }
        }
      },
      "venue" : {
        "name" : "Xcel Energy Center",
        "link" : "/api/v1/venues/null"
      },
      "content" : {
        "link" : "/api/v1/game/2017020659/content"
      }
    } ],
    "events" : [ ],
    "matches" : [ ]
  } ]
}
```

---

### <a name="venues">Venues

`GET https://statsapi.web.nhl.com/api/v1/venues` Get all NHL Venues in API database.

`GET https://statsapi.web.nhl.com/api/v1/venues/ID` Get an NHL Venue.

```json
{
  "copyright" : "NHL and the NHL Shield are registered trademarks of the National Hockey League. NHL and NHL team marks are the property of the NHL and its teams. © NHL 2019. All Rights Reserved.",
  "venues" : [ {
    "id" : 5064,
    "name" : "Pepsi Center",
    "link" : "/api/v1/venues/5064",
    "appEnabled" : true
  } ]
}
```
