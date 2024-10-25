
  document.getElementById('search-button').addEventListener('click', handleSearch);
document.getElementById('location-input').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') handleSearch();
});

async function handleSearch() {
  const locationInput = document.getElementById('location-input').value.trim();
  
  if (locationInput === "") {
    alert("Please enter a travel location.");
    return;
  }

  try {
    const destination = await getCoordinates(locationInput);

    if (!isNaN(destination.lat) && !isNaN(destination.lon)) {
      map.setView([destination.lat, destination.lon], 10);
      displayDestinationsOnMap([destination]);
    } else {
      alert("Invalid coordinates for this location.");
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
  }
}

// Función para obtener coordenadas de una ubicación usando Nominatim
async function getCoordinates(location) {
  const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`);
  const data = await response.json();

  if (data.length === 0) {
    throw new Error("Coordinates not found for this location.");
  }

  return {
    name: location,
    lat: parseFloat(data[0].lat),
    lon: parseFloat(data[0].lon)
  };
}

// Función para mostrar los destinos en el mapa usando Leaflet
function displayDestinationsOnMap(destinations) {
  destinations.forEach(dest => {
    const marker = L.marker([dest.lat, dest.lon]).addTo(map);
    marker.bindPopup(`<b>${dest.name}</b><br>Lat: ${dest.lat}, Lon: ${dest.lon}`).openPopup();
  });
}

// Inicializa el mapa en una vista global
const map = L.map('map').setView([20, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
