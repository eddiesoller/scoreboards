function createContainer() {
    const container = document.createElement('div');
    container.classList.add('container');
    container.style.display = 'none';
    container.count = 0;
    return container;
}

function createHomeContainer() {
    const homeContainer = createContainer();
    homeContainer.id = 'homeContainer';
    return homeContainer;
}

function createLeagueContainer() {
    const leagueContainer = createContainer();
    leagueContainer.id = 'leagueContainer';
    seedLeagues(leagueContainer);
    return leagueContainer;
}

function createNbaContainer() {
    const nbaContainer = createContainer();
    nbaContainer.id = 'nbaContainer';
    seedNbaGames(nbaContainer);
    return nbaContainer;
}

function createNflContainer() {
    const nflContainer = createContainer();
    nflContainer.id = 'nflContainer';
    seedNflGames(nflContainer);
    return nflContainer;
}

function createNhlContainer() {
    const nhlContainer = createContainer();
    nhlContainer.id = 'nhlContainer';
    seedNhlGames(nhlContainer);
    return nhlContainer;
}

function addToContainer(container, section) {
    if (!container || !section) {
        return;
    }
    container.appendChild(section);
    container.count++;
}

function showContainer(container) {
    const containers = document.getElementsByClassName('container');
    for (i = 0; i < containers.length; i++) {
        if (containers[i] === container) {
            containers[i].style.display = 'grid';
        } else {
            containers[i].style.display = 'none';
        }
    }
    adjustView(container);
    if (container === leagueContainer) {
        document.getElementById('menuButton').classList.add('disabledButton');
    } else {
        document.getElementById('menuButton').classList.remove('disabledButton');
    }
}

function getActiveContainer() {
    const containers = document.getElementsByClassName('container');
    for (i = 0; i < containers.length; i++) {
        if (containers[i].style.display === 'grid') {
            return containers[i];
        }
    }
}