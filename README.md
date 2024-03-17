# db_test
A small CLI to interact with a Postgres DB for a course. For grading this needs to be public ;-;

video: https://youtu.be/Mup37zLNmCI

### instructions: 
- create a Database called school 
- edit A3.js, lines 6-10 to meet your connection settings (name, host, password)
- manually populate the database by running the dbSetUp.sql file (prefered) or wait until you are running A3.js so it can do that for you. 
- have npm/node installed 
- run `npm i` in root directory of this project 
- then run `node A3.js` 
- interact with the cli 
- ?????
- profit

## function descriptions: 

    getAllStudents(): Retrieves and displays all records from the students table.
    addStudent(first_name, last_name, email, enrollment_date): Inserts a new student record into the students table.
    updateStudentEmail(student_id, new_email): Updates the email address for a student with the specified student_id.
    deleteStudent(student_id): Deletes the record of the student with the specified student_id.

