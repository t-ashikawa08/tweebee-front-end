var TweeBee = {
    ajax: function(option) {
        var basicOption = {
            url: "",
            method: "",
            data: {},
            callback: function(){}
        }
        
        $.extend(basicOption, option);
        $.ajax({ async: false, 
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
    openModal: function(container, id){
        if (!id){
            alert('id is not found');
            return;
        }
        var baseTag = ""
            + "<div id='" + id + "' class='modal fade show tb-modal' role='dialog' data-backdrop='static'>"
            + " <div class='modal-dialog modal-lg'>"
            + "     <div class='modal-content'>"
            + "         <div class='modal-header'><div class='modal-close'><i class='fa fa-times-circle'></i></div></div>"
            + "         <div class='modal-body'></div>"
            + "     </div>"
            + " </div>"
            + "</div>";

        container.append(baseTag);

        var modal = container.find("#" + id);

        setTimeout(function(){
            modal.addClass("tb-modal-open");    
        },100);

        modal.find(".modal-close").on("click", function(){
            modal.remove();
        });
    
        return modal.find(".modal-body");
    }
}