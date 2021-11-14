class Traveler {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.travelerType = data.travelerType;
    this.totalSpentOnTripsThisYear = null;
  }

  getFirstName() {
    return this.name.split(' ')[0];
  }
}

module.exports = Traveler;