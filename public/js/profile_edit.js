var ProfileEdit = function(container, user_id){
    var instance = this;
    instance.container = container;
    instance.user_id = user_id;
    instance.user_hobbies = [];
    instance.master = [];

    this.render = function() {
        var instance = this;

        instance._refresh();

        instance._attachEvent();
    }

    this._refresh = function(){
        var instance = this;

        TweeBee.ajax({
            url: "/api/user/hobby_get",
            method: "get",
            callback: function(res){
                instance.user_hobbies = res;

                var tag = "";

                $.each(instance.user_hobbies, function(){
                    var hobby = this;

                    var genre = hobby.hobbyInfo.genre; 
                    var value = hobby.hobbyInfo.categoryName 
                        + (genre.genreName ? " > " + genre.genreName : "") 
                        + (genre.tag.tagName ? " > " + genre.tag.tagName : ""); 
                    
                    tag += ""
                        + "<li hobby-id=" + hobby.hobbyId + ">"
                        + "   <div class='hobby'>"
                        + "       <span>" + value + "</span>"
                        + "       <button class='btn bg-danger hobby-delete'><i class='fa fa-trash'></i></button>"
                        + "   </div>"
                        + "</li>";
                });
                
                instance.container.find(".my-hobbies").html(tag);

                instance._attachEventList();     
            }
        });
    }

    this._attachEvent = function(){
        instance.container.find(".hobby-add").on("click", function(){
            TweeBee.openModal(instance.container, {
                id: "hobby-add",
                tag: instance._createBaseAddDialog(),
                initialize: function(modal){
                    TweeBee.ajax({
                        url: "/api/master",
                        method: "get",
                        callback: function(res){
                            instance.master = res;
                            instance._renderList(modal, "category", instance.master);
                        }
                    });
                },
                callback: function(modal) {
                    instance._refresh();
                },
            });
        });
    }

    this._attachEventList = function(){
        var instance = this;

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

    this._createBaseAddDialog = function(){
        var tag = ""
            + "<div class='hobby-add-container-wrapper'>"
            + " <div class='column category-container'></div>"
            + " <div class='column genre-container'></div>"
            + " <div class='column tag-container'></div>"
            + "</div>";

        return tag;
    }

    this._renderList = function(modal, type, master){
        var hash = {};

        var tag = ""
            + "<ul class='list list-group'>";
        $.each(master, function(){
            tag += ""
                + "<li class='list-group-item' tb-id='" + this[type + "Id"] + "'>" 
                + " <span>"
                + this[type + "Name"] + "<span class='user-add'><i title='趣味に追加する' class='fa fa-user-plus'></i></span>" 
                + " </span>"
                + "</li>"
            hash[this[type + "Id"]] = this;
        });
        tag += "</ul>";

        if (type !== "category"){
            tag += ""
                + "<div class='add-button-wrapper'>"
                + " <button class='btn bg-success add' style='color:white'>"
                + "     <i class='fa fa-plus-circle'></i>追加"
                + " </button>"
                + "</div>"
        }

        var selector = "." + type + "-container";
        modal.find(selector).html(tag);
        modal.find(selector + " ul li").on("click", function(){
            modal.find(selector + " ul .active").removeClass("active");
            $(this).addClass("active");

            var obj = hash[$(this).attr("tb-id")];
            switch(type){
                case "category":
                    instance._renderList(modal, "genre", obj.genre);
                    modal.find(".tag-container").html("");
                    break;
                    
                case "genre":
                    instance._renderList(modal, "tag", obj.tag);
                    break;

                case "tag":
                    break;
            }
        });
        modal.find(selector + " ul .user-add").on("click", function(){
            var json = {};
            var id = $(this).closest('.list-group-item').attr("tb-id");
            switch(type){
                case "category":
                    json.category_id = id;
                    break;

                case "genre":
                    json.genre_id = id;
                    json.category_id = modal.find(".category-container ul .active").attr("tb-id");
                    break;

                case "tag":
                    json.tag_id = id;
                    json.genre_id = modal.find(".genre-container ul .active").attr("tb-id");
                    json.category_id = modal.find(".category-container ul .active").attr("tb-id");
                    break;
            }

            TweeBee.ajax({
                url: "/api/user/hobby_register",
                method: "POST",
                data: json,
                callback: function(){
                    TweeBee.showMessage("登録が完了しました");
                }
            });
        });
    }

    this._addHobbyRow = function() {

    }
}
