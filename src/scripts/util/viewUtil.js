function adjustView() {
    adjustGrid();
    adjustScoreboardCorner();
    adjustScoreFontSize();
}

function adjustGrid() {
    let factors = factorize(count);
    let optimalColumns = {
        value: 1,
        ratio: 0,
    }

    for (i = 1; i < factors.length - 1; i++) {
        const columns = factors[i];
        const scoreboardRatio = getScoreboardRatio(columns);

        if (scoreboardRatio > optimalColumns.ratio) {
            optimalColumns.value = columns;
            optimalColumns.ratio = scoreboardRatio;
        }
    }

    container.style.gridTemplateColumns = AUTO.repeat(optimalColumns.value);
}

function adjustScoreboardCorner() {
    const scoreboard = document.getElementsByClassName('scoreboard')[0];
    if (!scoreboard) {
        return;
    }

    const time = document.getElementsByClassName('time')[0];
    let fontSize = Math.min(scoreboard.offsetHeight, 16);
    setScoreboardCornerFontSize(fontSize);

    while (timeTooBig(time, scoreboard) && fontSize > 1) {
        fontSize--;
        setScoreboardCornerFontSize(fontSize);
    }
}

function timeTooBig(time, scoreboard) {
    return scoreboard.getBoundingClientRect().bottom - time.getBoundingClientRect().bottom < 5;
}

function setScoreboardCornerFontSize(fontSize) {
    const times = document.getElementsByClassName('scoreboardCorner');
    for (i = 0; i < times.length; i++) {
        times[i].style.fontSize = fontSize + 'px';
    }
}

function adjustScoreFontSize() {
    const scoreboards = document.getElementsByClassName('scoreboard');
    if (!scoreboards[0]) {
        return;
    }
    const scores = document.getElementsByClassName('score');
    const width = scoreboards[0].offsetWidth;
    const height = scoreboards[0].offsetHeight;
    let fontSize = Math.min(width, height, 50);
    setScoreFontSize(fontSize);

    for (i = 0; i < scores.length; i++) {
        if (fontSize < 10) {
            break;
        }
        if (scoreTooBig(scores[i], scoreboards[i])) {
            fontSize--;
            setScoreFontSize(fontSize);
            i = 0;
        }
    }
}

function scoreTooBig(score, scoreboard) {
    if (scoreboard.offsetHeight - score.offsetHeight < 10) {
        return true;
    }
    const scoreSpan = score.firstChild.getBoundingClientRect();
    const time = scoreboard.firstChild.getBoundingClientRect();
    if (scoreSpan.top < time.bottom && scoreSpan.left < time.right) {
        return true;
    }
    return false;
}

function setScoreFontSize(fontSize) {
    const spans = document.getElementsByClassName('scoreSpan');
    for (i = 0; i < spans.length; i++) {
        spans[i].style.fontSize = fontSize + 'px';
    }
}

function getScoreboardRatio(columns) {
    const rows = count / columns;
    return (container.offsetWidth / columns) / (container.offsetHeight / rows);
}