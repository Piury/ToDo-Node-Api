import e, { Router } from "express";
import { ProjectUnitOfWork } from "../data-access/project/project.unitofwork";
import { Project } from "../entitys/project.entity";

export const ProjectRouter = Router();
let projectUnitOfWork: ProjectUnitOfWork | null = null;

async function initializeConnection() {
    try {
        projectUnitOfWork = await ProjectUnitOfWork.create();
    } catch (error) {
        console.error("Error initializing connection:", error);
    }
}

async function main() {
    await initializeConnection();

    ProjectRouter.get("/project/:id", async (req, res) => {
        // #region Swagger
        /*
        #swagger.tags = ['projects']
        #swagger.summary = Gets a project by ID
        #swagger.parameters = [{ in: "path", name: "id", type: "string", required: true, description: "Project ID" }]
        #swagger.responses = {
          "200": {
            description: "Project found",
            schema: { $ref: "#/definitions/Project" }
          },
          "404": { description: "Project not found" },
          "500": { description: "Internal server error" }
        }
        */
        // #endregion
        const id = req.params.id;
        try {
            const project = await projectUnitOfWork.find(id);
            if (!project) {
                res.status(404).json({ error: "project not found" });
            } else {
                res.json(project);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    ProjectRouter.get("/project", async (req, res) => {
        // #region Swagger
        /*
        #swagger.tags = ['projects']
        #swagger.summary = Gets all projects
        #swagger.responses = {
          "200": {
            description: "Projects found",
            schema: {
              type: "array",
              items: { $ref: "#/definitions/Project" }
            }
          },
          "404": { description: "Projects not found" },
          "500": { description: "Internal server error" }
        }
        */
        // #endregion
        try {
            const project = await projectUnitOfWork.findAll();
            if (!project) {
                res.status(404).json({ error: "project not founds" });
            } else {
                res.json(project);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    ProjectRouter.post("/project", async (req, res) => {
        // #region Swagger
        /*
        #swagger.tags = ['projects']
        #swagger.summary = Creates a new project
        #swagger.consumes = ['application/json']
        #swagger.produces = ['application/json']
        #swagger.parameters = [{ in: "body", name: "body", description: "Project object", schema: { $ref: "#/definitions/Project" } }]
        #swagger.responses = {
          "201": {
            description: "Project created",
            schema: { $ref: "#/definitions/Project" }
          },
          "400": { description: "Bad request" },
          "500": { description: "Internal server error" }
        }
        */
        // #endregion
        try {

            const { name, description, startDate, endDate } = req.body;

            if (!name || !description) {
                res.status(400).json({ error: "Data is invalid" });
                return;
            }

            const project = new Project();
            project.name = name
            project.description = description;
            project.startDate = startDate;
            project.endDate = endDate

            await projectUnitOfWork.save(project);

            res.status(201).json(project);
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message }); // Use a more specific error message if possible
        }
    });

    ProjectRouter.post("/project/:id", async (req, res) => {
        // #region Swagger
        /*
        #swagger.tags = ['projects']
        #swagger.summary = Updates an existing project
        #swagger.consumes = ['application/json']
        #swagger.produces = ['application/json']
        #swagger.parameters = [
          { in: "path", name: "id", type: "string", required: true, description: "Project ID" },
          { in: "body", name: "body", description: "Project object", schema: { $ref: "#/definitions/Project" } }
        ]
        #swagger.responses = {
          "200": {
            description: "Project updated",
            schema: { $ref: "#/definitions/Project" }
          },
          "400": { description: "Bad request" },
          "404": { description: "Project not found" },
          "500": { description: "Internal server error" }
        }
        */
        try {
            const id = req.params.id;


            const { name, description, startDate, endDate } = req.body;

            if (!name || !description) {
                res.status(400).json({ error: "Data is invalid" });
                return;
            }

            const project = await projectUnitOfWork.find(id);

            if (!project) {
                res.status(404).json({ error: "project not found" });
                return;
            }
            project.name = name
            project.description = description;
            project.startDate = startDate;
            project.endDate = endDate

            await projectUnitOfWork.save(project);

            res.status(200).json(project);
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message }); // Use a more specific error message if possible
        }
    });

    ProjectRouter.delete("/project/:id", async (req, res) => {
        // #region Swagger
        /*
        #swagger.tags = ['projects']
        #swagger.summary = Deletes an existing project
        #swagger.parameters = [{ in: "path", name: "id", type: "string", required: true, description: "Project ID" }]
        #swagger.responses = {
          "204": { description: "Project deleted" },
          "404": { description: "Project not found" },
          "500": { description: "Internal server error" }
        }
        */
        // #endregion
        try {
            const id = req.params.id;

            await projectUnitOfWork.delete(id);

            res.status(204).end(); // No Content
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    });

}
main();

process.on("SIGINT", () => {
    if (projectUnitOfWork) {
        projectUnitOfWork.dispose();
    }
});

