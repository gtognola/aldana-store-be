const express = require("express");
const routes = require("./src/routes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/", routes);

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
