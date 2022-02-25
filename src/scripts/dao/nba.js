function getNbaGames(date) {
    if (!date) {
        date = yyyyMmDd();
    }
    let games;
    const settings = {
        "url": `https://data.nba.net/prod/v2/${date}/scoreboard.json`,
        "method": "GET",
        "timeout": 0,
        "async": false,
    }
    $.ajax(settings).done((response) => games = response.games);
    return games;
}