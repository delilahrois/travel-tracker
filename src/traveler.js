class Traveler {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.travelerType = data.travelerType;
    this.totalSpentOnTripsThisYear = null;
  }

  // calculateTripsTotal() {
  //   this.totalSpentOnTripsThisYear 
  // }
}

module.exports = Traveler;