import { Router } from "express";
import {
  addToCollection,
  getCollection,
  removeFromCollection,
} from "../../controllers/collectionController.js";

export const collectionRouter = Router();

// collectionRouter.route("/").post(addToCollection).get(getCollection);
collectionRouter.post("/add", addToCollection);
collectionRouter.get("/", getCollection);
collectionRouter.delete("/:id", removeFromCollection);
