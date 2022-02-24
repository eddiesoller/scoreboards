function createHomeSection(name) {
    const league = document.createElement('div');
    league.id = name;
    league.classList.add('containerSection', 'button');
    league.appendChild(createHomeSectionContent(name));
    return league;
}

function createHomeSectionContent(name) {
    const content = document.createElement('div');
    content.classList.add('containerSectionMainContent');
    content.appendChild(createHomeSectionSpan(name));
    return content;
}

function createHomeSectionSpan(name) {
    const span = document.createElement('span');
    span.classList.add('contentSpan');
    span.textContent = name;
    return span;
}

function createMyScores() {
    const league = createHomeSection('MY SCORES');
    league.addEventListener('click', () => {
        showContainer(myScoresContainer);
    })
    return league;
}

function createNbaHomeSection() {
    const league = createHomeSection('NBA');
    league.addEventListener('click', () => {
        showContainer(nbaContainer);
    })
    return league;
}

function createNflHomeSection() {
    const league = createHomeSection('NFL');
    league.addEventListener('click', () => {
        showContainer(nflContainer);
    })
    return league;
}

function createNhlHomeSection() {
    const league = createHomeSection('NHL');
    league.addEventListener('click', () => {
        showContainer(nhlContainer);
    })
    return league;
}