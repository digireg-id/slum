"use strict";
var datatable = '';
var KTRecapData = function() {
    var recap = function() {
        datatable = $('#kt_recap_data').KTDatatable({
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: 'recap_data/get_list_data/',
                    },
                },
                pageSize: 5,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
            },
            layout: {
                scroll: true,
                footer: false
            },
            sortable: false,
            pagination: true,
            search: {
                input: $('#kt_pencarian'),
                delay: 400,
                key: 'generalSearch'
            },
            columns: [{
                field: 'num',
                title: '#',
                sortable: 'asc',
                width: 40,
                type: 'number',
                selector: false,
                textAlign: 'left',
                template: function(data) {
                    return '<span class="font-weight-bolder">' + data.num + '</span>';
                }
            }, {
                field: 'respondent',
                title: 'Respondent'
            }, {
                field: 'datetime',
                title: 'Date',
                type: 'date',
                template: function(row) {
                    var output = '';
                    output += '<div class="font-weight-bolder text-primary mb-0">' + row.datetime + '</div>';

                    return output;
                },
            }, {
                field: 'total_submission',
                title: 'Total Submission'
            }, {
                field: 'actions',
                title: 'Actions',
                sortable: false,
                width: 130,
                overflow: 'visible',
                autoHide: false,
                template: function(row) {
                    return '<a href="javascript:download_shp(' + row.id_respondent + ',\'respondent-' + row.id_respondent + '\');" class="btn btn-sm btn-default btn-text-default btn-hover-success btn-icon mr-2" title="Unduh Data">\
                        <span class="svg-icon svg-icon-primary svg-icon-md">\
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">\
                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
                                    <rect x="0" y="0" width="24" height="24"/>\
                                    <path d="M2,13 C2,12.5 2.5,12 3,12 C3.5,12 4,12.5 4,13 C4,13.3333333 4,15 4,18 C4,19.1045695 4.8954305,20 6,20 L18,20 C19.1045695,20 20,19.1045695 20,18 L20,13 C20,12.4477153 20.4477153,12 21,12 C21.5522847,12 22,12.4477153 22,13 L22,18 C22,20.209139 20.209139,22 18,22 L6,22 C3.790861,22 2,20.209139 2,18 C2,15 2,13.3333333 2,13 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"/>\
                                    <rect fill="#000000" opacity="0.3" transform="translate(12.000000, 8.000000) rotate(-180.000000) translate(-12.000000, -8.000000) " x="11" y="1" width="2" height="14" rx="1"/>\
                                    <path d="M7.70710678,15.7071068 C7.31658249,16.0976311 6.68341751,16.0976311 6.29289322,15.7071068 C5.90236893,15.3165825 5.90236893,14.6834175 6.29289322,14.2928932 L11.2928932,9.29289322 C11.6689749,8.91681153 12.2736364,8.90091039 12.6689647,9.25670585 L17.6689647,13.7567059 C18.0794748,14.1261649 18.1127532,14.7584547 17.7432941,15.1689647 C17.3738351,15.5794748 16.7415453,15.6127532 16.3310353,15.2432941 L12.0362375,11.3779761 L7.70710678,15.7071068 Z" fill="#000000" fill-rule="nonzero" transform="translate(12.000004, 12.499999) rotate(-180.000000) translate(-12.000004, -12.499999) "/>\
                                </g>\
                            </svg>\
                        </span>\
                    </a>\
                    <a href="javascript:edit_data(' + row.id + ');" class="btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon mr-2" title="Ubah Data">\
                        <span class="svg-icon svg-icon-primary svg-icon-md">\
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">\
                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
                                    <rect x="0" y="0" width="24" height="24"/>\
                                    <path d="M12.2674799,18.2323597 L12.0084872,5.45852451 C12.0004303,5.06114792 12.1504154,4.6768183 12.4255037,4.38993949 L15.0030167,1.70195304 L17.5910752,4.40093695 C17.8599071,4.6812911 18.0095067,5.05499603 18.0083938,5.44341307 L17.9718262,18.2062508 C17.9694575,19.0329966 17.2985816,19.701953 16.4718324,19.701953 L13.7671717,19.701953 C12.9505952,19.701953 12.2840328,19.0487684 12.2674799,18.2323597 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.701953, 10.701953) rotate(-135.000000) translate(-14.701953, -10.701953) "/>\
                                    <path d="M12.9,2 C13.4522847,2 13.9,2.44771525 13.9,3 C13.9,3.55228475 13.4522847,4 12.9,4 L6,4 C4.8954305,4 4,4.8954305 4,6 L4,18 C4,19.1045695 4.8954305,20 6,20 L18,20 C19.1045695,20 20,19.1045695 20,18 L20,13 C20,12.4477153 20.4477153,12 21,12 C21.5522847,12 22,12.4477153 22,13 L22,18 C22,20.209139 20.209139,22 18,22 L6,22 C3.790861,22 2,20.209139 2,18 L2,6 C2,3.790861 3.790861,2 6,2 L12.9,2 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"/>\
                                </g>\
                            </svg>\
                        </span>\
                    </a>\
                    <a href="javascript:delete_data(' + row.id_respondent + ');" class="btn btn-sm btn-default btn-text-danger btn-hover-danger btn-icon" title="Hapus Data">\
                        <span class="svg-icon svg-icon-danger svg-icon-2x">\
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">\
                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
                                    <g transform="translate(12.000000, 12.000000) rotate(-45.000000) translate(-12.000000, -12.000000) translate(4.000000, 4.000000)" fill="#000000">\
                                        <rect x="0" y="7" width="16" height="2" rx="1"/>\
                                        <rect opacity="0.3" transform="translate(8.000000, 8.000000) rotate(-270.000000) translate(-8.000000, -8.000000) " x="0" y="7" width="16" height="2" rx="1"/>\
                                    </g>\
                                </g>\
                            </svg>\
                        </span>\
                    </a>';
                },
            }],
        });
    };

    return {
        init: function() {
            recap();
        },
    };
}();

