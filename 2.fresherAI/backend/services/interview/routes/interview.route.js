// import express from "express"
// import { getAllInterviews, getInterview, startInterview, submitAnswer , } from "../controllers/interview.controller.js"

// const interviewRouter = express.Router()

// interviewRouter.post("/start",startInterview)

// //chat gpt code start

// //interviewRouter.post("/end", endInterview);
// //chatgptcodeend
// interviewRouter.post("/answer",submitAnswer)

// interviewRouter.get("/all",getAllInterviews)

// interviewRouter.get("/:id",getInterview)




// export default interviewRouter

//chatgpt code 😄😄😄😄😄😄


import express from "express";

import {
  getAllInterviews,
  getInterview,
  startInterview,
  submitAnswer,
  endInterview
} from "../controllers/interview.controller.js";

const interviewRouter = express.Router();

interviewRouter.post("/start", startInterview);

interviewRouter.post("/answer", submitAnswer);

// End interview
interviewRouter.post("/end", endInterview);

interviewRouter.get("/all", getAllInterviews);

interviewRouter.get("/:id", getInterview);

export default interviewRouter;
