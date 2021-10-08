var urlOracle = "https://g90aed1ddc7c3bb-db202109232047.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message";

function consultar() {
    $.ajax({
        url: urlOracle,
        type: "GET",
        dataType: "json",
        success: function (response) {
            $('tbody').empty();
            console.log(response);
            response.items.forEach(element => {
                let row = $('<tr>');
                row.append($('<td>').text(element.id));
                row.append($('<td>').text(element.messagetext));
                $('tbody').append(row);
            });
        }
    });
}



function crear() {
    let id = $("#id").val();
    let messagetext = $("#messagetext").val();
    $.ajax({
        url: urlOracle,
        type: "POST",
        dataType: "json",
        data: {
            id: id,
            messagetext: messagetext
        },
        statusCode: {
            201: function () {
                consultar();
            },
            200: function () {
                console.log("-1-1-1-1 WE GOT 200!");
            }
        }
    });
    consultar();
}

// function modificar() {
//     let id = $("#id").val();
//     let brand = $("#brand").val();
//     let model = $("#model").val();
//     let category_id = $("#category_id").val();
//     let name = $("#name").val();
//     $.ajax({
//         url: urlOracle,
//         type: "PUT",
//         dataType: "application/json",
//         data: {
//             id: id,
//             brand: brand,
//             model: model,
//             category_id: category_id,
//             name: name
//         },
//         statusCode: {
//             201: function () {
//                 consultar();
//             },
//             200: function () {
//                 console.log("-1-1-1-1 WE GOT 200!");
//             }
//         }
//     });
//     // consultar();
// }

// function borrar() {
//     let id = $("#id").val();
//     $.ajax({
//         url: urlOracle,
//         type: "POST",
//         dataType: "application/json",
//         data: {
//             "_method":"delete",
//             id: id
            
//         },
//     }).done(function () {
//         console.log('SUCCESS');
//     }).fail(function (msg) {
//         console.log('FAIL');
//     });
// }

$(document).ready(function () {
    consultar();
});