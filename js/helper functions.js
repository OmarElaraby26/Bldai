const parser = new DOMParser();

function stringToHTML(str) {
    const doc = parser.parseFromString(str, 'text/html');
    return doc.body.firstChild;
}

function generateStars(numberOfStars) {
    if (!numberOfStars) return '';
    stars = '';
    for (let _ = 0; _ < numberOfStars; ++_) {
        stars += '<i class="fa-solid fa-star"></i>\n';
    }
    return stars;
}