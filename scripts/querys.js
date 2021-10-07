var urlOracle = "https://g44dabe1ff79c15-db202109272014.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/machine/machine";

function consultar() {
    $.ajax({
        url: urlOracle,
        type: "GET",
        dataType: "json",
        success: function (response) {
            $('tbody').empty();
            console.log(response);
            response.items.forEach(element => {
                var row = $('<tr>');
                row.append($('<td>').text(element.id));
                row.append($('<td>').text(element.brand));
                row.append($('<td>').text(element.model));
                row.append($('<td>').text(element.category_id));
                row.append($('<td>').text(element.name));
                row.append($('<td>').text(element.amount));
                $('tbody').append(row);
            });
        }
    });
}



function crear() {
    var id = $("#id").val();
    var brand = $("#brand").val();
    var model = $("#model").val();
    var category_id = $("#category_id").val();
    var name = $("#name").val();
    $.ajax({
        url: urlOracle,
        type: "POST",
        dataType: "json",
        data: {
            id: id,
            brand: brand,
            model: model,
            category_id: category_id,
            name: name,
            amount:amount
        },
        statusCode: {
            201: function () {
                consultar();
            },
            200: function () {
                console.log("-1-1-1-1 WE GOT 200!");
            }
        },
    });
}
$(document).ready(function () {
    consultar();
});