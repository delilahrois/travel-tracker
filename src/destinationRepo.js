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
}

module.exports = DestinationRepository;