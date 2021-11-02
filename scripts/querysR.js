// var urlServer = "http://"+window.location.host+"/api/Machine/all";
var path = "/api/Reservation/";
var locationHost = "129.151.112.3";
var port = ":8080"
var ssave = "save";
var sshow = "all";
var supdate = "update";
var reportDates = "report-dates/";
var reportStatus = "report-status";
var topClients = "report-clients";
var sdelete = "";
var urlServerCategory = "http://"+locationHost+port+"/api/Category/all";
// var urlServer = "http://129.151.112.3:8080/api/Machine/all";
// var urlServerCategory = "http://129.151.112.3:8080/api/Category/all";



function consultarReservas(){
    var fechaInicio = document.getElementById("start").value;
    var fechaCierre = document.getElementById("finish").value;
    if($("#start").val()=="" || $("#finish").val()==""){
        alert("Todos los campos son obligatorios");
    }
    else{
        $("#dateTable").show();
        $.ajax({
            url:"http://"+locationHost+port+path+reportDates+fechaInicio+"/"+fechaCierre,
            type:"GET",
            datatype:"JSON",
            success:function(response){
                $('tbody').empty();
                console.log(response);
                $.each(response, function(index, value){
                    $('#cuerpoTableConsulta').append(
                        '<tr>'+
                            '<td>'+value.idReservation+'</td>'+
                            '<td>'+value.startDate+'</td>'+
                            '<td>'+value.devolutionDate+'</td>'+
                            '<td>'+value.status+'</td>'+
                            '<td>'+value.machine.name+'</td>'+
                            '<td>'+value.client.name+'</td>'+
                        '</tr>'
                    );
                });
            }
        });
    }
}

function estadosReservas(){
    $.ajax({
        url:"http://"+locationHost+port+path+reportStatus,
        type:"GET",
        datatype:"JSON",
        success:function(response){
            $('tbody').empty();
            console.log(response);
            $('#cuerpoTableEstados').append(
                '<tr>'+
                    '<td>'+response.completed+'</td>'+
                    '<td>'+response.cancelled+'</td>'+
                '</tr>'
            );
        }
    });
    
}

function topClientes(){
    $.ajax({
        url:"http://"+locationHost+port+path+topClients,
        type:"GET",
        datatype:"JSON",
        success:function(response){
            $('tbody').empty();
            console.log(response);
            $.each(response, function(index, value){
                $('#cuerpoTableClientes').append(
                    '<tr>'+
                        '<td>'+value.client.name+'</td>'+
                        '<td>'+value.total+'</td>'+
                    '</tr>'
                );
            });
        }
    });
    
}


$(document).ready(function () {
    // consultarReservas();
});
