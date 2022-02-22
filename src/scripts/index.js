const AUTO = "auto ";
let homeContainer;
let addButton;

window.addEventListener('load', () => {
    document.body.appendChild(createHeader());
    homeContainer = createHomeContainer();
    document.body.appendChild(homeContainer);
})

window.addEventListener('resize', () => {
    adjustAllViews();
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
    menu.classList.add('menu');
    menu.classList.add('button');
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
    addButton.classList.add('button');
    addButton.textContent = '+';
    addButton.addEventListener('click', () => addClick());
    return addButton;
}

function addClick() {
    seedGames();
}

function createContainer() {
    const container = document.createElement('div');
    container.classList.add('container');
    return container;
}

function createHomeContainer() {
    const homeContainer = createContainer();
    homeContainer.id = 'homeContainer';
    homeContainer.count = 0;
    return homeContainer;
}