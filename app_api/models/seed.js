const mongoose = require('./db');
const Trip = require('./travlr');
const trips = require('../../data/trips.json');

const seedDB = async () => {
    try {
        // Check sample data before replacing existing trips.
        await Promise.all(
            trips.map((trip) => new Trip(trip).validate())
        );

        await Trip.deleteMany({});
        const results = await Trip.insertMany(trips);

        console.log(`${results.length} trips loaded successfully.`);
    } catch (err) {
        console.error('Error loading trips:', err);
        process.exitCode = 1;
    } finally {
        await mongoose.connection.close();
    }
};

seedDB();