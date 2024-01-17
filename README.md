#ToDoApp

Description
ToDoApp is a simple and flexible task management application built with TypeScript, Node.js, Express, and TypeORM.

The application allows users to create, retrieve, update, and delete tasks. Tasks can be organized into projects, making it easy to track related tasks.

Installation
To install ToDoApp, follow these steps:

Clone the GitHub repository:
git clone https://github.com/Piury/todoapp.git


2. Navigate to the project directory:

cd todoapp


3. Install the dependencies:

npm install


4. Configure the database connection:

* Open the `.env` file and configure the environment variables for the database connection.
* For example, for a MySQL database, configure the following variables:

DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=todoapp


5. Create the database, the application user, and grant the user permissions:

Create the database
CREATE DATABASE todoapp;

Create the application user
CREATE USER 'todoapp'@'localhost' IDENTIFIED BY 'password';

Grant the user permissions
GRANT ALL PRIVILEGES ON todoapp.* TO 'todoapp'@'localhost';


6. Run the migrations to create the database tables:

npm run migrate

Usage
The application can be used through a RESTful API. For more information on the API endpoints, see the Swagger documentation:

http://localhost:3000/api/docs

Examples
The following examples show how to use the RESTful API to create, retrieve, update, and delete tasks:

Create a task

curl -X POST 

-H "Content-Type: application/json" 

-d '{
"name": "New task",
"description": "This is a new task",
"projectId": "1"
}' 

http://localhost:3000/api/tasks


**Retrieve a task**

curl http://localhost:3000/api/tasks/1


**Update a task**

curl -X PUT 

-H "Content-Type: application/json" 

-d '{
"name": "Updated task",
"description": "This is an updated task",
"completed": true
}' 

http://localhost:3000/api/tasks/1


**Delete a task**

curl -X DELETE http://localhost:3000/api/tasks/1

Improvements
The application is still under development and the following improvements can be made:

Implement update and delete functionality for tasks.
Implement validation rules to ensure data integrity and consistency.
Improve error handling to provide more informative error messages and handle potential exceptions gracefully.
Generate complete Swagger documentation.
Explore unit and integration tests to ensure code quality and maintainability.
Contributions
All contributions are welcome. If you find any issues or have suggestions, please open a new issue in the GitHub repository.