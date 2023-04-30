const router = require("express").Router();

const homeRoutes = require("./homeRoutes");
const apiRoutes = require("./api");

router.use("/", homeRoutes);
router.use("/users", apiRoutes);

module.exports = router;
