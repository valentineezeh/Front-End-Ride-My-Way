const allRiidesUrl = 'https://frozen-mesa-95948.herokuapp.com/api/v1/rides';

// const allRides = document.getElementById('allRides');

const fetchAllRides = {
    method: 'GET',
    mode: 'cors',
    headers: {
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json; charset=utf-8',
        authorization: sessionStorage.token,   
    }
};

fetch(allRiidesUrl, fetchAllRides)
    .then((res) => res.json())
    .then((rides) => {
        let rideOutput = '';
        console.log(rides.rides);
        rides.rides.map(ride => {
            rideOutput += `
            <div class="column">
            <div class="card" >
            <div class="container">
            <h2>rides</h2>
            <p class="title">
            From: Destination Start Point.
            </p>
            <p>${ride.startpoint}</p>
            <p class="title"> To: Destination Stop Point.
            </p>
            <p>${ride.startpoint}</p>
            <p>Departure Time: ${ride.departuretime}</p>
            <p>Departure Date: ${ride.departuredate}</p>
            </div>
            </div>
            </div>
            
            `;
        });
        document.getElementById('allRides').innerHTML = rideOutput;
        
    });