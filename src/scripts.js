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
let travelerRepo;
let tripRepo;
let destinationRepo;
const aYearAgo = dayjs(today).subtract(1, 'year').format('YYYY/MM/DD');
let newTrip;


// Query Selectors

const headerGreeting = document.querySelector('#header-greeting');
const headerMessage = document.querySelector('#header-message');
const currentTripBoard = document.querySelector('#currentTripBoard');
const pastTripBoard = document.querySelector('#pastTripBoard');
const upcomingTripBoard = document.querySelector('#upcomingTripBoard');
const pendingTripBoard = document.querySelector('#pendingTripBoard');
const submitTripBtn = document.querySelector('#submitTripBtn');
const formDateInput = document.querySelector('#formDate');
const formDurationInput = document.querySelector('#formDuration');
const formNumberTravelersInput = document.querySelector('#formNumberTravelers');
const formDestinationInput = document.querySelector('#formDestination').value;
const newTripForm = document.querySelector('#newTripForm');




// Functions

const fetchData = () => {
  Promise.all([ fetchTravelers(), fetchTrips(), fetchDestinations() ])
    .then(data => {
      return Promise.all(data.map(result => result.json()));
    }).then(data => {
      getTravelers(data[0].travelers)
      getTrips(data[1].trips);
      getDestinations(data[2].destinations);
      updateDOM();
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
  let total = tripRepo.currentUserTrips
    .filter((trip) => {
      return trip.date >= aYearAgo && trip.date <= today;
    }).reduce((sum, trip) => {
      getTripCost();
      sum += trip.cost;
      return sum;
    }, 0)
  currentUser.totalSpentOnTripsThisYear = Math.round(total * 1.1);
}

const updateTotal = () => {
  headerMessage.innerText = `You have spent 
  $${currentUser.totalSpentOnTripsThisYear} on trips this year.`;
}

const updateDOM = () => {
  getCurrentUser();
  updateGreeting();
  getCurrentUserTrips();
  getAnnualTotal();
  updateTotal();
  sortTrips();
  displayTripBoard();
}

const sortTrips = () => {
  tripRepo.currentUserTrips.forEach((trip) => {
    if (trip.date < today && trip.date >= aYearAgo && 
      trip.status === 'approved') {
      currentUser.pastTrips.push(trip);
    } else if (trip.date === today && trip.status === 'approved') {
      currentUser.currentTrips.push(trip);
    } else if (trip.date > today && trip.status === 'approved') {
      currentUser.upcomingTrips.push(trip);
    } else if (trip.date > today && trip.status === 'pending') {
      currentUser.pendingTrips.push(trip);
    }
  })
}

const displayTripBoard = () => {
  currentUser.pastTrips.forEach((trip) => {
    pastTripBoard.innerHTML += `
    <img src="${trip.destinationInfo.image}" alt="${trip.destinationInfo.alt}">
    <h3>${trip.destinationInfo.destination}</h3>
    `
  })
  currentUser.currentTrips.forEach((trip) => {
    currentTripBoard.innerHTML += `
    <img src="${trip.destinationInfo.image}" alt="${trip.destinationInfo.alt}">
    <h3>${trip.destinationInfo.destination}</h3>
    `
  })
  currentUser.upcomingTrips.forEach((trip) => {
    upcomingTripBoard.innerHTML += `
    <img src="${trip.destinationInfo.image}" alt="${trip.destinationInfo.alt}">
    <h3>${trip.destinationInfo.destination}</h3>
    `
  })
  currentUser.pendingTrips.forEach((trip) => {
    pendingTripBoard.innerHTML += `
    <img src="${trip.destinationInfo.image}" alt="${trip.destinationInfo.alt}">
    <h3>${trip.destinationInfo.destination}</h3>
    `
  })
}

const getNewID = () => {
  let mostRecentID = tripRepo.tripList.sort((a, b) => {
    return b.id - a.id;
  })[0].id;
  let newID = mostRecentID + 1;
  return newID;
}

const createNewTrip = () => {
  newTrip = new Trip({
    id: getNewID(),
    userID: currentUser.id,
    destinationID: 50,
    travelers: parseInt(formNumberTravelersInput.value),
    date: dayjs(formDateInput.value).format('YYYY/MM/DD'),
    duration: parseInt(formDurationInput.value),
    status: 'pending',
    suggestedActivities: []
  })
  currentUser.pendingTrips.push(newTrip);
  tripRepo.tripList.push(newTrip);
  console.log(newTrip)
}

const postNewTrip = () => {
  fetch('http://localhost:3001/api/v1/trips', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTrip)
  }).then(response => response.json())
    .then(data => console.log(data))
    .then(updateDOM())
    .catch(error => console.log(error))
}


const submitNewTrip = () => {
  createNewTrip();
  postNewTrip();
}


// Event Listeners 

window.addEventListener('load', fetchData);
submitTripBtn.addEventListener('click', submitNewTrip);