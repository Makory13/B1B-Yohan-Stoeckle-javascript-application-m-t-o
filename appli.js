function handleMeteo(event){

    event.preventDefault();

    const villeDemande = document.querySelector('input[name="ville"]').value;
    

    const req = new XMLHttpRequest();


    req.onreadystatechange = function(event) {
        // XMLHttpRequest.DONE === 4
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                const data= JSON.parse(this.responseText);
                console.dir(data);
                console.log(data.results);
                document.querySelector('.weather h2').innerText = "The air quality in " + villeDemande + " (" + data.results[0].country + "), is about " + data.results[0].measurements[0].value + " PM10";       
            } else {
                console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
            }
        }
    };

    req.open('GET', `https://api.openaq.org/v1/latest?city=${villeDemande}&parameter=pm10&limit=1`, true);
    req.send(null);


}

document.querySelector('form').addEventListener('submit',handleMeteo)