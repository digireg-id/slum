var url = document.location.origin + '/';
var path_map = 'assets/F8B90FEEA02867D4A/';
var coords = [-6.261493, 106.810600];
var geometry = '';
var geo_wilayah = '';
var map = '';
var geo = '';
var poly = '';
var name_wilayah = '';
var drawnItems = L.featureGroup();
var drawnItems2 = L.featureGroup();
var drawControl = '';
var state = false;
var min_zoom = 0;
var max_zoom = 22;
var rows = 0;
var idx = '';
var bool = false;
var jns = '1';
var shape = '';
var shape_for_db = '';
var array_submission = new Array();

var basemap_osm = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var attrib_osm = '<a href="http://openstreetmap.org/copyright">OpenStreetMap</a>';

var basemap_imagery = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
var attrib_imagery = '<a href="http://www.esri.com/">Esri</a>';

var basemap_satellite = 'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}';
var attrib_satellite = '<a href="http://google.com/">GSatellite</a>';

var osmLink = attrib_osm;
var osmURL = basemap_osm;
var osmAttrib = '&copy; ' + osmLink + ' contributors';

var imageryLink = attrib_imagery;
var imageryURL = basemap_imagery;
var imageryAttrib = ' &copy; ' + imageryLink + ' contributors';

var satelliteLink = attrib_satellite;
var satelliteURL = basemap_satellite;
var satelliteAttrib = ' &copy; ' + satelliteLink + ' contributors';