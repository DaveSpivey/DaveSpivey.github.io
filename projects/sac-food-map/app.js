$(document).ready(function() {

  $('.checkbox-day').click(filterDays);


  function addMarkers(queries) {
    queries.forEach(function(query) {
      var address = buildAddress(query);
      var currentMarker;

      $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?&address='+address+'&sensor=false', null, function (data) {
        var p = data.results[0].geometry.location
        var latlng = new google.maps.LatLng(p.lat, p.lng);
        currentMarker = new google.maps.Marker({
          position: latlng,
          map: map
        });
      })
        .done(function() {
          activeMarkers.push({marker: currentMarker, query: query});
          currentMarker.addListener('click', function() {
            showInfo(currentMarker, query)
          })
      });
    });
  }

  function showInfo(marker, query) {
    var days = [];
    schedule.forEach(function(listing) {
      if (listing.siteId == query.siteId) {
        days.push([findDay(listing.day), convertTime(listing.timeStart), convertTime(listing.timeEnd)]);
      }
    })
    var availability = "";
    days.forEach(function(day) {
      availability += day[0] + " " + day[1] + " to " + day[2] + "</p><p>"
    })
    var contentString = "<div><h3>" + query.siteName + "</h3><p>" + query.address + "</p><p>Open: " + availability + "Phone: " + query.phone + "</p></div>";
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    infowindow.open(map, marker);
  }

  // activeMarkers.forEach(function(location) {
  //   location.marker.addListener('mouseover', function(e) {
  //     showInfo(location.query, e);
  //   })
  //   location.marker.addListener('mouseout', function(e) {
  //     hideInfo(e);
  //   })
  // })

  function filterDays() {
    var target = $(this);
    var queries = [];
    if (target.is(':checked')) {
      schedule.forEach(function(listing) {
        if (listing.day == target.context.value) {
          queries.push(listing);
        }
      });
      addMarkers(queries);
    } else {
      for (var i = 0; i < activeMarkers.length; i++) {
        if (activeMarkers[i].query.day == target.context.value) {
          activeMarkers[i].marker.setMap(null);
          activeMarkers.splice(i, 1);
          i--;
        }
      }
    }
  }

// ************************
});

var activeMarkers = [];

function buildAddress(query) {
  return query.address + " " + query.city + ", " + query.state + " " + query.zip;
}

function buildQuery(query) {
  return { siteId: query.siteId, siteName: query.siteName, address: query.address, city: query.city, state: query.state, zip: query.zip, phone: query.phone, neighborhood: query.neighborhood, day: query.day, timeStart: query.timeStart, timeEnd: query.timeEnd }
}

function findDay(day) {
  var week = { M: "Monday", T: "Tuesday", W: "Wednesday", TH: "Thursday", F: "Friday", S: "Saturday", SU: "Sunday", XX: "Day not listed" }
  return week[day];
}

function convertTime(time) {
  if (time == "-") {
    return "(not listed)";
  }
  var time = time.toString();
  if (time.length < 4) {
    time = "0" + time;
  }
  var hours24 = parseInt(time.substring(0, 2),10);
  var hours = ((hours24 + 11) % 12) + 1;
  var amPm = hours24 > 11 ? 'pm' : 'am';
  var minutes = time.substring(2);

  return hours + ':' + minutes + amPm;
}


function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: 38.5816, lng: -121.4944},
    mapTypeId: google.maps.MapTypeId.TERRAIN
  });

  map.data.addGeoJson(promise);

  // Set the stroke width, and fill color for each polygon
  map.data.setStyle({
    fillColor: 'yellow',
    strokeWeight: 1
  });

}