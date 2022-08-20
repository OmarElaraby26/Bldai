const searchInput = document.querySelector('.search input');
const searchButton = document.querySelector('.search button');

const addListerToSearchBar = () => {
    searchButton.addEventListener("click", reViewCourses);
    searchInput.addEventListener('keypress', async function (e) {
        if (e.key === 'Enter') await reViewCourses();
    });
};

async function reViewCourses() {
    if (!searchInput.value) return; // do nothing
    const courses = await getCourses(currentActiveTabButtonName);
    filter(courses, searchInput.value);
    replaceCourses(filteredCourses);
}

function filter(courses, val) {
    courses.cards = courses.cards.filter(course => course.title.search(new RegExp(val, 'i')) !== -1)
}

addListerToSearchBar();