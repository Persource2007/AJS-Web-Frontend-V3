dataTable = null;
var master_data_type = "van_location";
let map;
let markers = [];
let markers_index = {};
let cacheVans = [];
let lastStart = 0;   // track last "start" index requested
let totalRecords = 0; // total records in DB
let limit = 20;
let loading = false;



function load_data_table(limit, search_term, filters) {  
    lastStart = 0;
    totalRecords = 0;
    cacheVans = [];      
    get_details(filters);
}

/* 
function load_data_table(limit, search_term, filters) {
    data_filters = "";
    search = "";
    if (
            typeof filters != "undefined" &&
            (typeof filters["filters"] !== "undefined" || filters["filters"] != null)
            ) {
        data_filters = filters["filters"];
    }
    if (typeof search_term !== "undefined" || search_term != null) {
        search = search_term;
    }

    dataTable = new DataTable("#van-loc-datatables", {
        scrollY: (screen.height - 290) + 'px',
        responsive: false,
        searching: false,
        lengthChange: false,
        serverSide: true,
        processing: true,
        paging: true,
        bDestroy: true,
        autoWidth: false,
        scrollX: true, 
        pageLength: 10,
        search: {
            search: search,
        },
        dom: "Bfrtp",
        buttons: [],
        ajax: {
            url: site_url + "vans/location",
            method: "GET",
            dataSrc: "data",
            data: function (d) {
                return $.extend({}, d, {
                    data_filters,
                });
            },
            beforeSend: function (xhr, settings) {
                ajs.set_auth_header(xhr, settings);
            },
            error: function (xhr) {
                ajs.datatable_error(xhr, "ajax-datatables");
            }
        },
        language: {
            emptyTable: "No data found",
        },
        columns: [
            {
                title: "Sr.",
                data: null,       // no direct data from server
                orderable: false, // disable sorting
                render: function (data, type, row, meta) {
                    // meta.row → row index in current page
                    // meta.settings._iDisplayStart → start index
                    return meta.row + 1 + meta.settings._iDisplayStart;
                }
            },
            {
                name: "van_number",
                data: "van_number",
                title: "Reg. Number",
                orderable: false,
                render: function (data, type, row) {
                    const location = row.location?.value || null;
                    if(!location) {
                        return data;
                    }
                    return `<a href="javascript:void(0);" class="cursor-pointer highlight-marker" data-vin="${row.vin}" >${data}</a>`;
                }
            },
            {
                name: "model_name",
                data: "model_name",
                title: "Model",
                orderable: false,
            },
            {
                name: "driver_name",
                data: "driver_name",
                title: "Driver",
                orderable: false,
            },
        ],
        //order: [["0", "desc"]],
        drawCallback: function () {
            var api = this.api();
            // Response JSON from server
            var response = api.ajax.json();
            if(response && response?.status == true && response?.data) {
                add_markers(response.data);
            }
            ajs.apply_ind_roles("Vans");
        }
    });
} */
// for set data on detail page
function set_details(result_json) {
    if (ajs_form_handler.check_result(result_json)) {
        var vans = result_json.data;
        if (!totalRecords) totalRecords = result_json.recordsTotal || 0;
        cacheVans = cacheVans.concat(vans);
        var vanHtml= "";
        $.each(cacheVans, function (index, van) {
            let van_number = van.location?.value ? `<a href="javascript:void(0);" class="cursor-pointer highlight-marker" data-vin="${van.vin}">${setDefValue(van.van_number)}</a>` : setDefValue(van.van_number);
            vanHtml += `<div class="engineer-locator-details mb-1 ps-2">
            <div class="d-flex align-items-center">
            <div class="sub-same-details table-col-width-10">${index+1}</div>
            <div class="sub-same-details table-col-width-30">${van_number}</div>
            <div class="sub-same-details table-col-width-35">${setDefValue(van.model_name)}</div>
            <div class="sub-same-details table-col-width-25">${setDefValue(van.driver_name)}</div>
            </div>
            </div>`;
            
        });
        if(vanHtml == "") {
            vanHtml = `<div class="engineer-locator-details mb-1 ps-2">
            <div class="text-center">
            <div class="me-2">Data not available!</div>
            </div>
            </div>`;
        }
        $('.engineer-tbl-main').html(vanHtml);
        lastStart += limit;
        add_markers(cacheVans);
        
	} else {
        ajs_form_handler.show_errors(result_json);
	}
    loading = false;
    $("#van-loader").addClass('d-none');
    $("#van-last-updated").text("Updated: " + moment().format('DD/MM/YYYY hh:mm A'));
}

function get_details(filters = null) {
    
    if (loading) return;
    // ✅ if already fetched all, stop
    if (totalRecords && cacheVans.length >= totalRecords) {
        return;
    }

    loading = true;
    $("#van-loader").removeClass('d-none');
    filters = Object.assign(filters ?? {}, { start: lastStart });
    setTimeout(() => {
        ajs.ajax_form(
            site_url + "vans/location",
            filters,
            "GET",
            null,
            "1",
            "1",
            set_details,
            set_details
        );
    },50);
}

