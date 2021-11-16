// Imports 

import './css/base.scss';
import { fetchTravelers, fetchSingleTraveler, fetchTrips, 
  fetchDestinations } from './apiCalls';
import Traveler from './traveler';
import Trip from './trip';
import TravelerRepository from './travelerRepo';
import TripRepository from './tripRepo';
import DestinationRepository from './destinationRepo';
import dayjs from 'dayjs';

// Global Variables

const today = dayjs().format('YYYY/MM/DD');
console.log(today)
let currentUser;
let travelerRepo;
let tripRepo;
let destinationRepo;
const aYearAgo = dayjs(today).subtract(1, 'year').format('YYYY/MM/DD');
let newTrip;


// Query Selectors

const headerGreeting = document.querySelector('#headerGreeting');
const headerMessage = document.querySelector('#headerMessage');
const currentTripBoard = document.querySelector('#currentTripBoard');
const pastTripBoard = document.querySelector('#pastTripBoard');
const upcomingTripBoard = document.querySelector('#upcomingTripBoard');
const pendingTripBoard = document.querySelector('#pendingTripBoard');
const estimateTripTotalBtn = document.querySelector('#estimateTripTotalBtn');
const formDateInput = document.querySelector('#formDate');
const formDurationInput = document.querySelector('#formDuration');
const formNumberTravelersInput = document.querySelector('#formNumberTravelers');
const destinationSelector = document.querySelector('#destinationSelector');
// const newTripForm = document.querySelector('#newTripForm');
const loginBtn = document.querySelector('#loginButton');
const loginUsername = document.querySelector('#loginUsername');
const loginPassword = document.querySelector('#loginPassword');
const dashboard = document.querySelector('#dashboard');
const loginPage = document.querySelector('#loginPage');
const newTripCostContainer = document.querySelector('#newTripCostContainer');
const tripConfirmationBtn = document.querySelector('#tripConfirmationBtn');
const logoutBtn = document.querySelector('#logoutBtn');
const navBar = document.querySelector('#navBar');




// Functions

const fetchData = (event) => {
  event.preventDefault();
  Promise.all([ fetchTravelers(), fetchTrips(), fetchDestinations() ])
    .then(data => {
      return Promise.all(data.map(result => result.json()));
    }).then(data => {
      getTravelers(data[0].travelers)
      getTrips(data[1].trips);
      getDestinations(data[2].destinations);
    }).then(updateDOM())
    .catch(error => {
      alert('Error connecting to server. Please try again.', error)
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
  let travelerID = loginUsername.value.split('r')[2];
  let parsedID = parseInt(travelerID);
  if (loginPassword.value === 'travel') {
    currentUser = new Traveler(travelerRepo.findTraveler(parsedID));
    dashboard.classList.remove('hidden');
    loginPage.classList.add('hidden');
    logoutBtn.classList.remove('hidden');
  } else {
    alert('Invalid password. Try again.');
    logout();
  }
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
      return trip.date >= aYearAgo && trip.status === 'approved';
    }).reduce((sum, trip) => {
      getTripCost();
      sum += trip.cost;
      return sum;
    }, 0)
  currentUser.totalSpentOnTripsThisYear = Math.round(total * 1.1);
}

const updateTotal = () => {
  headerMessage.innerText = `You have spent $${currentUser.totalSpentOnTripsThisYear} on trips this year.`;
}

const updateDOM = () => {
  getCurrentUser();
  updateGreeting();
  getCurrentUserTrips();
  getTripCost();
  getAnnualTotal();
  updateTotal();
  sortTrips();
  displayTripBoard();
  populateSelect();
}

