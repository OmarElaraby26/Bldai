const URL = 'http://localhost:3000';
CAROUSEL = $('.courses-cards-container');
const tabButtons = document.querySelectorAll('.tabs--nav button');

let currentActiveTabButton;
let currentActiveTabButtonName;


async function viewCourses() {
    const courses = await getCourses(currentActiveTabButtonName);
    replaceCourses(courses);
}


async function getCourses(coursesType) {
    if (!coursesType) coursesType = '';
    coursesType = coursesType.trim();
    coursesType = coursesType.toLowerCase();
    coursesType = coursesType.replace(' ', '-');
    const response = await fetch(`${URL}/${coursesType}/`);
    const data = await response.json();
    return data;
}

function replaceCourses(courses) {
    clearCourses();
    buildCourseIntro(courses.intro);
    buildCarousel(courses.cards);
}

function buildCourseIntro(data) {
    courseIntro = document.querySelector('.courses-intro');
    courseIntro.querySelector('h2').textContent = data.header;
    courseIntro.querySelector('p').textContent = data.paragraph;
    courseIntro.querySelector('button').textContent = data.buttonValue;
}

function buildCarousel(courses) {
    if (!courses || !courses.length) return;

    let content = '';
    for (let i = 0; i < courses.length; ++i) {
        content += fillHTMLCourseTemplate(courses[i]);
    }

    CAROUSEL.html(content);
    reinitializeCarousel();
}


function clearCourses() {
    CAROUSEL.trigger('destroy.owl.carousel');
    CAROUSEL.find('.owl-stage-outer');
    CAROUSEL.removeClass('owl-center owl-loaded owl-text-select-on');
}

function fillHTMLCourseTemplate(data) {
    const {
        link,
        title,
        author,
        image,
        price,
        rating,
        reviews_number
    } = data;

    return `<div class="item">
    <div class="courses-card">
        <div class="card-img"> <img src=${image} alt="thumbnail" /></div>
        <h3><a href="#"> ${title} </a></h3>
        <div class="card-author">
            <span> ${author} </span>
        </div>
        <div class="card-review">
            <span>
                <span>${rating}</span>
                <span class="card-review--star">
                    ${generateStars(Math.round(rating))}
                </span>
                <span>(${reviews_number})</span>
            </span>
        </div>
        <div class="card--price">
            <span>${price}</span>
        </div>
    </div>
</div>`;
}

function reinitializeCarousel() {
    CAROUSEL.owlCarousel({
        loop: false,
        rewind: false,
        rewindNav: false,
        margin: 15,
        nav: true,
        dots: false,
        slideBy: 'page',
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 5
            }
        }
    });
}

function addTabButtonsListener() {
    function changeButtonStyle(button) {
        if (currentActiveTabButton) currentActiveTabButton.style.color = '#6a6f73';
        button.style.color = '#000';
        currentActiveTabButton = button;
        currentActiveTabButtonName = button.querySelector('span').textContent.trim();
    }

    if (!currentActiveTabButtonName) changeButtonStyle(tabButtons[0]);

    tabButtons.forEach(button => button.addEventListener("click", function () {
        if (button === currentActiveTabButton) return;
        changeButtonStyle(button);
        viewCourses();
    }));
}



addTabButtonsListener();
viewCourses();