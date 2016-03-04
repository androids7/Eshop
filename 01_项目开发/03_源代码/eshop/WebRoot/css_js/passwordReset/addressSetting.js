$(document).ready(function() {
    //ʡ������
    $("#provinceName").click(function() {
        var options = {
            showDiv: 'provinceList'      //Ҫ��ʾ�Ĳ�ID
                    ,
            showDivName: 'provinceName'      //Ҫ��ʾ��ѡ���������ID
                    ,
            ajaxCtrl: 'GetCityByProvince_cityList_cityName_cityId'      //�Ƿ���Ҫajax������ݣ������Ҫ��GetManuInfo_showManu_manuName_manuId_��ѡ���̣������Ϊajax�Ŀ���������_Ҫ��ʾ�Ĳ�ID_��ʾĬ��������Ƶ�ID_��������ID��dom_Ĭ����ʾ������
                    ,
            valId: 'provinceId'      //Ҫ��ֵ������input��ID
                    ,
            ajaxParamId: 'provinceId'      //����ajax�Ĳ���
                    ,
            selectType: 'li'    //select������dom
                    ,
            allHidClass:   '.forDivHidden'      //���е�����������,�����class
            ,
            ajaxUrl:'index.php?c=Ajax_Public'
            ,
            'disabledToShow':true
            ,
            'toShowContent':'��ѡ�����'
            ,
            'toShowDivHtml':'<li>��ѡ�����</li>'
        };
        $(this).selectDiv(options);
    });

    //������
    $("#cityName").click(function() {
        var options = {
            showDiv: 'cityList'      //Ҫ��ʾ�Ĳ�ID
                    ,
            showDivName: 'cityName'      //Ҫ��ʾ��ѡ���������ID
                    ,
            valId: 'cityId'      //Ҫ��ֵ������input��ID
                    ,
            allHidClass:   '.forDivHidden'      //���е�����������,�����class
            ,
            selectType: 'li'    //select������dom

        };
        $(this).selectDiv(options);
    });
    //�ύ��Ϣ
    (function() {
        $("#saveAddress").click(function() {
            var addressId = $("#addressId").val();
            var name = $("#name").val();//����
            var provinceId = $("#provinceId").val();
            var cityId = $("#cityId").val();
            var address = $("#address").val();
            var zipcode = $("#zipcode").val();
            var telphone1 = $("#telphone1").val();
            var telphone2 = $("#telphone2").val();
            var telphone = telphone1;
            if (telphone) {
                telphone = telphone1 + '-' + telphone2;
            } else {
                telphone = telphone2;
            }
            var mobile = $("#phone").val();
            var email = $("#email").val();
            var isDefault = $("#setDefault").attr('checked') ? 1 : 0;
            //��Ϣ���
            var flag = true;
            //����
            if (!name) {
                flag = false;
                $("#name").next('b').hide();
                $("#name").next('b').next('b').css('display', 'inline-block');
            } else {
                $("#name").next('b').css('display', 'inline-block');
                $("#name").next('b').next('b').hide();
            }
            //ʡ��
            provinceId == 150
            if(provinceId){
                if(provinceId == 150){
                    $("#areaError").find('b').eq(0).css('display', 'inline-block');
                    $("#areaError").find('b').eq(1).hide();
                }else{
                    if(!cityId){
                        flag = false;
                        $("#areaError").find('b').eq(0).hide();
                        $("#areaError").find('b').eq(1).css('display', 'inline-block');
                    }else{
                        $("#areaError").find('b').eq(0).css('display', 'inline-block');
                        $("#areaError").find('b').eq(1).hide();
                    }
                }
            }else{
                flag = false;
                $("#areaError").find('b').eq(0).hide();
                $("#areaError").find('b').eq(1).css('display', 'inline-block');
            }
            //��ַ
            if (!address) {
                flag = false;
                $("#address").next('b').hide();
                $("#address").next('b').next('b').css('display', 'inline-block');
            } else {
                $("#address").next('b').css('display', 'inline-block');
                $("#address").next('b').next('b').hide();
            }
            //�ʱ�
            if (!zipcode) {
                flag = false;
                $("#zipcode").next('b').hide();
                $("#zipcode").next('b').next('b').css('display', 'inline-block');
            } else {
                var reg = /^\d{6}$/;
                if (reg.test(zipcode)) {
                    $("#zipcode").next('b').css('display', 'inline-block');
                    $("#zipcode").next('b').next('b').hide();
                } else {
                    $("#zipcode").next('b').hide();
                    $("#zipcode").next('b').next('b').css('display', 'inline-block');
                }
            }
            //�ֻ�

            if (!mobile && !telphone) {
                flag = false;
                $("#phone").next('span').hide();
                $("#phone").next('span').next('b').hide();
                $("#phone").next('span').next('b').next('b').text('�̶��绰���ֻ�������дһ��').css('display', 'inline-block');
            }else{
                if(mobile && !checkMobile(mobile)){
                    flag = false;
                    $("#phone").next('span').hide();
                    $("#phone").next('span').next('b').hide();
                    $("#phone").next('span').next('b').next('b').text('�绰�����ʽ����ȷ').css('display', 'inline-block');
                }else{
                    $("#phone").next('span').next('b').show();
                    $("#phone").next('span').css('display', 'inline-block');
                    $("#phone").next('span').next('b').next('b').hide();
                }
                if(telphone && !checkTelphone(telphone)){
                    flag = false;
                    $("#telphone2").next('span').hide();
                    $("#telphone2").next('span').next('b').hide();
                    $("#telphone2").next('span').next('b').next('b').text('�绰�����ʽ����ȷ').css('display', 'inline-block');
                }else{
                    $("#telphone2").next('span').css('display', 'inline-block');
                    $("#telphone2").next('span').next('b').css('display', 'inline-block');
                    $("#telphone2").next('span').next('b').next('b').hide();
                }
            }
            //email
            if (email) {
                if (checkEmail(email)) {
                    $("#email").next('b').css('display', 'inline-block');
                    $("#email").next('b').next('b').hide();
                } else {
                    flag = false;
                    $("#email").next('b').hide();
                    $("#email").next('b').next('b').css('display', 'inline-block');
                }
            } else {
                $("#email").next('b').hide();
                $("#email").next('b').next('b').hide();
            }
            if (!flag) {
                return;
            }
            //������Ϣ
            var url = "index.php?c=Ajax_Setting";
            var data = {
                "addressId": addressId,
                "name": name,
                "provinceId": provinceId,
                "cityId": cityId,
                "address": address,
                "zipcode": zipcode,
                "telphone": telphone,
                "mobile": mobile,
                "email": email,
                "isDefault": isDefault,
                "t": (new Date()).valueOf(),
                "a": 'SaveAddress'
            };
            $.getJSON(url, data, function(backdata) {
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
                $(".layerbox-button-true, .layerbox-close").unbind('click');
                openTips(params);
                $(".layerbox-button-true, .layerbox-close").click(function(){
                    if(backdata.flag){
                        location.reload();
                    }
                });
            });
        });
    })($);

    //����Ĭ��
    $("[fn='setDefaultAddress']").click(function() {
        var _this  = this;
        var addressId = $(_this).parent().attr('addressId');
        var url = './index.php?c=Ajax_Setting';
        if (addressId) {
            var data = {"addressId": addressId, "t": (new Date()).valueOf(), "a": 'SetDefaultAddress'};
            $.getJSON(url,data, function(backdata) {
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
                openTips(params);
                $(".layerbox-button-true, .layerbox-close").unbind('click').live('click',function(){
                    if(backdata.flag){
                        location.reload();
                    }
                });
            });
        }
    });
    //ɾ����Ϣ
    $("[fn='deleteAddress']").click(function() {
        var _this  = this;
        var params = {title: '��ʾ',//���������
                        subtitle:'',//�������ӱ���
                        type:'confirm',//����������{ text | loading | alert | confirm }
                        content:'��ַ��Ϣɾ�����޷��һأ�ȷ��ɾ����',//����������
                        drag:true,//�Ƿ�����϶�
                        buttonleft:'',//��ť�Ƿ����
                        cssClass:'',//������ʽ����
                        height:'135',
                        width:'300',//��������
                        time:''
                            };
        $(".layerbox-button-true").unbind('click');
        openTips(params);
        $(".layerbox-button-false, .layerbox-close").live('click',function(){return;});
        $(".layerbox-button-true").live('click',function(){
            var addressId = $(_this).parent().attr('addressId');
            var url = 'index.php?c=Ajax_Setting';
            if (addressId) {
                var data = {"addressId": addressId, "t": (new Date()).valueOf(), "a": 'DelAddress'};
                $.getJSON(url,data, function(backdata) {
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
                    openTips(params);
                    $(".layerbox-button-true, .layerbox-close").unbind('click').click(function(){
                        if(backdata.flag){
                            location.reload();
                        }
                    });
                });
            }
        });
    });

    //�޸�
    $("[fn='changeAddress']").click(function() {
        var _this  = this;
        var params = {title: '��ʾ',//���������
                        subtitle:'',//�������ӱ���
                        type:'confirm',//����������{ text | loading | alert | confirm }
                        content:'�޸����ݽ������㵱ǰ��д��δ����ĵ�ַ��Ϣ��ȷ���޸���',//����������
                        drag:true,//�Ƿ�����϶�
                        buttonleft:'',//��ť�Ƿ����
                        cssClass:'',//������ʽ����
                        height:'135',
                        width:'300',//��������
                        time:''
                            };
        openTips(params);
        $(".layerbox-button-false, .layerbox-close").live('click',function(){return;});
        $(".layerbox-button-true").live('click',function(){
            var addressId = $(_this).parent().attr('addressId');
            var email = $(_this).parent().attr('email');
            var isDefault = $(_this).parent().attr('isDefault');
            var addresssInfoObj = $(_this).parent().parent().find('td');
            var truename = $(addresssInfoObj).eq(0).text();
            var provinceId = $(addresssInfoObj).eq(1).attr('provinceId');
            var cityId = $(addresssInfoObj).eq(1).attr('cityId');
            var address = $(addresssInfoObj).eq(2).text();
            var zipcode = $(addresssInfoObj).eq(3).text();
            var mobile = $(addresssInfoObj).eq(4).find("[fn='mobile']").text();
            var telphone = $(addresssInfoObj).eq(4).find("[fn='tel']").text();
            var telphone1, telphone2;
            if (telphone) {
                var telArr = telphone.split("-");
                telphone1 = telArr[0];
                telphone2 = telArr[1];
                if (typeof telArr[2] !== undefined) {
                    telphone += '-'+telArr[2];
                }
            }
            $("#addressId").val(addressId);
            $("#name").val(truename);
            $("#address").val(address);
            $("#zipcode").val(zipcode);
            $("#address").val(address);
            $("#phone").val(mobile);
            $("#telphone1").val(telphone1);
            $("#telphone2").val(telphone2);
            $("#email").val(email);
            $("#contentBox").show();
            if (isDefault) {
                $("#setDefault").attr('checked', true);
            }
            //ʡ��ѡ��
            $("#provinceId").val(provinceId);
            var provinceName = $("#provinceList").find("[val='"+provinceId+"']").text();
            $("#provinceName").val(provinceName);
            $("#cityId").val(cityId);
            if(provinceId){
                if(provinceId == 150){
                    $("#cityName").attr('disabled',true);
                    $("#cityList").html('<li>��ѡ�����</li>');
                    $("#cityId").val('');
                    return;
                }
                var data = {'provinceId':provinceId,"t":(new Date()).valueOf()};
                $.get('index.php?c=Ajax_Public&a=GetCityByProvince',data,function(backdata){
                    $("#cityName").attr('disabled',false);
                    $("#cityList").html(backdata);
                    var cityName = $("#cityList").find("[val='"+cityId+"']").text();
                    $("#cityName").val(cityName);
                });
            }
    });
    });
});