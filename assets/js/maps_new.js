"use strict";

var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var KTLeaflet = function(obj_parent, geojson_name) {
    var epsg = "EPSG:4326";

    var demo = function(obj, name = 'jaksel') {
        var param_draw = '';
        var controlSearch = '';
        var marker = '';

        var osmMap = L.tileLayer(osmURL, {
            maxZoom: max_zoom,
            attribution: osmAttrib
        });

        var imageryMap = L.tileLayer(imageryURL, {
            maxZoom: max_zoom,
            attribution: imageryAttrib
        });

        var onLocationFound = function(e) {
            if (marker) {
                map.removeLayer(marker);
            }

            marker = L.marker(e.latlng).addTo(map)
                .bindPopup('Your are here :<br>latitude: ' + e.latitude + '<br>longitude: ' + e.longitude).openPopup();
        };

        var onLocationError = function(e) {
            alert(e.message);
        };

        var get_data_support = function() {
            var url = 'dashboard/get_data_support/';
            var data = '';

            data = get_data(url);

            return data;
        }

        var esri_layer = function(filename) {
            var esri = new L.esri.featureLayer({
                url: filename,
                useCors: true,
                ignoreRenderer: true,
                cacheLayers: true,
                opacity: 0.7,
                onEachFeature: function(f, l) {
                    var out = [];
                    if (f.properties) {
                        var ret = '';
                        ret += '<table width="100%">';
                        for (var key in f.properties) {
                            ret += '<tr>';
                            ret += '<td>' + key + '</td>';
                            ret += '<td width="15px"><center>:</center></td>';
                            ret += '<td>' + f.properties[key] + '</td>';
                            ret += '</tr>';
                            ret += '<tr height="2px"></tr>';
                            ret += '<tr>';
                        }
                        ret += '</table>';
                        l.bindPopup(ret);
                    }
                },
                style: function(feature) {
                    var ret;
                    if (feature.properties.Hexcolour) {
                        ret = {
                            weight: 1,
                            color: '#' + feature.properties.Hexcolour
                        };
                    } else {
                        ret = {
                            weight: 1,
                            color: 'blue',
                            fillOpacity: 0.2
                        };
                    }

                    return ret;
                }
            });

            return esri;
        }

        if (width < 768) {
            min_zoom = 11;
        } else {
            min_zoom = 12;
        }

        if (map) {
            map.off();
            map.remove();
        }

        map = new L.map(obj, {
            center: coords,
            minZoom: min_zoom,
            fullscreenControl: true,
            fullscreenControlOptions: {
                position: 'topleft'
            },
            maxZoom: max_zoom
        });

        $.getJSON("assets/data/kelurahan_jakarta.geojson", function(data) {
            geo_wilayah = new L.geoJson(data, {
                style: function(feature) {
                    var ret = {
                        weight: 2,
                        color: 'none',
                        fillColor: 'none',
                        fillOpacity: 0.1
                    };

                    return ret;
                }
            });

            controlSearch = new L.Control.Search({
                layer: geo_wilayah,
                initial: false,
                marker: false,
                zoom: max_zoom,
                propertyName: 'KELURAHAN',
                moveToLocation: function(latlng, title, mapx) {
                    mapx.flyToBounds(mapx.getBounds());
                },
                textPlaceholder: 'Cari Kelurahan',
                position: 'topleft'
            });

            controlSearch.on('search:locationfound', function(e) {
                reset_layer_wilayah();
                e.layer.setStyle({ fillColor: '#3f0', color: '#0f0' });
                map.flyToBounds((e.layer).getBounds());
                if (e.layer._popup) {
                    $(".leaflet-popup-close-button").click();
                    e.layer.openPopup();
                }
            });

            map.addControl(controlSearch);

            param_draw = {
                polyline: false,
                polygon: true,
                rectangle: false,
                circle: false,
                marker: false,
                circlemarker: false
            };

            drawnItems.addTo(map);

            L.control.layers({
                'Draw Layer': drawnItems
            }, {
                position: 'topleft',
                collapsed: true
            });

            drawControl = new L.Control.Draw({
                position: 'topleft',
                edit: false,
                delete: true,
                draw: param_draw
            });
        });

        map.on('enterFullscreen', function() {
            centers();
        });

        map.on('exitFullscreen', function() {
            centers();
        });

        L.control.mousePosition({
            "lngFirst": true,
            "emptyString": coords
        }).addTo(map);

        L.easyButton('<span class="fas fa-home"></span>', function() {
            centers();
        }).addTo(map);

        L.easyButton('<span class="flaticon2-refresh"></span>', function() {
            if (marker) {
                map.removeLayer(marker);
            }
            reset_layer_wilayah();
        }).addTo(map);

        L.easyButton('<span class="flaticon-placeholder-3"></span>', function() {
            map.on('locationfound', onLocationFound);
            map.on('locationerror', onLocationError);
            map.locate({ setView: true, maxZoom: 10 });
        }).addTo(map);

        var editActions = [
            LeafletToolbar.EditAction.Popup.Edit,
            LeafletToolbar.EditAction.Popup.Delete
        ];

        map.on('draw:created', function(e) {
            var layers = e.layer;

            layers.options.color = 'red';
            layers.on('edit', logEdit);
            layers.on('remove', logDelete);
            drawnItems.addLayer(e.layer);
            drawControl.remove();

            shape = layers.toGeoJSON();
            shape_for_db = JSON.parse(JSON.stringify(shape));

            enabled(false);

            layers.on('click', function(event) {
                new LeafletToolbar.EditToolbar.Popup(event.latlng, {
                    actions: editActions
                }).addTo(map, layers);
            });
        });

        var logEdit = function(e) {
            var layers = e.layer;

            shape = layers.toGeoJSON();
            shape_for_db = JSON.parse(JSON.stringify(shape));
            map.addControl(drawControl);
        }

        var logDelete = function(e) {
            drawnItems.eachLayer(function(layer) {
                if (L.stamp(e.target) == layer._leaflet_id) {
                    map.addControl(drawControl);
                    drawnItems.removeLayer(layer);
                }
            });

            console.log('Layer removed: ' + L.stamp(e.target));
        }

        imageryMap.addTo(map);

        var baseTree = [{
                label: '&nbsp;OpenStreeMap',
                layer: osmMap
            },
            {
                label: '&nbsp;Imagery',
                layer: imageryMap
            },
        ];

        var arr = new Array();
        var obj_parent_tree = new Object();

        var layer_shp = function(base) {
            var geo_layer = new L.geoJson({ features: [] }, {
                // onEachFeature: popUp,
                pointToLayer: function(feature, latlng) {
                    var ret;

                    ret = L.marker(latlng, { icon: blueIcon });

                    return ret;
                },
                style: function(feature) {
                    var ret;

                    ret = {
                        weight: 1,
                        color: '#d7f9ef',
                        fillOpacity: 0
                    };

                    return ret;
                }
            });

            shp(base).then(function(data) {
                geo_layer.addData(data);
            });

            return geo_layer;
        }

        var data_layer = JSON.parse(JSON.stringify(get_data_support()));

        data_layer.forEach(function(data, index) {
            var obj = new Object();
            if (data.jenis === 'wfs') {
                obj.label = '&nbsp;' + data.label;
                obj.layer = esri_layer(data.layer);
            } else {
                obj.label = '&nbsp;' + data.label;
                obj.layer = layer_shp(url + path_map + data.layer);
            }

            arr.push(obj);
        });

        obj_parent_tree.label = '&nbsp;<b>Data Layer</b>';
        obj_parent_tree.selectAllCheckbox = true;
        obj_parent_tree.children = arr;

        var overlaysTree = obj_parent_tree;
        var layer = L.control.layers.tree(baseTree, overlaysTree);
        layer.addTo(map);
    }

    return {
        init: function(obj_parent, name) {
            $('#' + obj_parent).height(0);
            if (width < 768) {
                $('#' + obj_parent).height($('#boks').height() - ($('#boks').height() / 1.4));
            } else {
                $('#' + obj_parent).height($('#boks').height() - ($('#boks').height() / 2.3));
            }
            demo(obj_parent, name);
        }
    };
}();

