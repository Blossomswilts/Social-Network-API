const express = require("express");
const { json, urlencoded } = require("express");
const db = require("./config/connection.js");
const routes = require("./routes/index.js");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(routes);

db.once("open", () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});