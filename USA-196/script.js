let lat, long, marker, name;

function getLatLong() {
  $.ajax({
    // URL waar de gegevens vandaan gehaald worden. Key is persoonlijk.
    url:
      "https://www.n2yo.com/rest/v1/satellite/positions/31701/41.702/-76.014/0/2/&apiKey=V43FZL-MKYFLC-Q439N7-48RP",
    success: function(whatyougot) {
      document.getElementById("name").innerHTML = whatyougot.info.satname;
      document.getElementById("lat").innerHTML =
        "Latitude: " + whatyougot.positions[0].satlatitude;
      document.getElementById("long").innerHTML =
        "Longitude: " + whatyougot.positions[0].satlongitude;
      name = whatyougot.info.satname;
      lat = whatyougot.positions[0].satlatitude;
      long = whatyougot.positions[0].satlongitude;
      initMap();
    }
  });
}
// Initialize and add the map
function initMap() {
  // The location of SpaceStation
  var SpaceStation = {
    lat: lat,
    lng: long
  };
  // The map, centered at SpaceStation
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 3,
    center: SpaceStation,
    mapTypeId: "satellite"
  });
  // The marker, positioned at SpaceStation
  marker = new google.maps.Marker({
    position: SpaceStation,
    map: map,
    icon: {
      url: "satellite.png",
      labelOrigin: { x: 12, y: -10 }
    },
    animation: google.maps.Animation.DROP,
    label: {
      color: "white",
      fontSize: "14px",
      text: name
    },
    optimized: false,
    visible: true
  });

  setInterval(function() {
    $.ajax({
      // URL waar de gegevens vandaan gehaald worden. Key is persoonlijk.
      url:
        "https://www.n2yo.com/rest/v1/satellite/positions/31701/41.702/-76.014/0/2/&apiKey=V43FZL-MKYFLC-Q439N7-48RP",
      success: function(whatyougot) {
        document.getElementById("name").innerHTML = whatyougot.info.satname;
        document.getElementById("lat").innerHTML =
          "Latitude: " + whatyougot.positions[0].satlatitude;
        document.getElementById("long").innerHTML =
          "Longitude: " + whatyougot.positions[0].satlongitude;
        lat = whatyougot.positions[0].satlatitude;
        long = whatyougot.positions[0].satlongitude;
        var newLatLng = new google.maps.LatLng(lat, long);
        marker.setPosition(newLatLng);
      }
    });
  }, 1000);
}
