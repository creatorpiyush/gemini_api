const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require("cors");
require("dotenv/config");

const { appConfig } = require("./src/config/appConfig.js");
const { aiController } = require("./src/controllers/aiController.js");


app.use(
    cors({
      origin: appConfig.corsConfig.origin,
      methods: appConfig.corsConfig.methods,
      allowedHeaders: ["Content-Type", "application/json"],
    })
  );

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/chat-with-gemini", aiController);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});