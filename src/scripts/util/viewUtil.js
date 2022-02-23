function adjustView(container) {
    adjustGrid(container);
    adjustSectionCorner(container);
    adjustContentFontSize(container);
}

function adjustGrid(container) {
    let factors = factorize(container.count);
    let optimalColumns = {
        value: 1,
        ratio: 0,
    }

    for (i = 1; i < factors.length - 1; i++) {
        const columns = factors[i];
        const scoreboardRatio = getScoreboardRatio(container, columns);

        if (scoreboardRatio > optimalColumns.ratio) {
            optimalColumns.value = columns;
            optimalColumns.ratio = scoreboardRatio;
        }
    }

    container.style.gridTemplateColumns = AUTO.repeat(optimalColumns.value);
}

function getScoreboardRatio(container, columns) {
    const rows = container.count / columns;
    return (container.offsetWidth / columns) / (container.offsetHeight / rows);
}

function adjustSectionCorner(container) {
    if (!container) {
        return;
    }
    const scoreboard = container.querySelector('.scoreboard');
    if (!scoreboard) {
        return;
    }
    const time = container.querySelectorAll('.time')[0];
    let fontSize = Math.min(scoreboard.offsetHeight, 16);
    setSectionCornerFontSize(container, fontSize);

    while (timeTooBig(time, scoreboard) && fontSize > 1) {
        fontSize--;
        setSectionCornerFontSize(container, fontSize);
    }
}

function timeTooBig(time, scoreboard) {
    return scoreboard.getBoundingClientRect().bottom - time.getBoundingClientRect().bottom < 5;
}

function setSectionCornerFontSize(container, fontSize) {
    const times = container.querySelectorAll('.sectionCorner');
    for (i = 0; i < times.length; i++) {
        times[i].style.fontSize = fontSize + 'px';
    }
}

function adjustContentFontSize(container) {
    if (!container) {
        return;
    }
    const sections = container.querySelectorAll('.containerSection');
    if (!sections || !sections[0]) {
        return;
    }
    const contents = container.querySelectorAll('.containerSectionMainContent');
    const width = sections[0].offsetWidth;
    const height = sections[0].offsetHeight;
    let fontSize = Math.min(width, height, 50);
    setContentFontSize(container, fontSize);

    for (i = 0; i < contents.length; i++) {
        if (fontSize <= 12) {
            break;
        }
        if (contentTooBig(contents[i], sections[i])) {
            fontSize--;
            setContentFontSize(container, fontSize);
            i = 0;
        }
    }
}

function contentTooBig(content, section) {
    if (section.offsetWidth - content.offsetWidth < 10) {
        return true;
    }
    if (section.offsetHeight - content.offsetHeight < 10) {
        return true;
    }
    const contentSpan = content.querySelector('.contentSpan');
    const corner = section.querySelector('.sectionCorner')
    if (contentSpan && corner) {
        const contentBox = contentSpan.getBoundingClientRect();
        const cornerBox = corner.getBoundingClientRect();
        if (contentBox.top < cornerBox.bottom && contentBox.left < cornerBox.right) {
            return true;
        }
    }
    return false;
}

function setContentFontSize(container, fontSize) {
    const spans = container.querySelectorAll('.contentSpan');
    for (i = 0; i < spans.length; i++) {
        spans[i].style.fontSize = fontSize + 'px';
    }
}