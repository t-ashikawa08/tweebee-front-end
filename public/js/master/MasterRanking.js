var MasterRanking = function(container) {
    var instance = this;
    instance.container = container;

    this.render = function() {
        instance.container.html(instance._createBaseTag());

        instance._attachEvent();

        instance._refresh();
    }

    this._refresh = function() {
        var types = ["category", "genre", "tag"];
        $.each(types, function(){
            instance._refreshPerType("" + this)
        });
    }

    this._attachEvent = function(){
        instance.container.find(".grid").on("click", function(){
            var type = $(this).attr("tb-type");
            if(!type) return;

            TweeBee.openModal(instance.container, {
                id: "ranking-detail",
                initialize: function(modal){
                    modal.html("<div class='" + type + " tb-ranking-container'></div>");

                    var l_id = TweeBee.loading.open(modal);
                    TweeBee.ajax({
                        url: "/api/hobby/ranking/?type=" + type,
                        method: "get",
                        callback: function(res){
                            new TweeBeeHobbyRanking(modal).render(res, type);
                            TweeBee.loading.close(l_id, modal);
                        }
                    });                    
                },
                size: "small"
            });
        });
    }

    this._refreshPerType = function(type){
        var l_id = TweeBee.loading.open(instance.container.find("." + type));
        TweeBee.ajax({
            url: "/api/hobby/ranking/?type=" + type,
            method: "get",
            callback: function(res){
                new TweeBeeHobbyRanking(instance.container).render(res, type);
                TweeBee.loading.close(l_id, instance.container);
            }
        });
    }

    this._createBaseTag = function() {
        var tag = ""
            + "<div class='ranking-wrapper'>"
            + " <div class='description grid tb-ranking-container'>"
            + "     <div class='description-header ranking-header'>"
            + "         <div class='title-content'>"
            + "             <h2>What Is Attention?</h2>"
            + "         </div>"
            + "     </div>"
            + "     <div class='description-body ranking-body'>"
            + "         各階層ごとの趣味ランキングです"
            + "     </div>"
            + " </div>"
            + " <div class='category grid tb-ranking-container' tb-type='category'></div>"
            + " <div class='genre grid tb-ranking-container' tb-type='genre'></div>"
            + " <div class='tag grid tb-ranking-container' tb-type='tag'></div>"
            + "</div>"

        return tag;
    }
}