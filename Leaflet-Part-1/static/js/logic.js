// Add map background aka Tile Layer from openstreetmap and give the attribution
let basemap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
});

// Create Leaflet Map 
let myMap = L.map("map", {
    center: [39.8283, -98.5795], // using the geophraphic center of the US which is Lebanon, Kansas
    zoom: 5
});

// Add baselayer to map
basemap.addTo(myMap);

// API GeoJSON URL
let queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
// Call a function to create features from the data
d3.json(queryURL).then((data) => {
    createFeatures(data.features);
});

function createFeatures (earthquakeData) {
    function onEachFeature (feature, layer) {
        layer.bindPopup(`<h3>Location: ${feature.properties.place}</h3><hr>
                        <p>Magnitude: ${feature.properties.mag}</p>
                        <p>Depth: ${feature.geometry.coordinates[2]}</p>`);
    }
    function markerSize (magnitude) {
        return magnitude * 5;
    }

    function markerColor(depth) {
        return depth > 90 ? '#d73027' :
               depth > 70 ? '#fc8d59' :
               depth > 50 ? '#fee08b' :
               depth > 30 ? '#d9ef8b' :
               depth > 10 ? '#91cf60' :
                            '#1a9850';
    }

    let earthquakes = L.geoJSON (earthquakeData, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker (latlng, {
                radius: markerSize(feature.properties.mag),
                fillColor: markerColor(feature.geometry.coordinates[2]),
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            });
        },
        onEachFeature: onEachFeature
    });
    earthquakes.addTo(myMap);

    let legend = L.control({position: 'bottomright'});

    legend.onAdd = function() {
        let div = L.DomUtil.create('div', 'legend'),
            depths = [-10, 10, 30, 50, 70, 90],
            labels = [];
        
        for (let i = 0; i < depths.length; i++) {
            div.innerHTML +=
                '<i style="background:' + markerColor(depths[i] + 1) + '"></i> ' +
                depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
        }

        return div;
    };

    legend.addTo(myMap);
}

// CSS for the legend
const legendStyles = document.createElement("style");
legendStyles.innerHTML = `
    .legend {
        background-color: white;
        padding: 6px 8px;
        font: 14px Arial, Helvetica, sans-serif;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
        border-radius: 5px;
        line-height: 18px;
        color: #555;
    }
    .legend i {
        width: 18px;
        height: 18px;
        float: left;
        margin-right: 8px;
        opacity: 0.7;
    }
`;
document.head.appendChild(legendStyles);