/**
*   ѡ��������
*
*   by ���� 2012-11-20
*/
(function($) {
    $.fn.selectDiv = function(options){
        var defaults = {
            //objId:          '.selectbox' //�뿪ĳ��dom����������ʧ��
            showDiv:       ''      //Ҫ��ʾ�Ĳ�ID
            ,
            showDivName:   ''      //Ҫ��ʾ��ѡ���������ID
            ,
            ajaxCtrl: 		''      //�Ƿ���Ҫajax������ݣ������Ҫ��GetManuInfo_showManu_manuName_manuId_��ѡ���̣������Ϊajax�Ŀ���������_Ҫ��ʾ�Ĳ�ID_��ʾĬ��������Ƶ�ID_��������ID��dom_Ĭ����ʾ������
            ,
            valId:			''      //Ҫ��ֵ������input��ID
            ,
            ajaxParamId:   ''      //����ajax�Ĳ���
            ,
            selectType:    'li'    //select������dom
            ,
            mouseOverClass:'hover' //������ȥ����ʽ
            ,
            mouseOutClass: ''      //�����ȥ����ʽ
            ,
            allHidClass:   ''      //���е�����������,�����class
            ,
            clickObj:      'input' //Ĭ�ϵ���Ŀؼ�
            ,
            isHiddenDiv:   1       //�Ƿ����ز�
            ,
            isActiveHeight:1      //�Ƿ�̬�ı�߶�
            ,
            defaultValIdValue:''   //Ĭ������input��ֵ
            ,
            ajaxUrl:''//ajax��ַ
            ,
            'disabledToShow':true
            ,
            'toShowContent':''
            ,
            'toShowDivHtml':''
            
        };
        var options = $.extend(defaults, options);
        
        if(options.showDiv) {
            if(options.isHiddenDiv){
                $(options.allHidClass).hide();
            }
            $('#'+options.showDiv).fadeIn().show();
        } else {
            return false;
        }
        
        if(options.isActiveHeight) {//�Ƿ�̬�ı�߶�
            var divLength = $('#'+options.showDiv+' '+options.selectType).length

            if(divLength>=12) {
                $('#'+options.showDiv).css('height',300);
            }else{
                $('#'+options.showDiv).css('height',divLength*25);
            }
        }
        //���ŵ����������ʽ
        $('#'+options.showDiv+">"+options.selectType).live('mouseover',function(){
            $(this).addClass(options.mouseOverClass);
        });
        //����뿪���������ʽ
        $('#'+options.showDiv+">"+options.selectType).live('mouseout',function(){
            if(options.mouseOverClass) {
                $(this).removeClass(options.mouseOverClass);
            }
            if(options.mouseOutClass) {
                $(this).addClass(options.mouseOutClass);
            }
        });
        //ajax����
        function _Ajax() {
            if(options.ajaxCtrl) {
                
                var ajaxCtrlArr = new Array();
                var ajaxParamArr = new Array();
                var ajaxparamStr = '';
                
                ajaxCtrlArr = options.ajaxCtrl.split("_");
                ajaxParamArr = options.ajaxParamId.split("_");
                
                //��ϲ���
                for(i=0;i<ajaxParamArr.length;i++) { 
                    ajaxparamStr+= "&"+ajaxParamArr[i]+"="+escape($('#'+ajaxParamArr[i]).val());
                }
                var url = options.ajaxUrl+"&a="+ajaxCtrlArr[0]+ajaxparamStr;
                $('#'+ajaxCtrlArr[2]).val('loading....');
                $('#'+ajaxCtrlArr[3]).val('');
                $.ajax({
                    url:url,
                    success: function(data) {
                        $('#'+ajaxCtrlArr[2]).val(ajaxCtrlArr[4]);
                        $('#'+ajaxCtrlArr[1]).html(data);
                        $('#'+ajaxCtrlArr[2]).val('��ѡ��');
                        $('#'+ajaxCtrlArr[2]).attr('disabled',false);
                    }
                });
            }
        }
        //��Ĭ��ֵ
        if(options.defaultValIdValue) {
            $('#'+options.valId).val(options.defaultValIdValue);
            _Ajax();
        }
        //��ֹð��
        $(options.clickObj).click(function(event){
            event.stopPropagation();
        });
       
       
//        $('#'+options.showDivName).live('focusout',function(){
//            if($('#'+options.showDiv+' > li.hover').attr('val')){
//                $('#'+options.valId).val($('#'+options.showDiv+' > li.hover').attr('val'));//��ѡ��ķŵ�����
//            }
//            if($('#'+options.showDiv+' > li.hover').html()){
//                $('#'+options.showDivName).val($('#'+options.showDiv+' > li.hover').html());//��ѡ��ķŵ������
//            }
//            _Ajax();
//            $('#'+options.showDiv).hide();
//        });
        
       
        //��������
        $('#'+options.showDiv+' '+options.selectType).live('click',function(event){
            event.stopPropagation();
            $('#'+options.valId).val($(this).attr('val'));
            $('#'+options.showDivName).val($(this).html());
            if($(this).attr('val') && $(this).attr('val') != 150){
                _Ajax();
            }else{
                var ajaxCtrlArr = options.ajaxCtrl.split("_");
                $('#'+ajaxCtrlArr[3]).val('');
                $('#'+ajaxCtrlArr[2]).val(options.toShowContent);
                $('#'+ajaxCtrlArr[1]).html(options.toShowDivHtml);
                if(options.disabledToShow){
                    $('#'+ajaxCtrlArr[2]).attr('disabled',true);
                }
            }
            if(options.isHiddenDiv){
                $('#'+options.showDiv).hide();
            }
                
        });
        $(document).click(function(){
            if(options.isHiddenDiv){
                $(""+options.allHidClass+"").hide();
            }
        });
        
    };
})(jQuery);
