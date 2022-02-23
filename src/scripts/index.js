const AUTO = "auto ";
let homeContainer;
let leagueContainer;
let nbaContainer;
let nflContainer;
let nhlContainer;

window.addEventListener('load', () => {
    document.body.appendChild(createHeader());
    leagueContainer = createLeagueContainer();
    document.body.appendChild(leagueContainer);
    homeContainer = createHomeContainer();
    document.body.appendChild(homeContainer);
    nbaContainer = createNbaContainer();
    document.body.appendChild(nbaContainer);
    nflContainer = createNflContainer();
    document.body.appendChild(nflContainer);
    nhlContainer = createNhlContainer();
    document.body.appendChild(nhlContainer);
    showContainer(leagueContainer);
})

window.addEventListener('resize', () => {
    adjustView(getActiveContainer());
})

document.addEventListener('keypress', () => {
    addToContainer(homeContainer, createRandomScoreboard());
    adjustView(homeContainer);
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
    menu.id = 'menuButton';
    menu.classList.add('menu');
    menu.classList.add('button');
    menu.appendChild(createMenuIcon());
    menu.addEventListener('click', () => menuClick());
    return menu;
}

function menuClick() {
    showContainer(leagueContainer);
}

function createMenuIcon() {
    const icon = document.createElement('i');
    icon.classList = 'fa fa-bars';
    return icon;
}

function createAddButton() {
    const addButton = document.createElement('div');
    addButton.classList.add('addButton', 'button');
    addButton.textContent = '+';
    addButton.addEventListener('click', () => addClick());
    return addButton;
}

function addClick() {}