// var urlServer = "http://"+window.location.host+"/api/Machine/all";
var path = "/api/Machine/";
var locationHost = window.location.host;
var port = ":8080"
var ssave = "save";
var sshow = "all";
var supdate = "update";
var sdelete = "";
var urlServerCategory = "http://"+window.location.host+port+"/api/Category/all";
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
                        '<td>'+value.id+'</td>'+
                        '<td>'+value.name+'</td>'+
                        '<td>'+value.brand+'</td>'+
                        '<td>'+value.year+'</td>'+
                        '<td>'+value.category.name+'</td>'+
                        '<td>'+value.description+'</td>'+
                        '<td>'+
                            '<button type="button" class="btn success" onclick=editar('+value.id+',"'+value.name+'","'+value.brand+'",'+value.year+',"'+value.category.id+'")>Editar</button>'+
                            '<button type="button" class="btn danger" onclick=eliminar('+value.id+')>Eliminar</button>'+
                        '</td>'+
                    '</tr>'
                );
            });
        }
    });
}

function consultarCategorias(){
    $.ajax({
        url: urlServerCategory,
        type: "GET",
        dataType: "json",
        success: function (response) {
            $('#category').append('<option value="0">Seleccione una categoría</option>');
            console.log(response);
            $.each(response, function(index, value){
                $('#category').append(
                    '<option value="'+value.id+'">'+value.name+'</option>'
                );
            });
        }
    });
}

function crear(){
    if($("#name").val()=="" || $("#brand").val()=="" || $("#year").val()=="" || $("#category").val()=="" || $("#description").val()==""){
        alert("Todos los campos son obligatorios");
    }
    else{
        let name = $("#name").val();
        let brand = $("#brand").val();
        let year = $("#year").val();
        let description = $("#description").val();
        let category = $("#category").val();
        var data = {
            name:name,
            brand:brand,
            year:year,
            description:description,
            category:{
                id: category
            }
        };
        $.ajax({
            url: "http://"+locationHost+port+path+ssave,
            type: "POST",
            dataType: "json",
            data: JSON.stringify(data),
            contentType: 'application/json',
            statusCode: {
                201: function(data) {
                    limpiar();
                    consultar();
                },
                415: function(data){
                    alert("Error en los datos");
                }
            } 
        });
    } 
}

function editar(id,name,brand,year,category,description){
    document.getElementById("openEdit").click();
        $("#id").val(""+id+"");
        document.getElementById("id").disabled = true;
        $("#name").val(""+name+"");
        $("#brand").val(""+brand+"");
        $("#year").val(""+year+"");
        $("#category").val(""+category+"");
        $("#description").val(""+description+"");
}

function actualizar(id) {
    if($("#name").val()=="" || $("#brand").val()=="" || $("#year").val()=="" || $("#category").val()=="" || $("#description").val()==""){
        alert("Todos los campos son obligatorios");
    }
    else{
        let data = {
            id: $("#id").val(),
            name: $("#name").val(),
            brand: $("#brand").val(),
            year: $("#year").val(),
            category:{
                id: $("#category").val()
            },
            description:$("#description").val()
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
            id: id
        }
        $.ajax({
            url: "http://"+locationHost+port+path+sdelete+id,
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
    $("#name").val("");
    $("#brand").val("");
    $("#year").val("");
    $("#description").val("");
    $("#category").val(0);

}
$(document).ready(function () {
    consultar();
    consultarCategorias();
});
