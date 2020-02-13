mapboxgl.accessToken = 'pk.eyJ1IjoiamJlbmF2MjAwIiwiYSI6ImNrNmt1eGZncTA3cDQzZHFndmJpN2hocHcifQ.jdPdzMHMAQg8thoHtVGfyw';
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
map.addSource('ethnicity', {
type: 'vector',
url: 'mapbox://examples.8fgz4egr'
});
map.addLayer({
'id': 'population',
'type': 'circle',
'source': 'ethnicity',
'source-layer': 'sf2010',
'paint': {
// make circles larger as the user zooms from z12 to z22
'circle-radius': {
'base': 1.75,
'stops': [[12, 2], [22, 180]]
},
// color circles by ethnicity, using a match expression
// https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
'circle-color': [
'match',
['get', 'ethnicity'],
'White',
'#fbb03b',
'Black',
'#223b53',
'Hispanic',
'#e55e5e',
'Asian',
'#3bb2d0',
/* other */ '#ccc'
]
}
});
});