function checkIfActiveNow(dateStart, dateEnd, dateNow){
        
    var fDate,lDate,cDate;
    fDate = Date.parse(dateStart);
    lDate = Date.parse(dateEnd);
    cDate = Date.parse(dateNow);

    if((cDate <= lDate && cDate >= fDate)) {
        return false;
    }
    return true;
}

const localPath='http://localhost:8080'
const herokuPath='https://bingo-parking.herokuapp.com'

$(function () {
    $("#map").css("visibility", "hidden");
    //Set Date Variable For Today
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById("dateStart-form").setAttribute("min", today);
    document.getElementById("dateEnd-form").setAttribute("min", today);
    


    // alert(checkIfActiveNow(new Date(2021,1,1), new Date(2022,1,1), new Date()))

    //END Set Date

    //MAP
    //insert some map code

    //ENDMAP
    getAllParkings();

    $("#get-button").click((parking) => {
        $("#map").css("visibility", "hidden");
        $("#map").off();
        $("#get-delete-parking").css("display", "block");
        $("#add-update-parking").css("display", "none");
        $("#parking-result-faild").css("display", "none");
        $("#get-and-delete-action").text("Get parking");
    });
    $("#delete-button").click(() => {
        $("#map").css("visibility", "hidden");
        $("#map").off();
        $("#parking-result").empty();
        $("#get-delete-parking").css("display", "block");
        $("#add-update-parking").css("display", "none");
        $("#get-and-delete-action").text("Delete parking");
        $("#parking-result-faild").css("display", "none");
    });
    $("#get-and-delete-action").click(() => {
        $("#map").off();
        const parkingId = $("#park-id").val();
        if (!parkingId) {
            return;
        }
        if ($("#get-and-delete-action").text() === "Get parking") {
            getParkingById(parkingId);
            $("#map").css("visibility", "visible");
        } else {
            $("#map").css("visibility", "hidden");
            deleteParkingById(parkingId);
        }
    });
    $("#add-button").click((parking) => {
        $("#map").css("visibility", "visible");
        $("#location_lat-form").attr("value", "Click on map")
        $("#location_lng-form").attr("value", "Click on map")
        $("#map").click(()=>{
            $('#location_lat-form').attr("value", clickedLoc.lat())
            $('#location_lng-form').attr("value", clickedLoc.lng())
        });
        $("#get-delete-parking").css("display", "none");
        $("#add-update-parking").css("display", "block");
        $("#add-and-update-action").text("Add parking");
        $("#parking-id-section").css("display", "none");
    });

    $("#update-button").click((parking) => {
        $("#map").css("visibility", "visible");
        $("#location_lat-form").attr("value", "Click on map")
        $("#location_lng-form").attr("value", "Click on map")
        $("#map").click(()=>{
            $('#location_lat-form').attr("value", clickedLoc.lat())
            $('#location_lng-form').attr("value", clickedLoc.lng())
        });
        $("#get-delete-parking").css("display", "none");
        $("#add-update-parking").css("display", "block");
        $("#add-and-update-action").text("Update parking");
        $("#parking-id-section").css("display", "block");
    });
    $("#add-and-update-action").click(() => {
        const parkingId = $("#park-id-form").val();
        const firstName = $("#first_name-form").val();
        const lastName = $("#last_name-form").val();
        const phoneNumber = $("#phoneNumber-form").val();
        const location_lat = $("#location_lat-form").val();
        const location_lng = $("#location_lng-form").val();
        const dateStart = $("#dateStart-form").val();
        const dateEnd = $("#dateEnd-form").val();
        const price = $("#price-form").val();
        const active = $("#active-form").val();
        if ($("#add-and-update-action").text() == "Add parking") {
            addParking(firstName, lastName, phoneNumber, location_lng,
                location_lat, dateStart, dateEnd, price,
            );
        } else {
            updateParking(parkingId, firstName, lastName, phoneNumber, location_lng,
                location_lat, dateStart, dateEnd, price, active
            );
        }
    });
});

function getAllParkings() {
    $("#map").css("visibility", "visible");
    $.ajax({
        url: `${herokuPath}/api/parkings`,
        type: 'GET',
        success: (parkings) => {
            recreateParkingsTable(parkings);
        }
    });
}

