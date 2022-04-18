"use strict";
var easyMap = "";
var mediumMap = "";
var hardMap = "";

var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var param_draw = '';
var editActions = [
    LeafletToolbar.EditAction.Popup.Edit,
    LeafletToolbar.EditAction.Popup.Delete
];

var KTLeaflet = function(obj_parent, geojson_name) {
    var epsg = "EPSG:4326";

    var demo = function(obj, name = 'pertanyaan1') {
        var controlSearch = '';
        var marker = '';

        /*easyMap = L.tileLayer.wms("http://slum.geo-portal.id:8080/geoserver/slum/wms?", {
            layers: 'slum:easypseudo'
        });

        mediumMap = L.tileLayer.wms("http://slum.geo-portal.id:8080/geoserver/slum/wms?", {
            layers: 'slum:mediumpseudo'
        });

        hardMap = L.tileLayer.wms("http://slum.geo-portal.id:8080/geoserver/slum/wms?", {
            layers: 'slum:hardpseudo'
        });

        var osmMap = L.tileLayer(osmURL, {
            maxZoom: max_zoom,
            attribution: osmAttrib
        });

        var imageryMap = L.tileLayer(imageryURL, {
            maxZoom: max_zoom,
            attribution: imageryAttrib
        });*/

        var satelliteMap = L.tileLayer(satelliteURL, {
            maxZoom: max_zoom,
            attribution: satelliteAttrib,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        });

        /*var onLocationFound = function(e) {
            if (marker) {
                map.removeLayer(marker);
            }

            marker = L.marker(e.latlng).addTo(map)
                .bindPopup('Your are here :<br>latitude: ' + e.latitude + '<br>longitude: ' + e.longitude).openPopup();
        };

        var onLocationError = function(e) {
            alert(e.message);
        };*/

        if (width < 768) {
            min_zoom = 11;
        } else {
            min_zoom = 16;
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

        // map.zoomControl.remove();
        // L.control.zoom({zoomInText: '+ zoom in'}).addTo(map);
        // $(".leaflet-control-zoom-in").css("width", "70px");
        // $(".leaflet-control-zoom-in").css("font-size", "8pt");
        // $(".leaflet-control-zoom-in").css("font-weight", "normal");

        satelliteMap.addTo(map);

        set_param_drawing();

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

        /*L.easyButton('<span class="fas fa-home"></span>', function() {
            centers();
        }).addTo(map);*/

        L.easyButton('<span class="flaticon2-refresh"></span>', function() {
            reload_layer();
        }, 'Reload').addTo(map);

        /*L.easyButton('<span class="flaticon-placeholder-3"></span>', function() {
            map.on('locationfound', onLocationFound);
            map.on('locationerror', onLocationError);
            map.locate({ setView: true, maxZoom: 10 });
        }).addTo(map);*/

        map.on('draw:created', function(e) {
            var layers = e.layer;

            layers.options.color = 'blue';
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
            $('#modal_instruction').modal('hide');
        }
    };
}();

function set_param_drawing() {
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

    map.addControl(drawControl);
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
                    weight: 5,
                    color: '#90ee90',
                    fillColor: 'none',
                    fillOpacity: 0.5
                };

                return ret;
            }
        }).addTo(map);

        if (name) {
            /*if(easyMap) {
                map.removeLayer(easyMap);
            }

            if(mediumMap) {
                map.removeLayer(mediumMap);
            }

            if(hardMap) {
                map.removeLayer(hardMap);
            }*/

            /*if(name === 'pertanyaan1') {
                easyMap.addTo(map);
            } else if(name === 'pertanyaan2') {
                mediumMap.addTo(map);
            } else {
                hardMap.addTo(map);
            }*/

            centers();
        }
    });
};

