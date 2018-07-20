const userRidesUrl = 'https://frozen-mesa-95948.herokuapp.com/api/v1/user/rides/';

const logOut = document.querySelector('#logOut');
logOut.addEventListener('click', signOut);

function signOut(event) {
    event.preventDefault();
    sessionStorage.clear();
    alert('You have successfully log out. Good Bye!');
    window.location.replace('index.html');
}

const fetchUserRides = {
    method: 'GET',
    mode: 'cors',
    headers: {
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json, text/plain, /',
        'Content-type': 'application/json; charset=utf-8',
        authorization: sessionStorage.token,   
    }
};

fetch(userRidesUrl, fetchUserRides)
    .then((res) => res.json())
    .then((rides) => {
        let userRidesOutput = '';
        if(rides.message === 'You do not have permission to this page.'){
            alert('You do not have permission to this page. Please Login or Sign Up');
            window.location.href = 'index.html';
        }
        rides.ride.map(rides => {
            userRidesOutput += `
            <div class="column">
            <div class="card">
            <div class="container">
            <h2>My Ride Detail</h2>
            <p class="title">
            From: Destination Start Point.
            </p>
            <p>${rides.startpoint}</p>
            <p class="title">To: Destination Stop Point</p>
            <p>${rides.stoppoint}</p>
            <p>Departure Time: ${rides.departuretime}</p>
            <p>Departure Date: ${rides.departuredate}</p>
            <button class="button" style="border: none; display: inline-block; padding: '8px'; background-color: #000; text-align: center; cusor: pointer; width: 100%; margin-bottom: 20%"  onclick="document.getElementById('id02').style.display='block'"> View Request</button>
            </div>
            </div>
            </div>
            `;
        });
        document.getElementById('userRides').innerHTML = userRidesOutput;
    });