function download_data() {
    Swal.fire("Error", "This module is underconstruction", "error");
}

function edit_data() {
    Swal.fire("Error", "This module is underconstruction", "error");
}

function delete_data(id_respondent) {
    Swal.fire({
        title: "Are you sure?",
        text: "You want to delete this record",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!"
    }).then(function(result) {
        if (result.value) {
            var urlx = url + 'recap_data/delete_data';
            var frm = new FormData();
            frm.append('id_respondent', id_respondent);

            var res = call_ajax_with_json(urlx, frm);

            if (res.status) {
                Swal.fire("Deleted", res.message, "success");
                datatable.reload();
            } else {
                Swal.fire("Error", res.message, "error");
            }
        }
    });
}

function logout() {
    Swal.fire({
        title: "Are you sure?",
        text: "You want to logout",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, do it!"
    }).then(function(result) {
        if (result.value) {
            window.location.href = url + 'logout';
        }
    });
}

function download_shp(id, filename) {
    var ret = '';
    var frm = new FormData();

    ret = call_ajax('recap_data/create_link/' + id + '/' + filename, frm);

    if (ret == true) {
        download('assets/shp/' + filename + '.zip', filename + '.zip');
        call_ajax('recap_data/delete_file_zip/' + filename, frm);
    } else {
        alert('Tautan tidak ditemukan. Harap ulangi lagi');
    }
}

function download_all() {
    var ret = '';
    var frm = new FormData();

    var filename = 'respondent-all';
    ret = call_ajax('recap_data/create_link_all/' + filename, frm);

    if (ret == true) {
        download('assets/shp/' + filename + '.zip', filename + '.zip');
        call_ajax('recap_data/delete_file_zip/' + filename, frm);
    } else {
        alert('Tautan tidak ditemukan. Harap ulangi lagi');
    }
}

jQuery(document).ready(function() {
    KTRecapData.init();
});