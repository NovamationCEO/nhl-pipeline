## NHL Pipeline Project

This project fills a database with NHL-information, which then can be queried via API.  

Like every project, it is done because it is due, not because it is perfect.  There were only so many hours in the day, and corners were definitely cut.  Hopefully, what exists at least suffices to be "not horrifying."

Running this is a 3-step process:
- Set up MySQL
- Start the server
- Query the API

## Setting Up MySQL

- Install MySQL Community Server for your OS, if you don't have it already.
- Add MySQL to PATH.  This will look something like: 
    - `export PATH=$PATH:/usr/local/mysql-8.0.32-macos13-x86_64/bin`
- Enter MySQL
    - For MacOS, that's `sudo mysql -u root -p`
- Create the necessary user with appropriate permissions.
    - `CREATE USER 'pipeline_app'@'localhost' IDENTIFIED BY 'Keep Your Stick"`
    - `GRANT CREATE, ALTER, DROP, INSERT, UPDATE, DELETE, SELECT, REFERENCES, RELOAD, INDEX on *.* TO 'pipeline_app'@'localhost' WITH GRANT OPTION;`
    - `FLUSH PRIVILEGES;`
- Create the database
    - `CREATE DATABASE nhl_db;`

## Start the Server
- I assume you've cloned the repository to somewhere you can find.  Enter the 'backend' directory.
    - `cd (whatever)/backend`
- Start the server.  This will take a longer the first time, but be pretty snappy after that.
    - `yarn start`

## Query the API

There are a number of APIs, but those under public.controller.ts are the 'friendliest,' because they hide uninteresting information from the end user.  Of particular note:

- http://localhost:3000/nhl/games/today
    - A summary of all games occuring 'today,' according to the NHL, although that concept is a little loosely defined once you start hitting midnight GMT.
- http://localhost:3000/nhl/games/date/:date
    - A summary of all games occuring at the given date, again according to the NHL's reckoning.  This is querying the local database, remember, so it's unlikely to come up with any hits until the server's been running for a day.  But the error message isn't the worst.
    - :date must be formatted YYYY-MM-DD
- https://localhost:3000/nhl/game/:id
    - You can get the IDs from either of the two queries above, or from the NHL directly.
- http://localhost:3000/team/:id
    - Team information, :id is also available from the above queries.
- http://localhost:3000/team/:id/roster
    - Full information for every player on a given team.  Significantly larger payload.
- http://localhost:3000/game/:id/events
    - This is the big one.  A play-by-play of everything of interest (as determined by someone who's never watched a hockey game) in the entire game.

There are other APIs available, less prettily-formatted.  Search for *.controller.ts to discover more.

## Critical Shortcomings

I didn't quite meet all the requirements in the time alloted.

- Penalty Minutes
    - These are not reported anywhere.  I couldn't figure out what they were, and didn't notice them in any of the NHL feeds.

- Tests
    - I swore I wouldn't be that guy, but ugh.  So many of the NHL payloads are large and complicated that I put off testing until I could make a TestFactory, instead of manually making up data.  Now it's 11:00 on Tuesday.  I am THAT GUY.  And I am embarassed.

## Shortcomings

I could pretty happily work on this another few days, but what's done is what's done.

- Cleanup
    - Eslint defaulted to 'pretty permissive,' and there are some unused imports here and there.
    - Everything feels really easy (to, uh, me) to see how it connects, until you get to streamGame, updateStreamedEvents, and queryLive.  I'd have liked to rearrange those a little, and come up with some clearer names - they seemed to drift a little in their purpose as they were built.
    - It probably would have been nice to back-populate the database a little when it is first intialized, so there's more to look at.  C'est la vie.
    - There's still a thing or two that gets saved that wasn't used in processing, nor was interesting enough to include in /nhl.  Those could be removed.
- Querying
    - There's no doubt a better balance that could be struck between information freshness and request overload.  Active games now query every ten seconds, and the Observable logic could probably be tightened.
- NewestEvent
    - Calls to the NHL for events seem like they can't be reasonably limited to fresh events.  The API they offer is more Patching logic than anything pleasant.  NewestEvent was supposed to provide early filtering server-side, before hitting the database, but it doesn't seem to work properly at the moment.  As a result, it's just vestigial.
- Tests
    - Seriously; kicking myself.  And 11:30 PM.  A clearly-marked and obvious time trap that I nonetheless explored with my face.
- Data drift
    - Some data doesn't really age out, so information on Teams and Players might drift over time.  The server thinks it knows everything it needs already, and double-checking values regularly would slow things down immensely.  I'm sure I could figure out a time early in the morning where it wouldn't be noticeable, but this whole program might only be running for 30 real minutes, ever.
- Errors
    - Some errors are handled, and most risky processes are wrapped in try/catch blocks.  But not all.  Some just kick out to the console and continue blithely along.  For this to be anything other than a sample, that'd need to be ironed out a ton.
- Database Schemas
    - I was changing schemas pretty regularly, so I put off designating foreign keys and such to allow changes without royaly screwing things up each time.  Now the time is up.
- Oops
    - Player ages are calculated, not stored, since birthdates are static facts and I didn't want Player data changing (and changing retroactively).  It should calculate the age based on the timestamp of the gameEvent, but it does it based on this instant, so I get my retroactive changes anyways.  Oops.

## What's Going On

The database refreshes its understanding of today's games on initialization and every hour afterwards.  Any games it doesn't know about are added to `games` and `active_games`.  Any teams it doesn't know about are looked up, and their players are added to the database.

After initialization is complete, `active_games` is checked every 5 minutes.  Any games that are about to start (or had their start time missed) get their own Observable that runs every 10 seconds until the game is complete, at which point it shuts down.  Any games that are complete are deleted from `active_games` and are not checked again.

APIs allow access to various parts of the database, and /nhl provides data that's been cleaned up to be interesting - team names instead of teamIds, for example.

The database is split up more than probably is necessary for the stated goals, but if this project were to continue growing, that opens the door to doing more interesting things with the data.  It also keeps the sources of truth to a minimum.  Team names are stored once, player birthdates are stored once, etcetera.

## Author

- Author - [Chris Young](novamation@gmail.com)

## License

Nest is [MIT licensed](LICENSE).
