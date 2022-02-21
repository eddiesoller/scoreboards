const AUTO = "auto ";
let container;
let addButton;
let count = 0;

window.addEventListener('load', () => {
    document.body.appendChild(createHeader());
    document.body.appendChild(createContainer());
})

window.addEventListener('resize', () => {
    adjustGrid();
})

document.addEventListener('keypress', () => {
    container.appendChild(createScoreboard());
});

function createHeader() {
    const header = document.createElement('div');
    header.classList.add('header');
    header.appendChild(createMenu());
    header.appendChild(createHeaderSpan());
    header.appendChild(createAddButton());
    return header;
}

function createHeaderSpan() {
    const span = document.createElement('span');
    span.classList.add('centerSpan')
    span.textContent = 'SCOREBOARDS';
    return span;
}

function createMenu() {
    const menu = document.createElement('div');
    menu.classList.add('menu');
    menu.classList.add('headerButton');
    menu.appendChild(createMenuIcon());
    return menu;
}

function createMenuIcon() {
    const icon = document.createElement('i');
    icon.classList = 'fa fa-bars';
    return icon;
}

function createAddButton() {
    const addButton = document.createElement('div');
    addButton.classList.add('addButton');
    addButton.classList.add('headerButton');
    addButton.textContent = '+';
    addButton.addEventListener('click', () => container.appendChild(createScoreboard()));
    return addButton;
}

function createContainer() {
    container = document.createElement('div');
    container.classList.add('container');
    return container;
}

function createScoreboard() {
    const scoreboard = document.createElement('div');
    scoreboard.classList.add('scoreboard');
    scoreboard.appendChild(createTime());
    scoreboard.appendChild(createScore());
    count++;
    adjustGrid()
    return scoreboard;
}

function createTime() {
    const time = document.createElement('div');
    time.classList.add('time');
    time.textContent = randomTime();
    return time;
}

function createScore() {
    const score = document.createElement('div');
    score.classList.add('score');
    // score.textContent = randomScore();
    score.appendChild(createTeamScore());
    score.appendChild(createAt());
    score.appendChild(createTeamScore());
    return score;
}

function createTeamScore() {
    const span = document.createElement('span');
    span.classList.add('scoreSpan');
    span.textContent = randomTeam() + ' ' + randomInt(10, 99);
    return span;
}

function createAt() {
    const span = document.createElement('span');
    span.classList.add('scoreSpan');
    span.textContent = " @ ";
    return span;
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
    return randomTeam() + ' ' + randomInt(10, 99) + ' ' + '@' + '' + randomTeam() + ' ' + randomInt(10, 99);
}

function randomTeam() {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 3).toUpperCase();
}

function randomTime() {
    return formatTime("Q" + randomInt(1, 4), randomInt(0, 12), randomInt(0, 59));
}

function formatTime(period, minutes, seconds) {
    return period + " " + pad(minutes, 2) + ":" + pad(seconds, 2);
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}