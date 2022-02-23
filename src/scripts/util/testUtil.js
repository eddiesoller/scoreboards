function createRandomScoreboard() {
    return createScoreboard(homeContainer.count, 'Q', randomInt(1, 4), pad(randomInt(0, 12), 2) + ':' + pad(randomInt(0, 59), 2), randomTeam(), randomInt(10, 99), randomTeam(), randomInt(10, 99));
}

function randomTeam() {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 3).toUpperCase();
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}