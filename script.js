// ========================================
// CREATE MAP
// ========================================

var map = L.map('map', { minZoom: 4 }).setView([30.3753, 69.3451], 5);

L.control.scale().addTo(map);   // scale bar


// ========================================
// BASE MAPS
// ========================================

var osm = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    { attribution: '&copy; OpenStreetMap contributors' }
);

var satellite = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    { attribution: 'Tiles &copy; Esri' }
);

osm.addTo(map);


// ========================================
// DATA: 15 CITIES  (Name, Province, Type)
// [latitude, longitude]
// ========================================

var cities = [
    { name: "Islamabad",   province: "Islamabad Capital Territory", type: "Federal Capital",   coords: [33.6844, 73.0479] },
    { name: "Lahore",      province: "Punjab",                      type: "Provincial Capital", coords: [31.5204, 74.3587] },
    { name: "Karachi",     province: "Sindh",                       type: "Provincial Capital", coords: [24.8607, 67.0011] },
    { name: "Peshawar",    province: "Khyber Pakhtunkhwa",          type: "Provincial Capital", coords: [34.0151, 71.5249] },
    { name: "Quetta",      province: "Balochistan",                 type: "Provincial Capital", coords: [30.1798, 66.9750] },
    { name: "Gilgit",      province: "Gilgit-Baltistan",            type: "Regional Capital",   coords: [35.9208, 74.3080] },
    { name: "Faisalabad",  province: "Punjab",                      type: "Industrial City",    coords: [31.4504, 73.1350] },
    { name: "Rawalpindi",  province: "Punjab",                      type: "Major City",         coords: [33.5651, 73.0169] },
    { name: "Multan",      province: "Punjab",                      type: "Major City",         coords: [30.1575, 71.5249] },
    { name: "Hyderabad",   province: "Sindh",                       type: "Major City",         coords: [25.3960, 68.3578] },
    { name: "Gujranwala",  province: "Punjab",                      type: "Industrial City",    coords: [32.1877, 74.1945] },
    { name: "Sialkot",     province: "Punjab",                      type: "Industrial City",    coords: [32.4945, 74.5229] },
    { name: "Bahawalpur",  province: "Punjab",                      type: "Major City",         coords: [29.3956, 71.6836] },
    { name: "Sukkur",      province: "Sindh",                       type: "Major City",         coords: [27.7052, 68.8574] },
    { name: "Abbottabad",  province: "Khyber Pakhtunkhwa",          type: "Hill Station City",  coords: [34.1688, 73.2215] }
];


// ========================================
// DATA: 15 WEATHER STATIONS
// (Station Name, Temperature °C, Rainfall mm, Humidity %, AQI)
// NOTE: values are sample data - replace with real readings if you have them
// ========================================

var stations = [
    { name: "Islamabad Station",   temperature: 28, rainfall: 12, humidity: 60, aqi: 72,  coords: [33.6844, 73.0479] },
    { name: "Lahore Station",      temperature: 34, rainfall: 10, humidity: 50, aqi: 168, coords: [31.5497, 74.3436] },
    { name: "Karachi Station",     temperature: 33, rainfall: 6,  humidity: 75, aqi: 96,  coords: [24.9056, 67.0822] },
    { name: "Peshawar Station",    temperature: 30, rainfall: 16, humidity: 55, aqi: 135, coords: [34.0100, 71.5800] },
    { name: "Quetta Station",      temperature: 22, rainfall: 14, humidity: 30, aqi: 42,  coords: [30.2000, 67.0100] },
    { name: "Multan Station",      temperature: 36, rainfall: 4,  humidity: 35, aqi: 120, coords: [30.1980, 71.4700] },
    { name: "Gilgit Station",      temperature: 20, rainfall: 5,  humidity: 40, aqi: 38,  coords: [35.9200, 74.3300] },
    { name: "Skardu Station",      temperature: 15, rainfall: 3,  humidity: 38, aqi: 30,  coords: [35.2971, 75.6333] },
    { name: "Chitral Station",     temperature: 21, rainfall: 8,  humidity: 45, aqi: 35,  coords: [35.8518, 71.7864] },
    { name: "Murree Station",      temperature: 19, rainfall: 22, humidity: 70, aqi: 28,  coords: [33.9070, 73.3943] },
    { name: "Jacobabad Station",   temperature: 39, rainfall: 2,  humidity: 28, aqi: 110, coords: [28.2769, 68.4514] },
    { name: "D.I. Khan Station",   temperature: 35, rainfall: 7,  humidity: 40, aqi: 105, coords: [31.8313, 70.9017] },
    { name: "Gwadar Station",      temperature: 31, rainfall: 1,  humidity: 78, aqi: 65,  coords: [25.1216, 62.3254] },
    { name: "Zhob Station",        temperature: 24, rainfall: 9,  humidity: 32, aqi: 45,  coords: [31.3410, 69.4481] },
    { name: "Sargodha Station",    temperature: 33, rainfall: 11, humidity: 48, aqi: 125, coords: [32.0740, 72.6861] }
];


// ========================================
// CUSTOM MARKER SYMBOLS
// ========================================

var cityIcon = L.divIcon({
    className: "",
    html: '<div class="city-marker"></div>',
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -10]
});

var stationIcon = L.divIcon({
    className: "",
    html: '<div class="station-marker"></div>',
    iconSize: [14, 14],
    iconAnchor: [7, 7],
    popupAnchor: [0, -10]
});


// ========================================
// POPUPS
// ========================================

