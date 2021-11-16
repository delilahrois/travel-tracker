const Destination = require("./destination");

class DestinationRepository {
  constructor(destinationData) {
    this.destinations = destinationData;
    this.destinationList = [];
  }

  createDestinationList() {
    this.destinations.forEach(destinationData => {
      let eachDestination = new Destination(destinationData);
      this.destinationList.push(eachDestination);
    }
    )
  }

  getDestinationByID(destinationID) {
    const result = this.destinationList.find((destination) => {
      return destination.id === destinationID;
    })
    return result;
  }

  findDestinationID(destinationName) {
    const newID = this.destinationList.find((place) => {
      return place.destination === destinationName;
    });
    return newID.id;
  }
}

module.exports = DestinationRepository;