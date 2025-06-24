import { Router } from "express";
import {
  findSchool,
  findSchoolExact,
  getCategories,
  getSChoolByid,
  getSchools,
  rankSchools,
} from "../../controllers/schoolController.js";

export const schoolRouter = Router();

schoolRouter.get("/schools/search", findSchool);
schoolRouter.get("/schools/ranked", rankSchools);
// schoolRouter.post("/schools/create", createSchool);
schoolRouter.get("/schools/search-exact", findSchoolExact);
schoolRouter.get("/schools", getSchools);
schoolRouter.get("/schools/category/:category", getCategories); //this is working well if its in params
schoolRouter.get("/schools/id/:id", getSChoolByid); //fuck this shit i don't like how she is always s
