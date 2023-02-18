# nhl-pipeline
Coding sample

I should probably move to-dos here and away from Trello, to provide some transparency.

# CURRENTLY

- Today's games initialize at midnight, and also again at noon just in case something has been added.
    - Does that ever happen in the real world?  Probably not.

- Today's games initialize when the server starts.
    - If this were always running, that wouldn't be an issue; but, this is very much a locally-running sample.

# TO DO

- Create list of matches to query more specifically.  How to store in memory?  Is DB too clunky?

- Curate that list of matches; close when appropriate.

- Create APIs with 'pretty' output to meet requirements.

- Save player age as birthdate, calculate on fly when needed.

- Consider adding historical data if the database is empty enough to be boring.

- README setup instructions.
    - Can setting up database be automated in a reasonable amount of time?

- Game.  Add 'assists,' 'hits,' and 'penalty minutes.'

- Testing.  I haven't wanted to test just database functioning, but it's starting to get into 'real' logic.

- 'Live' status.  What does that mean?
    - It does say 'query the db' during a live game, suggesting polling is enough.  Consider.
    - It also says 'first process should continually watch for game status changes.'

- Any danger of wrapping around midnight, given that all games are in GMT, but occur in various timezones?
    - Can likely be solved by list of matches.

- Tie tables together with foreign keys.  Make sure they're populated in the right order, still.

- Players are not populated.  Under what conditions will that information be wanted?

# HOCKEY GENERAL INFORMATION

- Player numbers are consistent, always.
- Player positions are consistent -- unless there's a team shake-up.  We might just have to ignore this to keep in scope.
- There's no statistical difference between goals and points.  One could argue that a 'goal' is an event, while a 'point' is a fact.

