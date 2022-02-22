function adjustAllViews() {
    const containers = document.getElementsByClassName('container');
    for (i = 0; i < container.length; i++) {
        adjustView(containers[i]);
    }
}

function adjustView(container) {
    adjustGrid(container);
    adjustScoreboardCorner(container);
    adjustScoreFontSize(container);
}

function adjustGrid(container) {
    let factors = factorize(container.count);
    let optimalColumns = {
        value: 1,
        ratio: 0,
    }

    for (i = 1; i < factors.length - 1; i++) {
        const columns = factors[i];
        const scoreboardRatio = getScoreboardRatio(container, columns);

        if (scoreboardRatio > optimalColumns.ratio) {
            optimalColumns.value = columns;
            optimalColumns.ratio = scoreboardRatio;
        }
    }

    container.style.gridTemplateColumns = AUTO.repeat(optimalColumns.value);
}

function adjustScoreboardCorner(container) {
    const scoreboard = container.querySelector('.scoreboard')[0];
    if (!scoreboard) {
        return;
    }

    const time = container.querySelector('.time')[0];
    let fontSize = Math.min(scoreboard.offsetHeight, 16);
    setScoreboardCornerFontSize(container, fontSize);

    while (timeTooBig(time, scoreboard) && fontSize > 1) {
        fontSize--;
        setScoreboardCornerFontSize(container, fontSize);
    }
}

function timeTooBig(time, scoreboard) {
    return scoreboard.getBoundingClientRect().bottom - time.getBoundingClientRect().bottom < 5;
}

function setScoreboardCornerFontSize(container, fontSize) {
    const times = container.querySelector('.scoreboardCorner');
    for (i = 0; i < times.length; i++) {
        times[i].style.fontSize = fontSize + 'px';
    }
}

function adjustScoreFontSize(container) {
    const scoreboards = container.querySelector('.scoreboard');
    if (!scoreboards[0]) {
        return;
    }
    const scores = container.querySelector('.score');
    const width = scoreboards[0].offsetWidth;
    const height = scoreboards[0].offsetHeight;
    let fontSize = Math.min(width, height, 50);
    setScoreFontSize(container, fontSize);

    for (i = 0; i < scores.length; i++) {
        if (fontSize < 10) {
            break;
        }
        if (scoreTooBig(scores[i], scoreboards[i])) {
            fontSize--;
            setScoreFontSize(container, fontSize);
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

function setScoreFontSize(container, fontSize) {
    const spans = container.querySelector('.scoreSpan');
    for (i = 0; i < spans.length; i++) {
        spans[i].style.fontSize = fontSize + 'px';
    }
}

function getScoreboardRatio(container, columns) {
    const rows = container.count / columns;
    return (container.offsetWidth / columns) / (container.offsetHeight / rows);
}