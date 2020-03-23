mapboxgl.accessToken = 'pk.eyJ1IjoiZGh1c2FyMjAwIiwiYSI6ImNrN2p1bXoxZzB4MmczZW8zOTQybXN6ZDkifQ.2qAG20LMwGtVWmqYt9FMKg';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11/'
});

map.setStyle('mapbox://styles/mapbox/' + 'dark-v10');

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
/* Sample feature from the `examples.8fgz4egr` tileset:
{
"type": "Feature",
"properties": {
"ethnicity": "White"
},
"geometry": {
"type": "Point",
"coordinates": [ -122.447303, 37.753574 ]
}
}
*/
// map.addSource('ethnicity', {
// type: 'vector',
// url: 'mapbox://dhusar200.ck7jvns2q0nyd2qpd0d2wsns8-1ukj2'
// });



    // good green #4ca419
    //good orange #c58211
    //good yellow #a1a422
map.addLayer({
    id: 'points-of-interest',
    source: {
        type: 'vector',
        url: 'mapbox://dhusar200.ck7jvns2q0nyd2qpd0d2wsns8-1ukj2'
    },
    'source-layer': 'main_registry_meteorite',
    type: 'circle',
    paint: {
        'circle-radius': {
            'base': 1.75,
            'stops': [[12, 2], [22, 180]]
            },

        'circle-color': [
            'match',
            ['get', 'state'],
            "Fell",
            //["1504","21","720"],
            '#a1a422',
            "1503",
            '#3eff09',
            /* other */ '#ccc'
        ]
        // Mapbox Style Specification paint properties
    },
    layout: {
        // Mapbox Style Specification layout properties
    }

});
});

function onStart(){
    $(".fa-times-circle").css('visibility', 'hidden');
    $(".fa-bars").css('visibility', 'visible');
    $(".fa-filter").css('visibility', 'visible');
}

onStart();

