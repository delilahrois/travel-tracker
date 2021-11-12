import chai from 'chai';
const expect = chai.expect;
const Trip = require('../src/trip');
const Traveler = require('../src/traveler');

describe('Trip', () => {

  let trip1;
  let tripDetails;
  let traveler1;
  let travelerDetails;

  beforeEach(() => {

    tripDetails = [
      {
        "id": 1,
        "userID": 44,
        "destinationID": 49,
        "travelers": 1,
        "date": "2022/09/16",
        "duration": 8,
        "status": "approved",
        "suggestedActivities": []
      },
      {
        "id": 2,
        "userID": 35,
        "destinationID": 25,
        "travelers": 5,
        "date": "2022/10/04",
        "duration": 18,
        "status": "approved",
        "suggestedActivities": []
      },
      {
        "id": 3,
        "userID": 3,
        "destinationID": 22,
        "travelers": 4,
        "date": "2022/05/22",
        "duration": 17,
        "status": "approved",
        "suggestedActivities": []
      },
      {
        "id": 4,
        "userID": 43,
        "destinationID": 14,
        "travelers": 2,
        "date": "2022/02/25",
        "duration": 10,
        "status": "approved",
        "suggestedActivities": []
      }
    ];

    travelerDetails = {
      "id": 3,
      "name": "Sibby Dawidowitsch",
      "travelerType": "shopper"
    };

    trip1 = new Trip(tripDetails[2]);

    traveler1 = new Traveler(travelerDetails);

  });

  it('should be a function', () => {

    expect(Trip).to.be.a('function');
  });

  it('should instantiate a trip', () => {

    expect(trip1).to.be.an.instanceOf(Trip);
  });

  it('should have an ID', () => {

    expect(trip1.id).to.equal(3);
  });

  it('should have a userID that matches the traveler going on the trip', () => {

    expect(trip1.userID).to.equal(traveler1.id);
  });

  it('should have an ID that matches the destination', () => {

    expect(trip1.destinationID).to.equal(22);
  });

  it('should have a list of travelers', () => {

    expect(trip1.travelers).to.equal(4);
  });

  it('should show the date of the trip', () => {

    expect(trip1.date).to.equal('2022/05/22');
  });

  it('should track the trip duration in days', () => {

    expect(trip1.duration).to.equal(17);
  });

  it('should show the status of the trip', () => {

    expect(trip1.status).to.equal('approved');
  });

  it('should have a list of suggested activities', () => {

    expect(trip1.suggestedActivities).to.be.an('array');
  });
});