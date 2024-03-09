const postgres = require("postgres");
const readline = require("readline");

// below is the connection to the database
const sql = postgres({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "school",
});

// below is the function to reset the database
const resetDatabase = async () => {
  await sql`DROP TABLE IF EXISTS students`;
  await sql`CREATE TABLE Students (
        student_id SERIAL PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        enrollment_date DATE DEFAULT CURRENT_DATE
        );`;
  await sql`INSERT INTO students (first_name, last_name, email, enrollment_date) VALUES
    ('John', 'Doe', 'john.doe@example.com', '2023-09-01'),
    ('Jane', 'Smith', 'jane.smith@example.com', '2023-09-01'),
    ('Jim', 'Beam', 'jim.beam@example.com', '2023-09-02');`;
};

// below are the functions performing the CRUD operations

const getAllStudents = async () => {
  const students = await sql`SELECT * FROM students`;
  console.log(students);
};

const addStudent = async (first_name, last_name, email, enrollment_date) => {
  await sql`INSERT INTO students (first_name, last_name, email, enrollment_date) VALUES (${first_name}, ${last_name}, ${email}, ${enrollment_date})`;
};

const updateStudentEmail = async (student_id, new_email) => {
  await sql`UPDATE students SET email = ${new_email} WHERE student_id = ${student_id}`;
};

const deleteStudent = async (student_id) => {
  await sql`DELETE FROM students WHERE student_id = ${student_id}`;
};

// ask the user if they have set up the database or would like to reset it
// if they would like to reset it, call the resetDatabase function
// then ask the user if they would like to add, update, or delete a student
// if they would like to add a student, ask for the first name, last name, email, and enrollment date
// then call the addStudent function
// if they would like to update a student, ask for the student id and the new email
// then call the updateStudentEmail function
// if they would like to delete a student, ask for the student id
// then call the deleteStudent function
// then call the getAllStudents function to show the updated list of students

// below is the code to ask the user if they would like to add, update, or delete a student
const lines = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// helper function to ask a question and wait for it to be answered
const askQuestion = (query) => {
  return new Promise((resolve) =>
    lines.question(query, (answer) => resolve(answer))
  );
};

// helper function to ask the user if they would like to add, update, or delete a student
const askQuestions = async () => {
  var running = true;

  while (running) {
    const response = await askQuestion(
      "Would you like to add (1), update (2), or delete (3) a student, or view all (4) students? q to quit"
    );

    switch (response) {
      case "add":
      case "1":
        const firstName = await askQuestion(
          "What is the student's first name? "
        );
        const lastName = await askQuestion("What is the student's last name? ");
        const email = await askQuestion("What is the student's email? ");
        const enrollmentDate = await askQuestion(
          "What is the student's enrollment date? yyyy-mm-dd "
        );
        await addStudent(firstName, lastName, email, enrollmentDate);
        await getAllStudents();
        break;
      case "update":
      case "2":
        const studentIdForUpdate = await askQuestion(
          "What is the student's id? "
        );
        const newEmail = await askQuestion("What is the student's new email? ");
        await updateStudentEmail(studentIdForUpdate, newEmail);
        await getAllStudents();
        break;
      case "delete":
      case "3":
        const studentIdForDelete = await askQuestion(
          "What is the student's id? "
        );
        await deleteStudent(studentIdForDelete);
        await getAllStudents();
        break;
      case "view":
      case "4":
        await getAllStudents();
        break;
      case "q":
        running = false; // Set the flag to false to break the loop
        console.log("Goodbye!");
        break;
      default:
        console.log("Invalid option, please try again.");
    }
  }
  lines.close();
};

// below is the code to check if the database has been set up
const checkIfDbSetup = async () => {
  return new Promise((resolve, reject) => {
    lines.question(
      "Have you set up the database? (yes/no) ",
      async (response) => {
        if (response === "no") {
          await resetDatabase();
          console.log(
            "DB has been set up! Please manually verify as there are no try-catches in the reset process."
          );
          resolve();
        } else {
          console.log("Great! Let's get started.");
          resolve();
        }
      }
    );
  });
};

const main = async () => {
  await checkIfDbSetup();
  askQuestions();
};

main();
