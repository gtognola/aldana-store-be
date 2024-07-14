const express = require("express");
const routes = require("./src/routes");
require("dotenv").config();

const app = express();
const port = 3000;

app.use("/", routes);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
