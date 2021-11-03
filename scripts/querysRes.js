// var urlServer = "http://"+window.location.host+"/api/Machine/all";
var path = "/api/Reservation/";
var locationHost = "129.151.112.3";
var port = ":8080"
var ssave = "save";
var sshow = "all";
var supdate = "update";
var sdelete = "";
var urlServerMachine = "http://"+locationHost+port+"/api/Machine/all";
var urlServerClient = "http://"+locationHost+port+"/api/Client/all";
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
                        '<td>'+value.idReservation+'</td>'+
                        '<td>'+value.startDate+'</td>'+
                        '<td>'+value.devolutionDate+'</td>'+
                        '<td>'+value.status+'</td>'+
                        '<td>'+value.machine.name+'</td>'+
                        '<td>'+value.client.name+'</td>'+
                        '<td>'+
                            '<button type="button" class="btn success" onclick=editar('+value.idReservation+',"'+value.startDate+'","'+value.devolutionDate+'","'+value.status+'")>Editar</button>'+
                            '<button type="button" class="btn danger" onclick=eliminar('+value.idReservation+')>Eliminar</button>'+
                        '</td>'+
                    '</tr>'
                );
            });
        }
    });
}

function consultarMaquinas(){
    $.ajax({
        url: urlServerMachine,
        type: "GET",
        dataType: "json",
        success: function (response) {
            $('#machine').append('<option value="0">Seleccione una maquina</option>');
            console.log(response);
            $.each(response, function(index, value){
                $('#machine').append(
                    '<option value="'+value.id+'">'+value.name+'</option>'
                );
            });
        }
    });
}

function consultarClientes(){
    $.ajax({
        url: urlServerClient,
        type: "GET",
        dataType: "json",
        success: function (response) {
            $('#client').append('<option value="0">Seleccione el cliente</option>');
            console.log(response);
            $.each(response, function(index, value){
                $('#client').append(
                    '<option value="'+value.idClient+'">'+value.name+'</option>'
                );
            });
        }
    });
}


function crear(){
    if($("#startDate").val()=="" || $("#devolutionDate").val()=="" || $("#status").val()=="" || $("#machine").val()=="" || $("#client").val()==""){
        alert("Todos los campos son obligatorios");
    }
    else{
        let idReservation = $("#idReservation").val();
        let startDate = $("#startDate").val();
        let devolutionDate = $("#devolutionDate").val();
        let status = $("#status").val();
        let machine = $("#machine").val();
        let client = $("#client").val();
        var data = {
            idReservation:idReservation,
            startDate:startDate,
            devolutionDate:devolutionDate,
            status:status,
            machine:{
                id: machine
            },
            client:{
                idClient: client
            }
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

function editar(idReservation,startDate,devolutionDate,status){
    document.getElementById("openEdit").click();
    $("#idReservation").val(""+idReservation+"");
    document.getElementById("idReservation").disabled = true;
    $("#startDate").val(""+startDate+"");
    $("#devolutionDate").val(""+devolutionDate+"");
    $("#status").val(""+status+"");
    // $("#description").val(""+description+"");
}

function actualizar(idReservation) {
    if($("#idReservation").val()=="" || $("#startDate").val()=="" || $("#devolutionDate").val()=="" || $("#status").val()=="" || $("#machine").val()=="" || $("#client").val()==""){
        alert("Todos los campos son obligatorios");
    }
    else{
        let data = {
            idReservation: idReservation,
            startDate: $("#startDate").val(),
            devolutionDate: $("#devolutionDate").val(),
            status: $("#status").val(),
            machine:{
                id: $("#machine").val()
            },
            client:{
                idClient: $("#client").val()
            },
        }

        $.ajax({
            url: "http://"+locationHost+port+path+supdate,
            type: "PUT",
            dataType: "json",
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
            success: function (response) {
                limpiar();
                consultar();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Actualizo Correctamente!")
            }
        });
    }
}


function eliminar(idReservation) {
    var conf = confirm("Seguro que desea eliminar el registro No." + idReservation);
    if (conf == true) {
        var data = {
            idReservation: idReservation
        }
        $.ajax({
            url: "http://"+locationHost+port+path+sdelete+idReservation,
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
    $("#idReservation").val("");
    $("#startDate").val("");
    $("#devolutionDate").val("");
    $("#status").val("");
    $("#machine").val(0);
    $("#client").val(0);

}
$(document).ready(function () {
    consultar();
    consultarMaquinas();
    consultarClientes();
});
