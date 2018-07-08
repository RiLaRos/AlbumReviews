﻿var Albums = {
    OnLoad: function () {
        this.Actions.GetAlbums();

        this.BindEvents();
    },
    BindEvents: function () {
        $("#btnViewAlbum").click(function () {
            var idAlbum = $("#ddlAlbums").val();
            Albums.Actions.GetAlbumImages(idAlbum);
        });

        
    },
    Actions: {
        GetAlbums: function () {
            $.ajax({
                url: "https://jsonplaceholder.typicode.com/albums"
            }).done(function (data) {
                var control = $("#ddlAlbums");

                if (data != null) {
                    control.empty().append($('<option/>').val(0).text('--CHOOSE--'));
                    $(data).each(function (ind, row) {
                        control.append($('<option/>').val(row.id).text(row.title));
                    });
                }
            });
        },
        GetAlbumImages: function (idAlbum) {
            $.ajax({
                url: "https://jsonplaceholder.typicode.com/photos?albumId=" + idAlbum
            }).done(function (data) {
                if (data != null) {

                    var rowData = "";
                    
                    $(data).each(function (ind, row) {
                        rowData += "<tr><td>" + row.title + "</td><td><img src='" + row.thumbnailUrl + "' /></td><td><button class='btn btn-primary showComments' data-id=" + row.id + ">Ver comentarios</button></td></tr>";
                    });

                    $("#photos").html(rowData);

                    $(".showComments").click(function () {
                        var postId = $(this).data("id");
                        Albums.Actions.GetComments(postId);
                    });
                }
            });
        },
        GetComments: function (postId) {
            $.ajax({
                url: "https://jsonplaceholder.typicode.com/comments?postId=" + postId
            }).done(function (data) {
                if (data != null) {

                    var rowData = "";

                    $(data).each(function (ind, row) {
                        rowData += "<tr><td>" + row.name + "</td><td>" + row.email + "</td><td>" + row.body + "</td></tr>";
                    });

                    $("#comments").html(rowData);
                }
            });
        }
    }
}

$(document).ready(function () {
    Albums.OnLoad();
});
