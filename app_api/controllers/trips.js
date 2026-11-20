const Trip = require('../models/travlr');

// GET /api/trips
const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find({}).exec();
        return res.status(200).json(trips);
    } catch (err) {
        return res.status(500).json({
            message: 'Unable to retrieve trips.'
        });
    }
};

// GET /api/trips/:tripCode
const tripsFindByCode = async (req, res) => {
    try {
        const trips = await Trip.find({
            code: req.params.tripCode
        }).exec();

        if (trips.length === 0) {
            return res.status(404).json({
                message: 'Trip not found.'
            });
        }

        return res.status(200).json(trips);
    } catch (err) {
        return res.status(500).json({
            message: 'Unable to retrieve trip.'
        });
    }
};

module.exports = {
    tripsList,
    tripsFindByCode
};