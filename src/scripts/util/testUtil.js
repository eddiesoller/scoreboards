function seedGames() {
    seedNbaGames();
    seedNflGames();
    seedNhlGames();
    adjustView(homeContainer);
}

function seedNbaGames() {
    let games = getNbaGames(yyyyMmDd());
    if (!games || games.length === 0) {
        console.log('no nba games today');
        games = getNbaGames("20220215");
    }
    for (i = 0; i < games.length; i++) {
        const nbaScoreboard = createNbaScoreboard(games[i]);
        if (nbaScoreboard) {
            addToContainer(homeContainer, nbaScoreboard);
        }
    }
}

function seedNflGames() {
    let games = getNflGames();
    if (!games || games.length === 0) {
        console.log('no nfl games today');
        games = getNflGames('20220102');
    }
    for (i = 0; i < games.length; i++) {
        const nflScoreboard = createNflScoreboard(games[i]);
        if (nflScoreboard) {
            addToContainer(homeContainer, nflScoreboard);
        }
    }
}

function seedNhlGames() {
    let games = getNhlGames();
    if (!games || games.length === 0) {
        console.log('no nhl games today');
        games = getNhlGames('2022-02-21');
    }
    for (i = 0; i < games.length; i++) {
        const nhlScoreboard = createNhlScoreboard(games[i]);
        if (nhlScoreboard) {
            addToContainer(homeContainer, nhlScoreboard);
        }
    }
}

function createRandomScoreboard() {
    return createScoreboard(homeContainer.count, 'Q', randomInt(1, 4), pad(randomInt(0, 12), 2) + ':' + pad(randomInt(0, 59), 2), randomTeam(), randomInt(10, 99), randomTeam(), randomInt(10, 99));
}

function randomTeam() {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 3).toUpperCase();
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}