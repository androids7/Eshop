//�°����JS start
var SWFU;
var Comments = {
	// Ĭ����ʾ
	defaultValue: {
		emptyTips : '���˵��ʲô��...',
		advancedTips : [
			'��һ�����ܱ���㹺���������һ�仰',
			'������ĵط�...',
			'�����ĵط�...',
			'�����͹۵������������䣬�������εĵ����ɣ�'
		],
		processing : false
	},
	
	// ��ȡλ��
	getPosition: function(o) {
		return {
			left: o.offset().left,
			top: o.offset().top,
			width: o.outerWidth(),
			height: o.outerHeight()
		}
	},
	
	// �߼������򵯳�
	advancedWindow: function(data){
		$('<div id="advancedWindow"></div>').append(data).appendTo($('body'))
		var curScrollTop = $(window).scrollTop();
		var wh = $(window).height();
		var h = $('#advancedWindow').outerHeight();
		if (wh >= h){
			$('#advancedWindow').css({
				'top': curScrollTop + (wh - h)/2
			})
		} else {
			$('#advancedWindow').css('top',curScrollTop)
		}
	},
	
	//swfUploadʵ����
	newSwfUpload: function(){
		$.when(
			$.getScript("http://my.zol.com/js/swfupload/swfupload.js"),
			$.getScript("http://my.zol.com/js/swfupload/swfupload.queue.js"),
			$.getScript("http://my.zol.com/js/swfupload/fileprogress.js"),
			$.getScript("http://my.zol.com/js/swfupload/handlers.js"),
			$.Deferred(function(deferred){
				$(deferred.resolve);
			})
		).done(function(){
			var settings = {
				flash_url : "http://my.zol.com/js/swfupload/swfupload.swf",
				upload_url: "http://my.zol.com/index.php?c=Ajax_OrderShare&a=UploadReviewPic&callback=?&t="+Math.random(),
				file_post_name : 'Filedata',
				post_params: {"name": "value"}, //�ϴ�ʱ���ύ����
				file_size_limit : "5 MB",
				file_types : "*.jpg;*.gif;*.png;*.bmp;",
				file_types_description : "Image Files",
				file_upload_limit : 9,
				file_queue_limit : 9,
				custom_settings : {
					progressTarget : "upload-box-picture-list",
					cancelButtonId : "btnCancel"
				},
				debug: false,
				// Button settings
				button_width: "80",
				button_height: "60",
				button_placeholder_id: "spanButtonPlaceHolder",
				button_text: '',
				button_window_mode: 'opaque',
				button_cursor: -2,
				// The event handler functions are defined in handlers.js
				file_queued_handler : fileQueued,
				file_queue_error_handler : fileQueueError,
				file_dialog_complete_handler : fileDialogComplete,
				upload_start_handler : uploadStart,
				upload_progress_handler : uploadProgress,
				upload_error_handler : uploadError,
				upload_success_handler : uploadSuccess,
				upload_complete_handler : uploadComplete,
				queue_complete_handler : queueComplete	// Queue plugin event
			}
			SWFU = new SWFUpload(settings);
		})
	},
	
	/**
	 * ������ʾ��Ĭ�Ͻ�������������
	 * tips : ��ʾ���ڵ����ݣ�������HTML�������Ǵ�����
	 * type : �ɴ���һ��ѡ����������CSS�������������ѡ�������������ѡ����������ʾ�����������css������css��ʾ
	 * callback �� �ص�����������ʾ����ʧ��ʱ����õĺ��������Բ�����
	 */
	creatPostTips: function(tips,type,callback){
		var isString = {}.toString.call(type) == "[object String]"
		var isObject = {}.toString.call(type) == "[object Object]"
		
		var postSuccess = $('<div class="hide" id="postSuccessTips">'
			+ '<div class="post-tips-inner">'+ tips +'</div>'
			+ '</div>');
		postSuccess.appendTo($('body'));
		
		var css = {};
		if (isString){
			var pos = this.getPosition($(type))
			css = {
				'left' : pos.left + (pos.width - postSuccess.outerWidth())/2,
				'top' : pos.top + (pos.height - postSuccess.outerHeight())/2
			}
		}
		if(isObject){
			css = type
		}
		postSuccess.css(css).fadeIn(function(){
			var that = $(this);
			setTimeout(function(){
				that.fadeOut(function(){
					that.remove()
					if(callback !== 'undefined' && $.isFunction(callback)){
						callback()
					}
				});
			},600)
		})
	},
		
	clearDefaultTips: function(selector, defaultValue){
		$(document).on('focus', selector, function(){
			var text = $(this).val();
			if(text == defaultValue){
				$(this).val('').css('color','#333');
			}
		})
		$(document).on('blur', selector, function(){
			var text = $.trim($(this).val());
			if(text == ''){
				$(this).val(defaultValue).css('color','#ccc');
			}
		})
	}
}

