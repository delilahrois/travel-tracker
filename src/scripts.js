// Imports 

import './css/base.scss';
import { fetchTravelers, fetchSingleTraveler, fetchTrips, 
  fetchDestinations } from './apiCalls';
import Traveler from './traveler';
import Trip from './trip';
import TravelerRepository from './travelerRepo';
import TripRepository from './tripRepo';
import Destination from './destination';
import DestinationRepository from './destinationRepo';
import dayjs from 'dayjs';

// An example of how you tell webpack to use an image 
// (also need to link to it in the index.html)
// import './images/turing-logo.png'


// Global Variables

const today = '2021/07/27';
let currentUser;
let currentAnnualTotal;
let traveler;
let travelerRepo;
let trip;
let tripRepo;
let destination;
let destinationRepo;

console.log(today)
let aYearAgo = dayjs(today).subtract(1, 'year').format('YYYY/MM/DD');
console.log(aYearAgo)


// Query Selectors

const headerGreeting = document.querySelector('#header-greeting')
const headerMessage = document.querySelector('#header-message')
const currentTripBoard = document.querySelector('#main-current-trip');



// Functions

const fetchData = () => {
  Promise.all([ fetchTravelers(), fetchTrips(), fetchDestinations() ])
    .then(data => {return Promise.all(data.map(result => result.json()));
    }).then(data => {
      getTravelers(data[0].travelers)
      getTrips(data[1].trips);
      getDestinations(data[2].destinations);
      getCurrentUser();
      updateGreeting();
      getCurrentUserTrips();
      // console.log(tripRepo.currentUserTrips)
      getAnnualTotal();
      updateTotal();
    })
    .catch(error => {
      console.log(error)
    })
}



const getTravelers = (travelerData) => {
  travelerRepo = new TravelerRepository(travelerData);
  travelerRepo.instantiateTravelers()
}

const getTrips = (tripData) => {
  tripRepo = new TripRepository(tripData);
  tripRepo.createTripsList();
}

const getDestinations = (destinationData) => {
  destinationRepo = new DestinationRepository(destinationData);
  destinationRepo.createDestinationList();
}

const getCurrentUser = () => {
  currentUser = new Traveler(travelerRepo.getRandomTraveler());
}

const updateGreeting = () => {
  headerGreeting.innerText = `Greetings, ${currentUser.getFirstName()}!`;
}

const getCurrentUserTrips = () => {
  tripRepo.getTripsByID(currentUser.id)
  tripRepo.currentUserTrips.forEach((trip) => {
    trip.destinationInfo = destinationRepo.destinationList.
      find((destination) => {
        return destination.id === trip.destinationID
      })
  })
}

const getTripCost = () => {
  tripRepo.currentUserTrips.forEach((trip) => {
    trip.getCost();
  })
}


const getAnnualTotal = () => {
  currentUser.totalSpentOnTripsThisYear = tripRepo.currentUserTrips.filter((trip) => {
    return trip.date >= aYearAgo && trip.date <= today;
  }).reduce((sum, trip) => {
    getTripCost();
    sum += trip.cost;
    return sum;
  }, 0) * Math.round(1.1);
  console.log(currentUser.totalSpentOnTripsThisYear)
}

// currentUserDestinations.reduce(sum, destination => {
// sum+= (destination.lodgingPerDay * trip.travelers) + (destination.flightCostPerPerson * trip.travelers);
//  return sum;
// }, 0)










const updateTotal = () => {
  headerMessage.innerText = `You have spent 
  $${currentUser.totalSpentOnTripsThisYear} on trips this year.`;
}




// then we want to show the current user's trips on the dashboard in 
// the appropriate sections of the page (past, present, upcoming, pending)

// add function to get the total amount spent on trips this year 

// handler function for updateGreeting, getting trips for current user
//  and displaying them, getting total spent on trips this year





// Event Listeners 

window.addEventListener('load', fetchData);