function reset_layer_wilayah() {
    geo_wilayah.eachLayer(function(layer) {
        geo_wilayah.resetStyle(layer);
    });
}

function reset_wilayah() {
    geo.eachLayer(function(layer) {
        geo.removeLayer(layer);
    });
}

function reset_poly() {
    poly.eachLayer(function(layer) {
        poly.removeLayer(layer);
    });
}

function centers() {
    map.fitBounds(geo.getBounds());
    map.setMaxBounds(geo.getBounds());
    map.setMaxZoom(max_zoom);
};

function wilayah(name) {
    $.getJSON("assets/data/" + name + ".geojson", function(data) {
        geo = new L.geoJson(data, {
            // onEachFeature: popUp,
            style: function(feature) {
                var ret = {
                    weight: 2,
                    color: 'blue',
                    fillColor: 'none',
                    fillOpacity: 0.5
                };

                return ret;
            }
        }).addTo(map);

        if (name) {
            centers();
        }
    });
};

function edit_data(id) {
    var selected_geojson = JSON.parse(getStorage('obj4-' + jns + '-' + id));

    if (poly) {
        reset_poly();
    }

    poly = L.geoJson(selected_geojson, {
        // onEachFeature: popUp,
        style: function(feature) {
            var ret = {
                weight: 3,
                color: 'yellow',
                fillColor: 'none',
                fillOpacity: 0.5
            };

            return ret;
        }
    }).addTo(map);

    // map.fitBounds(poly.getBounds());
}

