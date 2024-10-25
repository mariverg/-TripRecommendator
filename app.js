document.getElementById('search-button').addEventListener('click', () => {
    const locationInput = document.getElementById('location-input').value;
  
    if (locationInput.trim() === "") {
      alert("Please enter a travel location.");
      return;
    }
  
    // Llamada simulada a la API de IA para obtener destinos recomendados
    simulateApiCall(locationInput);
  });
  
  function simulateApiCall(location) {
    // Simula una lista de destinos basada en el lugar ingresado
    const destinations = [
      { name: `${location} - Recommendation 1`, lat: 48.8566, lon: 2.3522 },
      { name: `${location} - Recommendation 2`, lat: 34.0522, lon: -118.2437 }
    ];
  
    // Muestra las recomendaciones en el mapa (esto se implementará en map.js)
    displayDestinationsOnMap(destinations);
  }
  // Inicializa el mapa en una vista global (por ejemplo, centrado en coordenadas iniciales)
const map = L.map('map').setView([20, 0], 2); // Centrado en coordenadas genéricas y zoom mundial

// Agrega el mapa base de OpenStreetMap a Leaflet
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Función para obtener coordenadas de una ubicación usando Nominatim
async function getCoordinates(location) {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`);
    const data = await response.json();
  
    console.log(data);  // Imprime la respuesta completa para depuración
  
    if (data.length === 0) {
      throw new Error("No se encontraron coordenadas para esta ubicación");
    }
  
    // Retorna las coordenadas de la primera coincidencia
    return {
      name: location,
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon)
    };
  }
  
  // Evento de clic para buscar la ubicación y agregar marcador en el mapa
  document.getElementById('search-button').addEventListener('click', async () => {
    const locationInput = document.getElementById('location-input').value;
  
    if (locationInput.trim() === "") {
      alert("Por favor ingresa una ubicación.");
      return;
    }
  
    try {
      const destination = await getCoordinates(locationInput);
  
      // Verifica si destination tiene coordenadas válidas
      if (!isNaN(destination.lat) && !isNaN(destination.lon)) {
        // Centra el mapa en la ubicación encontrada y agrega el marcador
        map.setView([destination.lat, destination.lon], 10); // Ajusta el zoom según la ubicación
        displayDestinationsOnMap([destination]);
      } else {
        alert("Las coordenadas no son válidas para esta ubicación.");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      //alert("No se encontraron coordenadas para la ubicación ingresada.");
    }
  });
  
  // Función para mostrar los destinos en el mapa usando Leaflet
  function displayDestinationsOnMap(destinations) {
    destinations.forEach(dest => {
      const marker = L.marker([dest.lat, dest.lon]).addTo(map);
      marker.bindPopup(`<b>${dest.name}</b><br>Lat: ${dest.lat}, Lon: ${dest.lon}`).openPopup();
    });
  }
  
  
  document.getElementById('search-button').addEventListener('click', async () => {
    const locationInput = document.getElementById('location-input').value;
    if (locationInput.trim() === "") {
      alert("Please enter a travel location.");
      return;
    }
  
    try {
      const suggestions = await getDestinationSuggestions(locationInput);
      const destinations = suggestions.map(s => ({
        name: s,
        lat: getRandomLat(), // Función que asigna coordenadas aleatorias
        lon: getRandomLon()  // o puedes buscar coordenadas reales
      }));
      displayDestinationsOnMap(destinations); // Aquí llamamos la función de mostrar en el mapa
    } catch (error) {
      console.error("Error fetching destination suggestions:", error);
    }
  });
  
  // Funciones para generar coordenadas aleatorias (simulación)
  function getRandomLat() {
    return (Math.random() * 180 - 90).toFixed(4); // Latitud aleatoria
  }
  
  function getRandomLon() {
    return (Math.random() * 360 - 180).toFixed(4); // Longitud aleatoria
  }
  