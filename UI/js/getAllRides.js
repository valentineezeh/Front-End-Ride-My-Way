const allRidesUrl = 'https://frozen-mesa-95948.herokuapp.com/api/v1/rides';
let viewOutput = ''

const logOut = document.querySelector('#logOut');
logOut.addEventListener('click', signOut);

function signOut(event) {
    event.preventDefault();
    sessionStorage.clear();
    alert('You have successfully log out. Good Bye!');
    window.location.replace('index.html');
}

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

fetch(allRidesUrl, fetchAllRides)
    .then((res) => {
        return res.json();})
    .then((rides) => {
        console.log(rides);

        let rideOutput = '';
        
        if(rides.message === 'You do not have permission to this page.'){
            alert('You do not have permission to this page.');
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
            <p>Departure Date: ${ride.departuredate}</p>
            <div style="text-align: center; content: '' ; clear: both; display: flex; justify-content: center; ">
            <button class="button" style="border: none; display: inline-block; padding: '8px'; background-color: #000; text-align: center; cusor: pointer; width: 100%; margin-bottom: 20%"  onclick="document.getElementById('id02').style.display='block'"> View Details</button>
        </div>
            </div>
            </div>
            </div>
            `;
            let rideId = ride.id;
            const rideUrl = `https://frozen-mesa-95948.herokuapp.com/api/v1/rides/${rideId}`;

            const fetchRide = {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    Accept: 'application/json, text/plain, */*',
                    'Content-type': 'application/json; charset=utf-8',
                    authorization: sessionStorage.token,   
                }
            };
            //let viewOutput = '';
            fetch(rideUrl, fetchRide)
                .then((res) => {
                    return res.json();
                })
                .then((ride) => {
                    console.log(ride);
                    if(ride.message === 'You do not have permission to this page.'){
                        alert('You do not have permission to this page.');
                        window.location.href = 'index.html';
                    }
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
                    <td>${ride.ride.departuredate}</td>
                  </tr>
                    </table>
                    <div style="text-align: center; content: '' ; clear: both; display: flex; justify-content: center; ">
                    <button style="background-color: green; color: white; padding: 10px 22px; margin: 9px 0; border: none; cursor: pointer; width: auto">Join</button>
                    </div>
                    </div>
                    `;
                    
                    return ride;
                });
            document.getElementById('id02').innerHTML = viewOutput;
        });
        
        document.getElementById('allRides').innerHTML = rideOutput;
        
    });
    

// const rideUrl = `https://frozen-mesa-95948.herokuapp.com/api/v1/rides/1`;

// const fetchRide = {
//     method: 'GET',
//     mode: 'cors',
//     headers: {
//         'Access-Control-Allow-Origin': '*',
//         Accept: 'application/json, text/plain, */*',
//         'Content-type': 'application/json; charset=utf-8',
//         authorization: sessionStorage.token,   
//     }
// };

// fetch(rideUrl, fetchRide)
//     .then((res) => {
//         console.log(res);
//         return res.json();
//     })
//     .then((ride) => {
//         console.log(ride)
//         return ride;
//     })
        
