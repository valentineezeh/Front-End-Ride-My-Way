const userRidesUrl = 'https://frozen-mesa-95948.herokuapp.com/api/v1/user/rides/';

const logOut = document.querySelector('#logOut');
logOut.addEventListener('click', signOut);

function signOut(event) {
    event.preventDefault();
    sessionStorage.clear();
    alert('You have successfully log out. Good Bye!');
    window.location.replace('index.html');
}

const allRequestHeader = {
    method: 'GET',
    mode: 'cors',
    headers: {
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json, text/plain, /',
        'Content-type': 'application/json; charset=utf-8',
        authorization: sessionStorage.token,   
    }
};

function getAllRequest(url){
    fetch(url, allRequestHeader)
        .then(response => response.json())
        .then((requests) => {
            console.log(requests)
            let requestOutput = '';
            if(requests.message === 'You do not have permission to this page.'){
                alert('You do not have permission to this page. Please Login or Sign Up');
                window.location.href = 'index.html';
            }
            if(requests.message === 'No ride request found.'){
                alert('This ride has not yet been requested for.')
                
            }
            requests.requests.map((request) => {
                requestOutput += `
                <span onclick="document.getElementById('id02').style.display='none'" class="close" title="Close Modal">&times;</span>
                <div style="overflow-x:auto; background-color: white; padding: 20px; width: 60%; margin: 0 auto;">
                <table style="width: 100%;">
                <h1>Request</h1>
                <thead>
                <tr>
                <th> Rides Request </th>
                <th> Actions</th>
                </tr>
                </thead>
                <tr>
                <td> ${request.lastname} ${request.firstname}</td>
                <td style="padding-left: 20px; "><div style="text-align: center; content: '' ; clear: both; display: flex; justify-content: center; ">
                <button style="background-color: green; color: white; padding: 10px 22px; margin: 9px 0; border: none; cursor: pointer; width: auto">Accept</button>
                &nbsp;
                <button style="background-color: #f44336; color: white; padding: 10px 22px; margin: 9px 0; border: none; cursor: pointer; width: auto;">Reject</button>
                </div>
                </div>
                </td>
                </tr>
                </div>
                `;
                document.getElementById('id02').style.display = 'block';
                document.getElementById('id02').innerHTML = requestOutput;
            });
        });
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
            <button class="button" style="border: none; display: inline-block; padding: '8px'; background-color: #000; text-align: center; cusor: pointer; width: 100%; margin-bottom: 20%"  onclick="getAllRequest('https://frozen-mesa-95948.herokuapp.com/api/v1/users/rides/${rides.id}/requests')"> View Request</button>
            </div>
            </div>
            </div>
            `;
        });
        document.getElementById('userRides').innerHTML = userRidesOutput;
    });