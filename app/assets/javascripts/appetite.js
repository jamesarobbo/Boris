$(document).ready(function () {


	// data for boris bikes in london
	// co-ordinates are easiest to get from bing maps
	var stores = [];
	var markers = [];

	$("ul li").each(function () {
		var store = {};
		store.id = $(this).data("id");
		store.location = [$(this).data("lat"), $(this).data("lng")];
		store.title = $(this).find("h3").text();
		store.address = $(this).find("p").text();
		store.color = "red";
		store.available = $(this).data("available");
		store.empty = $(this).data("empty");
		stores.push(store);
	});

	$("ul li").on("click", function () {
		var id = $(this).data("id");

		for (var i = 0; i < stores.length; i++) {
			if (stores[i].id == id) {
				markers[i].openPopup();
			}
		}

		return false;
	});


	// mapbox tiles
	var mapTiles = "https://a.tiles.mapbox.com/v3/jamesarobbo.ijglma8e/{z}/{x}/{y}.png";
	var map = L.map('map', {
		layers: new L.TileLayer(mapTiles)
	});

	var bounds = new L.LatLngBounds();

	for (var i = 0; i < stores.length; i++) {

		var store = stores[i];

		var size

   	if($(window).width() <= 724){ 
   		size = [30, 30]
		}else{
			size = [60, 60]
		}
		
		var markerIcon = L.icon({
				iconUrl: "/assets/" + store.color + "marker.png",
				iconSize: size,
				iconAnchor: [30, 60],
				popupAnchor: [0, -60]
			});

		var marker = L.marker(store.location, {	icon: markerIcon });
		marker.addTo(map);

		var popup = "<h3>" + store.title + "</h3>" + "<p>" + store.available + " bikes available</p><p>" + store.empty + " docking stations available</p>" ;
		marker.bindPopup(popup);

		markers.push(marker);

		bounds.extend(store.location);
	}


	map.fitBounds(bounds);



});
