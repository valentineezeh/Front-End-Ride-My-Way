function getRide(rideId){
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

fetch(rideUrl, fetchRide)
    .then((res) => res.json())
    .then(ride => {
        let rideList = [ride.ride];
        console.log([ride.ride]);
        for (const [key] of Object.entries(rideList)){
            if(rideList[key].id === rideId){
                viewOutput += `
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
                    </div>
                    <div style="text-align: center; content: '' ; clear: both; display: flex; justify-content: center; ">
                    <button style="background-color: green; color: white; padding: 10px 22px; margin: 9px 0; border: none; cursor: pointer; width: auto">Join</button>
                    </div>
                    `;
                if(viewOutput.length > 0){
                    document.getElementById('id02').innerHTML = viewOutput;
                }
            }
                        
        }
    });
}