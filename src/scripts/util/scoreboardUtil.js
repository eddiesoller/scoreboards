function createScoreboard(id, started, ended, startTime, periodType, periodNumber, clock, awayTeam, awayScore, homeTeam, homeScore) {
    const scoreboard = document.createElement('div');
    scoreboard.id = id;
    scoreboard.classList.add('containerSection', 'scoreboard');
    scoreboard.appendChild(createTime(started, ended, startTime, periodType, periodNumber, clock));
    scoreboard.appendChild(createActionButton());
    scoreboard.appendChild(createScore(started, awayTeam, awayScore, homeTeam, homeScore));
    return scoreboard;
}

function createNbaScoreboard(game) {
    const started = game.period.current !== 0;
    const ended = true && game.endTimeUTC;
    const awayTeam = game.vTeam;
    const homeTeam = game.hTeam;
    return createScoreboard(game.gameId, started, ended, game.startTimeUTC, 'Q', game.period.current, game.clock, awayTeam.triCode, awayTeam.score, homeTeam.triCode, homeTeam.score);
}

function createNflScoreboard(game) {
    const competition = game.competitions[0];
    const status = competition.status;
    const started = true; // TODO
    const ended = status.type.completed;
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
    return createScoreboard(game.id, started, ended, competition.startDate, 'Q', status.period, pad(status.displayClock, 5), awayTeam.team.abbreviation, awayTeam.score, homeTeam.team.abbreviation, homeTeam.score);
}

function createNhlScoreboard(game) {
    const started = game.status.statusCode !== '1';
    const ended = game.status.statusCode === '7';
    const linescore = game.linescore;
    const awayTeam = linescore.teams.away;
    const homeTeam = linescore.teams.home;
    return createScoreboard(game.gamePk, started, ended, game.gameDate, 'P', linescore.currentPeriod, linescore.currentPeriodTimeRemaining, getNhlTeamAbbreviation(awayTeam.team.id), awayTeam.goals, getNhlTeamAbbreviation(homeTeam.team.id), homeTeam.goals);
}

function createTime(started, ended, startTime, periodType, periodNumber, clock) {
    const time = document.createElement('div');
    time.classList.add('time', 'sectionCorner');

    if (!started) {
        const localStartTime = new Date(startTime);
        time.textContent = localStartTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (ended) {
        time.textContent = 'Final';
    } else {
        time.textContent = periodType + periodNumber + ' ' + clock;
    }

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

function createScore(started, awayTeam, awayScore, homeTeam, homeScore) {
    const score = document.createElement('div');
    score.classList.add('score', 'containerSectionMainContent');
    score.appendChild(createTeamScore(started, awayTeam, awayScore));
    score.appendChild(createAt());
    score.appendChild(createTeamScore(started, homeTeam, homeScore));
    return score;
}

function createTeamScore(started, team, score) {
    const span = document.createElement('span');
    span.classList.add('contentSpan', 'scoreSpan');
    span.textContent = team;
    if (started) {
        span.textContent += ' ' + score;
    }
    return span;
}

function createAt() {
    const span = document.createElement('span');
    span.classList.add('contentSpan', 'scoreSpan');
    span.textContent = "@";
    span.style.padding = '5px'
    return span;
}