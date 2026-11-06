
let courseName = document.getElementById("courseName");
let totallessons = document.getElementById("totallessons");
let courseBtn = document.getElementById("courseBtn");
let coursecontainer = document.getElementById("coursecontainer");
let percentage = document.getElementById("percentage");
let OverallBar = document.getElementById("OverallBar");

let courses = [];

courseBtn.addEventListener("click", function() {
    let name = courseName.value;
    let total = Number(totallessons.value);

    if (name == "" || total <= 0) {
        alert("Please enter valid details!");
        return;
    }

    let course = {
        name: name,
        total: total,
        completed: 0
    };

    courses.push(course);

    courseName.value = "";
    totallessons.value = "";

    displayCourses();
});

function displayCourses() {
    coursecontainer.innerHTML = "";

    let allTotal = 0;
    let allCompleted = 0;

    courses.forEach(function(course, index) {
        let progress = (course.completed / course.total) * 100;

        allTotal += course.total;
        allCompleted += course.completed;

        coursecontainer.innerHTML += `
            <div class="course">
                <h3>${course.name}</h3>
                <p>Total Lessons: ${course.total}</p>
                <p>Completed Lessons: ${course.completed}</p>

                <div class="progress">
                    <div class="bar" style="width:${progress}%"></div>
                </div>

                <p>${Math.round(progress)}% Completed</p>

                <button onclick="completeCourse(${index})">Complete Lesson</button>

                <button onclick="deleteCourse(${index})">Delete</button>
            </div>
        `;
    });

    let overall = allTotal == 0 ? 0 : (allCompleted / allTotal) * 100;

    percentage.innerText = "Overall Progress: " + Math.round(overall) + "%";

    OverallBar.innerHTML = `
        <div style="width:${overall}%"></div>
    `;
}

function completeCourse(index) {
    if (courses[index].completed < courses[index].total) {
        courses[index].completed++;
    }

    displayCourses();
}

function deleteCourse(index) {
    courses.splice(index, 1);
    displayCourses();
}

displayCourses();
