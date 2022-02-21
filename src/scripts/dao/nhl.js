const TEAMS = {};

function getNhlGames(date) {
    let games;
    let url = "https://statsapi.web.nhl.com/api/v1/schedule?expand=schedule.linescore";
    if (date) {
        url += '&date=' + date;
    }
    const settings = {
        "url": url,
        "method": "GET",
        "timeout": 0,
        "async": false,
    }
    $.ajax(settings).done((response) => games = response.dates[0].games);
    return games;
}

function getNhlTeamAbbreviation(id) {
    return TEAMS[id];
}

function getNhlTeams() {
    let teams;
    const settings = {
        "url": 'https://statsapi.web.nhl.com//api/v1/teams/',
        "method": "GET",
        "timeout": 0,
        "async": false,
    }
    $.ajax(settings).done((response) => teams = response.teams);
    return teams;
}

function loadNhlTeams() {
    const teams = getNhlTeams();
    for (i = 0; i < teams.length; i++) {
        TEAMS[teams[i].id] = teams[i].abbreviation;
    }
}

loadNhlTeams();