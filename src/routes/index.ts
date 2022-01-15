import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

import { authenticateRoutes } from "./authenticate.routes";
import { usersRoutes } from "./users.routes";
import { counterRoutes } from "./counter.routes";

const router = Router();

router.get("/", ensureAuthenticated, (req, res) => {
  res.json({ msg: "you are authenticated" });
});
router.use(authenticateRoutes);
router.use("/users", usersRoutes);
router.use("/counter", counterRoutes);

export { router }
