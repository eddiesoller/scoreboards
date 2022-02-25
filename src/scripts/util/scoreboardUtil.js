function createScoreboard(id, started, ended, startTime, periodType, periodNumber, clock, awayTeam, awayScore, homeTeam, homeScore) {
    const scoreboard = document.createElement('div');
    scoreboard.id = id;
    scoreboard.classList.add('containerSection', 'scoreboard');
    scoreboard.appendChild(createTime(started, ended, startTime, periodType, periodNumber, clock));
    scoreboard.appendChild(createActionButton());
    scoreboard.appendChild(createScore(started, ended, awayTeam, awayScore, homeTeam, homeScore));
    return scoreboard;
}

function createNbaScoreboard(game) {
    const clock = game.clock;
    const started = game.period.current !== 0 && clock;
    const ended = true && game.endTimeUTC;
    const awayTeam = game.vTeam;
    const homeTeam = game.hTeam;
    const scoreboard = createScoreboard(game.gameId, started, ended, game.startTimeUTC, 'Q', game.period.current, game.clock, awayTeam.triCode, awayTeam.score, homeTeam.triCode, homeTeam.score);
    scoreboard.league = 'nba';
    return scoreboard;
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
    const scoreboard = createScoreboard(game.id, started, ended, competition.startDate, 'Q', status.period, pad(status.displayClock, 5), awayTeam.team.abbreviation, awayTeam.score, homeTeam.team.abbreviation, homeTeam.score);
    scoreboard.league = 'nfl';
    return scoreboard;
}

function createNhlScoreboard(game) {
    const started = game.status.statusCode !== '1';
    const ended = game.status.statusCode === '7';
    const linescore = game.linescore;
    const awayTeam = linescore.teams.away;
    const homeTeam = linescore.teams.home;
    const scoreboard = createScoreboard(game.gamePk, started, ended, game.gameDate, 'P', linescore.currentPeriod, linescore.currentPeriodTimeRemaining, getNhlTeamAbbreviation(awayTeam.team.id), awayTeam.goals, getNhlTeamAbbreviation(homeTeam.team.id), homeTeam.goals);
    scoreboard.league = 'nhl';
    return scoreboard;
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
        time.textContent = periodType + periodNumber + ' ' + pad(clock, 5);
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
        myActionButton.textContent = '';
        myActionButton.appendChild(createLeagueIcon(scoreboard.league));
        myActionButton.addEventListener('click', () => removeFromMyScores(myScoreboard));
        addToContainer(myScoresContainer, myScoreboard);
    }
    showContainer(myScoresContainer);
    adjustView(myScoresContainer);
}

function createLeagueIcon(league) {
    const icon = document.createElement('i');
    switch (league) {
        case 'nba':
            icon.classList = 'fa-solid fa-basketball';
            break;

        case 'nfl':
            icon.classList = 'fa-solid fa-football';
            break;

        case 'nhl':
            icon.classList = 'fa-solid fa-hockey-puck';
            break;

        default:
            console.log('unrecognized league' + league);
    }
    return icon;
}

function removeFromMyScores(myScoreboard) {
    myScoreboard.remove();
    myScoresContainer.count--;
    adjustView(myScoresContainer);
}

function createScore(started, ended, awayTeam, awayScore, homeTeam, homeScore) {
    let awayWinner = false;
    let homeWinner = false;
    if (ended) {
        if (awayScore > homeScore) {
            awayWinner = true;
        }
        if (homeScore > awayScore) {
            homeWinner = true;
        }
    }
    const score = document.createElement('div');
    score.classList.add('score', 'containerSectionMainContent');
    score.appendChild(createTeamScore(started, awayTeam, awayScore, awayWinner));
    score.appendChild(createAt());
    score.appendChild(createTeamScore(started, homeTeam, homeScore, homeWinner));
    return score;
}

function createTeamScore(started, team, score, winner) {
    const span = document.createElement('span');
    span.classList.add('contentSpan', 'scoreSpan');
    if (winner) {
        span.classList.add('winner');
    }
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