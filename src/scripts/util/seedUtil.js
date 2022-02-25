function seedLeagues(container) {
    addToContainer(container, createMyScores());
    addToContainer(container, createNbaHomeSection());
    addToContainer(container, createNflHomeSection());
    addToContainer(container, createNhlHomeSection());
}

function seedNbaGames(container) {
    let games = getNbaGames();
    for (i = 0; i < games.length; i++) {
        const nbaScoreboard = createNbaScoreboard(games[i]);
        if (nbaScoreboard) {
            addToContainer(container, nbaScoreboard);
        }
    }
}

function seedNflGames(container) {
    let games = getNflGames();
    for (i = 0; i < games.length; i++) {
        const nflScoreboard = createNflScoreboard(games[i]);
        if (nflScoreboard) {
            addToContainer(container, nflScoreboard);
        }
    }
}

function seedNhlGames(container) {
    let games = getNhlGames();
    for (i = 0; i < games.length; i++) {
        const nhlScoreboard = createNhlScoreboard(games[i]);
        if (nhlScoreboard) {
            addToContainer(container, nhlScoreboard);
        }
    }
}