import { Router } from "express";
import { TaskUnitOfWork } from "../data-access/task/task.unitofwork";
import { Task } from "../entitys/task.entity";



export const TaskRouter = Router();
let taskUnitOfWork: TaskUnitOfWork | null = null;

async function initializeConnection() {
    try {
        taskUnitOfWork = await TaskUnitOfWork.create();
    } catch (error) {
        console.error("Error initializing connection:", error);
    }
}

async function main() {
    await initializeConnection();

    TaskRouter.get("/Tasks/:id", async (req, res) => {
        // #region Swagger
        /*
            #swagger.tags = ['Tasks']
            #swagger.summary = Gets a task by ID
            #swagger.parameters = [{ in: "path", name: "id", type: "string", required: true }]
            #swagger.responses = {
            "200": { description: "Task found", schema: { $ref: "#/definitions/Task" } },
            "404": { description: "Task not found" },
            "500": { description: "Internal server error" }}
        */

        // #endregion

        const id = req.params.id;
        try {
            const task = await taskUnitOfWork.find(id);
            if (!task) {
                res.status(404).json({ error: "Task not found" });
            } else {
                res.json(task);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    TaskRouter.get("/Tasks", async (req, res) => {
        // #region Swagger
        /*
        #swagger.tags = ['Tasks']
        #swagger.summary = Gets all Tasks
        #swagger.responses = {
          "200": {
            description: "Tasks found",
            schema: {
              type: "array",
              items: { $ref: "#/definitions/Task" }
            }
          },
          "404": { description: "Tasks not found" },
          "500": { description: "Internal server error" }
        }
        */
        // #endregion
        try {
            const task = await taskUnitOfWork.findAll();
            if (!task) {
                res.status(404).json({ error: "Tasks not founds" });
            } else {
                res.json(task);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    TaskRouter.post("/Tasks", async (req, res) => {
        // #region Swagger
        /*
        #swagger.tags = ['Tasks']
        #swagger.summary = Creates a new task
        #swagger.consumes = ['application/json']
        #swagger.produces = ['application/json']
        #swagger.parameters = [{ in: "body", name: "body", description: "Task object", schema: { $ref: "#/definitions/Task" } }]
        #swagger.responses = {
          "201": {
            description: "Task created",
            schema: { $ref: "#/definitions/Task" }
          },
          "400": { description: "Bad request" },
          "500": { description: "Internal server error" }
        }
        */
        // #endregion
        try {

            const task = req.body;

            const validationRules = {
                name: {
                    required: true,
                    type: "string",
                },
                description: {
                    required: false,
                    type: "string",
                    minLength: 10,
                },
                dueDate: {
                    required: true,
                    type: "date",
                    after: new Date(),
                },
                priority: {
                    required: true,
                    type: "number",
                    range: [1, 10],
                },
                startTime: {
                    required: false,
                    type: "date",
                },
                endTime: {
                    required: false,
                    type: "date",
                },
                duration: {
                    required: false,
                    type: "number",
                },
                completed: {
                    required: true,
                    type: "boolean",
                },
                completedOn: {
                    required: false,
                    type: "date",
                },
            };

            const isValid = validateObject(task, validationRules);

            await taskUnitOfWork.save(task);

            res.status(201).json(task);
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message }); // Use a more specific error message if possible
        }
    });

    TaskRouter.post("/Tasks/:id", async (req, res) => {
        // #region Swagger
        /*
        #swagger.tags = ['Tasks']
        #swagger.summary = Updates an existing task
        #swagger.consumes = ['application/json']
        #swagger.produces = ['application/json']
        #swagger.parameters = [
          { in: "path", name: "id", type: "string", required: true, description: "Task ID" },
          { in: "body", name: "body", description: "Task object", schema: { $ref: "#/definitions/Task" } }
        ]
        #swagger.responses = {
          "200": {
            description: "Task updated",
            schema: { $ref: "#/definitions/Task" }
          },
          "400": { description: "Bad request" },
          "404": { description: "Task not found" },
          "500": { description: "Internal server error" }
        }
        */
        // #endregion
        try {
            const id = req.params.id;

            const task = req.body;

            const validationRules = {
                name: {
                    required: true,
                    type: "string",
                },
                description: {
                    required: false,
                    type: "string",
                    minLength: 10,
                },
                dueDate: {
                    required: true,
                    type: "date",
                    after: new Date(),
                },
                priority: {
                    required: true,
                    type: "number",
                    range: [1, 10],
                },
                startTime: {
                    required: false,
                    type: "date",
                },
                endTime: {
                    required: false,
                    type: "date",
                },
                duration: {
                    required: false,
                    type: "number",
                },
                completed: {
                    required: true,
                    type: "boolean",
                },
                completedOn: {
                    required: false,
                    type: "date",
                },
            };

            const isValid = validateObject(task, validationRules);

            await taskUnitOfWork.save(task);

            res.status(200).json(task);
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message }); // Use a more specific error message if possible
        }
    });

    TaskRouter.delete("/Tasks/:id", async (req, res) => {
        // #region Swagger
        /*
        #swagger.tags = ['Tasks']
        #swagger.summary = Deletes an existing task
        #swagger.parameters = [{ in: "path", name: "id", type: "string", required: true, description: "Task ID" }]
        #swagger.responses = {
          "204": { description: "Task deleted" },
          "404": { description: "Task not found" },
          "500": { description: "Internal server error" }
        }
        */
        // #endregion
        try {
            const id = req.params.id;

            await taskUnitOfWork.delete(id);

            res.status(204).end(); // No Content
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    });

}

main();

process.on("SIGINT", () => {
    if (taskUnitOfWork) {
        taskUnitOfWork.dispose();
    }
});

