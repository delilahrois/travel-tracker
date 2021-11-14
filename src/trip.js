class Trip {
  constructor(tripData) {
    this.id = tripData.id;
    this.userID = tripData.userID;
    this.destinationID = tripData.destinationID;
    this.travelers = tripData.travelers;
    this.date = tripData.date;
    this.duration = tripData.duration;
    this.status = tripData.status;
    this.suggestedActivities = tripData.suggestedActivities;
    this.destinationInfo = null;
    this.cost = null;
  }

  getCost() {
    this.cost = ((this.destinationInfo.estimatedFlightCostPerPerson) * 
    this.travelers) + (this.destinationInfo.estimatedLodgingCostPerDay * 
      this.duration);
  }
}

module.exports = Trip;