const sortTrips = () => {
  tripRepo.currentUserTrips.forEach((trip) => {
    if (trip.date < today && trip.status === 'approved') {
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

const populateSelect = () => {
  destinationSelector.innerHTML = `
    <option>Choose Your Next Destination</option>
  `;
  destinationRepo.destinationList.forEach((place) => {
    destinationSelector.innerHTML += `
      <option value="${place.destination}">${place.destination}</option>
    `;
  })
}

const displayTripBoard = () => {
  navBar.classList.remove('hidden');
  pastTripBoard.innerHTML = `
    <h2 class="trip-board-header">Past Trips</h2>
  `;
  upcomingTripBoard.innerHTML = `
    <h2 class="trip-board-header">Upcoming Trips</h2>
  `;
  pendingTripBoard.innerHTML = `
    <h2 class="trip-board-header">Pending Trips</h2>
  `;
  if (currentUser.currentTrips) {
    currentUser.currentTrips.forEach((trip) => {
      currentTripBoard.innerHTML += `
      <img src="${trip.destinationInfo.image}" 
      alt="${trip.destinationInfo.alt}">
      <h3>${trip.destinationInfo.destination}</h3>
      <p>Status: ${trip.status}</p>
      <p>Cost: $${trip.cost}</p>
      `
    })
  } else {
    currentTripBoard.innerHTML = `
    <h2 class="trip-board-header">Current Trips</h2>
    <p>You are not currently traveling! We can't wait to 
    see where you'll go next.</p>
  `;
  }
  currentUser.pastTrips.forEach((trip) => {
    pastTripBoard.innerHTML += `
    <img src="${trip.destinationInfo.image}" alt="${trip.destinationInfo.alt}">
    <h3>${trip.destinationInfo.destination}</h3>
    <p>Status: ${trip.status}</p>
    <p>Cost: $${trip.cost}</p>
    `
  })
  currentUser.upcomingTrips.forEach((trip) => {
    upcomingTripBoard.innerHTML += `
    <img src="${trip.destinationInfo.image}" alt="${trip.destinationInfo.alt}">
    <h3>${trip.destinationInfo.destination}</h3>
    <p>Status: ${trip.status}</p>
    <p>Cost: $${trip.cost}</p>
    `
  })
  currentUser.pendingTrips.forEach((trip) => {
    pendingTripBoard.innerHTML += `
    <img src="${trip.destinationInfo.image}" alt="${trip.destinationInfo.alt}">
    <h3>${trip.destinationInfo.destination}</h3>
    <p>Status: ${trip.status}</p>
    <p>Cost: $${trip.cost}</p>
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
  let newDestinationID = destinationRepo
    .findDestinationID(destinationSelector.value);
  newTrip = new Trip({
    id: getNewID(),
    userID: currentUser.id,
    destinationID: newDestinationID,
    travelers: parseInt(formNumberTravelersInput.value),
    date: dayjs(formDateInput.value).format('YYYY/MM/DD'),
    duration: parseInt(formDurationInput.value),
    status: 'pending',
    suggestedActivities: []
  })
  if (!currentUser.pendingTrips.includes(newTrip)) {
    currentUser.pendingTrips.push(newTrip);
    tripRepo.tripList.push(newTrip);
    tripRepo.currentUserTrips.push(newTrip);
  } else {
    console.log('error message')
  }
}

const postNewTrip = () => {
  fetch('http://localhost:3001/api/v1/trips', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTrip)
  }).then(response => response.json())
    .then(getCurrentUserTrips(), getTripCost())
    .then(displayTripBoard())
    .then(updateTotal())
    .catch(error => alert('Error. Your trip has not been accepted.', error))
}

const submitNewTrip = () => {
  newTripCostContainer.classList.add('hidden');
  tripConfirmationBtn.classList.add('hidden');
  estimateTripTotalBtn.classList.remove('hidden');
  createNewTrip();
  postNewTrip();
}

const estimateNewTripTotal = () => {
  let newDestinationID = destinationRepo
    .findDestinationID(destinationSelector.value);
  let givenDestination = destinationRepo.getDestinationByID(newDestinationID);
  let estimatedCost = (((givenDestination.estimatedLodgingCostPerDay) * 
    parseInt(formDurationInput.value)) + ((givenDestination
    .estimatedFlightCostPerPerson) 
    * parseInt(formNumberTravelersInput.value))) * 1.1;
  return Math.round(estimatedCost);
}

const showTripEstimate = () => {
  newTripCostContainer.classList.remove('hidden');
  estimateTripTotalBtn.classList.add('hidden')
  newTripCostContainer.innerHTML = `
    <h3 class="new-trip-cost-header">Trip Estimate:</h3>
    <p class="new-trip-cost">$${estimateNewTripTotal()}</p>
  `
  tripConfirmationBtn.classList.remove('hidden');
}

const logout = () => {
  loginPage.classList.remove('hidden');
  dashboard.classList.add('hidden')
  logoutBtn.classList.add('hidden');
  navBar.classList.add('hidden');
  loginUsername.value = '';
  loginPassword.value = '';
}


// Event Listeners 

estimateTripTotalBtn.addEventListener('click', showTripEstimate);
tripConfirmationBtn.addEventListener('click', submitNewTrip);
loginBtn.addEventListener('click', (event) => fetchData(event));
logoutBtn.addEventListener('click', logout);