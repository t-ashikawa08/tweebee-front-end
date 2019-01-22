var ProfileEdit = function(container, user_id){
    var instance = this;
    instance.container = container;
    instance.user_id = user_id;
    instance.user_hobbies = [];

    instance.render = function() {
        instance._refresh();

        instance._attachEvent();
    }

    instance._refresh = function(){
        var l_id = TweeBee.loading.open(instance.container.find(".my-hobbies")  );
        TweeBee.ajax({
            url: "/api/user/hobby_get?type=list",
            method: "get",
            callback: function(res){
                instance.user_hobbies = res;

                var tag = "";

                $.each(instance.user_hobbies, function(){
                    var hobby = this;

                    var head = "";
                    var main = hobby.hobbyInfo.categoryName;

                    if (hobby.hobbyInfo.genre.genreId) {
                        var genre = hobby.hobbyInfo.genre;
                        head += main;
                        main = genre.genreName;
                        
                        if(genre.tag.tagId) {
                            var hobby_tag = genre.tag;
                            head += " / " + main;
                            main = hobby_tag.tagName;
                        }
                    }

                    tag += ""
                        + "<li hobby-id=" + hobby.hobbyId + ">"
                        + "   <div class='hobby'>"
                        + "       <div class='name'>"
                        + "         <p class='header'>" + head + "</p>"
                        + "         <p class='main'>" + main + "</p>"
                        + "       </div>"
                        + "       <button class='btn bg-danger hobby-delete'><i class='fa fa-trash'></i></button>"
                        + "   </div>"
                        + "</li>";
                });
                
                instance.container.find(".my-hobbies").html(tag);

                TweeBee.loading.close(l_id, instance.container);

                instance._attachEventList(); 
            }
        });
    }

    instance._attachEvent = function(){
        instance.container.find(".hobby-add").on("click", function(){
            TweeBee.openModal(instance.container, {
                id: "hobby-add",
                initialize: function(modal){
                    var editor = new MasterEdit(modal);
                    editor.render();
                },
                callback: function(modal) {
                    instance._refresh();
                },
            });
        });
    }

    instance._attachEventList = function(){
        instance.container.find(".hobby-delete").on("click", function(){
            var id = $(this).closest("li").attr("hobby-id");
            var json = { hobby_id : id };

            swal({
                title: "趣味を削除します",
                text: "よろしいですか？",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then(function (agree) {
                if (!agree) return;
                
                TweeBee.ajax({
                    url: "/api/user/hobby_delete",
                    method: "post",
                    data: json,
                    callback: function(res){
                        instance.user_hobbies = res;
                        instance._refresh();
                        TweeBee.showMessage("削除が完了しました");
                    },
                });
            });
        });
    }
}
