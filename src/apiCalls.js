// GET requests

export const fetchTravelers = () => 
  fetch('http://localhost:3001/api/v1/travelers');

export const fetchSingleTraveler = (id) => fetch(`http://localhost:3001/api/
  v1/travelers/${id}`);

export const fetchTrips = () => fetch('http://localhost:3001/api/v1/trips');

export const fetchDestinations = () => 
  fetch('http://localhost:3001/api/v1/destinations');

  
// POST requests


