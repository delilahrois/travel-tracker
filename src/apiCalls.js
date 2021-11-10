const fetchTravelers = () => fetch('http://localhost:3001/api/v1/travelers');

const fetchSingleTraveler = (id) => fetch(`http://localhost:3001/api/
  v1/travelers/${id}`);

const fetchTrips = () => fetch('http://localhost:3001/api/v1/trips');

const fetchDestinations = () => 
  fetch('http://localhost:3001/api/v1/destinations');


export { fetchTravelers, fetchSingleTraveler, fetchTrips, 
  fetchDestinations };