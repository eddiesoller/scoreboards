const AUTO = "auto ";
let homeContainer;
let infoContainer;
let myScoresContainer;
let nbaContainer;
let nflContainer;
let nhlContainer;

window.addEventListener('load', () => {
    document.body.appendChild(createHeader());
    homeContainer = createHomeContainer();
    document.body.appendChild(homeContainer);
    infoContainer = createInfoContainer();
    document.body.appendChild(infoContainer);
    myScoresContainer = createMyScoresContainer();
    document.body.appendChild(myScoresContainer);
    nbaContainer = createNbaContainer();
    document.body.appendChild(nbaContainer);
    nflContainer = createNflContainer();
    document.body.appendChild(nflContainer);
    nhlContainer = createNhlContainer();
    document.body.appendChild(nhlContainer);
    showContainer(homeContainer);
})

window.addEventListener('resize', () => {
    adjustView(getActiveContainer());
})

document.addEventListener('keypress', () => {
    addToContainer(myScoresContainer, createRandomScoreboard());
    adjustView(myScoresContainer);
});

function createHeader() {
    const header = document.createElement('div');
    header.classList.add('header');
    header.appendChild(createInfoButton());
    header.appendChild(createHomeButton());
    header.appendChild(createHeaderSpan());
    header.appendChild(createRefreshButton());
    return header;
}

function createHeaderSpan() {
    const span = document.createElement('span');
    span.classList.add('centerSpan')
    span.textContent = 'SCOREBOARDS';
    return span;
}

function createHomeButton() {
    const menu = document.createElement('div');
    menu.id = 'homeButton';
    menu.classList.add('button');
    menu.appendChild(createHomeButtonIcon());
    menu.addEventListener('click', () => showContainer(homeContainer));
    return menu;
}

function createHomeButtonIcon() {
    const icon = document.createElement('i');
    icon.classList = 'fa fa-home';
    return icon;
}

function createInfoButton() {
    const infoButton = document.createElement('div');
    infoButton.id = 'infoButton';
    infoButton.classList.add('button', 'upperRightButton');
    infoButton.appendChild(createInfoButtonIcon());
    infoButton.style.display = 'none';
    infoButton.addEventListener('click', () => showContainer(infoContainer));
    return infoButton;
}

function createInfoButtonIcon() {
    const icon = document.createElement('i');
    icon.classList = 'fa fa-info';
    return icon;
}

function createRefreshButton() {
    const refreshButton = document.createElement('div');
    refreshButton.id = 'refreshButton';
    refreshButton.classList.add('button', 'upperRightButton');
    refreshButton.appendChild(createRefreshButtonIcon());
    refreshButton.style.display = 'none';
    refreshButton.addEventListener('click', () => {});
    return refreshButton;
}

function createRefreshButtonIcon() {
    const icon = document.createElement('i');
    icon.classList = 'fa fa-refresh';
    return icon;
}