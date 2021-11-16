import chai from 'chai';
const expect = chai.expect;
const TravelerRepository = require('../src/travelerRepo');
const Traveler = require('../src/traveler');

describe('TravelerRepository', () => {

  let travelerRepo;
  let travelerData;

  beforeEach(() => {

    travelerData = [
      {
        "id": 1,
        "name": "Ham Leadbeater",
        "travelerType": "relaxer"
      },
      {
        "id": 2,
        "name": "Rachael Vaughten",
        "travelerType": "thrill-seeker"
      },
      {
        "id": 3,
        "name": "Sibby Dawidowitsch",
        "travelerType": "shopper"
      },
      {
        "id": 4,
        "name": "Leila Thebeaud",
        "travelerType": "photographer"
      },
      {
        "id": 5,
        "name": "Tiffy Grout",
        "travelerType": "thrill-seeker"
      },
      {
        "id": 6,
        "name": "Laverna Flawith",
        "travelerType": "shopper"
      },
      {
        "id": 7,
        "name": "Emmet Sandham",
        "travelerType": "relaxer"
      },
      {
        "id": 8,
        "name": "Carlin O'Reilly",
        "travelerType": "history buff"
      },
      {
        "id": 9,
        "name": "Natalee Deegin",
        "travelerType": "relaxer"
      },
      {
        "id": 10,
        "name": "Rickie Jodlowski",
        "travelerType": "relaxer"
      }
    ];

    travelerRepo = new TravelerRepository(travelerData);

    travelerRepo.instantiateTravelers();
    
  });

  it('should be a function', () => {

    expect(TravelerRepository).to.be.a('function');
  });

  it('should hold instances of Travelers', () => {

    expect(travelerRepo.travelerList[0]).to.be.an.instanceOf(Traveler);
  }); 

  it('should be able to get a single traveler by ID', () => {

    expect(travelerRepo.findTraveler(3).name).to.equal('Sibby Dawidowitsch');
  });

  it('should be able to hold travelers in a list', () => {

    expect(travelerRepo.travelerList).to.be.an('array');
  });

  it('should be able to get a random traveler from the list', () => {

    expect(travelerRepo.getRandomTraveler()).to.be.an.instanceOf(Traveler);
  });
});