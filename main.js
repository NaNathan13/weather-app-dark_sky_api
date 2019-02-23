window.addEventListener('load', () => {
    let long;
    let lat;
    let locationTimeZone = document.querySelector(".location-timezone");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureSection = document.querySelector(".temperature");
    let temperatureSpan = document.querySelector(".temperature span");

    //Get Location
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.darksky.net/forecast/461adf540c047615d8ee0ca78a86fbfb/${lat},${long}`;

            //API Clal
            fetch(api)
                .then(response => {
                    return response.json();
            })
            .then(data => {
                console.log(data);
                //Pull what data we want from API
                const {temperature, summary, icon} = data.currently;

                //Set DOM elements from API
                locationTimeZone.textContent = data.timezone;
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;

                //Formula for celsius
                let celsius = (temperature - 32) * (5 / 9);
                
                //Set Icon
                setIcons(icon, document.querySelector(".icon"));

                //Change temp to Celcius/Farenheit on click
                temperatureSection.addEventListener("click", () => {
                    if (temperatureSpan.textContent === "F") {
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                    } else {
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temperature;
                    }
                });

            });
        });
    } 

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        
        const currentIcon = icon.replace(/-/g, "_").toUpperCase(); //Turns dash to underscore and all caps to match API data
        skycons.play(); // runs the animation 
        return skycons.set(iconID, Skycons[currentIcon]);
        
    }
});

// Skycons: https://darkskyapp.github.io/skycons/
// Dark sky weather API: https://darksky.net/dev
