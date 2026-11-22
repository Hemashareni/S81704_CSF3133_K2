// Error 4 ( Lines 2-3): Missing "=" assignment operator when reading form field values.
// Error 5 ( Line 3): Mismatched bracket ")" in document.forms["gradeForm"]["mark").value instead of "]".
// Error 6 ( Line 4): Used assignment "=" instead of strict comparison "===" in if (name = "").
// Error 7 ( Lines 6-13): Misplaced if/else blocks and typo "isNan(mark)" instead of "isNaN(mark)".
// Error 8 ( Line 14): Used "&&" instead of "||" in if (mark < 0 && mark > 100), which can never both be true for one number.
// Error 9 ( Line 16): Missing "=" assignment operator in "mark parseInt(mark);".
// Error 10 (, Lines 23-26): Missing ")" in "else if (mark >= 50", missing "=" in 'grade "F";', and lowercase "c" instead of "C".
// Error 11 ( Lines 28-30): "getElementByID" had wrong casing (should be "getElementById"), missing "=" in innerHTML assignment, and "style.colour" should be "style.color".
// Error 12 ( Lines 38-43): Loop started at "let i = 1" instead of "let i = 0" (skipping grade "A"), tags were concatenated in wrong order, table closing tag was misplaced, and "innerHtml" used wrong casing instead of "innerHTML".

function checkMark() {
  const name = document.forms["gradeForm"]["name"].value.trim();
  const markInput = document.forms["gradeForm"]["mark"].value.trim();

  // Check for empty name
  if (name === "") {
    alert("Name must be filled out.");
    return false;
  }

  // Part 2 (Item 5): Check for empty mark field
  if (markInput === "") {
    alert("Mark field cannot be empty.");
    return false;
  }

  // Check for non-numeric input
  if (isNaN(markInput)) {
    alert("Please enter a valid numeric value.");
    return false;
  }

  const mark = Number(markInput);

  // Check for out-of-range mark (0-100)
  if (mark < 0 || mark > 100) {
    alert("Mark must be between 0 and 100.");
    return false;
  }

  // Determine grade based on mark
  let grade;
  if (mark >= 80) {
    grade = "A";
  } else if (mark >= 65) {
    grade = "B";
  } else if (mark >= 50) {
    grade = "C";
  } else {
    grade = "F";
  }

  const resultEl = document.getElementById("result");
  const timeEl = document.getElementById("checkedTime");

  resultEl.innerHTML = name + " got grade " + grade;

  // Part 2 (Item 6): Colour code result by grade (green for A/B, orange for C, red for F)
  let colour;
  if (grade === "A" || grade === "B") {
    colour = "green";
  } else if (grade === "C") {
    colour = "orange";
  } else {
    colour = "red";
  }

  resultEl.style.color = colour;
  timeEl.style.color = colour;

  // Part 2 (Item 8): Display date and time when the grade was checked
  timeEl.innerHTML = "Checked on: " + new Date();

  return false;
}

// Part 2 (Item 7): Put a random whole number from 0 to 100 into the mark field
function generateRandomMark() {
  const randomMark = Math.floor(Math.random() * 101);
  document.getElementById("mark").value = randomMark;
}

// Display all four grades (A, B, C, F) and their ranges in a table
function showTable() {
  const grades = ["A", "B", "C", "F"];
  const ranges = ["80-100", "65-79", "50-64", "0-49"];

  let tableHTML = "<table>";
  tableHTML += "<tr><th>Grade</th><th>Mark range</th></tr>";

  for (let i = 0; i < grades.length; i++) {
    tableHTML += "<tr><td>" + grades[i] + "</td><td>" + ranges[i] + "</td></tr>";
  }

  tableHTML += "</table>";
  document.getElementById("tableContainer").innerHTML = tableHTML;
}