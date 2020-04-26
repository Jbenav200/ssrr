mapboxgl.accessToken = 'pk.eyJ1IjoiZGh1c2FyMjAwIiwiYSI6ImNrN2p1bXoxZzB4MmczZW8zOTQybXN6ZDkifQ.2qAG20LMwGtVWmqYt9FMKg';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/dark-v10', //hosted style id
    center: [-77.38, 39], // starting position
    zoom: 3 // starting zoom
});

//map.setStyle('mapbox://styles/mapbox/dark-v10');

/* given a query in the form "lng, lat" or "lat, lng" returns the matching
* geographic coordinate(s) as search results in carmen geojson format,
* https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
*/
var coordinatesGeocoder = function(query) {
// match anything which looks like a decimal degrees coordinate pair
var matches = query.match(
/^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i
);
if (!matches) {
return null;
}

function coordinateFeature(lng, lat) {
return {
center: [lng, lat],
geometry: {
type: 'Point',
coordinates: [lng, lat]
},
place_name: 'Lat: ' + lat + ' Lng: ' + lng,
place_type: ['coordinate'],
properties: {},
type: 'Feature'
};
}

var coord1 = Number(matches[1]);
var coord2 = Number(matches[2]);
var geocodes = [];

if (coord1 < -90 || coord1 > 90) {
// must be lng, lat
geocodes.push(coordinateFeature(coord1, coord2));
}

if (coord2 < -90 || coord2 > 90) {
// must be lat, lng
geocodes.push(coordinateFeature(coord2, coord1));
}

if (geocodes.length === 0) {
// else could be either lng, lat or lat, lng
geocodes.push(coordinateFeature(coord1, coord2));
geocodes.push(coordinateFeature(coord2, coord1));
}

return geocodes;
};

map.addControl(
new MapboxGeocoder({
accessToken: mapboxgl.accessToken,
localGeocoder: coordinatesGeocoder,
zoom: 4,
placeholder: 'Try: -40, 170',
mapboxgl: mapboxgl
})
);


map.on('load', function() {

    map.addSource('meteorites', {
        'type': 'geojson',
        'data': '/features.geojson'
    });

    // good green #4ca419
    //good orange #c58211
    //good yellow #a1a422

map.addLayer({
    'id': 'meteorites-layer-small',
    'type': 'circle',
    'source': 'meteorites',
    'paint': {
        'circle-radius': {
            'base': 1.75,
            'stops': [[12, 4], [22, 180]]
            },

        'circle-color': [
            'match',
            ['get', 'size'],
            "small",
            '#4ca419',
            "medium",
            '#a1a422',
            "large",
            '#c58211',
            /* other */ '#ccc'
        ]
        // Mapbox Style Specification paint properties
    },
    'filter': ["==","size", "small"],
    'layout': {
        'visibility': "visible"
    }
});
    map.addLayer({
        'id': 'meteorites-layer-medium',
        'type': 'circle',
        'source': 'meteorites',
        'paint': {
            'circle-radius': {
                'base': 1.75,
                'stops': [[12, 4], [22, 180]]
            },

            'circle-color': [
                'match',
                ['get', 'size'],
                "small",
                '#4ca419',
                "medium",
                '#a1a422',
                "large",
                '#c58211',
                /* other */ '#ccc'
            ]
            // Mapbox Style Specification paint properties
        },
        'filter': ["==","size", "medium"],
        'layout': {
            'visibility': "visible"
        }
    });

    map.addLayer({
        'id': 'meteorites-layer-large',
        'type': 'circle',
        'source': 'meteorites',
        'paint': {
            'circle-radius': {
                'base': 1.75,
                'stops': [[12, 4], [22, 180]]
            },

            'circle-color': [
                'match',
                ['get', 'size'],
                "small",
                '#4ca419',
                "medium",
                '#a1a422',
                "large",
                '#c58211',
                /* other */ '#ccc'
            ]
            // Mapbox Style Specification paint properties
        },
        'filter': ["==","size", "large"],
        'layout': {
            'visibility': "visible"
        }
    });


    map.on('click', 'meteorites-layer-small', function(e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties;

// Ensure that if the map is zoomed out such that multiple
// copies of the feature are visible, the popup appears
// over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML("<table class='table'><tr><th>Name</th><td>" + description.name +"</td></tr> <tr><th>Size</th><td>" +
                description.size +"</td></tr><tr><th>Mass(KG)</th><td>" + description.mass +"</td></tr><tr><th>Geo Location" +
                "</th><td>" + description.geolocation.split("'")[3] + ", " + description.geolocation.split("'")[7] +
                "</td></tr><tr><th>Class</th><td>" + description.class +"</td></tr></table>")
            .addTo(map);
    });

    map.on('click', 'meteorites-layer-medium', function(e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties;

// Ensure that if the map is zoomed out such that multiple
// copies of the feature are visible, the popup appears
// over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML("<table class='table'><tr><th>Name</th><td>" + description.name +"</td></tr> <tr><th>Size</th><td>" +
                description.size +"</td></tr><tr><th>Mass(KG)</th><td>" + description.mass +"</td></tr><tr><th>Geo Location" +
                "</th><td>" + description.geolocation.split("'")[3] + ", " + description.geolocation.split("'")[7] +
                "</td></tr><tr><th>Class</th><td>" + description.class +"</td></tr></table>")
            .addTo(map);
    });

    map.on('click', 'meteorites-layer-large', function(e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties;

// Ensure that if the map is zoomed out such that multiple
// copies of the feature are visible, the popup appears
// over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML("<table class='table'><tr><th>Name</th><td>" + description.name +"</td></tr> <tr><th>Size</th><td>" +
                description.size +"</td></tr><tr><th>Mass(KG)</th><td>" + description.mass +"</td></tr><tr><th>Geo Location" +
                "</th><td>" + description.geolocation.split("'")[3] + ", " + description.geolocation.split("'")[7] +
                "</td></tr><tr><th>Class</th><td>" + description.class +"</td></tr></table>")
            .addTo(map);
    });

