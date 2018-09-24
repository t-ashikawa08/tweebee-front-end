var TweeBeeHobbyRanking = function(container, type){
    var instance = this;
    instance.container = container;
    
    instance.render = function(json, type){
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
}