function cityPopup(c) {
    return (
        '<div class="popup-title">🏙️ ' + c.name + '</div>' +
        '<div class="popup-row"><b>Name:</b> ' + c.name + '</div>' +
        '<div class="popup-row"><b>Province:</b> ' + c.province + '</div>' +
        '<div class="popup-row"><b>Type:</b> ' + c.type + '</div>'
    );
}

function stationPopup(s) {
    return (
        '<div class="popup-title">🌦️ ' + s.name + '</div>' +
        '<div class="popup-row"><b>Station Name:</b> ' + s.name + '</div>' +
        '<div class="popup-row"><b>Temperature:</b> ' + s.temperature + ' °C</div>' +
        '<div class="popup-row"><b>Rainfall:</b> ' + s.rainfall + ' mm</div>' +
        '<div class="popup-row"><b>Humidity:</b> ' + s.humidity + ' %</div>' +
        '<div class="popup-row"><b>AQI:</b> ' + s.aqi + '</div>'
    );
}


// ========================================
// LAYER 1: CITIES
// ========================================

var citiesLayer = L.layerGroup();

cities.forEach(function (c) {
    L.marker(c.coords, { icon: cityIcon, title: c.name })
        .bindPopup(cityPopup(c))
        .bindTooltip(c.name, { direction: "top", offset: [0, -8] })
        .addTo(citiesLayer);
});


// ========================================
// LAYER 2: WEATHER STATIONS
// ========================================

var stationsLayer = L.layerGroup();

stations.forEach(function (s) {
    L.marker(s.coords, { icon: stationIcon, title: s.name })
        .bindPopup(stationPopup(s))
        .bindTooltip(s.name, { direction: "top", offset: [0, -8] })
        .addTo(stationsLayer);
});


// ========================================
// GRADUATED SYMBOL LAYERS (from weather stations)
// ========================================

var sizes = { small: 6, medium: 12, large: 20 };

var modes = {
    temperature: {
        title: "Temperature",
        color: "red",
        getValue: function (s) { return s.temperature; },
        classify: function (v) {
            if (v < 25) return "small";
            if (v <= 30) return "medium";
            return "large";
        },
        labels: { small: "< 25°C", medium: "25–30°C", large: "> 30°C" }
    },
    rainfall: {
        title: "Rainfall",
        color: "#1d6fd8",
        getValue: function (s) { return s.rainfall; },
        classify: function (v) {
            if (v < 10) return "small";
            if (v <= 15) return "medium";
            return "large";
        },
        labels: { small: "< 10 mm", medium: "10–15 mm", large: "> 15 mm" }
    },
    humidity: {
        title: "Humidity",
        color: "#00a896",
        getValue: function (s) { return s.humidity; },
        classify: function (v) {
            if (v < 40) return "small";
            if (v <= 60) return "medium";
            return "large";
        },
        labels: { small: "< 40 %", medium: "40–60 %", large: "> 60 %" }
    },
    aqi: {
        title: "AQI",
        color: "purple",
        getValue: function (s) { return s.aqi; },
        classify: function (v) {
            if (v < 50) return "small";
            if (v <= 100) return "medium";
            return "large";
        },
        labels: { small: "< 50", medium: "50–100", large: "> 100" }
    }
};

function createSymbolLayer(mode) {
    var group = L.layerGroup();

    stations.forEach(function (s) {
        var size = mode.classify(mode.getValue(s));

        L.circleMarker(s.coords, {
            radius: sizes[size],
            fillColor: mode.color,
            color: "black",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.7
        })
        .bindPopup(stationPopup(s))
        .addTo(group);
    });

    return group;
}

var temperatureLayer = createSymbolLayer(modes.temperature);
var rainfallLayer    = createSymbolLayer(modes.rainfall);
var humidityLayer    = createSymbolLayer(modes.humidity);
var aqiLayer         = createSymbolLayer(modes.aqi);


// ========================================
// LAYER CONTROL
// ========================================

var baseMaps = {
    "OpenStreetMap": osm,
    "Satellite Imagery": satellite
};

var overlayMaps = {
    "🏙️ Cities (15)": citiesLayer,
    "🌦️ Weather Stations (15)": stationsLayer,
    "Temperature (graduated)": temperatureLayer,
    "Rainfall (graduated)": rainfallLayer,
    "Humidity (graduated)": humidityLayer,
    "AQI (graduated)": aqiLayer
};

// Cities and weather stations are ON by default
citiesLayer.addTo(map);
stationsLayer.addTo(map);

L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);


// ========================================
// LEGEND (one block per graduated layer that is switched on)
// ========================================

var legendItems = [
    { layer: temperatureLayer, mode: modes.temperature },
    { layer: rainfallLayer,    mode: modes.rainfall },
    { layer: humidityLayer,    mode: modes.humidity },
    { layer: aqiLayer,         mode: modes.aqi }
];

function updateLegend() {
    var html = "";

    legendItems.forEach(function (item) {
        if (!map.hasLayer(item.layer)) return;

        html += '<div class="legend-block">';
        html += "<h4>" + item.mode.title + "</h4>";

        ["small", "medium", "large"].forEach(function (key) {
            var d = sizes[key] * 2;
            html +=
                '<div class="legend-row">' +
                '<span class="legend-dot" style="width:' + d + 'px;height:' + d +
                'px;background:' + item.mode.color + '"></span>' +
                key.charAt(0).toUpperCase() + key.slice(1) +
                " (" + item.mode.labels[key] + ")" +
                "</div>";
        });

        html += "</div>";
    });

    var legend = document.getElementById("legend");
    legend.innerHTML = html;
    legend.style.display = html ? "block" : "none";
}

map.on("overlayadd", updateLegend);
map.on("overlayremove", updateLegend);
updateLegend();