function save() {
    var dt = new Date();
    var m1 = $('#memilih_kawasan').val().toString();
    var m2 = $('#kenal_kawasan').val().toString();
    var date = (dt.getDay() > 9 ? dt.getDay() : '0' + dt.getDay()) + '-' + (dt.getMonth() > 9 ? dt.getMonth() : '0' + dt.getMonth()) + '-' + dt.getFullYear() + ' ' + (dt.getHours() > 9 ? dt.getHours() : '0' + dt.getHours()) + ':' + (dt.getMinutes() > 9 ? dt.getMinutes() : '0' + dt.getMinutes()) + ':' + (dt.getSeconds() > 9 ? dt.getSeconds() : '0' + dt.getSeconds());
    var others = $('#others').val().toString();

    rows++;

    setStorage('rows', rows);
    setStorage('data-' + jns + '-' + rows, rows);
    setStorage('obj1-' + jns + '-' + rows, m1);
    setStorage('obj2-' + jns + '-' + rows, m2);
    setStorage('obj3-' + jns + '-' + rows, date);
    setStorage('obj4-' + jns + '-' + rows, JSON.stringify(shape_for_db), 1);
    setStorage('obj5-' + jns + '-' + rows, jns, 1);
    setStorage('obj6-' + jns + '-' + rows, jns, others);

    get_list_data_submission();
    reset();

    map.addControl(drawControl);
}

$('.nav-tabs a').on('shown.bs.tab', function(event) {
    var x = $(event.target).text();

    if (x === 'Jakarta Selatan') {
        name_wilayah = 'jaksel';
        jns = '1';
    } else if (x === 'Jakarta Utara') {
        name_wilayah = 'jakut';
        jns = '2';
    } else if (x === 'Jakarta Timur') {
        name_wilayah = 'jaktim';
        jns = '3';
    } else if (x === 'Jakarta Barat') {
        name_wilayah = 'jakbar';
        jns = '4';
    } else if (x === 'Jakarta Pusat') {
        name_wilayah = 'jakpus';
        jns = '5';
    }

    // KTLeaflet.init('maps', name_wilayah);
    // enabled(true);
    // reset();

    console.log(poly);
    if (poly) {
        reset_poly();
    }

    if (geo) {
        reset_wilayah();
    }

    reset_layer_wilayah();
    wilayah(name_wilayah);
    get_list_data_submission();

    if (state == false) {
        map.invalidateSize();
    }
});

function delete_data(id) {
    Swal.fire({
        title: "Are you sure?",
        text: "You want to delete this record",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!"
    }).then(function(result) {
        if (result.value) {
            rows--;
            setStorage('rows', rows);

            deleteStorage('data-' + jns + '-' + id);
            deleteStorage('obj1-' + jns + '-' + id);
            deleteStorage('obj2-' + jns + '-' + id);
            deleteStorage('obj3-' + jns + '-' + id);
            deleteStorage('obj4-' + jns + '-' + id);
            deleteStorage('obj5-' + jns + '-' + id);
            deleteStorage('obj6-' + jns + '-' + id);

            get_list_data_submission();

            Swal.fire("Deleted", "Data successfully deleted", "success");
        }
    });
}

function timeout() {
    setTimeout(function() {
        jns = '1';
        enabled(true);
        reset();
        get_list_data_submission();
        wilayah('jaksel');
        map.invalidateSize();
    }, 500);
}

function enabled(bool = false) {
    $('#memilih_kawasan').attr("disabled", bool);
    $('#kenal_kawasan').attr("disabled", bool);

    $('#memilih_kawasan').selectpicker('refresh');
    $('#kenal_kawasan').selectpicker('refresh');
}

