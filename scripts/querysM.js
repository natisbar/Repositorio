// var urlServer = "http://"+window.location.host+"/api/Machine/all";
// var urlServerCategory = "http://"+window.location.host+"/api/Category/all";
var urlServer = "http://129.151.112.3/api/Machine/all";
var urlServerCategory = "http://129.151.112.3/api/Category/all";

function consultar() {
    $.ajax({
        url: urlServer,
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
                        '<td>'+value.description+'</td>'+
                        '<td>'+value.category.name+'</td>'+
                        '<td>'+
                            '<button type="button" class="btn success" onclick=editar('+value.id+')>Editar</button>'+
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
    // let id = $("#id").val();
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
            url: "http://129.151.112.3/api/Machine/save",
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
// function modificar(id) {
//     var id = $("#id").val();
//     var brand = $("#brand").val();
//     var model = $("#model").val();
//     var category_id = $("#category_id").val();
//     var name = $("#name").val();
//     var data = {
//         id: id,
//         brand: brand,
//         model: model,
//         category_id: category_id,
//         name: name
//     };
//     $.ajax({
//         url: urlOracle,
//         type: "PUT",
//         dataType: "json",
//         data: JSON.stringify(data),
//         headers: {
//             "Content-Type": "application/json"
//         },
//         success: function (response) {

//         },
//         statusCode: {
//             201: function () {
//                 Limpiar();
//                 consultar();
//             },
//         }
//     });
// }
// function borrar(id) {
//     id = $("#id").val();
//     var conf = confirm("Seguro que desea eliminar el resgistro No." + id);
//     if (conf == true) {
//         var data = {
//             id: id
//         }
//         $.ajax({
//             url: urlOracle,
//             type: "DELETE",
//             dataType: "json",
//             data: JSON.stringify(data),
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             statusCode: {
//                 204: function () {
//                     consultar();
//                     Limpiar();
//                 }
//             },
//         });
//     }
// }
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
