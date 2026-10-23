dataTable = null;
var master_data_type = "engr_location";
let map;
let markers = [];
let markers_index = {};

function load_data_table(limit, search_term, filters) {        
    get_details(filters);
}

// for set data on detail page
function set_details(result_json) {
	if (ajs_form_handler.check_result(result_json)) {
		var users = result_json.data;

        var userHtml= "";
        $.each(users, function (index, user) {
            let is_available_class = (isEmpty(user.latitude) || isEmpty(user.longitude) || !user.is_user_checkin) ? 'emergency-task-icon' : 'near-engineering-icon';
            let engr_name = !isEmpty(user.latitude) && !isEmpty(user.longitude) ? `<a href="javascript:void(0);" class="cursor-pointer highlight-marker" data-id="${user.id}">${user.name}</a>` : user.name;
            userHtml += `<div class="engineer-locator-details mb-1 ps-2">
                            <div class="d-flex align-items-center">
                                <div class="sub-same-details table-col-width-10"><p class="mb-0">${index+1}</p></div>
                                <div class="sub-same-details table-col-width-30">
                                    <div class="avatar-group align-items-center">
                                        <i class="mdi mdi-circle fs-11 align-middle me-1 ${is_available_class}"></i>
                                        <div class="me-2">${engr_name}<br><span>${user.email}</span></div>
                                    </div>
                                </div>
                                <div class="sub-same-details table-col-width-30"><p class="mb-0">${setDefValue(user.mobile)}</p></div>
                                <div class="sub-same-details table-col-width-15 text-end"><a href="javascript:;" data-bs-toggle="tooltip" data-bs-trigger="hover"   data-bs-placement="top" title="${setDefValue(user.skills_list)}">${user.total_skills}</a></div>
                                <div class="sub-same-details table-col-width-15 text-center"><p class="mb-0"><a href="javascript:;" data-id="${user.id}" data-type="${user.user_type}"  class="send-notification add-btn"><i class="ri-message-line fs-18"></i></a></p></div>
                            </div>
                        </div>`;
            
        });
        if(userHtml == "") {
            userHtml = `<div class="engineer-locator-details mb-1 ps-2">
                            <div class="text-center">
                                <div class="me-2">Data not available!</div>
                            </div>
                        </div>`;
        }
        $('.engineer-tbl-main').html(userHtml);
        add_markers(users);
        $("#engr-last-updated").text("Updated: " + moment().format('DD/MM/YYYY hh:mm A'));
	} else {
		ajs_form_handler.show_errors(result_json);
	}
}

function get_details(filters = null) {
	ajs.ajax_form(
		site_url + "user/latest_location",
		filters,
		"GET",
		null,
		"1",
		"1",
		set_details,
		set_details
	);
}

async function add_markers(users) {
    clear_markers();
    if(users.length == 0) {
        return;
    }
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const bounds = new google.maps.LatLngBounds();
    
	$.each(users, function (_, user) {
        if(!isEmpty(user.latitude) && !isEmpty(user.longitude)) {
            const position = {lat: parseFloat(user.latitude), lng: parseFloat(user.longitude) };

            const marker_icon = get_marker_icon(user);

            const marker = new AdvancedMarkerElement({
                position: position,
                map     : map,
                title   : user.name,
                content : marker_icon
            });
        
            // Show InfoWindow when clicking the marker
            marker.addListener("gmp-click", () => {
                set_marker_details(marker, user);
            });
            bounds.extend(marker.position);
            markers.push(marker);
            markers_index[user.id] = markers.length - 1;
        }
    });
    if(markers.length) {
        map.fitBounds(bounds);
    }
}

function get_marker_icon(user) {
    const marker = user.is_user_checkin ? "green-marker.png" : "red-marker.png";
    
    const marker_icon = Object.assign(document.createElement("div"), {
        className: "engr-marker",
        innerHTML: `<img src="${cdn_url}assets/images/${marker}"><span>${user.short_name}</span>`
    });
    return marker_icon;
}

async function set_marker_details(marker, user) {
    /* const geocoder = new google.maps.Geocoder();
    const latLng = marker.position; // Get marker's LatLng
    let address = 'N/A';
    await geocoder.geocode({ location: latLng }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                address = results[0].formatted_address;
            }
        }
    }); */

    const task_code = !isEmpty(user.task_code) ? `<a target="_blank" href="${cdn_url}job/details/${ajs.hash_encode(user.job_id)}" >${setDefValue(user.task_code)}</a> ` : 'N/A';
    let logged_time = !isEmpty(user.add_date) ? moment(user.add_date).local().format('DD/MM/YYYY hh:mm A') : 'N/A';
    const infoWindow = new google.maps.InfoWindow({
        content: `<div class="marker-info"  style="width: 200px;">
                        <h6>${user.name}</h6>
                        <p><strong>Email:</strong> ${user.email}</p>
                        <p><strong>Skills:</strong> ${setDefValue(user.skills_list)}</p>
                        <p><strong>Task Code:</strong> ${task_code} </p>
                        <p><strong>Logged:</strong> ${logged_time} </p>
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
        maxZoom: 15,
        mapId: ajs.mapId,
        gestureHandling: "greedy", 
        zoomControl: true 
    });    
}

// Function to clear all markers
function clear_markers() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);  // Remove the marker from the map
    }
    markers = [];  // Optionally clear the markers array as well
}

$(function () {
    var breadcrumbs = [{ label: "Engineers Location", url: null }];
	set_breadcrumb(breadcrumbs);
    select2_ajax(
		"#skill_id_filter",
		site_url + "skill/get_all",
		"title",
		null
	);

    initMap();
    get_details();  // load details

    $(document).on("click",".highlight-marker", function () {
        let id = $(this).data("id");
        let index = markers_index[id] ?? null;

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
            get_details();
        }
    });

    $(document).on('click', '.send-notification', function (e) {
        e.stopPropagation();
        ajs.show_loader();
        var id = $(this).data('id');
        var type_id = $(this).data('type');
        notification_user_ids.push(id);
        $('#user_type').val(type_id);
        var form_link = cdn_url+"notification/create?in_popup=1";
        ajs.showOffCanvasFormRight(form_link, 'Send Notification', 'send_notification');
        ajs.hide_loader();
        return false;
    });
    $(document).on("click", ".refresh-engr-loc", function () {
        get_details();
    });

    setInterval(function() {
        $('#search_grid').trigger('click');
    }, 300000); // Refresh every 300 seconds
});
