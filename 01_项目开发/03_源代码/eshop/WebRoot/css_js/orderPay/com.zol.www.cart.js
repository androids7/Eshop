/*���ﳵ����*/
$(function(){                
    var url = "http://www.zol.com/index.php?c=Ajax_ShopCart&a=GetCartNumber&callback=?&t="+Math.random();
    $.getJSON(
        url,
        {},
        function(data){
            $("#zs-shoping-number").html(data.cartNumber);
        }
    );
});