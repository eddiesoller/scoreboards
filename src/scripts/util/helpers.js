const NOW = new Date();

function factorize(num) {
    if (num <= 0) {
        return [1];
    }
    return [...Array(num + 1).keys()].filter(i => num % i === 0);
}

function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

function yyyyMmDd() {
    return NOW.getFullYear() * 1e4 + (NOW.getMonth() + 1) * 100 + NOW.getDate() + '';
}