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
}

module.exports = DestinationRepository;