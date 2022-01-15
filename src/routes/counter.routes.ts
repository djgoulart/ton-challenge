import { Router } from "express";

import { ViewCounterController } from "../modules/hits/useCases/viewCounter/ViewCounterController";
import { CreateCounterController } from "../modules/hits/useCases/createCounter/CreateCounterController";
import { UpdateCounterController } from "../modules/hits/useCases/updateCounter/UpdateCounterController";

const counterRoutes = Router();

const viewCounterController = new ViewCounterController();
const createCounterController = new CreateCounterController();
const updateCounterController = new UpdateCounterController();

counterRoutes.get("/:id", viewCounterController.handle);
counterRoutes.post("/", createCounterController.handle);
counterRoutes.put("/:id", updateCounterController.handle);

export { counterRoutes };



