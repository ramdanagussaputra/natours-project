/* eslint-disable */
const locations = JSON.parse(document.getElementById('map')?.dataset.locations);

const key = 'wULMuXPVJGprvCiWgSVW';
const map = new maplibregl.Map({
  container: 'map', // container id
  style: `https://api.maptiler.com/maps/streets/style.json?key=${key}`, // style URL
  scrollZoom: false,
});

const bounds = new maplibregl.LngLatBounds();

locations.forEach((loc) => {
  const el = document.createElement('div');
  el.className = 'marker';

  const marker = new maplibregl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  const PopUp = new maplibregl.Popup({
    offset: 50,
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>${loc.day} | ${loc.description}</p>`)
    .addTo(map);

  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 300,
    bottom: 150,
    left: 100,
    right: 100,
  },
});