function edit_data(id) {
    reset_form();
    reload_layer();

    var selected_geojson = JSON.parse(getCookie('obj4-' + jns + '-' + id));
    var m1 = getCookie('obj1-' + jns + '-' + id);
    var m2 = getCookie('obj2-' + jns + '-' + id);
    var others = getCookie('obj6-' + jns + '-' + id);
    var hidValue = m1;
    var selectedOptions = hidValue.split(",");

    for (var i in selectedOptions) {
        var optionVal = selectedOptions[i];
        $("#memilih_kawasan").find("option[value=\"" + optionVal + "\"]").prop("selected", "selected");

        if (optionVal === '7 - Lainnya') {
            $('#set_others').show();
            $('#others').val(others);
        } else {
            $('#set_others').hide();
            $('#others').val('');
        }
    }

    idx = id;

    $('#kenal_kawasan').val(m2).change();

    enabled(false);

    $('#save_data_act').css("display", "none");
    $('#update_data_act').css("display", "inline");

    drawControl.remove();

    poly = L.GeoJSON.geometryToLayer(selected_geojson);

    drawnItems.addLayer(poly);
    drawnItems.addTo(map);
    drawnItems.setStyle({
        weight: 5,
        color: 'yellow',
        opacity: 0.5
    });

    map.fitBounds(drawnItems.getBounds());

    param_draw = {
        polyline: false,
        polygon: false,
        rectangle: false,
        circle: false,
        marker: false,
        circlemarker: false
    };

    drawControl = new L.Control.Draw({
        position: 'topleft',
        edit: {
            featureGroup: drawnItems,
            poly: {
                allowIntersection: false
            }
        },
        draw: param_draw
    });

    map.addControl(drawControl);

    map.on(L.Draw.Event.EDITED, function(e) {
        var layers = e.layers;
        layers.eachLayer(function(layer) {
            shape = layer.toGeoJSON()
            shape_for_db = JSON.stringify(shape);
        });
    });
}

function save() {
    var dt = new Date();
    var m1 = $('#memilih_kawasan').val().toString();
    var m2 = $('#kenal_kawasan').val().toString();
    var date = (dt.getDay() > 9 ? dt.getDay() : '0' + dt.getDay()) + '-' + (dt.getMonth() > 9 ? dt.getMonth() : '0' + dt.getMonth()) + '-' + dt.getFullYear() + ' ' + (dt.getHours() > 9 ? dt.getHours() : '0' + dt.getHours()) + ':' + (dt.getMinutes() > 9 ? dt.getMinutes() : '0' + dt.getMinutes()) + ':' + (dt.getSeconds() > 9 ? dt.getSeconds() : '0' + dt.getSeconds());
    var others = $('#others').val();

    if (m1 !== '' && m2 !== '') {
        rows++;

        setCookie('rows', rows);
        setCookie('data-' + jns + '-' + rows, rows);
        setCookie('obj1-' + jns + '-' + rows, m1);
        setCookie('obj2-' + jns + '-' + rows, m2);
        setCookie('obj3-' + jns + '-' + rows, date);
        setCookie('obj4-' + jns + '-' + rows, JSON.stringify(shape_for_db));
        setCookie('obj5-' + jns + '-' + rows, jns);
        setCookie('obj6-' + jns + '-' + rows, others);

        get_data_submission();
        reset();

        map.addControl(drawControl);
        reload_layer();

        get_checking_question();
    } else {
        Swal.fire("Warning", "Isi data yang masih kosong <div><small>Please fill blank the columns</small></div>", "warning");
    }
}

function update() {
    var dt = new Date();
    var m1 = $('#memilih_kawasan').val().toString();
    var m2 = $('#kenal_kawasan').val().toString();
    var date = (dt.getDay() > 9 ? dt.getDay() : '0' + dt.getDay()) + '-' + (dt.getMonth() > 9 ? dt.getMonth() : '0' + dt.getMonth()) + '-' + dt.getFullYear() + ' ' + (dt.getHours() > 9 ? dt.getHours() : '0' + dt.getHours()) + ':' + (dt.getMinutes() > 9 ? dt.getMinutes() : '0' + dt.getMinutes()) + ':' + (dt.getSeconds() > 9 ? dt.getSeconds() : '0' + dt.getSeconds());
    var others = $('#others').val();

    setCookie('obj1-' + jns + '-' + idx, m1);
    setCookie('obj2-' + jns + '-' + idx, m2);
    setCookie('obj3-' + jns + '-' + idx, date);

    if (shape_for_db) {
        setCookie('obj4-' + jns + '-' + idx, shape_for_db);
    }

    setCookie('obj5-' + jns + '-' + idx, jns);
    setCookie('obj6-' + jns + '-' + idx, others);

    get_data_submission();
    reset();

    map.addControl(drawControl);
    reload_layer();
}

