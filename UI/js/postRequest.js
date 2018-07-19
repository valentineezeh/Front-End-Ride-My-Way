const requestUrl = `https://frozen-mesa-95948.herokuapp.com/api/v1/rides/${rideId}/requests`;

const request = document.getElementById('request');
request.addEventListener('click', saveRequest);

function saveRequest(e){
    e.preventDefault();

    const postData = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
            Accept: 'application/json, text/plain, */*',
            'Content-type': 'application/json; charset=utf-8',
            authorization: sessionStorage.token,
        }
    };
    fetch(requestUrl, postData)
        .then((res) => {
            return res.json();
        })
        .then((request) => {
            console.log(request);
            return request;
        });
}