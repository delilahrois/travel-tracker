// Imports 

import './css/base.scss';
import { fetchTravelers, fetchSingleTraveler, fetchTrips, 
  fetchDestinations } from './apiCalls';

// An example of how you tell webpack to use an image 
// (also need to link to it in the index.html)
import './images/turing-logo.png'


// Global Variables

let traveler;
let travelerRepo;
let trips;
let destinations;


// Query Selectors




// Functions

const fetchData = () => {
  Promise.all([ fetchTravelers(), fetchTrips(), fetchDestinations() ]).then(data => {
    return Promise.all(data.map(result => result.json()));
  }).then(data => {
    console.log(data)
    // call functions to instantiate new instances of class here
  })
}



// const createTravelers = (data) => {
//   travelerRepo = new TravelerRepository(data); 
// }

// Event Listeners 

window.addEventListener('load', fetchData);