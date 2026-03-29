const appModel = require('../models/Apps');

const getAllApps = async (req, res) => {
    try {
        const apps = await appModel.find();
        if (apps.length === 0) {
            res.status(200).send({
                success: false,
                message: `No apps registered for Mail Sender Helper API.`,
                data: null,
            });
        } else {
            res.status(200).send({
                success: true,
                message: `Apps registered in Mail Sender API Fetched successfully.`,
                data: apps,
            });
        }
    }
    catch (error) {
        res.status(400).send({
            success: false,
            data: error,
            message: error.message,
        });
    }
}

const getExistingApp = async (req, res) => {
    try {
        const _id = req.params.id;
        const appL = await appModel.findById(_id);
        if (!appL) {
            res.status(200).send({
                success: false,
                message: `No app registered with id: ${_id}.`,
                data: null,
            });
        } else {
            res.status(200).send({
                success: true,
                message: `Registered app with appName:${appL.name} and appLink:${appL.appLinkURL} fetched succesfully.`,
                data: appL,
            });
        }
    }
    catch (error) {
        res.status(400).send({
            success: false,
            data: error,
            message: error.message,
        });
    }
}

const addNewApp = async (req, res) => {
    try {
        const { appName, appLinkURL } = req.body;

        // Build the query dynamically
        const query = [];
        if (appName) query.push({ appName });
        if (appLinkURL) query.push({ appLinkURL });

        if (query.length === 0) {
            return res.status(400).json({ message: "Provide appName or appLinkURL" });
        }

        // Use $or if there are multiple conditions
        const appL = await appModel.findOne(query.length > 1 ? { $or: query } : query[0]);
        if (!appL) {
            const newApp = new appModel();
            newApp.appName = req.body.appName;
            newApp.appLinkURL = req.body.appLinkURL;
            await newApp.save();
            res.status(200).send({
                success: true,
                message: `New App with appName:${appName} and appLink:${appLinkURL} is registered successfully.`,
                data: newApp,
            });
        }
        else{
            res.status(200).send({
                success: false,
                message: `App with appName:${appName} and appLink:${appLinkURL} already exists.`,
                data: appL,
            });
        }

    }
    catch (error) {
      res.status(400).send({
            success: false,
            data: error,
            message: error.message,
        });
    }
}

const modifyExistingApp = async (req, res) => {
    try {
      const _id = req.params.id;
      const { appName, appLinkURL } = req.body;
      const appL = await appModel.findById(_id);
      if(!appL){
        res.status(200).json({
            success: false,
            message: `App details with id: ${_id} is doesn't exists.`,
            data: null,
        });
      }
      else{
        appL.appName = appName;
        appL.appLinkURL = appLinkURL;
        await appL.save();
        res.status(200).json({
            success: true,
            message: `Registered App details with id: ${_id} is updated successfully.`,
            data: appL,
        });
      }
    }
    catch (error) {
      res.status(400).send({
            success: false,
            data: error,
            message: error.message,
        });
    }
}

const deleteExistingApp = async (req, res) => {
    try {
      const _id = req.params.id;
      const appL = await appModel.findById(_id);
      if(!appL){
        res.status(200).json({
            success: false,
            message: `App details with id: ${_id} doesn't exists.`,
            data: null,
        });
      }
      else{
        await appL.deleteOne();;
        res.status(200).json({
            success: true,
            message: `Registered App details with id: ${_id} is deleted successfully.`,
            data: null,
        });
      }
    }
    catch (error) {
      res.status(400).send({
            success: false,
            data: error,
            message: error.message,
        });
    }
}

module.exports = {getAllApps,getExistingApp,addNewApp,modifyExistingApp,deleteExistingApp};