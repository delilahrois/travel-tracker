import chai from 'chai';
const expect = chai.expect;
const Traveler = require('../src/traveler');

describe('Traveler', () => {

  let travelerRepo;

  beforeEach(() => {

    travelerRepo = [
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
        },
        {
        "id": 11,
        "name": "Joy Dovington",
        "travelerType": "history buff"
        },
        {
        "id": 12,
        "name": "Lannie Heynel",
        "travelerType": "history buff"
        },
        {
        "id": 13,
        "name": "Torin Billington",
        "travelerType": "photographer"
        },
        {
        "id": 14,
        "name": "Ellynn Kyne",
        "travelerType": "history buff"
        },
        {
        "id": 15,
        "name": "Emeline Winslet",
        "travelerType": "history buff"
        },
        {
        "id": 16,
        "name": "Deirdre Paeckmeyer",
        "travelerType": "foodie"
        },
        {
        "id": 17,
        "name": "Julian Ullyott",
        "travelerType": "relaxer"
        },
        {
        "id": 18,
        "name": "Sheila Valentetti",
        "travelerType": "foodie"
        },
        {
        "id": 19,
        "name": "Felicdad Rishbrook",
        "travelerType": "thrill-seeker"
        },
        {
        "id": 20,
        "name": "Gregg Tours",
        "travelerType": "thrill-seeker"
        }
    ];

    travelerRepo.forEach((personObject) => {
      person = new Traveler(personObject);
    })

  })
  
  it('should be a function', () => {
    expect(Traveler).to.be.a('function');
  });

  it('should have a name', () => {
    expect
  })
});