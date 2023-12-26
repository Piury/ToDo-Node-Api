import { Router } from "express";
import { UserUnitOfWork } from "../users/user.unitofwork";



export const UserRouter = Router();
let userUnitOfWork: UserUnitOfWork | null = null;

async function initializeConnection() {
    try {
        userUnitOfWork = await UserUnitOfWork.create();
    } catch (error) {
        console.error("Error initializing connection:", error);
    }
}

async function main() {
    await initializeConnection();

    UserRouter.get("/users/:id", async (req, res) => {
        const id = parseInt(req.params.id);
        try {
            const user = await userUnitOfWork.find(id);
            if (!user) {
                res.status(404).json({ error: "User not found" });
            } else {
                res.json(user);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    UserRouter.get("/users", async (req, res) => {
        try {
            const user = await userUnitOfWork.findAll();
            if (!user) {
                res.status(404).json({ error: "Users not founds" });
            } else {
                res.json(user);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

}
main();

process.on("SIGINT", () => {
    if (userUnitOfWork) {
        userUnitOfWork.dispose();
    }
});

