const allRidesUrl = 'https://frozen-mesa-95948.herokuapp.com/api/v1/rides';


const logOut = document.querySelector('#logOut');
logOut.addEventListener('click', signOut);

function signOut(event) {
    event.preventDefault();
    sessionStorage.clear();
    alert('You have successfully log out. Good Bye!');
    window.location.replace('index.html');
}

const rideHeader = {
    method: 'GET',
    mode: 'cors',
    headers: {
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json, text/plain, /',
        'Content-type': 'application/json; charset=utf-8',
        authorization: sessionStorage.token,   
    }
};

const requestHeader = {
    method: 'POST',
    mode: 'cors',
    headers: {
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json, text/plain, /',
        'Content-type': 'application/json; charset=utf-8',
        authorization: sessionStorage.token,   
    }
};

function joinRide(url){
    console.log('play');
    fetch(url, requestHeader)
        .then(response => response.json())
        .then(request => {
            const{success} = request;
            if(success === false){
                alert(request.message);
            }
            if(success === true && request.message === 'Ride Request has been posted.'){
                alert('Ride Request has been posted.');
                window.location.href = 'allRides.html';   
            }
            return request;
        })
        .catch(error => {
            if(error.message === 'You do not have permission to this page.'){
                alert('You do not have permission to this page.');
                window.location.href = 'index.html';
            }
            return error;
        });
}

function getRideRequest(url) {
    fetch(url, rideHeader)
        .then(response => response.json())
        .then(ride => {
            console.log('ride', ride); // Prints result from `response.json()` in getRequest
            console.log(ride.ride.id);
            let viewOutput = '';

            viewOutput = `
                    <span onclick="document.getElementById('id02').style.display='none'" class="close" title="Close Modal">&times;</span>
                    <div style="overflow-x:auto; background-color: white; padding: 20px; width: 60%; margin: 0 auto;">
                    <table>
                    <h1>Ride Details</h1>
                    <thead>
                    <tr>
                          <th> Rides</th>
                          <th> Details</th>
                        </tr>
                    </thread>
                    <tr>
                    <td> Start destintion </td>
                    <td>${ride.ride.startpoint}</td>
                  </tr>
                  <tr>
                    <td> Final destination </td>
                    <td>${ride.ride.stoppoint}</td>
                  </tr>
                  <tr>
                    <td>Departure Time</td>
                    <td>${ride.ride.departuretime}</td>
                  </tr>
                  <tr>
                    <td>Departure Date</td>
                    <td>${moment(ride.ride.departuredate).format('MMMM-DD-YY')}</td>
                  </tr>
                    </table>
                    <button style="background-color: green; color: white; padding: 10px 22px; margin: 9px 0; border: none; cursor: pointer; margin-left: 40%;" onclick="joinRide('https://frozen-mesa-95948.herokuapp.com/api/v1/rides/${ride.ride.id}/requests')">Join</button>
                    
                    `;
            document.getElementById('id02').style.display = 'block';
                    
            document.getElementById('id02').innerHTML = viewOutput;
        })
        
        .catch(error => console.error(error));
}

//console.log("meme")


const fetchAllRides = {
    method: 'GET',
    mode: 'cors',
    headers: {
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json, text/plain, /',
        'Content-type': 'application/json; charset=utf-8',
        authorization: sessionStorage.token,   
    }
};

fetch(allRidesUrl, fetchAllRides)
    .then((res) => {
        return res.json();})
    .then((rides) => {
        
        let rideOutput = '';
        if(rides.message === 'You do not have permission to this page.'){
            alert('You do not have permission to this page. Please Login or Sign Up');
            window.location.href = 'index.html';
        }
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
            <p>${ride.stoppoint}</p>
            <p>Departure Time: ${ride.departuretime}</p>
            <p>Departure Date: ${moment(ride.departuredate).format('MMMM-DD-YY')}</p>
            <div style="text-align: center; content: '' ; clear: both; display: flex; justify-content: center; ">
            <button class="button" href ='${ride.id}' aria-controls='${ride.id}' style="border: none; display: inline-block; padding: '8px'; background-color: #000; text-align: center; cusor: pointer; width: 100%; margin-bottom: 20%"  onclick="getRideRequest('https://frozen-mesa-95948.herokuapp.com/api/v1/rides/${ride.id}')"> View Details</button>
            </div> 
            </div>
            </div>
            </div>
            </div>
            `;                     
        });
        document.getElementById('allRides').innerHTML = rideOutput;
    });