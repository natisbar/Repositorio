var urlOracle = "https://g90aed1ddc7c3bb-db202109232047.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/machine/machine";

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
                row.append($('<td>').text(element.brand));
                row.append($('<td>').text(element.model));
                row.append($('<td>').text(element.category_id));
                row.append($('<td>').text(element.name));
                $('tbody').append(row);
            });
        }
    });
}
function crear() {
    let id = $("#id").val();
    let brand = $("#brand").val();
    let model = $("#model").val();
    let category_id = $("#category_id").val();
    let name = $("#name").val();
    $.ajax({
        url: urlOracle,
        type: "POST",
        dataType: "json",
        data: {
            id: id,
            brand: brand,
            model: model,
            category_id: category_id,
            name: name
        },
        statusCode: {
            201: function () {
                consultar();
                Limpiar();
            },
            200: function () {
                console.log("-1-1-1-1 WE GOT 200!");
            }
        }
    });
    consultar();
}
function modificar(id) {
    var id = $("#id").val();
    var brand = $("#brand").val();
    var model = $("#model").val();
    var category_id = $("#category_id").val();
    var name = $("#name").val();
    var data = {
        id: id,
        brand: brand,
        model: model,
        category_id: category_id,
        name: name
    };
    $.ajax({
        url: urlOracle,
        type: "PUT",
        dataType: "json",
        data: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        },
        success: function (response) {

        },
        statusCode: {
            201: function () {
                Limpiar();
                consultar();
            },
        }
    });
}
function borrar(id) {
    id = $("#id").val();
    var conf = confirm("Seguro que desea eliminar el resgistro No." + id);
    if (conf == true) {
        var data = {
            id: id
        }
        $.ajax({
            url: urlOracle,
            type: "DELETE",
            dataType: "json",
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
            statusCode: {
                204: function () {
                    consultar();
                    Limpiar();
                }
            },
        });
    }
}
function Limpiar(id) {
    $("#id").val("");
    $("#brand").val("");
    $("#model").val("");
    $("#category_id").val("");
    $("#name").val("");

}
$(document).ready(function () {
    consultar();
});
