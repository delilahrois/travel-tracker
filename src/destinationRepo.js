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
    this.destinationList.find((destination) => {
      console.log(destination.id)
      return destination.id === destinationID;
    })
  }

  findDestinationID(destinationName) {
    this.destinationList.find((place) => {
      return place.destination === destinationName;
    })
  }
}

module.exports = DestinationRepository;