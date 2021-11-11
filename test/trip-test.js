import chai from 'chai';
const expect = chai.expect;
const Trip = require('../src/trip');

describe('Trip', () => {

  let trip1;
  let tripDetails;

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

    trip1 = new Trip(tripDetails[0]);

  });

  it('should be a function', () => {

    expect(Trip).to.be.a('function');

  });

  it('should instantiate a trip', () => {

    expect(trip1).to.be.an.instanceOf(Trip);

  });

});