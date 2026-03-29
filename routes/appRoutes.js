const router = require("express").Router();
const { getAllApps, getExistingApp, addNewApp, modifyExistingApp, deleteExistingApp } = require("../controllers/appControllers");

//routes for adding apps
router.get("/getAllApps",getAllApps);
router.get("/getExistingApp/:id",getExistingApp);
router.post("/addNewApp",addNewApp);
router.put("/modifyExistingApp/:id",modifyExistingApp);
router.delete("/deleteExistingApp/:id",deleteExistingApp);

module.exports = router;