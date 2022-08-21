var map;
var service;
var infowindow;

function initMap() {
  // centres map on this co-ordinates
  var singapore = new google.maps.LatLng(1.374948, 103.878960);
  infowindow = new google.maps.InfoWindow();
  map = new google.maps.Map(
    document.getElementById('map'), { center: singapore, zoom: 15 });
}

function getQuery() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const location = urlParams.get('location');

  console.log("maps.html : " + location);

  var request = {
    query: location,
    fields: ['name', 'geometry'],
  };

  var service = new google.maps.places.PlacesService(map);

  service.findPlaceFromQuery(request, function (results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
      map.setCenter(results[0].geometry.location);
    }
  });
}

function createMarker(place) {
  if (!place.geometry || !place.geometry.location) return;

  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
  });

  google.maps.event.addListener(marker, "click", () => {
    infowindow.setContent(place.name || "");
    infowindow.open(map);
  });
}

window.initMap = initMap;