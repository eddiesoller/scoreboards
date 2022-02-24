function createScoreboard(id, periodType, periodNumber, clock, awayTeam, awayScore, homeTeam, homeScore) {
    const scoreboard = document.createElement('div');
    scoreboard.id = id;
    scoreboard.classList.add('containerSection', 'scoreboard');
    scoreboard.appendChild(createTime(periodType, periodNumber, clock));
    scoreboard.appendChild(createActionButton());
    scoreboard.appendChild(createScore(awayTeam, awayScore, homeTeam, homeScore));
    return scoreboard;
}

function createNbaScoreboard(game) {
    const awayTeam = game.vTeam;
    const homeTeam = game.hTeam;
    return createScoreboard(game.gameId, 'Q', game.period.current, game.clock, awayTeam.triCode, awayTeam.score, homeTeam.triCode, homeTeam.score);
}

function createNflScoreboard(game) {
    const competition = game.competitions[0];
    const status = competition.status;
    const competitors = competition.competitors;
    let awayTeam;
    let homeTeam;
    if (competitors[0].homeAway === 'away') {
        awayTeam = competitors[0];
        homeTeam = competitors[1];
    } else {
        awayTeam = competitors[1];
        homeTeam = competitors[0];
    }
    return createScoreboard(game.id, 'Q', status.period, pad(status.displayClock, 5), awayTeam.team.abbreviation, awayTeam.score, homeTeam.team.abbreviation, homeTeam.score);
}

function createNhlScoreboard(game) {
    const linescore = game.linescore;
    const awayTeam = linescore.teams.away;
    const homeTeam = linescore.teams.home;
    return createScoreboard(game.gamePk, 'P', linescore.currentPeriod, linescore.currentPeriodTimeRemaining, getNhlTeamAbbreviation(awayTeam.team.id), awayTeam.goals, getNhlTeamAbbreviation(homeTeam.team.id), homeTeam.goals);
}

function createTime(periodType, periodNumber, clock) {
    if (!clock || clock === 'Final' || clock === 'END') {
        clock = "00:00";
    }
    const time = document.createElement('div');
    time.classList.add('time', 'sectionCorner');
    time.textContent = periodType + periodNumber + ' ' + clock;
    return time;
}

function createActionButton() {
    const actionButton = document.createElement('div');
    actionButton.classList.add('actionButton', 'sectionCorner', 'button');
    actionButton.textContent = '+';
    actionButton.addEventListener('click', () => addToMyScores(actionButton));
    return actionButton;
}

function addToMyScores(actionButton) {
    const scoreboard = actionButton.parentElement;
    if (!document.getElementById(`${scoreboard.id}MyScoreboard`)) {
        const myScoreboard = scoreboard.cloneNode(true);
        myScoreboard.id += 'MyScoreboard';
        const myActionButton = myScoreboard.querySelector('.actionButton');
        myActionButton.textContent = '-';
        myActionButton.addEventListener('click', () => removeFromMyScores(myScoreboard));
        addToContainer(myScoresContainer, myScoreboard);
    }
    showContainer(myScoresContainer);
    adjustView(myScoresContainer);
}

function removeFromMyScores(myScoreboard) {
    myScoreboard.remove();
    myScoresContainer.count--;
    adjustView(myScoresContainer);
}

function createScore(awayTeam, awayScore, homeTeam, homeScore) {
    const score = document.createElement('div');
    score.classList.add('score', 'containerSectionMainContent');
    score.appendChild(createTeamScore(awayTeam, awayScore));
    score.appendChild(createAt());
    score.appendChild(createTeamScore(homeTeam, homeScore));
    return score;
}

function createTeamScore(team, score) {
    const span = document.createElement('span');
    span.classList.add('contentSpan', 'scoreSpan');
    span.textContent = team + ' ' + score;
    return span;
}

function createAt() {
    const span = document.createElement('span');
    span.classList.add('contentSpan', 'scoreSpan');
    span.textContent = "@";
    span.style.padding = '5px'
    return span;
}