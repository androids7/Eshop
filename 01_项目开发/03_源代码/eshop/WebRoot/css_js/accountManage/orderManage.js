/*
 * ���򵽵���Ʒ
 * orderManage.js
 *
 * LICENSE:
 * @author yhx
 * @version 1.0
 * @copyright  zol shop
 * @todo
 * 2012-10-16 add by yhx
 */
$.SelectShow();
// �̼���ϵ��ʽ
$('.merchantInfo').hover(
        function() {
            $(this).siblings('.contact-infor').show();
            $(this).parent().parent().css("z-index", "21");
        },
        function() {
            $(this).siblings('.contact-infor').hide();
            $(this).parent().parent().css("z-index", "1");
        });
// �̼�����
$('.czbox .message').hover(
        function() {
            $(this).siblings('.message-cont').show();
        },
        function() {
            $(this).siblings('.message-cont').hide();
        });
// ѡ�񶩵�״̬
$('#orderStatus').change(function() {
    var orderStatus = $(this).val();
    $("#searchStatus option[value='" + orderStatus + "']").attr("selected", "true");
    $('#searchForm').submit();
});
// �������ҷ���
function buyerRemindSend(id, toType) {
    var url = 'index.php?c=OrderManage&a=AjaxRemindSend&t=' + Math.random();
    $.getJSON(url, {
        orderId: id,
        toType: toType
    }, function(data) {
        openTips({title: '��������', content: data.msg, time: 2000});
        if (data.flag) {
            setTimeout("document.location.reload();", 2000);
        }
    });
}
// ����״̬�����ʾ
function orderDisposeBox(id, toType) {
    openTips({title: '��������', content: '��ȷ��ִ�д˲���ô��', type: 'confirm', callback: 'orderDispose("' + id + '","' + toType + '")'});
}
// ����״̬���
function orderDispose(id, toType) {
    openTips({title: '��������', type: 'loading'});
    var url = 'index.php?c=OrderManage&a=AjaxOrderDispose&t=' + Math.random();
    $.getJSON(url, {
        orderId: id,
        toType: toType
    }, function(data) {
        openTips({title: '��������', content: data.msg, time: 2000});
        if (data.flag) {
            setTimeout("document.location.reload();", 2000);
        }
    });
}
// ����״̬�����ʾ
function phoneConfirm(id,merchantId,orderStatus,hasExchange) {
    var content     = '';
    if(hasExchange){
        content     = "�ö��������˿�/�˻��У����ȷ���ջ�����ر��˿�/�˻����룬�Ƿ�ȷ���ջ���";
    }else{
        content     = "��ȷ��ִ�д˲���ô��";
    }
    openTips({title: '��������', content: content, type: 'confirm', callback: 'phoneOrderConfirm("' + id + '","' + merchantId + '","'+ orderStatus +'","'+hasExchange+'")'});
}
//�ֻ����� 
function phoneOrderConfirm(id,merchantId,orderStatus,hasExchange){
    var id          = parseInt(id);
    var merchantId  = parseInt(merchantId);
    var orderStatus = parseInt(orderStatus);
    var hasExchange = parseInt(hasExchange);
    var url         = "http://m.zol.com/index.php?c=Shop_Ajax_ConfirmOrder&a=ChangeOrderStatus&callback=?&t="+Math.random();
    $.getJSON(
        url,
        {orderId:id,merchantId:merchantId,orderStatus:orderStatus,hasExchange:hasExchange},
        function(backdata){
            if(backdata.flag){
                openTips({title: '��������', content: "���������ɹ���", time: 2000});
                setTimeout("document.location.reload();", 2000);
            }else{
                openTips({title: '��������', content: "��Ǹ������ʧ�ܣ�", time: 2000});
            }
        }
    );
}
// ����״̬����ѡ��
$('#searchStatusList li').click(function() {
    var key = $(this).attr('value');
    var value = $(this).html();
    $('#searchStatus').attr('data-id', key).val(value);
    var hidden = $('#searchStatusHidden');
    if (hidden[0]) {
        $('#searchStatusHidden').val(key);
    } else {
        var hiddenHtml = "<input type='hidden' id='searchStatusHidden' name='searchStatusHidden' value='" + key + "'>";
        $('#searchStatus').after(hiddenHtml);
    }
    $('#searchForm').submit();
});
