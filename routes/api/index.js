const apiRoutes = require(".");
const router = require("express").Router();


// Middleware
router.use("/api", apiRoutes);
router.use((req, res) => res.send("Wrong route!"));

module.exports = router;