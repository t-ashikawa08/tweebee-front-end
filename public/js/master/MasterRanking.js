var MasterRanking = function(container) {
    var instance = this;
    instance.container = container;

    this.render = function() {
        instance.container.html(instance._createBaseTag());

        instance._refresh();
    }

    this._refresh = function() {
        var types = ["category", "genre", "tag"];
        $.each(types, function(){
            instance._refreshPerType("" + this)
        });
    }

    this._refreshPerType = function(type){
        var l_id = TweeBee.loading.open(instance.container.find("." + type));
        TweeBee.ajax({
            url: "/api/hobby/ranking/?type=" + type,
            method: "get",
            callback: function(res){
                instance._renderRanking(type, res);
                TweeBee.loading.close(l_id, instance.container);
            }
        });
    }

    this._renderRanking = function(type, json) {
        var name = "";
        switch(type){
            case "category":
                name = "Category";
                break;

            case "genre":
                name = "Genre";
                break;

            case "tag":
                name = "Tag";
                break;
        }

        var tag = ""
            + "<div class='ranking-header'>"
            + " <div class='title-content'>"
            + "     <h2>" + name + "</h2>"
            + " </div>"
            + "</div>"
            + "<div class='ranking-body'>";
        $.each(json, function(i){
            var number_column = ""
            if (i < 3){
                number_column = "<img src='/img/rank" + (i + 1) + ".svg' />"
            }else{
                number_column = (i + 1)
            }

            tag += "<div class='ranking-row no-" + (i + 1) + "'>"
                + " <span class='rank-number'>" + number_column + "</span>"
                + " <span class='name'>" + this.name + "</span>"
                + " <span>" + this.count + "</span>"
                + "</div>";
        });
        tag += "</div>";

        instance.container.find("." + type).html(tag);
    }

    this._createBaseTag = function() {
        var tag = ""
            + "<div class='tb-ranking-container'>"
            + " <div class='description ranking-grid'>"
            + "     <div class='description-header ranking-header'>"
            + "         <div class='title-content'>"
            + "             <h2>What Is Attention?</h2>"
            + "         </div>"
            + "     </div>"
            + "     <div class='description-body ranking-body'>"
            + "         各階層ごとの趣味ランキングです"
            + "     </div>"
            + " </div>"
            + " <div class='category ranking-grid'></div>"
            + " <div class='genre ranking-grid'></div>"
            + " <div class='tag ranking-grid'></div>"
            + "</div>"

        return tag;
    }
}