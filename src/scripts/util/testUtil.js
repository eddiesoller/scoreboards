function seedGames() {
    let games = getNbaGames(yyyyMmDd());
    if (!games || games.length === 0) {
        console.log('no games today');
        games = getNbaGames("20220215");
    }
    for (i = 0; i < games.length; i++) {
        const nbaScoreboard = createNbaScoreboard(games[i]);
        if (nbaScoreboard) {
            container.appendChild(nbaScoreboard);
        }
    }
    adjustView();
}

function createRandomScoreboard() {
    return createScoreboard(count, randomInt(1, 4), pad(randomInt(0, 12), 2) + ':' + pad(randomInt(0, 59), 2), randomTeam(), randomInt(10, 99), randomTeam(), randomInt(10, 99));
}

function randomTeam() {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 3).toUpperCase();
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}