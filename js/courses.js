const URL = 'http://localhost:3000';

const CARD_TEMPLATE = `<div class="card">
    <div class="card-img"> <img src="" alt="thumbnail" /></div>
    <h3><a href="#"> title </a></h3>
    <div class="card-author">
        <span> author </span>
    </div>
    <div class="card-review">
        <span>
            <span>rating</span>
            <span class="card-review--star">
            </span>
            <span>reviews number</span>
        </span>
    </div>
    <div class="card--price">
        <span>price</span>
    </div>
</div>`;

async function viewCourses() {
    const courses = await getCourses();
    clearCourses();
    await insertCourses(courses);
}


async function getCourses() {
    const response = await fetch(`${URL}/courses`);
    const data = await response.json();
    return data;
}


function clearCourses() {
    const cardsContainer = document.querySelector('.cards-container');
    const cards = cardsContainer.querySelectorAll('.card');
    cards.forEach(child => cardsContainer.removeChild(child));
}

async function insertCourses(courses) {
    if (!courses || !courses.length) return;
    cardsContainer = document.querySelector('.cards-container');

    for (let i = 0; i < courses.length; ++i) {
        const htmlTemplate = stringToHTML(CARD_TEMPLATE);
        readyHTML = fillHTMLCourseTemplate(htmlTemplate, courses[i]);
        cardsContainer.appendChild(readyHTML);
    }
}

function fillHTMLCourseTemplate(html, data) {
    image = html.querySelector('.card-img img');
    title = html.querySelector('.card h3 a');
    author = html.querySelector('.card-author span');
    review = html.querySelector('.card-review');
    price = html.querySelector('.card--price span');

    image.setAttribute('src', data.image);
    title.textContent = data.title;
    author.textContent = data.author;

    review.querySelector('span>span:nth-child(1)').textContent = data.rating;
    addStars(review.querySelector('.card-review--star'), Math.round(data.rating));
    review.querySelector('span>span:nth-child(3)').textContent = data.reviews_number;

    price.textContent = data.price;

    return html;
}


viewCourses();