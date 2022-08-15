const parser = new DOMParser();

function stringToHTML(str) {
    const doc = parser.parseFromString(str, 'text/html');
    return doc.body.firstChild;
}

function addStars(element, numberOfStars) {
    for (let _ = 0; _ < numberOfStars; ++_) {
        const star = document.createElement('i');
        star.className = 'fa-solid fa-star';
        element.appendChild(star);
    }
}