function recreateParkingsTable(parkings) {
    const tableStructure =
        '<table class="table">' +
        '<thead>' +
        '<tr>' +
        '<th>parkid.</th>' +
        '<th>person</th>' +
        '<th>location</th>' +
        '<th>dateStart</th>' +
        '<th>dateEnd</th>' +
        '<th>price</th>' +
        '<th>active</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody>' +
        '</tbody>' +
        '</table>';
    $('#parkings-list').empty();
    $('#parkings-list').append(tableStructure);
    parkings.forEach(parking => {
        $("table tbody").append('<tr>' +
            '<th scope="row">' + parking.parkingId + '</th>' +
            '<td>' + parking.person.firstName + " " + parking.person.lastName + " " + parking.person.phoneNumber + '</td>' +
            '<td>' + parking.location.lat + " " + parking.location.lng + '</td>' +
            '<td>' + `${new Date(parking.dateStart).getDate()}/${new Date(parking.dateStart).getMonth()}/${new Date(parking.dateStart).getFullYear()}` + '</td>' +
            '<td>' + `${new Date(parking.dateEnd).getDate()}/${new Date(parking.dateEnd).getMonth()}/${new Date(parking.dateEnd).getFullYear()}` + '</td>' +
            '<td>' + parking.price + '</td>' +
            '<td>' + parking.active + '</td>' +
            '</tr>'
        );
    });
}

function getParkingById(parkingId) {
    $.ajax({
        url:
            `${herokuPath}/api/parkings/${parkingId}`,
        type: 'GET',
        success: (park) => {

            if (park) {
                showParking(park);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $("#parking-result").empty();
            $("#parking-result-faild").css("display", "block");
        }
    });
}
function showParking(parking) {
    $("#parking-result-faild").css("display", "none");
    $("#parking-result").empty();
    $("#parking-result").append(
        '<p>' +
        'person: ' + parking.person.firstName + " " + parking.person.lastName + " " + parking.person.phoneNumber + '<br>' +
        'location: ' + parking.location.lat + " " + parking.location.lng + '<br>' +
        'dateStart: ' + `${new Date(parking.dateStart).getDate()}/${new Date(parking.dateStart).getMonth()}/${new Date(parking.dateStart).getFullYear()}` + '<br>' +
        'dateEnd: ' + `${new Date(parking.dateEnd).getDate()}/${new Date(parking.dateEnd).getMonth()}/${new Date(parking.dateEnd).getFullYear()}` + '<br>' +
        'price: ' + parking.price + '<br>' +
        'active: ' + parking.active + '<br>' +
        '<p>'
    );
}

function deleteParkingById(parkingId) {
    $.ajax({
        url: `${herokuPath}/api/parkings/${parkingId}`,
        type: 'DELETE',
        dataType: 'text',
        success: function (deletedResult) {
            showDeleteParkingMessage("Deleted successfully");
            getAllParkings();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $("#parking-result").empty();
            $("#parking-result-faild").css("display", "block");
        }
    });
}

function showDeleteParkingMessage(message) {
    $("#parking-result-faild").css("display", "none");
    $("#parking-result").empty();
    $("#parking-result").append(
        '<p>' + message + '<p>'
    );
}

function updateParking(parkingId, firstName, lastName, phoneNumber, location_lng,
    location_lat, dateStart, dateEnd, price, active) {
    $.ajax({
        url: `${herokuPath}/api/parkings/${parkingId}`,
        type: 'PUT',
        dataType: 'text',
        data: JSON.stringify({
            "person": {
                "firstName": firstName,
                "lastName": lastName,
                "phoneNumber": phoneNumber
            },
            "location": {
                "lat": location_lat,
                "lng": location_lng,
            },
            "dateStart": dateStart,
            "dateEnd": dateEnd,
            "price": price,
            "active": active
        }),
        contentType: 'application/json; charset=utf-8',
        success: () => {
            getAllParkings();
        },
        error: function (jqXHR, status, errorThrown) {
        }
    })
}

function addParking(firstName, lastName, phoneNumber, location_lng,
    location_lat, dateStart, dateEnd, price) {

    $.ajax({
        url: `${herokuPath}/api/parkings`,
        type: 'POST',
        dataType: 'text',
        data: JSON.stringify({
            "person": {
                "firstName": firstName,
                "lastName": lastName,
                "phoneNumber": phoneNumber
            },
            "location": {
                "lat": location_lat,
                "lng": location_lng,
            },
            "dateStart": dateStart,
            "dateEnd": dateEnd,
            "price": price,
            "active": true
        }),
        contentType: 'application/json; charset=utf-8',
        success: () => {
            getAllParkings();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //Server's responsibility
        }
    })
}