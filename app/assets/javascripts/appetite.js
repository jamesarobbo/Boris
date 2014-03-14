$(document).ready(function () {


	// data for boris bikes in london
	// co-ordinates are easiest to get from bing maps
	var stores = [];

	$("ul li").each(function () {

		var store = {};
		store.location = [$(this).data("lat"), $(this).data("lng")];
		store.title = $(this).find("h3").text();
		store.address = $(this).find("p").text();
		store.color = "red";
		stores.push(store);

	});

	// mapbox tiles
	var mapTiles = "https://a.tiles.mapbox.com/v3/riklomas.h1d63np6/{z}/{x}/{y}.png";
	var map = L.map('map', {
		layers: new L.TileLayer(mapTiles)
	});

	var bounds = new L.LatLngBounds();

	for (var i = 0; i < stores.length; i++) {

		var store = stores[i];

		var markerIcon = L.icon({
			iconUrl: "/assets/" + store.color + "marker.png",
			iconSize: [60, 60],
			iconAnchor: [30, 60],
			popupAnchor: [0, -70]
		});

		var marker = L.marker(store.location, {	icon: markerIcon });
		marker.addTo(map);

		var popup = "<h3>" + store.title + "</h3><p>" + store.address + "</p>";
		marker.bindPopup(popup);

		bounds.extend(store.location);
	}


	map.fitBounds(bounds);



});
