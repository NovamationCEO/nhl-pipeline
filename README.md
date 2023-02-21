# nhl-pipeline
Coding sample

I should probably move to-dos here and away from Trello, to provide some transparency.

# CURRENTLY

- Today's games initialize at startup and on the hour.
    - There doesn't seem to be a risk of rate limiting, and it's better not to risk a delay or timezone issue leaving 12 hours of non-coverage.

# TO DO

- Query against ActiveGames

- Curate that list of games; close when appropriate.

- Consider adding historical data if the database is empty enough to be boring.

- README setup instructions.
    - Can setting up database be automated in a reasonable amount of time?

- Add GameEvent for 'assists,' 'hits,' and 'penalty minutes.'
    - Seems like it must come from being live.
    
- Testing.  I haven't wanted to test just database functioning, but it's starting to get into 'real' logic.

- Once schema settles down, tie tables together with foreign keys.  Make sure they're populated in the right order, still.

- Create APIs with 'pretty' output to meet requirements.


# HOCKEY GENERAL INFORMATION

- Player numbers are consistent, always.
- Player positions are consistent -- unless there's a team shake-up.  We might just have to ignore this to keep in scope.
- There's no statistical difference between goals and points.  One could argue that a 'goal' is an event, while a 'point' is a fact.

