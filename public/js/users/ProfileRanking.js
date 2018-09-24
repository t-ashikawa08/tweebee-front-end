var ProfileRanking = function(container){
    var instance = this;
    instance.container = container;

    instance.render = function(){
        instance.container.html(instance._createBaseTag());

        new Swiper('.swiper-container', {
            pagination: {
                el: '.swiper-pagination',
            },
        });

        instance._refresh();
    }

    instance._refresh = function(){
        var types = ["category", "genre", "tag"];
        $.each(types, function(){
            instance._refreshPerType("" + this)
        });
    }

    instance._createBaseTag = function(){
        var tag = ""
            + "<div class='swiper-container'>"
            + " <div class='swiper-wrapper'>"
            + "     <div class='category canvas-wrapper swiper-slide'>"
            + "         <canvas id='chart-canvas-category'></canvas>"
            + "     </div>"
            + "     <div class='genre canvas-wrapper swiper-slide'>"
            + "         <canvas id='chart-canvas-genre'></canvas>"
            + "     </div>"
            + "     <div class='tag canvas-wrapper swiper-slide'>"
            + "         <canvas id='chart-canvas-tag'></canvas>"
            + "     </div>"
            + " </div>"
            + " <div class='swiper-pagination'></div>"
            + "</div>";
        return tag;
    }

    instance._refreshPerType = function(type){
        var l_id = TweeBee.loading.open(instance.container.find(type));
        TweeBee.ajax({
            url: "/api/hobby/ranking/?limit=5&type=" + type,
            method: "get",
            callback: function(res){
                instance._renderChart(type, res);
                TweeBee.loading.close(l_id, instance.container);
            }
        });
    }

    instance._renderChart = function(type, ranking) {
        var canvas = $("#chart-canvas-" + type);
        canvas.attr("width", canvas.width());
        canvas.attr("height", canvas.height());

        var labels = [];
        var datas = [];

        $.each(ranking,function(){
            labels.push(this.name);
            datas.push(this.count);
        });

        var name = "";
        switch(type){
            case "category":
                name = "カテゴリー";
                break;

            case "genre":
                name = "ジャンル";
                break;

            case "tag":
                name = "タグ";
                break;
        }

        var myBarChart = new Chart(canvas, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: name + 'ランキング',
                    data: datas,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
    }
}