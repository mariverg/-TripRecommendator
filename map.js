function displayDestinationsOnMap(destinations) {
    const mapSection = document.getElementById('map');
    mapSection.innerHTML = ""; // Limpia el mapa antes de agregar nuevos destinos
  
    destinations.forEach(dest => {
      const destDiv = document.createElement('div');
      destDiv.classList.add('destination-marker');
      destDiv.textContent = dest.name;
  
      mapSection.appendChild(destDiv);
    });
  }
  
  function initializeMap() {
    const map = L.map('map').setView([0, 0], 2); // Configura el mapa en el centro del mundo
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
  
    return map;
  }
  
  function displayDestinationsOnMap(destinations) {
    const map = initializeMap();
  
    destinations.forEach(dest => {
      const marker = L.marker([dest.lat, dest.lon]).addTo(map);
      marker.bindPopup(`<b>${dest.name}</b>`).openPopup();
    });
  }