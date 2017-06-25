// This example creates a 2-pixel-wide red polyline showing the path of William
// Kingsford Smith's first trans-Pacific flight between Oakland, CA, and
// Brisbane, Australia.

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: {
      lat: 39.8041291,
      lng: -96.6385416
    },
    mapTypeId: 'satellite'
  });
  $.getJSON("data.json", function(data) {
    for (var v in data.vessels)
      $.getJSON("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22https%3A%2F%2Fwww.marinetraffic.com%2Fen%2Fais%2Fget_info_window_json%3Fasset_type%3Dship%26id%3D" + data.vessels[v].id + "%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys", function(d) {
        var infowindow = new google.maps.InfoWindow({
          content: '<div id="content"><div id="siteNotice"></div><h1 id="firstHeading" class="firstHeading">' + d.query.results.json.values.shipname + '</h1><div id="bodyContent">' + d.query.results.json.values.type_name + '</br>Reported heading: ' + d.query.results.json.voyage.dest_rep + '</p><p>Position updated: ' + new Date(d.query.results.json.values.last_pos * 1000) + '</p></div></div>'
        });

        var ship = new google.maps.Marker({
          animation: google.maps.Animation.DROP,
          position: {
            lat: parseFloat(d.query.results.json.values.ship_lat),
            lng: parseFloat(d.query.results.json.values.ship_lon)
          },
          icon: "https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_directions_boat_white_24px.svg",
          map: map,
          title: d.query.results.json.values.shipname
        });
        ship.addListener('click', function() {
          infowindow.open(map, ship);
        });
      });


    new google.maps.KmlLayer("https://www.google.com/maps/d/u/0/kml?mid=1wvgFIPuOmI8da9EIB88tHo9vamo&nl=1", {
      map: map
    });
  });
}
