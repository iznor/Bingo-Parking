//GOOGLE MAPS API
import { Loader } from "@googlemaps/js-api-loader"
const dotenv = require("dotenv").config({ path: '.env' });


const loader = new Loader({
    apiKey: MAPS_API_KEY,
    version: "weekly",
    ...additionalOptions,
  });
  
  loader.load().then(() => {
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
  });