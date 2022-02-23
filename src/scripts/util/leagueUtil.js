function createLeague(name) {
    const league = document.createElement('div');
    league.id = name;
    league.classList.add('containerSection', 'league', 'button');
    league.appendChild(createLeagueContent(name));
    return league;
}

function createLeagueContent(name) {
    const content = document.createElement('div');
    content.classList.add('leagueName', 'containerSectionMainContent');
    content.appendChild(createLeagueSpan(name));
    return content;
}

function createLeagueSpan(name) {
    const span = document.createElement('span');
    span.classList.add('contentSpan', 'leagueSpan');
    span.textContent = name;
    return span;
}

function createHomeLeague() {
    const league = createLeague('HOME');
    league.addEventListener('click', () => {
        showContainer(homeContainer);
    })
    return league;
}

function createNbaLeague() {
    const league = createLeague('NBA');
    league.addEventListener('click', () => {
        showContainer(nbaContainer);
    })
    return league;
}

function createNflLeague() {
    const league = createLeague('NFL');
    league.addEventListener('click', () => {
        showContainer(nflContainer);
    })
    return league;
}

function createNhlLeague() {
    const league = createLeague('NHL');
    league.addEventListener('click', () => {
        showContainer(nhlContainer);
    })
    return league;
}