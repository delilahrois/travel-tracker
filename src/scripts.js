// Imports 

import './css/base.scss';
import { fetchTravelers, fetchSingleTraveler, fetchTrips, 
  fetchDestinations } from './apiCalls';
import Traveler from './traveler';
import Trip from './trip';
import TravelerRepository from './travelerRepo';

// An example of how you tell webpack to use an image 
// (also need to link to it in the index.html)
import './images/turing-logo.png'


// Global Variables

let traveler;
let travelerRepo;
let trip;
let tripRepo;
// let destination;


// Query Selectors




// Functions

const fetchData = () => {
  Promise.all([ fetchTravelers(), fetchTrips(), fetchDestinations() ])
    .then(data => {return Promise.all(data.map(result => result.json()));
    }).then(data => {
      getTravelers(data[0].travelers)
      // console.log(travelerRepo)
      // getTrips(data[1]);
      console.log(data)
    })
    .catch(error => {
      console.log(error)
    })
}



const getTravelers = (travelerData) => {
  travelerRepo = new TravelerRepository(travelerData);
  travelerRepo.instantiateTravelers()
}

// const getTrips = (tripData) => {
//   tripRepo = new TripRepository(tripData);
  
// }

// Event Listeners 

window.addEventListener('load', fetchData);