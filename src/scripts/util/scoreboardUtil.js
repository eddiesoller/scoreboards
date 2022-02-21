function createScoreboard(id, periodType, periodNumber, clock, awayTeam, awayScore, homeTeam, homeScore) {
    if (document.getElementById(id)) {
        return;
    }
    const scoreboard = document.createElement('div');
    scoreboard.id = id;
    scoreboard.classList.add('scoreboard');
    scoreboard.appendChild(createTime(periodType, periodNumber, clock));
    scoreboard.appendChild(createCloseButton(id));
    scoreboard.appendChild(createScore(awayTeam, awayScore, homeTeam, homeScore));
    count++;
    return scoreboard;
}

function createNbaScoreboard(game) {
    const awayTeam = game.vTeam;
    const homeTeam = game.hTeam;
    return createScoreboard(game.gameId, 'Q', game.period.current, game.clock, awayTeam.triCode, awayTeam.score, homeTeam.triCode, homeTeam.score);
}

function createNhlScoreboard(game) {
    const linescore = game.linescore;
    const awayTeam = linescore.teams.away;
    const homeTeam = linescore.teams.home;
    return createScoreboard(game.gamePk, 'P', linescore.currentPeriod, linescore.currentPeriodTimeRemaining, getNhlTeamAbbreviation(awayTeam.team.id), awayTeam.goals, getNhlTeamAbbreviation(homeTeam.team.id), homeTeam.goals);
}

function createTime(periodType, periodNumber, clock) {
    if (!clock) {
        clock = "00:00";
    }
    const time = document.createElement('div');
    time.classList.add('time', 'scoreboardCorner');
    time.textContent = periodType + periodNumber + ' ' + clock;
    return time;
}

function createCloseButton(parentId) {
    const closeButton = document.createElement('div');
    closeButton.classList.add('closeButton', 'scoreboardCorner', 'button');
    closeButton.textContent = 'X';
    closeButton.addEventListener('click', (foo) => {
        const scoreboard = document.getElementById(parentId);
        scoreboard.remove();
        count--;
        adjustView();
    })
    return closeButton;
}

function createScore(awayTeam, awayScore, homeTeam, homeScore) {
    const score = document.createElement('div');
    score.classList.add('score');
    score.appendChild(createTeamScore(awayTeam, awayScore));
    score.appendChild(createAt());
    score.appendChild(createTeamScore(homeTeam, homeScore));
    return score;
}

function createTeamScore(team, score) {
    const span = document.createElement('span');
    span.classList.add('scoreSpan');
    span.textContent = team + ' ' + score;
    return span;
}

function createAt() {
    const span = document.createElement('span');
    span.classList.add('scoreSpan');
    span.textContent = " @ ";
    return span;
}