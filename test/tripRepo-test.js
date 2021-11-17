import chai from 'chai';
const expect = chai.expect;
const TripRepository = require('../src/tripRepo');
const Trip = require('../src/trip');

describe('TripRepository', () => {

  let tripRepo;
  let tripsData;

  beforeEach(() => {

    tripsData = [
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
      },
      {
        "id": 5,
        "userID": 42,
        "destinationID": 29,
        "travelers": 3,
        "date": "2022/04/30",
        "duration": 18,
        "status": "approved",
        "suggestedActivities": []
      },
      {
        "id": 6,
        "userID": 29,
        "destinationID": 35,
        "travelers": 3,
        "date": "2022/06/29",
        "duration": 9,
        "status": "approved",
        "suggestedActivities": []
      },
      {
        "id": 7,
        "userID": 37,
        "destinationID": 17,
        "travelers": 5,
        "date": "2022/5/28",
        "duration": 20,
        "status": "approved",
        "suggestedActivities": []
      },
      {
        "id": 8,
        "userID": 36,
        "destinationID": 39,
        "travelers": 6,
        "date": "2022/02/07",
        "duration": 4,
        "status": "approved",
        "suggestedActivities": []
      },
      {
        "id": 9,
        "userID": 24,
        "destinationID": 19,
        "travelers": 5,
        "date": "2022/12/19",
        "duration": 19,
        "status": "approved",
        "suggestedActivities": []
      },
      {
        "id": 10,
        "userID": 9,
        "destinationID": 50,
        "travelers": 6,
        "date": "2022/07/23",
        "duration": 17,
        "status": "approved",
        "suggestedActivities": []
      }
    ];

    tripRepo = new TripRepository(tripsData);

  });

  it('should be a function', () => {

    expect(TripRepository).to.be.a('function');
  });

  it('should be able to create a list of trips', () => {

    expect(tripRepo.tripList.length).to.equal(0);

    tripRepo.createTripsList();

    expect(tripRepo.tripList.length).to.equal(10);
    expect(tripRepo.tripList[0]).to.be.an.instanceOf(Trip);
  });

  it('should have a list of the current travelers trips', () => {

    expect(tripRepo.currentUserTrips).to.be.an('array');
  });

  it('should be able to get trips by ID', () => {

    tripRepo.createTripsList();
    tripRepo.getTripsByID(44);

    expect(tripRepo.currentUserTrips.length).to.equal(1);
  })
  
});