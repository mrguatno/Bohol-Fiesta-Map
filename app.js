mapboxgl.accessToken = 'pk.eyJ1IjoibXJndWF0bm8iLCJhIjoiY2xlbGhuMjF0MHYwcTN2cW5rbDlnd2NzayJ9.U4E6vdDNyk8s7yoXQc6tHg';

// Function to detect whether the user is on a mobile device
function isMobileDevice() {
  return (typeof window.orientation !== 'undefined') || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

// Set the default zoom level based on the user's device
const defaultZoom = isMobileDevice() ? 8 : 9;

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mrguatno/clh34zc4v008y01r89t6wglp5',
  center: [124.18, 9.75], // Longitude and Latitude of Bohol
  zoom: defaultZoom
});

// Rest of your code

map.on('load', () => {
  // Ensure the barangay layer is available
  if (map.getLayer('fiesta-bhl-2ddhc6')) {
    // Set the initial filter for the layer to show all barangays
    map.setFilter('fiesta-bhl-2ddhc6', ['!=', 'Fiesta', '']);

    // Add a click event listener to the layer
    map.on('click', 'fiesta-bhl-2ddhc6', (e) => {
      const bgyName = e.features[0].properties.Bgy_Name;
      const munName = e.features[0].properties.Mun_Name;

      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(`<h4>${bgyName}, ${munName}</h4>`)
        .addTo(map);
    });

    // Listen for changes in the date slider and update the filter accordingly
    const slider = document.getElementById('date-slider');
    const fiestaValue = document.getElementById('fiesta-value');
    
    slider.addEventListener('input', (e) => {
      const day = parseInt(e.target.value, 10);
      if (day === 0) {
        map.setFilter('fiesta-bhl-2ddhc6', ['!=', 'Fiesta', '']);
        fiestaValue.innerText = 'All';
      } else {
        map.setFilter('fiesta-bhl-2ddhc6', ['==', 'Fiesta', day]);
        fiestaValue.innerText = 'May ' + day;
      }
    });
  }})
