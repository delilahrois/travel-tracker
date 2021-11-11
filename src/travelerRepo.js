const Traveler = require("./traveler");

class TravelerRepository {
  constructor(travelerData) {
    this.travelers = travelerData;
    this.travelerList = [];
  }

  instantiateTravelers() {
    this.travelers.forEach(travelerData => {
      let eachTraveler = new Traveler(travelerData);
      this.travelerList.push(eachTraveler);
    })
  }

  findTraveler(id) {
    const result = this.travelerList.find((traveler) => {
      return traveler.id === id;
    })
    return result;
  }

  getRandomTraveler() {
    return Math.floor(Math.random() * this.travelerList.length);
  }
}

module.exports = TravelerRepository;