import express, { json, urlencoded } from "express";
import db from "./config/connection";
import routes from "./routes";

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