$('.nav-tabs a').on('shown.bs.tab', function(event) {
    var x = $(event.target).text();

    if (x === 'Pertanyaan 1 (Question 1)') {
        name_wilayah = 'pertanyaan1';
        jns = '1';
    } else if (x === 'Pertanyaan 2 (Question 2)') {
        name_wilayah = 'pertanyaan2';
        jns = '2';
    } else if (x === 'Pertanyaan 3 (Question 3)') {
        name_wilayah = 'pertanyaan3';
        jns = '3';
    }

    // KTLeaflet.init('maps', name_wilayah);
    // enabled(true);
    reset();
    reload_layer();

    if (poly) {
        reset_poly();
    }

    if (geo) {
        reset_wilayah();
    }

    wilayah(name_wilayah);
    get_data_submission();

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

            deleteCookie('data-' + jns + '-' + id);
            deleteCookie('obj1-' + jns + '-' + id);
            deleteCookie('obj2-' + jns + '-' + id);
            deleteCookie('obj3-' + jns + '-' + id);
            deleteCookie('obj4-' + jns + '-' + id);
            deleteCookie('obj5-' + jns + '-' + id);
            deleteCookie('obj6-' + jns + '-' + id);

            get_data_submission();
            reset();

            Swal.fire("Deleted", "Data successfully deleted", "success");
            reload_layer();

            get_checking_question();
        }
    });
}

function timeout() {
    setTimeout(function() {
        jns = '1';
        enabled(true);
        reset();
        get_data_submission();
        wilayah('pertanyaan1');
        map.invalidateSize();
    }, 500);
}

function enabled(bool = false) {
    $('#memilih_kawasan').attr("disabled", bool);
    $('#kenal_kawasan').attr("disabled", bool);

    $('#memilih_kawasan').selectpicker('refresh');
    $('#kenal_kawasan').selectpicker('refresh');

    if (bool == true) {
        $('#save_data_act').addClass('disabled');
        $('#cancel_act').addClass('disabled');
    } else {
        $('#save_data_act').removeClass('disabled');
        $('#cancel_act').removeClass('disabled');
    }
}

function reset_form() {
    reset();
}

function reset() {
    $('#memilih_kawasan').selectpicker('deselectAll');
    $('#kenal_kawasan').selectpicker('val', '');
    $('#set_others').hide();
    $('#others').val('');

    if (geo) {
        centers();
    }

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

        if (rows == 0) {
            $('#log_data').html('Data not found');
        }
    }

    if (drawnItems) {
        drawnItems.eachLayer(function(layer) {
            drawnItems.removeLayer(layer);
        });

        drawControl.remove();
        set_param_drawing();
    }

    enabled(true);
    idx = '';

    $('#save_data_act').css("display", "inline");
    $('#update_data_act').css("display", "none");
}

function get_datax() {
    var frm = new FormData();
    var ret = call_ajax('dashboard/get_datax', frm);

    return ret;
}

function get_list_data_submission(bool = true) {
    var str = '';
    var wil = '';
    var nam_wil = '';
    var others = '';
    var submission_rows = '';
    var date = '';
    var count = 0;

    if (getAllCookies()) {
        if (getCookie('rows')) {
            rows = parseInt(getCookie('rows'));
        }

        for (var i = 1; i <= rows; i++) {
            submission_rows = getCookie('data-' + jns + '-' + i);
            others = getCookie('obj6-' + jns + '-' + i);
            wil = getCookie('obj5-' + jns + '-' + i);
            date = getCookie('obj3-' + jns + '-' + i);

            if (jns === wil && bool == true) {
                if (getCookie('data-' + jns + '-' + i)) {
                    if (wil === '1') {
                        nam_wil = 'Pertanyaan 1 (Question 1)';
                    } else if (jns === '2') {
                        nam_wil = 'Pertanyaan 2 (Question 2)';
                    } else if (jns === '3') {
                        nam_wil = 'Pertanyaan 3 (Question 3)';
                    }

                    str += '<div class="mb-0">\
                        <div class="d-flex align-items-center flex-grow-1" style="border-bottom:1px solid silver">\
                            <div class="d-flex flex-wrap align-items-center justify-content-between w-100">\
                                <div class="d-flex flex-column align-items-left py-2 w-65">\
                                    <a href="#" class="text-dark-75 font-weight-bold text-hover-primary font-size-lg mb-1">Submission ' + submission_rows + '</a>\
                                    <small><span class="text-muted font-weight-bold">' + nam_wil + '</span></small>\
                                    <span class="text-muted font-weight-bold">' + date + '</span>\
                                </div>\
                                <small class="mt-10">\
                                    <a href="javascript:edit_data(' + i + ')" class="btn btn-icon btn-xs btn-light-primary">\
                                        <i class="flaticon-edit"></i>\
                                    </a>\
                                    <a href="javascript:delete_data(' + i + ')" class="btn btn-icon btn-xs btn-light-danger">\
                                        <i class="flaticon-delete"></i>\
                                    </a>\
                                </small>\
                            </div>\
                        </div>\
                    </div>';

                    count++;
                }
            }

            if (bool == false) {
                for (var x = 1; x <= 5; x++) {
                    if (getCookie('data-' + x + '-' + i)) {
                        submission_rows = getCookie('data-' + x + '-' + i);
                        others = getCookie('obj6-' + x + '-' + i);
                        wil = getCookie('obj5-' + x + '-' + i);
                        date = getCookie('obj3-' + x + '-' + i);

                        if (x == 1) {
                            nam_wil = 'Pertanyaan 1 (Question 1)';
                        } else if (x == 2) {
                            nam_wil = 'Pertanyaan 2 (Question 2)';
                        } else if (x == 3) {
                            nam_wil = 'Pertanyaan 3 (Question 3)';
                        }

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

                        count++;
                    }
                }
            }
        }

        if (str == '') {
            str = "Data not found";
        }
    } else {
        str = "Data not found";
    }

    $('#count').html(count);

    return str;
}

