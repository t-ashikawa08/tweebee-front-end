var ProfileHobby = function(container){
    var instance = this;
    instance.container = container;

    instance.render = function(){
        instance.container.html(instance._createBaseTag());

        instance.container.find(".tree-container").css({
            "height": instance.container.height() + "px", 
            "width" : instance.container.width() + "px"});

        instance._refresh();
    }

    instance._refresh = function(){
        var l_id = TweeBee.loading.open(instance.container);
        TweeBee.ajax({
            url: "/api/user/hobby_get?type=tree",
            method: "get",
            callback: function(res){
                instance.user_hobbies = res;

                var simple_chart_config = {
                    chart: {
                        container: ".tree-container"
                    },
                    
                    nodeStructure: {
                        text: { name: "Parent node" },
                        children: [
                            {
                                text: { name: "First child" }
                            },
                            {
                                text: { name: "Second child" }
                            }
                        ]
                    }
                };
                
                var my_chart = new Treant(simple_chart_config);

                console.log(instance.user_hobbies);

                TweeBee.loading.close(l_id, instance.container);
            }
        });
    }

    instance._createBaseTag = function(){
        var tag = ""
            + "<div class='tree-container'></div>";

        return tag;
    }
}