var Albums = {
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
                url: urlPhotos + "?albumId=" + idAlbum
            }).done(function (data) {
                if (data != null) {
                    $("#photos").html(data);
                }
            });
        },
        GetComments: function (postId) {
            $.ajax({
                url: urlComments + "?postId=" + postId
            }).done(function (data) {
                if (data != null) {
                    $("#comments").html(data);
                }
            });
        }
    }
}

$(document).ready(function () {
    Albums.OnLoad();
});

