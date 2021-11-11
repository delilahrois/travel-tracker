const Trip = require('./trip');

class TripRepository {
  constructor(tripsData) {
    this.trips = tripsData;
    this.tripList = [];
  }

  createTripsList() {
    this.trips.forEach((tripData) => {
      let eachTrip = new Trip(tripData);
      this.tripList.push(eachTrip);
    })
  }
}

module.exports = TripRepository;