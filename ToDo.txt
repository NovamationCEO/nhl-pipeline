# nhl-pipeline
Coding sample To-Dos

I should probably move to-dos here and away from Trello, to provide some transparency.

# CURRENTLY

- Today's games initialize at startup and on the hour.
    - There doesn't seem to be a risk of rate limiting, and it's better not to risk a delay or timezone issue leaving 12 hours of non-coverage.

# TO DO

- Testing.
    - Well, I fell face-first into the trap. Mocking a bunch of third-party API calls is time-consuming, and I've used up my time.

# HOCKEY GENERAL INFORMATION

- Player numbers are consistent, always.
- Player positions are consistent -- unless there's a team shake-up.  We might just have to ignore this to keep in scope.
- There's no statistical difference between goals and points.  One could argue that a 'goal' is an event, while a 'point' is a fact.

# STORAGE

- Consider adding historical data if the database is empty enough to be boring.
    - Considered, likely rejected due to time.

- Add GameEvent for 'penalty minutes,' whatever those are and wherever those come from.

- Once schema settles down, tie tables together with foreign keys.  Make sure they're populated in the right order, still.
    - This probably falls out of must-do scope.  

