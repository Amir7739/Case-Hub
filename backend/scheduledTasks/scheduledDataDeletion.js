
// const cron = require('node-cron');
// const UserFormModels = require('../models/UserFormModels');
// const HrModel = require('../models/HRModel');
// const AdminModel = require('../models/AdminModel');
// const { OpsDataModel, MarketingDataModel, CreditDataModel, DirecotorDataModel, GrowthDataModel, AccAndFinDataModel } = require('../models/commonModel');

// // Define a cron job to delete resolved data after one minute
// cron.schedule('* * * * *', async () => {
//     try {
//         // Get the current date and time
//         const currentTime = new Date();

//         // Calculate the time one minute ago
//         const oneMinuteAgo = new Date(currentTime);
//         oneMinuteAgo.setMinutes(oneMinuteAgo.getMinutes() - 1);

//         // Define an array of models
//         const models = [UserFormModels, HrModel, AdminModel, OpsDataModel, MarketingDataModel, CreditDataModel, DirecotorDataModel, GrowthDataModel, AccAndFinDataModel];

//         // Iterate over each model and delete resolved data older than one minute
//         for (const Model of models) {
//             await Model.deleteMany({ $and: [{ status: 'RESOLVE' }, { userStatus: "ThankYou, It's Resolve😊" }, { resolveDate: { $lte: oneMinuteAgo } }] });
//         }

//         console.log('Resolved data older than one minute has been deleted.');
//     } catch (error) {
//         console.error('Error deleting resolved data:', error);
//     }
// });

const cron = require('node-cron');
const UserFormModels = require('../models/UserFormModels');
const HrModel = require('../models/HRModel');
const AdminModel = require('../models/AdminModel');
const { OpsDataModel, MarketingDataModel, CreditDataModel, DirecotorDataModel, GrowthDataModel, AccAndFinDataModel } = require('../models/commonModel');

// Define a cron job to delete resolved data after one day
cron.schedule('0 0 * * *', async () => { // Executes at midnight every day
    try {
        // Get the current date and time
        const currentTime = new Date();

        // Calculate the time one day ago
        const oneDayAgo = new Date(currentTime);
        oneDayAgo.setDate(oneDayAgo.getDate() - 1); // Subtract 1 day

        // Define an array of models
        const models = [UserFormModels, HrModel, AdminModel, OpsDataModel, MarketingDataModel, CreditDataModel, DirecotorDataModel, GrowthDataModel, AccAndFinDataModel];

        // Iterate over each model and delete resolved data older than one day
        for (const Model of models) {
            await Model.deleteMany({ $and: [{ status: 'RESOLVE' }, { userStatus: "ThankYou, It's Resolve😊" }, { resolveDate: { $lte: oneDayAgo } }] });
        }

        console.log('Resolved data older than one day has been deleted..');
    } catch (error) {
        console.error('Error deleting resolved data:', error);
    }
});