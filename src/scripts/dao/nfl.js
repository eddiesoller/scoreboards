function getNflGames(date) {
    let games;
    let url = "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard";
    if (date) {
        url += '?dates=' + date;
    }
    const settings = {
        "url": url,
        "method": "GET",
        "timeout": 0,
        "async": false,
    }
    $.ajax(settings).done((response) => games = response.events);
    return games;
}