function reset() {
    if (drawControl._map == null) {
        drawnItems.eachLayer(function(layer) {
            var str1 = drawnItems._leaflet_id.toString();
            var str2 = Object.keys(layer._eventParents)[0].toString()

            if (str1 === str2) {
                map.addControl(drawControl);
                drawnItems.removeLayer(layer);
            }
        });

        map.addControl(drawControl);

        $('#memilih_kawasan').selectpicker('deselectAll');
        $('#kenal_kawasan').selectpicker('val', '');
        $('#others').val('');

        if (rows == 0) {
            $('#log_data').html('Data not found');
        }
    }
}

function get_datax() {
    var frm = new FormData();
    var ret = call_ajax('dashboard/get_datax', frm);

    return ret;
}

function get_list_submission(bool = false) {
    var str = '';
    var wil = '';
    var nam_wil = '';
    var submission_rows = '';
    var date = '';
    var actions = '';

    if (getAllStorage()) {
        if (getStorage('rows')) {
            rows = parseInt(getStorage('rows'));
        }

        for (var i = 1; i <= rows; i++) {
            submission_rows = getStorage('data-' + jns + '-' + i);
            wil = getStorage('obj5-' + jns + '-' + i);
            date = getStorage('obj3-' + jns + '-' + i);

            if (jns === wil && bool == false) {
                if (getStorage('data-' + jns + '-' + i)) {
                    if (wil === '1') {
                        nam_wil = 'Jakarta Selatan';
                    } else if (jns === '2') {
                        nam_wil = 'Jakarta Utara';
                    } else if (jns === '3') {
                        nam_wil = 'Jakarta Timur';
                    } else if (jns === '4') {
                        nam_wil = 'Jakarta Barat';
                    } else if (jns === '5') {
                        nam_wil = 'Jakarta Pusat';
                    }

                    if (bool == false) {
                        actions = '<small class="mt-10">\
                            <a href="javascript:edit_data(' + i + ')" class="btn btn-icon btn-xs btn-light-primary">\
                                <i class="flaticon-edit"></i>\
                            </a>\
                            <a href="javascript:delete_data(' + i + ')" class="btn btn-icon btn-xs btn-light-danger">\
                                <i class="flaticon-delete"></i>\
                            </a>\
                        </small>';
                    } else {
                        actions = '';
                    }

                    str += '<div class="mb-0">\
                        <div class="d-flex align-items-center flex-grow-1" style="border-bottom:1px solid silver">\
                            <div class="d-flex flex-wrap align-items-center justify-content-between w-100">\
                                <div class="d-flex flex-column align-items-left py-2 w-65">\
                                    <a href="#" class="text-dark-75 font-weight-bold text-hover-primary font-size-lg mb-1">Submission ' + submission_rows + '</a>\
                                    <small><span class="text-muted font-weight-bold">' + nam_wil + '</span></small>\
                                    <span class="text-muted font-weight-bold">' + date + '</span>\
                                </div>' + actions + '\
                            </div>\
                        </div>\
                    </div>';
                }
            }

            if (bool == true) {
                str += '<div class="mb-0">\
                    <div class="d-flex align-items-center flex-grow-1" style="border-bottom:1px solid silver">\
                        <div class="d-flex flex-wrap align-items-center justify-content-between w-100">\
                            <div class="d-flex flex-column align-items-left py-2 w-65">\
                                <a href="#" class="text-dark-75 font-weight-bold text-hover-primary font-size-lg mb-1">Submission ' + submission_rows + '</a>\
                                <small><span class="text-muted font-weight-bold">' + nam_wil + '</span></small>\
                                <span class="text-muted font-weight-bold">' + date + '</span>\
                            </div>\
                        </div>\
                    </div>\
                </div>';
            }
        }

        if (str == '') {
            str = "Data not found";
        }
    } else {
        str = "Data not found";
    }

    return str;
}

function get_list_data_submission() {
    var count = localStorage.getItem('rows');
    var str = get_list_submission();

    $('#log_data').html(str);
    $('#count').html(count);
}

function get_recap() {
    var str = '';
    var nama_responden = localStorage.getItem('nama_responden');
    var peran = localStorage.getItem('peran');
    var pengalaman = localStorage.getItem('pengalaman');

    $('#nama_responden_str').html(nama_responden);
    $('#peran_str').html(peran);
    $('#pengalaman_str').html(pengalaman);

    str = get_list_submission(true);
    $('#list_data').html(str);
}

$(document).ready(function() {
    $('#memilih_kawasan').on('change', function() {
        var sel = $('#memilih_kawasan').val();
        sel.forEach(function(data, index) {
            if (data === '7 - Lainnya') {
                $('#others').show();
            } else {
                $('#others').val('');
                $('#others').hide();
            }
        });
    });
});