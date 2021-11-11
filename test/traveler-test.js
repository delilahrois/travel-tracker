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

  it('should have an id, name and traveler type', () => {

    expect(traveler1.id).to.equal(18);
    expect(traveler1.name).to.equal('Sheila Valentetti');
    expect(traveler1.travelerType).to.equal('foodie');

  });

  // it('should have a total amount spent on trips this year', () => {

  //   expect()

  // });

});