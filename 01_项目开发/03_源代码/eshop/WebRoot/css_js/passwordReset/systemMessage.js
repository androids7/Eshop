/**
 * ϵͳ֪ͨjs
 * ��Ҫ��ȫѡ ����ɾ����
 *
 * @author liu.siduo
 * @todo 2013-01-24 add by liu.siduo
 */

// ȫѡ����
$("#chkAll").click(function(){
    var  checked =$(this).attr('checked') || false;
    $("#systemMessageForm :checkbox").attr("checked",checked);
});

// ��ѡɾ��
$(".delSms").click(function(){
    // ��ȡϵͳ��Ϣ��ID
    var smsId = $(this).attr("id");
    openTips({title:"ϵͳ֪ͨ",content:"ȷ��Ҫɾ��������Ϣ",type:"confirm",callback:'singleDel('+smsId+')'});
});

//��ѡɾ������
function singleDel(smsId){
    var url   = "index.php?c=SystemMessage&a=AjaxSmsDel&t="+Math.random();
        $.getJSON(url,{smsId:smsId},function(data){
            if(data.flag){
                openTips({title:"ϵͳ֪ͨ",content:"ɾ���ɹ�",type:"text",time:"1000"});
                setTimeout('window.location.reload()',1500);
            }
        });
}

// ��������
$(".delAll, .readAll").click(function(){
    var action = $(this).attr('class');
    var len = $("input:checked").length;
    if(len == 0){
        openTips({title:"��ʾ",content:"��ѡ��Ҫ�����Ķ���",type:"text",time:"1000"});
    }else{
        if(action == "delAll"){
            action = "'"+action+"'";
            openTips({title:"ϵͳ֪ͨ",content:"ȷ��Ҫɾ����Щ��Ϣ",type:"confirm",callback:'batchAction('+action+')'});
        }else if(action == "readAll"){
            var url = "index.php?c=SystemMessage&a=AjaxSmsAction&label="+action+"&t="+Math.random();
            $.getJSON(url,$('#systemMessageForm').serialize(),function(data){
            if(data.flag){
                openTips({title:"ϵͳ֪ͨ",content:"��ǳɹ�",type:"text",time:"1000"});
                setTimeout('window.location.reload()',1000);
            }
        });
        }
    }
});

//������������
function batchAction(action){
    var url = "index.php?c=SystemMessage&a=AjaxSmsAction&label="+action+"&t="+Math.random();
    $.getJSON(url,$('#systemMessageForm').serialize(),function(data){
        alert(data.msg);
        if(data.flag){
            setTimeout('window.location.reload()',1500);
        }
    });
}

//������ݾͱ��
$("li .infor").click(function(){
    var _this = $(this);
    var id = $(this).parent().children().first().children().val();
    var url = "index.php?c=SystemMessage&a=AjaxSingleRead&singleId="+id+"&t"+Math.random();
    $.getJSON(url,function(data){
        if(data.flag){
            _this.parent().removeClass("unread");
        }
    });
});