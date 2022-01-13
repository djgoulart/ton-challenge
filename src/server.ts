import express from "express";
import { usersRoutes } from "./routes/users/usersRoutes";

const app = express();

app.use(express.json());
app.use("/users", usersRoutes);

app.listen(3333, () => console.log("Node server running"));
