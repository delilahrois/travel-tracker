class Traveler {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.travelerType = data.travelerType;
    this.totalSpentOnTripsThisYear = null;
    this.pastTrips = [];
    this.currentTrips = [];
    this.upcomingTrips = [];
    this.pendingTrips = [];
  }

  getFirstName() {
    return this.name.split(' ')[0];
  }
}

module.exports = Traveler;