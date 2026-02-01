let students = JSON.parse(localStorage.getItem("students")) || [];
let editId = null;

// Auto Increment ID
function getNextId() {
    if (students.length === 0) return 1;
    return students[students.length - 1].id + 1;
}

// AI Recommendation
function aiRecommend(goal) {
    goal = goal.toLowerCase();
    if (goal.includes("ai")) return "AI Internship Program";
    if (goal.includes("tech")) return "Tech Career Program";
    if (goal.includes("intern")) return "Internship Program";
    return "Mentorship Program";
}

// CREATE
function addStudent() {

    if (!validateForm()) return; // STOP if validation fails

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let goal = document.getElementById("goal").value;

    let student = {
        id: getNextId(),
        name,
        email,
        goal,
        program: aiRecommend(goal)
    };

    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));
    clearForm();
    displayStudents();
}


// READ
function displayStudents() {
    let table = document.getElementById("studentTable");
    table.innerHTML = "";

    students.forEach(s => {
        table.innerHTML += `
        <tr>
        <td>${s.id}</td>
        <td>${s.name}</td>
        <td>${s.email}</td>
        <td>${s.goal}</td>
        <td>${s.program}</td>
        <td>
            <button onclick="editStudent(${s.id})">Edit</button>
            <button onclick="deleteStudent(${s.id})">Delete</button>
        </td>
        </tr>
        `;
    });
}

// LOAD DATA FOR UPDATE
function editStudent(id) {
    let student = students.find(s => s.id === id);
    document.getElementById("name").value = student.name;
    document.getElementById("email").value = student.email;
    document.getElementById("goal").value = student.goal;
    editId = id;
}

// UPDATE
function updateStudent() {

    if (!validateForm()) return;

    if (editId === null) {
        alert("Select student to edit");
        return;
    }

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let goal = document.getElementById("goal").value;

    let student = students.find(s => s.id === editId);
    student.name = name;
    student.email = email;
    student.goal = goal;
    student.program = aiRecommend(goal);

    localStorage.setItem("students", JSON.stringify(students));
    clearForm();
    editId = null;
    displayStudents();
}


// DELETE
function deleteStudent(id) {
    students = students.filter(s => s.id !== id);
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
}

// Clear Form
function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("goal").value = "";
}
function validateForm() {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let goal = document.getElementById("goal").value.trim();

    let valid = true;

    // Clear old errors
    document.getElementById("nameError").innerText = "";
    document.getElementById("emailError").innerText = "";
    document.getElementById("goalError").innerText = "";

    // Name validation
    if (name === "") {
        document.getElementById("nameError").innerText = "Name is required";
        valid = false;
    } 
    else if (!/^[A-Za-z ]{3,30}$/.test(name)) {
        document.getElementById("nameError").innerText = "Only letters allowed (min 3 chars)";
        valid = false;
    }

    // Email validation
    if (email === "") {
        document.getElementById("emailError").innerText = "Email is required";
        valid = false;
    }
    else if (!/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(email)) {
        document.getElementById("emailError").innerText = "Invalid email format";
        valid = false;
    }

    // Goal validation
    if (goal === "") {
        document.getElementById("goalError").innerText = "Goal is required";
        valid = false;
    }
    else if (!/^[A-Za-z ]{2,20}$/.test(goal)) {
        document.getElementById("goalError").innerText = "Only text allowed";
        valid = false;
    }

    return valid;
}

// Load Data on Start
displayStudents();
