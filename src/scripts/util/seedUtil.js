function seedLeagues(container) {
    addToContainer(container, createHomeLeague());
    addToContainer(container, createNbaLeague());
    addToContainer(container, createNflLeague());
    addToContainer(container, createNhlLeague());
}

function seedNbaGames(container) {
    let games = getNbaGames(yyyyMmDd());
    if (!games || games.length === 0) {
        console.log('no nba games today, getting from 20220215');
        games = getNbaGames("20220215");
    }
    for (i = 0; i < games.length; i++) {
        const nbaScoreboard = createNbaScoreboard(games[i]);
        if (nbaScoreboard) {
            addToContainer(container, nbaScoreboard);
        }
    }
}

function seedNflGames(container) {
    let games = getNflGames();
    if (!games || games.length === 0) {
        console.log('no nfl games today, getting from 20220102');
        games = getNflGames('20220102');
    }
    for (i = 0; i < games.length; i++) {
        const nflScoreboard = createNflScoreboard(games[i]);
        if (nflScoreboard) {
            addToContainer(container, nflScoreboard);
        }
    }
}

function seedNhlGames(container) {
    let games = getNhlGames();
    if (!games || games.length === 0) {
        console.log('no nhl games today, getting from 2022-02-21');
        games = getNhlGames('2022-02-21');
    }
    for (i = 0; i < games.length; i++) {
        const nhlScoreboard = createNhlScoreboard(games[i]);
        if (nhlScoreboard) {
            addToContainer(container, nhlScoreboard);
        }
    }
}