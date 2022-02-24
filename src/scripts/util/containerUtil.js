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
    seedLeagues(homeContainer);
    return homeContainer;
}

function createInfoContainer() {
    const infoContainer = createContainer();
    infoContainer.id = 'infoContainer';
    infoContainer.appendChild(createInfoContainerContent());
    return infoContainer;
}

function createInfoContainerContent() {
    const content = document.createElement('div');
    content.classList.add('containerSectionMainContent');
    content.appendChild(document.createTextNode('welcome to scoreboards.'));
    return content;
}

function createMyScoresContainer() {
    const myScoresContainer = createContainer();
    myScoresContainer.id = 'myScoresContainer';
    return myScoresContainer;
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
    if (container === homeContainer) {
        document.getElementById('homeButton').classList.add('disabledButton');
        document.getElementById('refreshButton').style.display = 'none';
        document.getElementById('infoButton').style.display = 'block';
        document.getElementById('infoButton').classList.remove('disabledButton');
    } else if (container === infoContainer) {
        document.getElementById('homeButton').classList.remove('disabledButton');
        document.getElementById('refreshButton').style.display = 'none';
        document.getElementById('infoButton').classList.add('disabledButton');
    } else {
        document.getElementById('homeButton').classList.remove('disabledButton');
        document.getElementById('refreshButton').style.display = 'block';
        document.getElementById('infoButton').style.display = 'none';
        document.getElementById('infoButton').classList.remove('disabledButton');
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