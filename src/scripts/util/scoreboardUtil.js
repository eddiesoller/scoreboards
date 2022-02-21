function createScoreboard(id, period, clock, awayTeam, awayScore, homeTeam, homeScore) {
    if (document.getElementById(id)) {
        return;
    }
    const scoreboard = document.createElement('div');
    scoreboard.id = id;
    scoreboard.classList.add('scoreboard');
    scoreboard.appendChild(createTime(period, clock));
    scoreboard.appendChild(createCloseButton(id));
    scoreboard.appendChild(createScore(awayTeam, awayScore, homeTeam, homeScore));
    count++;
    return scoreboard;
}

function createNbaScoreboard(game) {
    return createScoreboard(game.gameId, game.period.current, game.clock, game.vTeam.triCode, game.vTeam.score, game.hTeam.triCode, game.hTeam.score);
}

function createTime(period, clock) {
    if (!clock) {
        clock = "00:00";
    }
    const time = document.createElement('div');
    time.classList.add('time', 'scoreboardCorner');
    time.textContent = 'Q' + period + ' ' + clock;
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