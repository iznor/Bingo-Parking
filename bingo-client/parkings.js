$(function () {
    getAllParkings();

     $("#get-button").click((parking) => {
         $("#get-delete-parking").css("display", "block");
         $("#add-update-parking").css("display", "none");
         $("#get-and-delete-action").text("Get parking");
     });
     $("#get-and-delete-action").click(() => {
         if ($("#get-and-delete-action").text() === "Get parking") {
             const parkingId = $("#park-id").val();
             getParkingById(parkingId);
         } else {
             // TODO - Delete
         }
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
     
 });
 
 function getAllParkings() {
     console.log("hello");
     $.ajax({
         url: 'http://localhost:8080/api/parkings',
         type: 'GET',
         success: (parkings) => {
             console.log({ parkings });
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
 $('#parkings-list').append(tableStructure);
 parkings.forEach(parking => {
     $("table tbody").append('<tr>' +
             '<th scope="row">' + parking.parkingID + '</th>' +
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
         success: (deletedResult) => {
            if (deletedResult.deletedCount > 0 ) {
                getAllParkings();
                console.log("delete");
                showDeleteParkingMessage("Deleted successfully");
                getAllParkings();
            }   
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
 