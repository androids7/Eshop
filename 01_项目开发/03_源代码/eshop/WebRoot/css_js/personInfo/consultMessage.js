/**
 * �̼���ѯjs
 * ��Ҫ��ȫѡ ����ɾ����
 *
 * @author liu.siduo
 * @todo 2013-01-28 add by liu.siduo
 */

// ȫѡ����
$("#chkAll").click(function(){
    var  checked =$(this).attr('checked') || false;
    $("#consultMessageForm :checkbox").attr("checked",checked);
});

// �鿴�ظ�
$('.checkreply').hover(
    function(){
        $(this).parents('.status').css('z-index','200');
        $(this).parent('p').next("div").show();
    },
    function(){
        $(this).parents('.status').css('z-index','0');
        $(this).parent('p').next("div").hide();
    }
    )

//��ѡɾ��
$(".delgm").click(function(){
    // ��Ʒ����ID
    var id = $(this).attr("id");
    openTips({title:"��Ʒ��ѯ",content:"ȷ��Ҫɾ��������Ϣ",type:"confirm",callback:'singleDel('+id+')'});
});

//����ɾ������
function singleDel(id){
    var url = "index.php?c=ConsultMessage&a=AjaxMessageDel&t="+Math.random();
        $.getJSON(url,{id:id},function(data){
            if(data.flag){
                openTips({title:"��Ʒ��ѯ",content:"ɾ���ɹ�",type:"text",time:"1000"});
                setTimeout('window.location.reload()',1500);
            }
        });
}

// ��������
$(".deleteAll").click(function(){
    var type = $(this).attr('class');
    //console.log($("input:checked").length);
    var len = $("input:checked").length;
    if(len == 0){
        openTips({title:"��ʾ",content:"��ѡ��ɾ����",type:"text",time:"1000"});
    }else{
        if(type == 'deleteAll'){
            type = "'"+type+"'";
            openTips({title:"��Ʒ��ѯ",content:"ȷ��Ҫɾ����Щ��Ϣ",type:"confirm",callback:'batchDel('+type+')'});
        }
    }
});

//����ɾ������
function batchDel(type){
    var url = "index.php?c=ConsultMessage&a=AjaxMessageAction&label="+type+"&t="+Math.random();
    $.getJSON(url,$('#consultMessageForm').serialize(),function(data){
        if(data.flag){
            openTips({title:"��Ʒ��ѯ",content:"ɾ���ɹ�",type:"text",time:"1000"});
            setTimeout('window.location.reload()',1500);
        }
    });
}

$(".select").change(function(){
    var status =$(this).val();
    window.location="index.php?c=ConsultMessage&status="+status;
})