'use strict';
function select(selector, parent = document) {
    return parent.querySelector(selector);
}

const overlay = select('.overlay');
const loading = select('.loading');
mapboxgl.accessToken = 'pk.eyJ1IjoiZ2FicmllbG4iLCJhIjoiY2xibDIxN3hnMDM4bTNvbXdodndkNDhucSJ9.ci6EmdJjXcg1QPWA3DCOIA';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [0, 0],
    pitch: 40,
    zoom: 16
});

map.dragPan.disable();
map.keyboard.disable();
map.scrollZoom.disable();
map.doubleClickZoom.disable();
map.touchZoomRotate.disable();

const marker = new mapboxgl.Marker({
    color: '#3898ff'
});

function getLocation(position) {
    const { longitude, latitude} = position.coords;

    if (longitude && latitude) {
        map.setCenter([longitude, latitude]);
        marker.setLngLat([longitude, latitude]).addTo(map);
        setTimeout( () => { overlay.style.display = 'none'}, 750);
    }
}

function errorHandler(event) {
    loading.style.animationPlayState = 'paused';
    console.log(event.message);
}

const options = {
    enableHighAccuracy: true,
    maximumAge: 0
}

/*
    The watchPosition() method is used to register a handler function that will
    be called automatically each time the position if the device changes
*/

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(getLocation, errorHandler, options);
} else {
    console.log('Geolocation is not supported by your browser');
}
