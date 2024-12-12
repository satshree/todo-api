import express from "express";
import cors from "cors";

import taskRouter from "./routes";

// EXPRESS APP
const app = express();

// PARSE JSON REQUESTS
app.use(express.json());

// CORS
app.use(cors());

// API ROUTES
app.use("/", taskRouter);

// SERVER
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`\n----\nToDo API live listening on port ${port}\n\r----\n`);
});

export {};
