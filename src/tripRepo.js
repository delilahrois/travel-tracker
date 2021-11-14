const Trip = require('./trip');

class TripRepository {
  constructor(tripsData) {
    this.trips = tripsData;
    this.tripList = [];
    this.currentUserTrips = [];
  }

  createTripsList() {
    this.trips.forEach((tripData) => {
      let eachTrip = new Trip(tripData);
      this.tripList.push(eachTrip);
    })
  }

  getTripsByID(travelerID) {
    const result = this.tripList.filter((trip => {
      return trip.userID === travelerID;
    })).forEach((trip) => {
      this.currentUserTrips.push(trip);
    })
    return result;
  }
}

module.exports = TripRepository;