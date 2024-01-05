import { Router } from "express";
import { UserUnitOfWork } from "../users/user.unitofwork";
import { User } from "../entitys/user.entity";
import * as bcrypt from 'bcrypt';

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

    UserRouter.post("/users", async (req, res) => {
        try {

            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                res.status(400).json({ error: "Data is invalid" });
                return;
            }

            const user = new User();
            user.name = name;
            user.email = email;

            const salt = await bcrypt.genSaltSync(10);
            const hashedPassword = await bcrypt.hashSync(password, salt);
            user.password = hashedPassword;

            await userUnitOfWork.save(user);

            res.status(201).json(user);
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message }); // Use a more specific error message if possible
        }
    });

    UserRouter.post("/users/:id", async (req, res) => {
        try {
            const id = parseInt(req.params.id);

            const { name, email, password } = req.body;

            if (!name || !email) {
                res.status(400).json({ error: "Data is invalid" });
                return;
            }

            const user = await userUnitOfWork.find(id);
            if (!user) {
                res.status(404).json({ error: "User not found" });
                return;
            }

            user.name = name;
            user.email = email;

            if (password) {
                const salt = await bcrypt.genSaltSync(10);
                const hashedPassword = await bcrypt.hashSync(password, salt);

                const userPassword = user.password;
                console.log(userPassword, hashedPassword)
                await bcrypt.compare(hashedPassword, userPassword).then((isMatch) => {
                    if (isMatch) {
                        res.status(400).json({ error: "Password is the same as the current password" });
                        return;
                    }
                });
            }


            await userUnitOfWork.save(user);

            res.status(200).json(user);
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message }); // Use a more specific error message if possible
        }
    });

    UserRouter.delete("/users/:id", async (req, res) => {
        try {
            const id = parseInt(req.params.id);

            await userUnitOfWork.delete(id);

            res.status(204).end(); // No Content
        } catch (error) {
            console.error(error);
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

