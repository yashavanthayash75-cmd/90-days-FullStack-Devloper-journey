const STORAGE_KEY = "course-progress-tracker";

const courseForm = document.getElementById("courseForm");
const courseNameInput = document.getElementById("courseName");
const totalLessonsInput = document.getElementById("totalLessons");
const courseList = document.getElementById("courseList");
const emptyState = document.getElementById("emptyState");
const formMessage = document.getElementById("formMessage");
const storageStatus = document.querySelector(".storage-note");
const courseCount = document.getElementById("courseCount");
const overallPercentage = document.getElementById("overallPercentage");
const completedLessons = document.getElementById("completedLessons");
const activeCourses = document.getElementById("activeCourses");
const overallLabel = document.getElementById("overallLabel");
const overallBar = document.getElementById("overallBar");

function isCourse(value) {
    return value !== null
        && typeof value === "object"
        && typeof value.id === "string"
        && typeof value.name === "string"
        && value.name.trim().length > 0
        && Number.isSafeInteger(value.total)
        && value.total > 0
        && Number.isSafeInteger(value.completed)
        && value.completed >= 0
        && value.completed <= value.total;
}

function loadCourses() {
    try {
        const savedCourses = localStorage.getItem(STORAGE_KEY);
        if (savedCourses === null) {
            return [];
        }

        const parsedCourses = JSON.parse(savedCourses);
        if (!Array.isArray(parsedCourses) || !parsedCourses.every(isCourse)) {
            throw new Error("Saved course data is invalid.");
        }

        return parsedCourses;
    } catch (error) {
        storageStatus.textContent = "Saved progress could not be read. New changes may replace it.";
        return [];
    }
}

let courses = loadCourses();

function saveCourses() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
        storageStatus.textContent = "✦ Your progress is saved on this device.";
        return true;
    } catch (error) {
        storageStatus.textContent = "Progress could not be saved. Check your browser's storage settings.";
        return false;
    }
}

function makeElement(tagName, className, text) {
    const element = document.createElement(tagName);
    if (className) {
        element.className = className;
    }
    if (text !== undefined) {
        element.textContent = text;
    }
    return element;
}

function makeAction(label, action, className, disabled, courseId) {
    const button = makeElement("button", `action-button ${className}`, label);
    button.type = "button";
    button.dataset.action = action;
    button.dataset.courseId = courseId;
    button.disabled = disabled;
    return button;
}

function renderCourse(course) {
    const percentage = Math.round((course.completed / course.total) * 100);
    const card = makeElement("article", "course-card");
    const topline = makeElement("div", "course-topline");
    const details = makeElement("div");
    const title = makeElement("h3", "", course.name);
    const meta = makeElement(
        "p",
        "course-meta",
        `${course.completed} of ${course.total} lessons completed`
    );
    const percent = makeElement("span", "course-percent", `${percentage}%`);
    const progress = makeElement("div", "progress-track course-progress");
    const fill = makeElement("span", "progress-fill");
    const actions = makeElement("div", "course-actions");

    progress.setAttribute("role", "progressbar");
    progress.setAttribute("aria-label", `${course.name} progress`);
    progress.setAttribute("aria-valuemin", "0");
    progress.setAttribute("aria-valuemax", "100");
    progress.setAttribute("aria-valuenow", String(percentage));
    fill.style.width = `${percentage}%`;

    details.append(title, meta);
    topline.append(details, percent);
    progress.append(fill);
    actions.append(
        makeAction("Undo lesson", "undo", "", course.completed === 0, course.id),
        makeAction(
            course.completed === course.total ? "Course complete" : "Complete lesson",
            "complete",
            "complete-button",
            course.completed === course.total,
            course.id
        ),
        makeAction("Delete", "delete", "delete-button", false, course.id)
    );
    card.append(topline, progress, actions);
    return card;
}

function render() {
    courseList.replaceChildren(...courses.map(renderCourse));
    emptyState.hidden = courses.length > 0;

    const totals = courses.reduce(
        (result, course) => {
            result.lessons += course.total;
            result.completed += course.completed;
            if (course.completed < course.total) {
                result.activeCourses += 1;
            }
            return result;
        },
        { lessons: 0, completed: 0, activeCourses: 0 }
    );
    const percentage = totals.lessons === 0
        ? 0
        : Math.round((totals.completed / totals.lessons) * 100);
    const courseWord = courses.length === 1 ? "course" : "courses";
    const lessonWord = totals.lessons === 1 ? "lesson" : "lessons";

    courseCount.textContent = `${courses.length} ${courseWord}`;
    overallPercentage.textContent = `${percentage}%`;
    completedLessons.replaceChildren(
        document.createTextNode(String(totals.completed)),
        makeElement("span", "", ` of ${totals.lessons}`)
    );
    activeCourses.textContent = String(totals.activeCourses);
    overallLabel.textContent = `${totals.completed} of ${totals.lessons} ${lessonWord}`;
    overallBar.setAttribute("aria-valuenow", String(percentage));
    overallBar.querySelector(".progress-fill").style.width = `${percentage}%`;
}

courseForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formMessage.textContent = "";

    const name = courseNameInput.value.trim();
    const total = Number(totalLessonsInput.value);
    if (!name || !Number.isSafeInteger(total) || total < 1) {
        formMessage.textContent = "Enter a course name and a whole number of lessons greater than zero.";
        return;
    }

    const id = typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    courses.push({ id, name, total, completed: 0 });
    courseForm.reset();
    render();
    saveCourses();
    courseNameInput.focus();
});

courseList.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button || !courseList.contains(button)) {
        return;
    }

    const courseIndex = courses.findIndex((course) => course.id === button.dataset.courseId);
    if (courseIndex === -1) {
        return;
    }

    const course = courses[courseIndex];
    if (button.dataset.action === "complete" && course.completed < course.total) {
        course.completed += 1;
    } else if (button.dataset.action === "undo" && course.completed > 0) {
        course.completed -= 1;
    } else if (button.dataset.action === "delete") {
        courses.splice(courseIndex, 1);
    } else {
        return;
    }

    render();
    saveCourses();
});

render();
