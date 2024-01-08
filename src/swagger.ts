const swaggerAutogen = require("swagger-autogen");


const doc = {
    info: {
        version: 'v1.0.0',
        title: 'ToDo Api Propyect',
        description: 'Implementation of Swagger with TypeScript'
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: ''
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: '',
            }
        }
    },
    definitions: {
        User: {
            id: "integer",
            name: "string",
            email: "string",
            password: "string",
            todoLists: [
                { $ref: "#/definitions/TodoList" }
            ]
        },
        TodoList: {
            id: "integer",
            name: "string",
            description: "string",
            project: {
                $ref: "#/definitions/Project"
            },
            user: {
                $ref: "#/definitions/User"
            },
            tasks: [
                { $ref: "#/definitions/Task" }
            ]
        },
        Project: {
            id: "integer",
            name: "string",
            description: "string",
            startDate: { type: "string", format: "date-time" },
            endDate: { type: "string", format: "date-time" },
            todoLists: [
                { $ref: "#/definitions/TodoList" }
            ]
        },
        Task: {
            id: "integer",
            name: "string",
            description: "string",
            dueDate: { type: "string", format: "date-time" },
            priority: "integer",
            startTime: { type: "string", format: "date-time" },
            endTime: { type: "string", format: "date-time" },
            duration: "integer",
            completed: "boolean",
            completedOn: { type: "string", format: "date-time" }
        },
        todoList: {
            $ref: "#/definitions/TodoList"
        }
    }
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/routes/index.ts'];

swaggerAutogen({ openapi: '3.1.0' })(outputFile, endpointsFiles, doc);