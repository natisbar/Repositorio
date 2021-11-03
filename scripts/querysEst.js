// var urlServer = "http://"+window.location.host+"/api/Machine/all";
var path = "/api/Score/";
var locationHost = "129.151.112.3";
var port = ":8080"
var ssave = "save";
var sshow = "all";
var supdate = "update";
var sdelete = "";
var urlServerReservas = "http://"+locationHost+port+"/api/Reservation/all";
// var urlServer = "http://129.151.112.3:8080/api/Machine/all";
// var urlServerCategory = "http://129.151.112.3:8080/api/Category/all";

function consultar() {
    $.ajax({
        url: "http://"+locationHost+port+path+sshow,
        type: "GET",
        dataType: "json",
        success: function (response) {
            $('tbody').empty();
            console.log(response);
            $.each(response, function(index, value){
                $('#cuerpoTabla').append(
                    '<tr>'+
                        '<td>'+value.idScore+'</td>'+
                        '<td>'+value.reservation.idReservation+"_"+value.reservation.client.name+"_"+value.reservation.machine.name+'</td>'+
                        '<td>'+value.messageText+'</td>'+
                        '<td>'+value.stars+'</td>'+
                        '<td>'+
                            '<button type="button" class="btn success" onclick=editar('+value.idScore+',"'+value.reservation.idReservation+"_"+value.reservation.client.name+'",'+value.stars+')>Editar</button>'+
                            '<button type="button" class="btn danger" onclick=eliminar('+value.idScore+')>Eliminar</button>'+
                        '</td>'+
                    '</tr>'
                );
            });
        }
    });
}

function consultarReservas(){
    $.ajax({
        url: urlServerReservas,
        type: "GET",
        dataType: "json",
        success: function (response) {
            $('#reservation').append('<option value="0">Seleccione una reserva</option>');
            console.log(response);
            $.each(response, function(index, value){
                $('#reservation').append(
                    '<option value="'+value.idReservation+'">'+value.idReservation+"_"+value.client.name+"_"+value.machine.name+'</option>'
                );
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("No se pudo crear el elemento")
        }
    });
}


function crear(){
    if($("#reservation").val()=="" || $("#messageText").val()=="" || $("#stars").val()==""){
        alert("Todos los campos son obligatorios");
    }
    else{
        let reservation = $("#reservation").val();
        let messageText = $("#messageText").val();
        let stars = $("#stars").val();
        var data = {
            reservation:{
                idReservation: reservation
            },
            messageText:messageText,
            stars:stars,
        };
        $.ajax({
            url: "http://"+locationHost+port+path+ssave,
            type: "POST",
            dataType: "json",
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (response) {
                limpiar();
                consultar();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se pudo crear el elemento")
            }
        });
    } 
}

function editar(idScore,reservation,stars){
    document.getElementById("openEdit").click();
    $("#idScore").val(""+idScore+"");
    document.getElementById("idScore").disabled = true;
    $("#reservation").val(""+reservation+"");
    $("#stars").val(""+stars+"");
    // $("#description").val(""+description+"");
}

// function actualizar(idScore) {
//     if($("#idScore").val()=="" || $("#reservation").val()=="" || $("#messageText").val()=="" || $("#stars").val()==""){
//         alert("Todos los campos son obligatorios");
//     }
//     else{
//         let data = {
//             idScore: idScore,
//             startDate: $("#startDate").val(),
//             devolutionDate: $("#devolutionDate").val(),
//             status: $("#status").val(),
//             reservation:{
//                 id: $("#machine").val()
//             },
//             client:{
//                 idClient: $("#client").val()
//             },
//         }

//         $.ajax({
//             url: "http://"+locationHost+port+path+supdate,
//             type: "PUT",
//             dataType: "json",
//             data: JSON.stringify(data),
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             success: function (response) {
//                 limpiar();
//                 consultar();
//             },
//             error: function (jqXHR, textStatus, errorThrown) {
//                 alert("No se Actualizo Correctamente!")
//             }
//         });
//     }
// }


function eliminar(idScore) {
    var conf = confirm("Seguro que desea eliminar el registro No." + idReservation);
    if (conf == true) {
        var data = {
            idScore: idScore
        }
        $.ajax({
            url: "http://"+locationHost+port+path+sdelete+idScore,
            type: "DELETE",
            dataType: "json",
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
            statusCode: {
                204: function () {
                    consultar();
                }
            },
        });
    }
}

function limpiar() {
    $("#idScore").val("");
    $("#reservation").val("");
    $("#messageText").val("");
    $("#stars").val("");
}
$(document).ready(function () {
    // consultar();
    consultarReservas();
});
