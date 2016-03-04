$(document).ready(
    (function(){
        //ɾ����Ʒ��ע
        $("[fn='delFollowGoods']").click(function(){
            var _this  = this;
            var params = {title: '��ʾ',//���������
                            subtitle:'',//�������ӱ���
                            type:'confirm',//����������{ text | loading | alert | confirm }
                            content:'ȷ��ȡ����ע�����Ʒ��',//����������
                            drag:true,//�Ƿ�����϶�
                            buttonleft:'',//��ť�Ƿ����
                            cssClass:'',//������ʽ����
                            height:'135',
                            width:'300',//��������
                            time:''
                                };
            openTips(params);
            $(".layerbox-button-false, .layerbox-close").live('click',function(){return false;});
            $(".layerbox-button-true").live('click',function(){
                var goodsId = $(_this).attr('goodsId');
                if(goodsId){
                    var url = "./index.php?c=Ajax_Follow"
                    var data = {"goodsId":goodsId,"t":(new Date()).valueOf(),"a":'DelFollowGoods'};
                    $.getJSON(url,data,function(backdata){
                        var params = {title: '��ʾ',//���������
                            subtitle:'',//�������ӱ���
                            type:'alert',//����������{ text | loading | alert | confirm }
                            content:backdata.sms,//����������
                            drag:true,//�Ƿ�����϶�
                            buttonleft:'',//��ť�Ƿ����
                            cssClass:'',//������ʽ����
                            height:'135',
                            width:'300',//��������
                            time:''
                                };
                        $(".layerbox-button-true ,.layerbox-close").die();
                        openTips(params);
                        $(".layerbox-button-true ,.layerbox-close").click(function(){
                            if(backdata.flag){
                                location.reload();
                            }
                        return false;
                        });
                    });
                }
            return false;
            });
        });
    //ͬ����Ʒ�Ƽ����̼���Ʒ�Ƽ�
    $("[fn='showLikenessByGoods']").toggle(
        //չ��
        function(){
            var _this = this;
            var goodsId = $(_this).attr('goodsId');
            var isFirstTime = $(_this).attr('firstTime');
            if(!goodsId){
                return;
            }
            if(isFirstTime){
                $(_this).parent().parent().next('div').find('ul').html('');
                //��������
                var url = "index.php?c=Ajax_Follow";
                var data = {'a':'RecommendGoodsDependOnGoods', 't':(new Date()).valueOf(),'goodsId':goodsId};
                $.getJSON(url,data,function(backdata){
                    if(backdata.content){
                        $(_this).attr('firstTime','');
                        $(_this).parent().parent().next('div').find('ul').attr('totalPage',backdata.totalPage);
                        $(_this).parent().parent().next('div').find('ul').attr('nowPage',backdata.page);
                        $(_this).parent().parent().next('div').find('ul').html(backdata.content);
                    }
                });
            }
            $(_this).addClass('hover');
            $(_this).parent().parent().next('div').show();
        },
        //����
        function(){
            $(this).removeClass('hover');
            $(this).parent().parent().next('div').hide();
        }
    );
    
    //��һҳ
    $(".photo-next").hover(function(){
        var ulObject = $(this).prev().prev("div").find('ul');
        var nowPage     = $(ulObject).attr('nowPage');
        var totalPage   = $(ulObject).attr('totalPage');
        if(totalPage > nowPage){
            $(this).addClass('photo-next-hover');
        }else{
            $(this).removeClass('photo-next-hover');
        } 
    });
    //��ҳ
    $(".photo-prev-hover").live('click',function(){
        var _this = this;
        var ulObject = $(_this).parent('div').children('div').find('ul');
        var goodsId = $(ulObject).attr('goodsId');
        var nowPage  = parseInt($(ulObject).attr('nowPage'))-1;
        if(!goodsId){
            return;
        }
        //��������
        var url = "index.php?c=Ajax_Follow";
        var data = {'a':'RecommendGoodsDependOnGoods','page':nowPage, 't':(new Date()).valueOf(),'goodsId':goodsId};
        $.getJSON(url,data,function(backdata){
            if(backdata.content){
                $(ulObject).attr('totalPage',backdata.totalPage);
                $(ulObject).attr('nowPage',backdata.page);
                $(ulObject).html(backdata.content);
                if(backdata.totalPage <= backdata.page){
                    $(ulObject).parent().parent().find('.photo-next').removeClass('photo-next-hover');
                }else{
                    $(ulObject).parent().parent().find('.photo-next').addClass('photo-next-hover');
                }
                if(backdata.page <= 1){
                    $(ulObject).parent().parent().find('.photo-prev').removeClass('photo-prev-hover');
                }else{
                    $(ulObject).parent().parent().find('.photo-prev').addClass('photo-prev-hover');
                }
            }
        });
    });

    $(".photo-next-hover").live('click',function(){
        var _this = this;
        var ulObject = $(_this).parent('div').children('div').find('ul');
        var goodsId = $(ulObject).attr('goodsId');
        var nowPage  = parseInt($(ulObject).attr('nowPage'))+1;
        ulObject.parent().parent().find('.photo-next').removeClass('photo-next-hover');
        if(!goodsId){
            return;
        }
        //��������
        var url = "index.php?c=Ajax_Follow";
        var data = {'a':'RecommendGoodsDependOnGoods','page':nowPage, 't':(new Date()).valueOf(),'goodsId':goodsId};
        $.getJSON(url,data,function(backdata){
            if(backdata.content){
                $(ulObject).attr('totalPage',backdata.totalPage);
                $(ulObject).attr('nowPage',backdata.page);
                $(ulObject).html(backdata.content);
                if(backdata.totalPage <= backdata.page){
                    $(ulObject).parent().parent().find('.photo-next').removeClass('photo-next-hover');
                }else{
                    $(ulObject).parent().parent().find('.photo-next').addClass('photo-next-hover');
                }
                if(backdata.page <= 1){
                    $(ulObject).parent().parent().find('.photo-prev').removeClass('photo-prev-hover');
                }else{
                    $(ulObject).parent().parent().find('.photo-prev').addClass('photo-prev-hover');
                }
            }
        });
    });

    })($)
);