function get_data_submission() {
    var ret = get_list_data_submission(true);
    $('#log_data').html(ret);
}

function get_list_recap() {
    var ret = get_list_data_submission(false);
    $('#list_data').html(ret);
}

function get_recap() {
    var peran = getCookie('peran');
    var pengalaman = getCookie('pengalaman');
    var live = getCookie('live');
    var device = getCookie('device');
    var live_year = getCookie('live_year');

    if (peran === '1') {
        peran = 'Pemerintah / Goverment';
    } else if (peran === '2') {
        peran = 'LSM / NGO';
    } else if (peran === '3') {
        peran = 'Akademisi / Academician';
    } else if (peran === '4') {
        peran = 'Ahli GIS / GIS Professional';
    } else if (peran === '5') {
        peran = 'Masyarakat Lokal / Local Community';
    }

    $('#peran_str').html(peran);
    $('#pengalaman_str').html(pengalaman);

    if (live === '1') {
        live = 'Ya';
    } else if (live === '2') {
        live = 'Tidak';
    } else {
        live = '';
    }

    if (device === '1') {
        device = 'PC/Laptop';
    } else if (device === '2') {
        device = 'Smartphone';
    } else {
        device = '';
    }

    $('#device_str').html(device);
    $('#live_str').html(live);
    $('#lama_str').html(live_year);
}

function send() {
    var wil = '';
    var others = '';
    var submission_rows = '';
    var date = '';

    var peran = getCookie('peran');
    var pengalaman = getCookie('pengalaman');
    var live = getCookie('live');
    var device = getCookie('device');
    var live_year = getCookie('live_year');
    var sq1 = '';
    var sq2 = '';
    var format_map = '';
    var frm = new FormData();

    if (peran === '1') {
        peran = 'Pemerintah / Goverment';
    } else if (peran === '2') {
        peran = 'LSM / NGO';
    } else if (peran === '3') {
        peran = 'Akademisi / Academician';
    } else if (peran === '4') {
        peran = 'Ahli GIS / GIS Professional';
    } else if (peran === '5') {
        peran = 'Masyarakat Lokal / Local Community';
    }

    if (live == 1) {
        live = 'Ya';
    } else {
        live = 'Tidak';
    }

    if (device == 1) {
        device = 'PC/Laptop';
    } else {
        device = 'Smartphone';
    }

    frm.append('q1', 'Pilih peran yang paling menggambarkan diri Anda');
    frm.append('q2', 'Pengalaman kerja (dalam tahun)');
    frm.append('q3', 'Apakah Anda bertempat tinggal di Jakarta?');
    frm.append('q4', 'Berapa tahun Anda tinggal di Jakarta?');
    frm.append('q5', 'Device apa yang anda gunakan?');

    frm.append('peran', peran);
    frm.append('pengalaman', pengalaman);
    frm.append('live', live);
    frm.append('device', device);
    frm.append('live_year', live_year);

    if (getAllCookies()) {
        var arr = new Array();
        if (getCookie('rows')) {
            rows = parseInt(getCookie('rows'));
        }

        for (var i = 1; i <= rows; i++) {
            for (var x = 1; x <= 5; x++) {
                if (getCookie('data-' + x + '-' + i)) {
                    submission_rows = getCookie('data-' + x + '-' + i);
                    others = getCookie('obj6-' + x + '-' + i);
                    format_map = JSON.parse(getCookie('obj4-' + x + '-' + i));
                    wil = getCookie('obj5-' + x + '-' + i);
                    date = getCookie('obj3-' + x + '-' + i);
                    sq1 = getCookie('obj1-' + x + '-' + i);
                    var str = sq1.replace("7 - Lainnya", "7 - Lainnya (" + others + ")");
                    sq2 = getCookie('obj2-' + x + '-' + i);

                    var obj = {
                        'wilayah': x,
                        'Mengapa Anda memilih kawasan ini?': str,
                        'Seberapa Anda mengenal kawasan ini?': sq2,
                        'peta': format_map
                    };

                    arr.push(obj);
                }
            }
        }
    }

    frm.append('submission', JSON.stringify(arr));
    var res = call_ajax_with_json('dashboard/save', frm);

    if (res.status == true) {
        Swal.fire("Saved", res.message, "success");
        deleteAllCookies();
        get_recap();
        get_list_recap();
        setTimeout(function() {
            window.location.href = url + 'dashboard';
        }, 2000);
    } else {
        Swal.fire("Error", res.message, "error");
    }
}

