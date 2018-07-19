const offerRideUrl = 'https://frozen-mesa-95948.herokuapp.com/api/v1/users/rides';

const startPoint = document.getElementById('startPoint');
const eStartPoint = document.getElementById('eStartPoint');
const stopPoint = document.getElementById('stopPoint');
const eStopPoint = document.getElementById('eStopPoint');
const departureTime = document.getElementById('departureTime');
const eDepartureTime = document.getElementById('eDepartureTime');
const departureDate = document.getElementById('departureDate');
const eDepartureDate = document.getElementById('eDepartureDate');

onload = function(event){
    event.preventDefault();
    startPoint.addEventListener('blur', function(){
        if(!startPoint.value){
            eStartPoint.innerHTML = 'Destination Starting Point is Required';
        }
        if(startPoint.value && startPoint.value.length <= 2){
            eStartPoint.innerHTML = 'Start Point should be more than 2 characters';
        }
    });
    startPoint.addEventListener('keyup', function(){
        eStartPoint.innerHTML = '';
    });

    stopPoint.addEventListener('blur', function(){
        if(!stopPoint.value){
            eStopPoint.innerHTML = 'Stop Point is Required';
        }
        if(stopPoint.value && startPoint.value.length <= 2){
            eStopPoint.innerHTML = 'Stop Point should be more than 2 characters';
        }
    });
    stopPoint.addEventListener('keyup', function(){
        eStopPoint.innerHTML = '';
    });
};

const logOut = document.querySelector('#logOut');
logOut.addEventListener('click', signOut);

function signOut(event) {
    event.preventDefault();
    sessionStorage.clear();
    alert('You have successfully log out. Good Bye!');
    window.location.replace('index.html');
}

let rideBtn = document.querySelector('#rideBtn');
rideBtn.addEventListener('click', saveRide);

function saveRide(e){
    e.preventDefault();
    let rideError = document.getElementById('rideError');
    rideError.innerHTML = '';
    
    const rideDetail = {
        startPoint: startPoint.value,
        stopPoint: stopPoint.value,
        departureTime: departureTime.value,
        departureDate: departureDate.value,
    };

    const fetchData = {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(rideDetail),
        headers: {
            'Access-Control-Allow-Origin': '*',
            Accept: 'application/json, text/plain, */*',
            'Content-type': 'application/json; charset=utf-8',
            authorization: sessionStorage.token,   
        }
    };

    fetch(offerRideUrl, fetchData)
        .then((res) => {
            return res.json();
        })
        .then((ride) => {
            const { errors, success } = ride;

            if(success === false){
                rideError.innerHTML = ride.message;
            }
						
            if(errors){
                if(errors.startPoint.length > 0){
                    eStartPoint.innerHTML += errors.startPoint[0];
                }
                if(errors.stopPoint.length > 0){
                    eStopPoint.innerHTML += errors.stopPoint[0];
                }
                if(errors.departureTime.length > 0){
                    eDepartureTime.innerHTML += errors.departureTime[0];
                }
                if(errors.departureDate.length > 0){
                    eDepartureDate.innerHTML += errors.departureDate[0];
                }
            }
						
            if(ride.message === 'You need to signup or login to perform this action'){
                alert('You need to signup or login to perform this action');
                window.location.href = 'index.html';
            }
            if(ride.message === 'You do not have permission to this page.'){
                alert('You do not have permission to this page.');
                window.location.href = 'index.html';
            }
            if(ride.success === true && ride.message === 'Ride have been Created'){
                window.location.href = 'myRide.html';
                alert('Ride have been Created');
            }
            
            return ride;
        }).catch((err) => {
            return err;
        });
    document.getElementById('rideForm').reset();
}