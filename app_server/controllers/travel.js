const tripsEndpoint = 'http://localhost:3000/api/trips';

const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json'
  }
};

const travel = async (req, res, next) => {
  try {
    const response = await fetch(tripsEndpoint, options);

    if (!response.ok) {
      throw new Error(`Unable to retrieve trips: HTTP ${response.status}`);
    }

    const data = await response.json();

    let trips = [];
    let message = '';

    if (!Array.isArray(data)) {
      message = 'API lookup error.';
    } else {
      trips = data;

      if (trips.length === 0) {
        message = 'No trips exist in our database.';
      }
    }

    return res.render('travel', {
      title: 'Travlr Getaways',
      trips,
      message
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = { travel };