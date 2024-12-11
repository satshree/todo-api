const express = require("express");
const cors = require("cors");

// EXPRESS APP
const app = express();

// PARSE JSON REQUESTS
app.use(express.json());

// CORS
app.use(cors());

// SERVER
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`\n----\nToDo API live listening on port ${port}\n\r----\n`);
});
