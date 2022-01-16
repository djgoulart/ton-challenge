import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { authenticateRoutes } from "@shared/infra/http/routes/authenticate.routes";
import { usersRoutes } from "@shared/infra/http/routes/users.routes";
import { counterRoutes } from "@shared/infra/http/routes/counter.routes";

const router = Router();

router.get("/", ensureAuthenticated, (req, res) => {
  res.json({ msg: "you are authenticated" });
});
router.use(authenticateRoutes);
router.use("/users", usersRoutes);
router.use("/counter", counterRoutes);

export { router }
