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

    const courses = await getCourses();
    const filteredCourses = filter(courses, searchInput.value);
    clearCourses();
    await insertCourses(filteredCourses);
}

function filter(courses, val) {
    return courses.filter(course => course.title.search(new RegExp(val, 'i')) !== -1)
}

addListerToSearchBar();