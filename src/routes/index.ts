import { Router, Request, Response } from 'express';
import { getUsers, getUserById, createUser, updateUserById, deleteUserById } from '../controllers/userController';

const router = Router();

// router.get("/", (req: Request, res: Response) => {
//   res.json({ msg: "Express + TypeScript Server" });
// });

// Define your routes here
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.put("/users/:id", updateUserById);
router.delete("/users/:id", deleteUserById);

export default router;
