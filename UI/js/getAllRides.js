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


  
    //console.log(rideOutput);
    // const rideUrl = `https://frozen-mesa-95948.herokuapp.com/api/v1/rides/${rideId}`;

function getRideRequest(url) {
    fetch(url, rideHeader)
        .then(response => response.json())
        .then(ride => {
            console.log('ride', ride); // Prints result from `response.json()` in getRequest
                    
            let viewOutput = '';
            //console.log(ride.ride.id);
                    
            // for (const [key] of Object.entries(rideList)){
                        
            // if(rideList[key].id === rideId){
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
            // console.log(viewOutput);
            //console.log(ride.ride.id)
            document.getElementById('id02').style.display = 'block';
                    
            document.getElementById('id02').innerHTML = viewOutput; // This is the one giving mr undefined
        })
        
        .catch(error => console.error(error));
}
 


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
            <p>Departure Date: ${ride.departuredate}</p>
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



                
//     let rideId = ride.id;
//     console.log(rideId);
//     requestUrl = `https://frozen-mesa-95948.herokuapp.com/api/v1/rides/${rideId}/requests`;

//     function saveRequest(e){
//         e.preventDefault();
//         console.log('====> meme');
//         const postData = {
//             method: 'POST',
//             mode: 'cors',
//             headers: {
//                 'Access-Control-Allow-Origin': '*',
//                 Accept: 'application/json, text/plain, /',
//                 'Content-type': 'application/json; charset=utf-8',
//                 authorization: sessionStorage.token,
//             }
//         };
//         console.log('====> meme');
//         fetch(requestUrl, postData)
//             .then((res) => {
//                 console.log(res);
//                 return res.json();
//             })
//             .then((request) => {
//                 console.log(request);
//                 return request;
//             })
//             .catch((err) => {
//                 console.log(err);
//                 return err;
//             });
//     }
            
//     const request = document.getElementById('request');
//     request.addEventListener('click', saveRequest);