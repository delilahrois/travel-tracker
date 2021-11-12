import chai from 'chai';
const expect = chai.expect;
const Traveler = require('../src/traveler');

describe('Traveler', () => {

  let travelerInfo;
  let traveler1;

  beforeEach(() => {

    travelerInfo = {
      "id": 18,
      "name": "Sheila Valentetti",
      "travelerType": "foodie"
    };

    traveler1 = new Traveler(travelerInfo);

  });
  
  it('should be a function', () => {

    expect(Traveler).to.be.a('function');
  });

  it('should instantiate Traveler', () => {

    expect(traveler1).to.be.an.instanceOf(Traveler);
  });

  it('should have an id', () => {

    expect(traveler1.id).to.equal(18);
  });

  it('should have a name', () => {

    expect(traveler1.name).to.equal('Sheila Valentetti');
  });

  it('should show what type of traveler they are', () => {

    expect(traveler1.travelerType).to.equal('foodie');
  });

  it.skip('should be able to calculate their total spent on trips this year', () => {

    expect(traveler1.calculateTripsTotal()).to.equal();
  });
});