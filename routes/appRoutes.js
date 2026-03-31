const router = require("express").Router();
const { getAllApps, getExistingApp, addNewApp, modifyExistingApp, deleteExistingApp } = require("../controllers/appControllers");



/**
 * @swagger
 * components:
 *   schemas:
 *     Apps:
 *       type: object
 *       required:
 *         - appName
 *         - appLinkURL
 *       properties:
 *         appName:
 *           type: string
 *           description: Name of the App to be registered
 *         appLinkURL:
 *           type: string
 *           description: Link/URL of the App to be registered 
 *     
 */

//routes for adding apps
/**
 * @swagger
 * tags:
 *   name: Apps
 *   description: REST API For Managing Apps
 * /api/apps/getAllApps:
 *   get:
 *     tags: [Apps]
 *     description: Returns all registered apps
 *     responses:
 *       200:
 *         description: Returns all the registered apps
 *       500:
 *         description: Internal Server Error
 */
router.get("/getAllApps",getAllApps);

/**
 * @swagger
 * tags:
 *   name: Apps
 *   description: REST API For Managing Apps
 * /api/apps/getExistingApp/{id}:
 *   get:
 *     tags: [Apps]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The Selected App ID.
 *     description: Returns Selected Registered App By Id
 *     responses:
 *       200:
 *         description: Returns the selected blog by id
 *       500:
 *         description: Internal Server Error
 */
router.get("/getExistingApp/:id",getExistingApp);

/**
 * @swagger
 * tags:
 *   name: Apps
 *   description: REST API For Managing Apps
 * /api/apps/addNewApp:
 *   post:
 *     tags: [Apps]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Apps'
 *     responses:
 *       200:
 *         description: New App registered successfully
 *       500:
 *         description: Internal Server Error
 */
router.post("/addNewApp",addNewApp);

/**
 * @swagger
 * tags:
 *   name: Apps
 *   description: REST API For Managing Apps
 * /api/apps/modifyExistingApp/{id}:
 *   put:
 *     tags: [Apps]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The Selected App ID.
 *     description: Updates Selected Registered App details By Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Apps'
 *     responses:
 *       200:
 *         description: Existing Registered App details updated successfully
 *       500:
 *         description: Internal Server Error
 */
router.put("/modifyExistingApp/:id",modifyExistingApp);


/**
 * @swagger
 * tags:
 *   name: Apps
 *   description: REST API For Managing Apps
 * /api/apps/deleteExistingApp/{id}:
 *   delete:
 *     tags: [Apps]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The Selected App ID.
 *     description: Deletes Selected Registered App By Id
 *     responses:
 *       200:
 *         description: Deleted the selected blog by id
 */
router.delete("/deleteExistingApp/:id",deleteExistingApp);

module.exports = router;