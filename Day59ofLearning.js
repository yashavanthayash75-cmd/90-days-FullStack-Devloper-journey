
let studentName = document.getElementById("studentName");
let JavaMarks = document.getElementById("JavaMarks");
let DBMSMarks = document.getElementById("DBMSMarks");
let JavaScript = document.getElementById("JavaScript");

let studentRecords = document.getElementById("studentRecords");

let students = [];

document.getElementById("addStudentBtn").addEventListener("click", function() {

    let name = studentName.value;
    let java = Number(JavaMarks.value);
    let dbms = Number(DBMSMarks.value);
    let js = Number(JavaScript.value);

    if(name === "" || JavaMarks.value === "" ||
       DBMSMarks.value === "" || JavaScript.value === "") {
        alert("Fill all fields!");
        return;
    }

    if(java < 0 || java > 100 || dbms < 0 || dbms > 100 || js < 0 || js > 100) {
        alert("Enter marks between 0 and 100!");
        return;
    }

    let total = java + dbms + js;
    let average = total / 3;

    let grade;

    if(average >= 90) grade = "A+";
    else if(average >= 80) grade = "A";
    else if(average >= 70) grade = "B";
    else if(average >= 60) grade = "C";
    else if(average >= 40) grade = "D";
    else grade = "F";

    let passed = java >= 35 && dbms >= 35 && js >= 35;

    students.push({
        name, java, dbms, js, total, grade, passed
    });

    displayStudents();
    updateOverview();

    studentName.value = "";
    JavaMarks.value = "";
    DBMSMarks.value = "";
    JavaScript.value = "";

});

function displayStudents() {

    studentRecords.innerHTML = "";

    for(let i = 0; i < students.length; i++) {

        studentRecords.innerHTML += `
        <tr>
            <td>${students[i].name}</td>
            <td>${students[i].java}</td>
            <td>${students[i].dbms}</td>
            <td>${students[i].js}</td>
            <td>${students[i].total}</td>
            <td>${students[i].grade}</td>
        </tr>`;
    }
}

function updateOverview() {

    let total = 0;
    let passed = 0;

    for(let i = 0; i < students.length; i++) {
        total += students[i].total;

        if(students[i].passed) passed++;
    }

    let count = students.length;

    document.getElementById("totalStudents").innerText = count;

    document.getElementById("averageMarks").innerText =
        count ? (total / (count * 3)).toFixed(2) : 0;

    document.getElementById("passedStudents").innerText = passed;

    document.getElementById("failedStudents").innerText = count - passed;
}

document.getElementById("searchBtn").addEventListener("click", function() {

    let name = document.getElementById("searchInput").value.toLowerCase();

    let result = students.filter(s => s.name.toLowerCase().includes(name));

    studentRecords.innerHTML = "";

    for(let i = 0; i < result.length; i++) {
        studentRecords.innerHTML += `
        <tr>
            <td>${result[i].name}</td>
            <td>${result[i].java}</td>
            <td>${result[i].dbms}</td>
            <td>${result[i].js}</td>
            <td>${result[i].total}</td>
            <td>${result[i].grade}</td>
        </tr>`;
    }

    if(result.length === 0) alert("Student not found!");

});

document.getElementById("sortBtn").addEventListener("click", function() {

    students.sort((a, b) => b.total - a.total);

    displayStudents();

});
