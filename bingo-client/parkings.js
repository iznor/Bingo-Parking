$(function () {
    getAllParkings();

     $("#get-button").click((parking) => {
         $("#get-delete-parking").css("display", "block");
         $("#add-update-parking").css("display", "none");
         $("#get-and-delete-action").text("Get parking");
     });
     $("#delete-button").click(() => {
         $("#parking-result").empty();
         $("#get-delete-parking").css("display", "block");
         $("#add-update-parking").css("display", "none");
         $("#get-and-delete-action").text("Delete parking");
     });
     $("#get-and-delete-action").click(() => {
         const parkingId = $("#park-id").val();
         console.log(parkingId);
         console.log("get and delete ");
         if (!parkingId) {
             return;
         }
         if ($("#get-and-delete-action").text() === "Get parking") {
             getParkingById(parkingId);
         } else {
            console.log(" delete ");
             deleteParkingById(parkingId);
         }
     });
     $("#add-button").click((parking) => {
         $("#get-delete-parking").css("display", "none");
         $("#add-update-parking").css("display", "block");
         $("#add-and-update-action").text("Add parking");
         $("#parking-id-section").css("display", "none");
     });
 
     $("#update-button").click((parking) => {
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
        const location_lng = $("#location_lng-form").val();
        const location_lat = $("#location_lat-form").val();
        const dateStart = $("#dateStart-form").val();
        const dateEnd = $("#dateEnd-dateEnd").val();
        const price = $("#price-form").val();
        const active = $("#active-form").val();



        console.log(parkingId);
        console.log("add and update ");
        if (!parkingId) {
            return;
        }
        if ($("#add-and-update-action").text() === "Add parking") {
            console.log(" Add parking ");
           
        } else {
            console.log("update")
            updateParking(parkingId, firstName, lastName , phoneNumber ,location_lng,
                          location_lat , dateStart , dateEnd ,price  ,active
                          );
        }
    });
     
 });
 
 function getAllParkings() {
     console.log("hello");
     $.ajax({
         url: 'http://localhost:8080/api/parkings',
         type: 'GET',
         success: (parkings) => {
             console.log( "parkings ");
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
             '<td>' + parking.person.firstName + " " + parking.person.lastName   + " " + parking.person.phoneNumber +'</td>' +
             '<td>' + parking.location.lat  + " " +  parking.location.lat  + '</td>' +
             '<td>' + parking.dateStart + '</td>' +
             '<td>' + parking.dateEnd + '</td>' +
             '<td>' + parking.price + '</td>' +
             '<td>' + parking.active + '</td>' +
         '</tr>'
     );
 });
     
 }

 
 function getParkingById(parkingId) {
     $.ajax({
         url:
             `http://localhost:8080/api/parkings/${parkingId}`,
         type: 'GET',
         success: (park) => {
             
             if (park) {
                 showParking(park);
             } else {
                 $("#parking-result").empty();
             }
         }
     });
 }
 function showParking(parking) {
     console.log(parking);
     $("#parking-result").empty();
     $("#parking-result").append(
         '<p>' +
         'person: ' + parking.person.firstName + " " + parking.person.lastName   + " " + parking.person.phoneNumber + '<br>' +
         'location: ' + parking.location.lat  + " " +  parking.location.lat + '<br>' +
         'dateStart: ' +  parking.dateStart + '<br>' +
         'dateEnd: ' + parking.dateEnd  + '<br>' +
         'price: ' + parking.price  + '<br>' +
         'active: ' + parking.active  + '<br>' +
         '<p>'
     );
 }
 
 
 function deleteParkingById(parkingId) {
     console.log(parkingId)
     $.ajax({
         url: `http://localhost:8080/api/parkings/${parkingId}`,
         type: 'DELETE',
         dataType: 'text',
         success:  function(deletedResult) {
            console.log(`delete: ${parkingId}`);
            showDeleteParkingMessage("Deleted successfully");
            getAllParkings();
        }
        
    });
 }
 function showDeleteParkingMessage(message) {
    console.log("massage is ")
    console.log(message);
    $("#parking-result").empty();
    $("#parking-result").append(
        '<p>' + message  + '<p>'
    );
 }
 function updateParking(parkingId, firstName, lastName , phoneNumber ,location_lng,
    location_lat , dateStart , dateEnd ,price  , active) {
     console.log("ajax_update");
  
     $.ajax({
        
        url: `http://localhost:8080/api/parkings/${parkingId}`,
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
        success: ()=>{
            console.log("Sucess");
            getAllParkings();
        },
        error: function(jqXHR, status, errorThrown){
        }
    })

}