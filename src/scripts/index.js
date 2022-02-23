const AUTO = "auto ";
let myScoresContainer;
let homeContainer;
let nbaContainer;
let nflContainer;
let nhlContainer;

window.addEventListener('load', () => {
    document.body.appendChild(createHeader());
    homeContainer = createHomeSectionContainer();
    document.body.appendChild(homeContainer);
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