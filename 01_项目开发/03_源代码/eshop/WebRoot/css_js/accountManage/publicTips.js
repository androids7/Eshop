/*-------------------------------------------------------------------------
 jQuery��������
 edit by yuhx [2013-03-19]
--------------------------------------------------------------------------
 ������[��ѡ�����ڵ���ʱ��д�ɲ�д,����Ϊ��д]
----------------------------------------------------------------------------
    title:              ���������
    subtitle:           �������ӱ���
    type:               ����������
    content:            ����������{ text | loading | alert | confirm }
    width:              ��������
    height:             ������߶�
    time:               ��������ʾʱ��
    drag:               �Ƿ�����϶�
    showbg:             �Ƿ���ʾ�������ֲ�
    buttonleft:         ��ť�Ƿ����
    cssClass:           ������ʽ����
    callback:           �ص�����
    backTrue:           �ص������Ƿ��ڷ���trueʱ�رյ�����
    templateSrc:        ����loading.gif·��
------------------------------------------------------------------------
 ʾ��: 
------------------------------------------------------------------------
 openTips({title:"����",content:"����",type:"text",width:"500",height:"400",time:"3000"})
------------------------------------------------------------------------*/
function openTips(params) {
    // ���õ����������
    var maxWidth = $(document).width()/2;
    var maxHeight = $(document).height()-100;
	
    // �ж��Ƿ�ΪIE6��IE7�����
    var _version = '';
    if(navigator.userAgent.indexOf("MSIE") > 0){
        if(navigator.userAgent.indexOf("MSIE 6.0")>0){
            _version = 6;
        }else{
            _version = 7;
        }
    }
	
    // �ϲ�����
    var p = $.extend( {},
    {
        title:"",		// ���������
        subtitle:"",		// �������ӱ���
        type:"text",		// ����������
        content:"",		// ����������
        width:"250",		// ��������
        height:"150",		// ������߶�
        time:'',		// ��������ʾʱ��
        drag:"true",		// �Ƿ�����϶�
        showbg:"true",		// �Ƿ���ʾ�������ֲ�
        buttonleft:"",		// ��ť�Ƿ����
        cssClass:"",		// ������ʽ����
        callback:"",		// �ص�����
        backTrue:"",		// �ص������Ƿ��ڷ���trueʱ�رյ�����
        templateSrc:"http://icon.zol-img.com.cn/zol_mall/detail/new/"   //����loading.gif·��
    },
    params
    );

    // �������
    var title       = p.title;			// ���������
    var subtitle    = p.subtitle;		// �������ӱ���
    var type        = p.type;			// ����������
    var content     = p.content;		// ����������
    var width       = p.width  > maxWidth  ? maxWidth  : p.width;    //���õ�������󴰿ڿ��
    var height      = p.height > maxHeight ? maxHeight : p.height;  //���õ�������󴰿ڸ߶�
    var time        = p.time;			// ��������ʾʱ��
    var drag        = p.drag;			// �Ƿ�����϶�
    var showbg      = p.showbg;		// �Ƿ���ʾ�������ֲ�
    var buttonleft  = p.buttonleft;		// ��ť�Ƿ����
    var cssClass    = p.cssClass;		// ������ʽ����
    var callback    = p.callback;		// �ص�����
    var backTrue    = p.backTrue;		// �ص������Ƿ��ڷ���trueʱ�رյ�����
    var templateSrc = p.templateSrc;         // ����loading.gif·��

    // ����ѵ�������
    $(".layerbox-border").remove();
    $(".layerbox-overlay").remove();

    // ��ʼ��������
    var simpleWindown_html = new String;
	    
    // ���ñ������ֲ�
    if(showbg === "true") {
        simpleWindown_html += '<div class="layerbox-overlay"></div>';
    }
	
    // ���õ����� �߿� ����ǩ
    simpleWindown_html += '<div id="layerbox-border" class="layerbox-border">';
	
    // ���õ����� ���� ����ǩ
    if(cssClass){
        simpleWindown_html += '<div class="layerbox-content '+cssClass+'">';
    }else{
        simpleWindown_html += '<div class="layerbox-content">';
    }
	
    // ���õ����� ͷ�� ����ǩ
    simpleWindown_html += '<div id="layerbox-head" class="layerbox-head">';
	
    // ���õ����� ���� ����ǩ
    simpleWindown_html += '<h3 class="layerbox-title">';
	
    // ���õ����� ����
    simpleWindown_html += title;

    // ���õ����� �ӱ��� ����ǩ
    simpleWindown_html += '<span class="layerbox-subtitle">';

    // ���õ����� �ӱ���
    simpleWindown_html += subtitle;

    // ���õ����� �ӱ��� �ձ�ǩ
    simpleWindown_html += '</span>';	

    // ���õ����� �رհ�ť
    simpleWindown_html += '<i class="layerbox-close"></i>';

    // ���õ����� ���� �ձ�ǩ
    simpleWindown_html += '</h3>';	

    // ���õ����� ͷ�� �ձ�ǩ
    simpleWindown_html += '</div>';

    // ���õ����� ���� ����ǩ
    simpleWindown_html += '<div class="layerbox-body">';

    // ���õ����� ���� �ձ�ǩ
    simpleWindown_html += '</div>';

    // ���õ����� �ײ� ����ǩ
    if(buttonleft){
        simpleWindown_html += '<div class="layerbox-foot layerbox-footleft">';
    }else{
        simpleWindown_html += '<div class="layerbox-foot">';
    }

    // ���õ����� ������ť
    simpleWindown_html += '<a href="javascript:void(0)" class="layerbox-button-true">ȷ��</a><a href="javascript:void(0)" class="layerbox-button-false">ȡ��</a>';

    // ���õ����� �ײ� �ձ�ǩ
    simpleWindown_html += '</div>';
	
    // ���õ����� ���� �ձ�ǩ
    simpleWindown_html += '</div>';

    // ���õ����� �߿� �ձ�ǩ
    simpleWindown_html += '</div>';
	
    // ��ӵ�������ģ��
    $("body").append(simpleWindown_html);
	
    // ���û�б��⣬����ͷ��
    if(title === ''){
        $('.layerbox-head').hide();
    }

    // ���õ�������
    switch(type) {
        case "loading": // ��ȡ��
            content = "<img src='"+templateSrc+"loading.gif' class='loading' />";
            $('.layerbox-foot').remove();
            break;
        case "alert": // ������Ϣ
            $(".layerbox-button-false").remove();
            break;
        case "confirm": // ȷ����Ϣ
            break;
        case "text": // �ı���ʾ
            $('.layerbox-foot').remove();
            break;
    }
    $(".layerbox-body").html(content);
	
    // ���õ�������
    $(".layerbox-content").css({
        width:width+"px",
        height:height+"px"
    });

    // ���õ��������
    var cw = parseInt(document.documentElement.clientWidth);	// ��ҳ�ɼ������
    var ch = parseInt(document.documentElement.clientHeight);	// ��ҳ�ɼ������
    var st = parseInt(document.documentElement.scrollTop);		// ��ҳ����ȥ�ĸ�
    var marginTop  = -height / 2  +"px";
    var marginLeft = -width  / 2  +"px";
	
    // �ж��Ƿ�Ϊie6
    if ( _version === 6 ) {
        var ieTop = ch/2+st+"px";
        $(".layerbox-border").css({
            left:"50%",
            top: ieTop,
            marginTop: marginTop,
            marginLeft: marginLeft,
            position: 'absolute'
        });
        $(window).scroll(function(){
            $(".layerbox-border").css({
                top:parseInt(document.documentElement.scrollTop+document.documentElement.clientHeight-320)+"px"
            });
        });
    }else {
        $(".layerbox-border").css({
            left:"50%",
            top:"50%",
            marginTop:marginTop,
            marginLeft:marginLeft,
            position: 'fixed'
        });
    }
	
    // �����϶�Ч��
    var DragID = document.getElementById("layerbox-border"),DragHead = document.getElementById("layerbox-head");
    var moveX = 0,moveY = 0,moveTop,moveLeft = 0,moveable = false;
    
    if ( _version === 6 ) {
        moveTop = st;
    }else {
        moveTop = 0;
    }
    var	sw = DragID.scrollWidth,sh = DragID.scrollHeight;

    DragHead.onmouseover = function(e) {
        if(drag === "true"){
            DragHead.style.cursor = "move";
        }else{
            DragHead.style.cursor = "default";
        }
    };

    DragHead.onmousedown = function(e) {
        if(drag === "true"){
            moveable = true;
        }else{
            moveable = false;
        }
        e = window.event?window.event:e;
        var ol = DragID.offsetLeft, ot = DragID.offsetTop-moveTop;
        moveX = e.clientX-ol;
        moveY = e.clientY-ot;
        document.onmousemove = function(e) {
            if (moveable) {
                e = window.event?window.event:e;
                var x = e.clientX - moveX;
                var y = e.clientY - moveY;
                if ( x > 0 &&( x + sw < cw) && y > 0 && (y + sh < ch) ) {
                    DragID.style.left = x + "px";
                    DragID.style.top = parseInt(y+moveTop) + "px";
                    DragID.style.margin = "auto";
                }
            }
        };
        document.onmouseup = function () {
            moveable = false;
        };
        DragID.onselectstart = function(e){
            return false;
        };
    };
	
    // ��ie6ʱ����select������
    if ( _version === 7 || _version === 6 ){
        $('select').css("visibility","hidden");
    }
	

    // ��ʾ������
    $(".layerbox-border").show();
	
    // ����������ֱ����
    var headHeight = $(".layerbox-head:visible").innerHeight() ? parseInt($(".layerbox-head").innerHeight()) : 0;
    var bodyHeight = $(".layerbox-body:visible").innerHeight() ? parseInt($(".layerbox-body").innerHeight()) : 0;
    var footHeight = $(".layerbox-foot:visible").innerHeight() ? parseInt($(".layerbox-foot").innerHeight()) : 0;
    var middleHeight = (height - headHeight - bodyHeight - footHeight)/2;
    $(".layerbox-body").css('padding-top',middleHeight);
    $(".layerbox-body").css('padding-bottom',middleHeight);
	
    // �رյ�����
    var closeTips = function() {
        $(".layerbox-overlay").remove();
        $(".layerbox-border").fadeOut("slow",function(){
            $(this).remove();
        });
        // ��ʾselect������
        $('select').css("visibility","visible");
    };

    // �жϹر�ʱ��رյ�����
    if( time === "" || typeof(time) === "undefined") {
        $(".layerbox-button-true").click(function() {
            if(backTrue){
                if(callback){
                    if(eval(callback)){
                        closeTips();
                    }
                }else{
                    closeTips();
                }
            }else{
                closeTips();
                if(callback){
                    eval(callback);
                }
            }
        });
        $(".layerbox-close,.layerbox-button-false").click(function() {
            closeTips();
        });
    }else {
        setTimeout(closeTips,time);
    }
}