//
// Change the cursor to a pointer when the mouse is over the places layer.

    map.on('mouseenter', 'meteorites-layer-small', function() {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseenter', 'meteorites-layer-medium', function() {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseenter', 'meteorites-layer-large', function() {
        map.getCanvas().style.cursor = 'pointer';
    });

// Change it back to a pointer when it leaves.

    map.on('mouseleave', 'meteorites-layer-small', function() {
        map.getCanvas().style.cursor = '';
    });

    map.on('mouseleave', 'meteorites-layer-medium', function() {
        map.getCanvas().style.cursor = '';
    });

    map.on('mouseleave', 'meteorites-layer-large', function() {
        map.getCanvas().style.cursor = '';
    });


    var toggleableLayerIds = ['meteorites-layer-small', 'meteorites-layer-medium', 'meteorites-layer-large'];
    var range = ['0 - 700KG', '700 - 7000KG', ">7000KG"]
    var layers = document.getElementById('filter-group');

// set up the corresponding toggle button for each layer
    for (var i = 0; i < toggleableLayerIds.length; i++) {
        var id = toggleableLayerIds[i];

        var link = document.createElement('input');
        link.type = "checkbox";
        link.id = id;
        link.checked = true;
        link.className = 'active';
        layers.appendChild(link);

        var label = document.createElement('label');
        label.setAttribute('for', id);
        label.style = "text-align: center";
        label.textContent = id.slice(17).toLocaleUpperCase() + " " + range[i];
        layers.appendChild(label);

        link.onclick = function(e) {
            var clickedLayer = this.id;
            //e.preventDefault();
            e.stopPropagation();

            var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

// toggle layer visibility by changing the layout object's visibility property
            if (visibility === 'visible') {
                map.setLayoutProperty(clickedLayer, 'visibility', 'none');
                this.className = '';
            } else {
                this.className = 'active';
                map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
            }
        };

    }

});

function continentSelect(e) {
    continent = e;
    switch (continent) {
        case "Asia":
            map.setCenter([98.24185228685019, 30.890431040494406]);
            break;
        case "Europe":
            map.setCenter([22.70291137065692, 51.20988512246353]);
            break;
        case "Africa":
            map.setCenter([13.467897508237002, 0.2679887150454334]);
            break;
        case "North America":
            map.setCenter([-90.38524320367412, 44.12384925868278]);
            break;
        case "South America":
            map.setCenter([-65.61740507626911, -22.990495536642356]);
            break;
        case "Australia":
            map.setCenter([133.52433465545153, -31.210414996771895]);
            break;
    }
};


