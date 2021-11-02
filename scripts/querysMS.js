// var urlServer = "http://"+window.location.host+"/api/Machine/all";
var path = "/api/Message/";
var locationHost = "129.151.112.3";
var port = ":8080"
var ssave = "save";
var sshow = "all";
var supdate = "update";
var sdelete = "";
// var urlServerCategory = "http://"+window.location.host+port+"/api/Category/all";
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
                var msn = value.messageText;
                $('#cuerpoTabla').append(
                    '<tr>'+
                        '<td>'+value.idMessage+'</td>'+
                        '<td>'+value.messageText+'</td>'+
                        '<td>'+
                            '<button type="button" class="btn success" onclick=editar('+value.idMessage+')>Editar</button>'+
                            '<button type="button" class="btn danger" onclick=eliminar('+value.idMessage+')>Eliminar</button>'+
                        '</td>'+
                    '</tr>'
                );
            });
        }
    });
}

function crear(){
    if($("#messageText").val()==""){
        alert("Debe definir el mensaje");
    }
    else{
        let messageText = $("#messageText").val();
        var data = {
            messageText:messageText,
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

function editar(id){
    document.getElementById("openEdit").click();
        $("#id").val(""+id+"");
        document.getElementById("id").disabled = true;
        // $("#messageText").val(""+messageText+"");
}

function actualizar(id) {
    if($("#messageText").val()==""){
        alert("Todos los campos son obligatorios");
    }
    else{
        let data = {
            idMessage: $("#id").val(),
            messageText: $("#messageText").val(),
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


function eliminar(id) {
    var conf = confirm("Seguro que desea eliminar el resgistro No." + id);
    if (conf == true) {
        var data = {
            idMessage: id
        }
        $.ajax({
            url: "http://"+locationHost+port+path+sdelete+id,
            type: "DELETE",
            dataType: "json",
            data: JSON.stringify(data),
            // headers: {
            //     "Content-Type": "application/json"
            // },
            statusCode: {
                204: function () {
                    consultar();
                }
            },
        });
    }
}

function limpiar() {
    $("#messageText").val("");
}

$(document).ready(function () {
    consultar();
});
