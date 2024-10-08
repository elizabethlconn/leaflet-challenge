// Create Leaflet Map 
let myMap = L.map("map", {
    center: [39.8283, -98.5795], // using the geophraphic center of the US which is Lebanon, Kansas
    zoom: 5
});

// Add map background aka Tile Layer from openstreetmap and give the attribution
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
}).addTo(myMap);


// API GeoJSON URL
let queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
// Call a function to create features from the data
d3.json(queryURL).then((data) => {
    createFeatures(data.features);
});

function createFeatures (earthquakeData) {
    
}