$(function(){
	
	// �������������ɹ���ִ������
	$('.orderShareBox').click(function(){
		if(Comments.defaultValue.processing){return}
		Comments.defaultValue.processing = true
        var orderDetailId = $(this).attr('orderdetailid');
		$.ajax({
			type: 'POST',
            data:{orderDetailId:orderDetailId},
			url: '/index.php?c=Ajax_OrderShare&a=OrderShareBox', 
			success: function(data){
				if(data){
					Comments.defaultValue.processing = false
					Comments.advancedWindow(data)
					Comments.newSwfUpload()
				}
			}
		})
	})
	
	// ��ʾ�İ�
	var advInputArr = ['input[name="advTitleAdv"]','textarea[name="advYoudianAdv"]','textarea[name="advQuedianAdv"]','textarea[name="advZongjieAdv"]'];
	$.each(advInputArr, function(i){
		Comments.clearDefaultTips(advInputArr[i], Comments.defaultValue.advancedTips[i])
	})
		
	// ͼƬ�ϴ�����
	$('#picUploadBtn').live('click',function(){
		var left = $(this).position().left + 5;
		var top = $(this).position().top + 35;
		$('.pic-upload-box').css({
			'position': 'absolute',
			'left': left,
			'top': top,
			'visibility': 'visible'
		});
		var stats = SWFU.getStats();
		var picNum = parseInt($(this).attr('data-picnum'));
		stats.successful_uploads = picNum;
		SWFU.setStats(stats);
		$("#uploadStatus").html("�� " + stats.successful_uploads + " �ţ������ϴ�"+ parseInt(SWFU.settings['file_upload_limit'] - stats.successful_uploads) +" ��")
	})
	
	// �߼�����ɾ��ͼƬ
	$('.upload-pic-del').live('click',function(){
		$(this).parents('li').remove();
		var stats = SWFU.getStats();
		stats.successful_uploads--;
		SWFU.setStats(stats);
		var status = $("#uploadStatus");
		status.html("�� " + stats.successful_uploads + " �ţ������ϴ�"+ parseInt(SWFU.settings['file_upload_limit'] - stats.successful_uploads) +" ��")
		$('#picUploadBtn').attr('data-picnum',stats.successful_uploads)
		SWFU.setButtonDisabled(false);
		// ��������ϴ����ŵ�ʱ������ֻ��ѡ�����
		if(SWFU.settings['file_upload_limit'] - stats.successful_uploads != 1) {
			SWFU.setButtonAction(SWFUpload.BUTTON_ACTION.SELECT_FILES);
		}
		$('#swfUploadHandle').css('margin-left','0')
	})
	
	// �߼���������ر�
	$('#advanced-window-close').live('click',function(){
		$('#advancedWindow').remove();
	})
	   
	// ͼƬ�ϴ�����ر�
	$('#upload-box-close').live('click',function(){
		$('.pic-upload-box').css('visibility','hidden');
	})
	
	// ѡ���Ǵ��
	$('div[node-type=advancedStar]').live('mouseleave',function(){
		$(this).children().not('[flag=1]').removeClass('active');
		$(this).children('[flag=1]').addClass('active');
	})
	$('div[node-type=advancedStar] > div').live('mouseenter',function(){
		$(this).addClass('active');
		$(this).prevAll().addClass('active');
		$(this).nextAll().removeClass('active');
	})
	$('div[node-type=advancedStar] > div').live('click',function(){
		$(this).attr('flag','1');
		$(this).prevAll().attr('flag','1');
		$(this).nextAll().removeAttr('flag');
		var point = $(this).attr('data-rel');
		$(this).siblings('input').val(point);
		
		var total = 0
		$.each($('div[node-type=advancedStar] > input'), function(){
			total += parseInt($(this).val())
		})
		var average = (total/6).toFixed(1);
		var averageStar = (average/5)*108
		$('#rateAverage').text(average + '')
		$('#averageStar').animate({'width':averageStar},200)
	})

    // �߼������ύ����
	$('#advReviewBtn').live('click',function(){
        if(Comments.defaultValue.processing){return}
        

		var biaoti  = $('input[name="advTitleAdv"]').val();           //��������
		var youdian = $('textarea[name="advYoudianAdv"]').val();     //�ŵ�
		var quedian = $('textarea[name="advQuedianAdv"]').val();     //ȱ��
		var zongjie = $('textarea[name="advZongjieAdv"]').val();     //�ܽ�
        if( biaoti == Comments.defaultValue.advancedTips[0] 
			&& youdian == Comments.defaultValue.advancedTips[1] 
			&& quedian == Comments.defaultValue.advancedTips[2] 
			&& zongjie == Comments.defaultValue.advancedTips[3]){
        
			var emptyCallback = function(){
				$('input[name="advTitleAdv"]').focus()
			}
			Comments.creatPostTips(Comments.defaultValue.emptyTips,'#advancedWindow',emptyCallback)
			return
        }


		// ��ȡ�������Դ��
		var rcArr = [];
		$('input[name="rc-input"]').each(function(){
			var rcId = $(this).attr('data-id');   // ����ID
			var rcValue = $(this).val();          // ����ֵ
            rcArr.push({rcId:rcId,rcValue:rcValue});
		})

        // �ܷ�
        var stars = $('#rateAverage').text();

		// ��ȡ�ϴ���ͼƬsrc
		var picSrcArr = new Array();
		$('#upload-box-picture-list img').each(function(){
			var picSrc = $(this).attr('data-src');
			picSrcArr.push(picSrc);
		})
		
		var orderDetailId = $("input[name=shareOrderDetailId]").val();
        
		// �̳�ɹ����pageType Ĭ��Ϊ         
		var reviewUrl     = 'http://my.zol.com/index.php?c=Ajax_OrderShare&a=AddOrderShare&callback=?&t='+Math.random();        
        Comments.defaultValue.processing = true
        $.getJSON(
                reviewUrl,
                {orderDetailId:orderDetailId,zongjie:zongjie,youdian:youdian,quedian:quedian,biaoti:biaoti,rcArr:rcArr,picSrcArr:picSrcArr},
                function(data){
                    if (data.flag){
                        Comments.defaultValue.processing = false      
                        $('#advancedWindow').remove();
                        window.location.reload();
                    }else{
                        alert(data.msg);
                    }
                }
        );
	})
})
// �̳�ɹ��JS end