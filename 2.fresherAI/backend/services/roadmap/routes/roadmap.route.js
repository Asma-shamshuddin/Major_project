// import express from "express"
// import { generateRoadmap, getAllRoadmap, getRoadmapbyId } from "../controllers/roadmap.controller.js"

// const roadmapRouter = express.Router()

// roadmapRouter.post("/generate" , generateRoadmap)

// roadmapRouter.get("/all" ,getAllRoadmap )

// roadmapRouter.get("/:id",getRoadmapbyId)

// export default roadmapRouter


//chatgpt code😄😄😄😄😄😄


import express from "express";

import {
    generateRoadmap,
    getAllRoadmap,
    getRoadmapbyId,
    deleteRoadmap
} from "../controllers/roadmap.controller.js";

const roadmapRouter = express.Router();

roadmapRouter.post("/generate", generateRoadmap);

roadmapRouter.get("/all", getAllRoadmap);

// Delete a specific roadmap
roadmapRouter.delete("/:id", deleteRoadmap);

// Get a specific roadmap
roadmapRouter.get("/:id", getRoadmapbyId);

export default roadmapRouter;
