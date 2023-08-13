const router = require("express").Router();
//api routes
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

router.use((req, res) => {
    res.status(404).send("<h1>404 Error! Page Not Found</h1>");
});

module.exports = router;
