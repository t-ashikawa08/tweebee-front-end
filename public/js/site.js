var TweeBee = {
    ajax: function(option) {
        var basicOption = {
            url: "",
            method: "",
            data: {},
            callback: function(){}
        }
        
        $.extend(basicOption, option);

        $.ajax({ async: true, 
            url: basicOption.url, 
            type: basicOption.method, 
            data: basicOption.data,
            dataType: 'json'
        }).done(function(res){
            basicOption.callback(res);
        }).fail(function(xhr, status, error){
            alert(status);
        });
    },
    openModal: function(container, option){
        var baseOption = {
            id: null,
            tag: null,
            initialize: function() {},
            callback: function() {}
        }

        $.extend(baseOption, option);

        if (!baseOption.id){
            alert('id is not found');
            return;
        }

        var baseTag = ""
            + "<div id='" + baseOption.id + "' class='modal tb-modal' role='dialog' data-backdrop='static'>"
            + " <div class='modal-dialog modal-lg'>"
            + "     <div class='modal-content'>"
            + "         <div class='modal-header'><div class='modal-close'><i class='fa fa-times-circle'></i></div></div>"
            + "         <div class='modal-body'>"
            + baseOption.tag
            + "         </div>"
            + "     </div>"
            + " </div>"
            + "</div>";

        container.append(baseTag);

        var modal = container.find("#" + baseOption.id);

        var body = modal.find(".modal-body");

        $("body").css("overflow", "hidden");

        modal.find(".modal-close").on("click", function(){
            $("body").css("overflow", "auto");

            baseOption.callback(body);

            modal.addClass("tb-modal-close");

            setTimeout(function(){
                modal.remove();
            }, 150);
        });

        baseOption.initialize(body);

        return body;
    },
    showMessage: function(message, parentContainer) {
        var uid = tb_create_uid();
        var tag = ""
            + "<div id='" + uid + "' class='tb-alert alert alert-primary' role='alert'>"
            + message
            + "</div>";
        
        if (parentContainer){
            parentContainer.append(tag);
        } else {
            $("body").append(tag);
        }
        
        var alert = $("#" + uid);
        setTimeout(function(){
            alert.addClass("tb-alert-close");

            setTimeout(function(){
                alert.remove();
            }, 1000);
        }, 2000);
    },
    loading: {
        open: function(container) {
            var id = "loading-" + tb_create_uid();
            var tag = ""
                + "<div id='" + id + "' class='loading-img-wrapper'>"
                + " <img src='/img/loading.gif' />"
                + "</div>";
    
            container.css({"position": "relative"});
            container.append(tag);
    
            return id;
        },
        close: function(id, container){
            if(container){
                container.css({"position": "inherit"});    
            }
            $("#" + id).remove();
        }
    },
    isSp: false,
    isPc: false,
}

var tb_create_uid = function(){
    return "u_id" + Math.round(Math.random() * 100000000);
}