var MasterEdit = function(container){
    var instance = this;
    instance.container = container;
    instance.master = [];
    
    instance.render = function() {
        instance.container.html(instance._createBaseAddDialog());

        instance._refresh();
    }

    instance._refresh = function(){
        TweeBee.ajax({
            url: "/api/hobby/master",
            method: "get",
            callback: function(res){
                instance.master = res;

                instance._renderList("category", instance.master);        
            }
        });
    }

    instance._createBaseAddDialog = function(){
        var tag = ""
            + "<div class='hobby-add-container-wrapper'>"
            + " <div class='column category-container'></div>"
            + " <div class='column genre-container'></div>"
            + " <div class='column tag-container'></div>"
            + "</div>";
    
        return tag;
    }

    instance._attachEventRow = function(master_hash, type){
        var selector = "." + type + "-container";

        var getIdPerMasterType = function(current_id) {
            var parent_category_id = instance.container.find(".category-container ul .active").attr("tb-id");
            var parent_genre_id = instance.container.find(".genre-container ul .active").attr("tb-id");

            switch(type){
                case "category":
                    return { 
                        category_id: current_id 
                    };

                case "genre":
                    return { 
                        genre_id: current_id, 
                        category_id: parent_category_id 
                    };
                    
                case "tag":
                    return { 
                        tag_id: current_id, 
                        genre_id: parent_genre_id, 
                        category_id: parent_category_id 
                    };
            }
        }

        var nextMasterClick = function(li, obj) {
            var obj = master_hash[li.attr("tb-id")];

            instance.container.find(selector + " ul .active").removeClass("active");
            li.addClass("active");

            switch(type){
                case "category":
                    instance._renderList("genre", obj.genre);
                    instance.container.find(".tag-container").html("");
                    break;
                    
                case "genre":
                    instance._renderList("tag", obj.tag);
                    break;
    
                case "tag":
                    break;
            }
        }

        var userAdd = function(button){
            var id = button.closest('.list-group-item').attr("tb-id");
            var json = getIdPerMasterType(id);

            TweeBee.ajax({
                url: "/api/user/hobby_register",
                method: "POST",
                data: json,
                callback: function(){
                    TweeBee.showMessage("登録が完了しました");
                }
            });
        }

        instance.container.find(selector + " ul li").on("click", function(){
            nextMasterClick($(this));
        });

        instance.container.find(selector + " ul .user-add").on("click", function(){
            userAdd($(this));
        });

        instance.container.find(selector + " .add").on("click", function(){
            var name = instance.container.find(selector + " .master-item-text").val();
            
            var id_hash = getIdPerMasterType();
            
            var json = {
                type: type,
                parent_id: (type === "genre" ? id_hash.category_id : id_hash.genre_id),
                name: name 
            };

            TweeBee.ajax({
                url: "/api/hobby/register",
                method: "POST",
                data: json,
                callback: function(res) {
                    master_hash[res.id] = res;

                    instance._addHobbyRow(type, res ,function(li){
                        nextMasterClick(li);
                    },function(button){
                        userAdd(button);
                    });
                }
            });
        });
    }

    instance._renderList = function(type, master){
        var hash = {};
    
        var tag = ""
            + "<ul class='list list-group'>";
        $.each(master, function(){
            tag += ""
                + "<li class='list-group-item' tb-id='" + this[type + "Id"] + "'>" 
                + " <span>" + this[type + "Name"] + "<span class='user-add'><i title='趣味に追加する' class='fa fa-user-plus'></i></span></span>"
                + "</li>";
    
            hash[this[type + "Id"]] = this;
        });
        tag += "</ul>";
    
        if (type !== "category"){
            tag += ""
                + "<div class='input-group add-button-wrapper'>"
                + "  <input type='text' class='form-control master-item-text' placeholder='' aria-label='' aria-describedby='basic-addon1'>"
                + "  <div class='input-group-append'>"
                + "     <button class='btn bg-success add' style='color:white'>"
                + "         <i class='fa fa-plus-circle'></i>追加"
                + "     </button>"
                + "  </div>"
                + "</div>";
        }
    
        instance.container.find("." + type + "-container").html(tag);
        instance._attachEventRow(hash, type);
    }

    instance._addHobbyRow = function(type, json, nextMaster, userAdd) {
        var tag = ""
            + "<li class='list-group-item' tb-id='" + json.id + "'>" 
            + " <span>" + json.name + "<span class='user-add'><i title='趣味に追加する' class='fa fa-user-plus'></i></span></span>" 
            + "</li>";

        var selector = "." + type + "-container";

        instance.container.find(selector + " ul").append(tag);

        instance.container.find(selector + " li[tb-id='" + json.id + "']").on("click", function(){
            nextMaster($(this));
        });

        instance.container.find(selector + " li[tb-id='" + json.id + "'] .user-add").on("click", function(){
            userAdd($(this));
        });
    }
}