function readMore1() {
    var moreText = document.getElementById("more1");
    var btnText = document.getElementById("myBtn1");

    if (moreText.style.display === "none") {
        btnText.innerHTML = "Kurangi Bacaan (Read less)";
        moreText.style.display = "inline";
    } else {
        btnText.innerHTML = "Baca Selengkapnya (Read more)";
        moreText.style.display = "none";
    }
}

function readMore2() {
    var moreText = document.getElementById("more2");
    var btnText = document.getElementById("myBtn2");

    if (moreText.style.display === "none") {
        btnText.innerHTML = "Kurangi Bacaan (Read less)";
        moreText.style.display = "inline";
    } else {
        btnText.innerHTML = "Baca Selengkapnya (Read more)";
        moreText.style.display = "none";
    }
}

$(document).ready(function() {
    $('#memilih_kawasan').on('change', function() {
        var sel = $('#memilih_kawasan').val();
        sel.forEach(function(data, index) {
            if (data === '7 - Lainnya') {
                $('#set_others').show();
            } else {
                $('#others').val('');
                $('#set_others').hide();
            }
        });
    });
});

function get_list_data_layer() {
    var wil = '';
    var layers = '';
    var geojson_layer = '';
    drawnItems2.addTo(map);

    if (getAllCookies()) {
        if (getCookie('rows')) {
            rows = parseInt(getCookie('rows'));
        }

        drawnItems2.eachLayer(function(layer) {
            drawnItems2.removeLayer(layer);
        });

        for (var i = 1; i <= rows; i++) {
            var poly2 = '';
            wil = getCookie('obj5-' + jns + '-' + i);
            if (jns === wil) {
                layers = getCookie('obj4-' + jns + '-' + i);
                geojson_layer = JSON.parse(layers);
                poly2 = L.GeoJSON.geometryToLayer(geojson_layer);

                drawnItems2.addLayer(poly2);
                drawnItems2.addTo(map);
                drawnItems2.setStyle({
                    weight: 5,
                    color: 'red',
                    opacity: 0.5
                });
            }
        }
    }
}

function reload_layer() {
    get_list_data_layer();
}

$('#chkapprove').on('click', function() {
    var ckbox = $('#chkapprove');
    if (ckbox.is(':checked')) {
        $('#btn_send_data').removeAttr("disabled");
    } else {
        $('#btn_send_data').attr("disabled", true);
    }
});

function instructions() {
    $('#modal_instruction').modal('show');
}

$(function() {
    var xyz = 1;

    $('.btnNext').click(function() {
        if (xyz < 3) {
            xyz++;
        }

        $('#tabwil a[href="#kt_tab_pane_' + xyz + '"]').tab('show');
    });

    $('.btnPrevious').click(function() {
        if (xyz > 0) {
            xyz--;
        }

        $('#tabwil a[href="#kt_tab_pane_' + xyz + '"]').tab('show');
    });

    $('.nav-tabs a').on('shown.bs.tab', function(event) {
        var x = $(event.target).text();

        if (x === 'Pertanyaan 1 (Question 1)') {
            xyz = 1
        }

        if (x === 'Pertanyaan 2 (Question 2)') {
            xyz = 2
        }

        if (x === 'Pertanyaan 3 (Question 3)') {
            xyz = 3
        }
    });
});