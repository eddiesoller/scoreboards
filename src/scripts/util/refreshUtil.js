let lastRefresh = new Date();

function refreshScores() {
    const refreshTime = new Date();
    if (refreshTime - lastRefresh < 0) {
        return;
    }

    lastRefresh = refreshTime;
    refreshNhlScores();
}

function refreshNbaScores() {
    const games = getNbaGames();
    console.log(games);
}

function refreshNhlScores() {
    const games = getNhlGames();
    for (i = 0; i < games.length; i++) {
        const game = games[i];
        const id = game.gamePk;
        const scoreboard = document.getElementById(id);
        if (scoreboard) {
            console.log('update scoreboard');
        } else {
            console.log('insert scoreboard');
        }
        const myScoreboard = document.getElementById(id + 'MyScoreboard');
        if (myScoreboard) {
            console.log('update my scoreboard');
        }
    }
}