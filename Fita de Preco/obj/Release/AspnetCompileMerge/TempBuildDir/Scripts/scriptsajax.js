$(document).ready(function () {

    $("#Upload").click(function () {
        var formData = new FormData();
        var totalFiles = document.getElementById("FileUpload").files.length;
        for (var i = 0; i < totalFiles; i++) {
            var file = document.getElementById("FileUpload").files[i];

            formData.append("FileUpload", file);
        }
        $.ajax({
            type: "POST",
            url: '/NacionalImportado/Upload',
            data: formData,
            dataType: 'json',
            contentType: false,
            processData: false,
            success: function (response) {

                $('#myModal').modal("show");
            },
            error: function (error) {
                alert("Erro ao tentar salvar o arquivo!: " + error);
            }
        });
    });

});