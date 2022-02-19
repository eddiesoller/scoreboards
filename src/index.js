const AUTO = "auto ";
let container;
let addButton;
let count = 0;

window.addEventListener('load', () => {
    createContainer();
})

window.addEventListener('resize', () => {
    adjustGrid();
})

document.addEventListener('keypress', () => {
    createScoreboard()
});

function createContainer() {
    container = document.createElement('div');
    container.classList.add('container');
    document.body.appendChild(container);
}

function createScoreboard() {
    const scoreboard = document.createElement('div');
    scoreboard.classList.add('scoreboard');
    scoreboard.appendChild(createScore());
    container.appendChild(scoreboard);
    count++;
    adjustGrid()
}

function createScore() {
    const score = document.createElement('div');
    score.classList.add('score');
    score.textContent = randomScore();
    return score;
}

function adjustGrid() {
    let factors = factorize(count);
    let optimalColumns = {
        value: 1,
        ratio: 0,
    }

    for (i = 1; i < factors.length - 1; i++) {
        const columns = factors[i];
        const scoreboardRatio = getScoreBoardRatio(columns);

        if (scoreboardRatio > optimalColumns.ratio) {
            optimalColumns.value = columns;
            optimalColumns.ratio = scoreboardRatio;
        }
    }

    container.style.gridTemplateColumns = AUTO.repeat(optimalColumns.value);
}

function factorize(num) {
    if (num <= 0) {
        return [1];
    }
    return [...Array(num + 1).keys()].filter(i => num % i === 0);
}

function getScoreBoardRatio(columns) {
    const rows = count / columns;
    return (container.offsetWidth / columns) / (container.offsetHeight / rows);
}

function randomScore() {
    return randomTeam() + ' ' + randomNumber() + ' ' + '@' + '' + randomTeam() + ' ' + randomNumber();
}

function randomTeam() {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 3).toUpperCase();
}

function randomNumber() {
    return Math.max(10, Math.floor(Math.random() * 100));
}