async function add_markers(vans) {
    clear_markers();
    if(vans.length == 0) {
        return;
    }
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const bounds = new google.maps.LatLngBounds();
    
	$.each(vans, function (index, van) {
        const location = van.location?.value || null;
        if(location) {
            const position = {lat: parseFloat(location.latitude), lng: parseFloat(location.longitude) };

            const marker_icon = get_marker_icon(index+1);

            const marker = new AdvancedMarkerElement({
                position: position,
                map     : map,
                title   : van.van_number,
                content : marker_icon
            });
        
            // Show InfoWindow when clicking the marker
            marker.addListener("gmp-click", () => {
                set_marker_details(marker, van);
            });
            bounds.extend(marker.position);
            markers.push(marker);
            markers_index[van.vin] = markers.length - 1;
        }
    });
    if(markers.length) {
        map.fitBounds(bounds);
    }
}

function get_marker_icon(number) {
    
    const marker_icon = Object.assign(document.createElement("div"), {
        className: "engr-marker",
        innerHTML: `<img src="${cdn_url}assets/images/red-marker.png"><span><i class="" style="font-size: 14px; line-height: 12px;">${number}</i></span>`
    });
    return marker_icon;
}

async function set_marker_details(marker, van) {
    let location_time = van.location?.timestamp
 ? moment.utc(van.location.timestamp).local().format('DD/MM/YYYY hh:mm A') : "N/A";
    const infoWindow = new google.maps.InfoWindow({
        content: `<div class="marker-info"  style="width: 200px;">
                        <h6>${van.van_number}</h6>
                        <p><strong>Driver:</strong> ${van.driver_name}</p>
                        <p><strong>Make:</strong> ${van.make_name}</p>
                        <p><strong>Model:</strong> ${van.model_name}</p>
                        <p><strong>Logged:</strong> ${location_time}</p>
                    </div>`
    });
    infoWindow.open(map, marker);
}

// initMap is now async
async function initMap() {
    // Request libraries when needed, not in the script tag.
    const { Map } = await google.maps.importLibrary("maps");

    // Short namespaces can be used.
    let centerPoint = {lat: 51.50735, lng: -0.12776};
    map = new Map(document.getElementById("map"), {
        center: centerPoint,
        zoom: 14,
        //maxZoom: 15,
        mapId: ajs.mapId,
        gestureHandling: "greedy", 
        zoomControl: true 
    });
}

// Function to clear all markers
function clear_markers() {
    if (!Array.isArray(markers) || markers.length === 0) return;

    markers.forEach(marker => marker.setMap(null));
    markers.length = 0;
    markers_index = {};
}

$(function () {
    var breadcrumbs = [{ label: "Vans Location", url: null }];
	set_breadcrumb(breadcrumbs);
    
    initMap();
    get_details();  // load details
    //fetch_default_filter(master_data_type);

    // On list click → highlight marker
    $(document).on("click",".highlight-marker", function () {
        let vin = $(this).data("vin");
        let index = markers_index[vin] ?? null;

        $(".engr-marker").removeClass("highlight-marker-active");

        // Highlight clicked one
        if (markers[index]) {
            markers[index].content.classList.add("highlight-marker-active");
            markers[index].zIndex = 9999;
            map.setCenter(markers[index].position);// optional: move map
            map.setZoom(14);
        }
    });

    $(document).on("click","#postcode-search",function(){
        var postcode = $('#postcode').val().trim();
        
        if (postcode) {
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'address': postcode, 'region': 'gb' }, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {

                    var country = "";
                    results[0].address_components.forEach(function(component) {
                        if (component.types.includes("country")) {
                            country = component.short_name;
                        }
                    });

                    // Check if the country is the United Kingdom (GB)
                    if (country === "GB") {
                    
                        // Get the latitude and longitude of the postcode
                        var centerLatLng = results[0].geometry.location;

                        // Filter markers based on distance
                        markers.forEach(function(marker) {
                            var markerLatLng = marker.position;
                            var distance = google.maps.geometry.spherical.computeDistanceBetween(centerLatLng, markerLatLng);

                            // Show markers within 200 meters
                            if (distance <= ajs.mapRadius) {
                                marker.setMap(map);
                            } else {
                                marker.setMap(null);
                            }
                        });
                        map.setCenter(centerLatLng);
                        map.setZoom(14);
                    } else {
                        Swal.fire({
                            title: "Postcode not found",
                            icon: "error",
                        });
                    }
                } else {
                    Swal.fire({
                        title: "Postcode not found",
                        icon: "error",
                    });
                }
            });
        } else {
            dataTable.ajax.reload(null, false);
        }
    }); 

    $(document).on("click",".refresh-van-loc",function(){
        lastStart = 0;   // track last "start" index requested
        totalRecords = 0;
        cacheVans = [];
        get_details();
    });

    $(".engineer-tbl-main").on("scroll", function () {        
        let container = $(this);
        if (container.scrollTop() + container.innerHeight() >= container[0].scrollHeight - 50) {
            get_details();
        }
    });
    
    setInterval(function() {
        $('#search_grid').trigger('click');
    }, 300000); // Refresh every 300 seconds
});
