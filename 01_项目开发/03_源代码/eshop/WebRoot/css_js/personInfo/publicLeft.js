/*
 * ������Ĳ��������JS
 * publicLeft.js
 *
 * LICENSE:
 * @author yhx
 * @version 1.0
 * @copyright  zol shop
 * @todo
 * 2013-01-23 add by yhx
 */
// ������Ĳ����ѡ��Ч��
$(function(){
    $('.nav li a,.nav li em').each(function() {
        $(this).bind('click', function() {
            var that = $(this).parent();
            if ($(that).find('em').hasClass("fold")) {                                   //չ������ͼ�꣬�����������
                $('.nav li em:not(.fold)').attr('class', 'fold').parent().find('.subnav').hide();
                $(that).find('em').attr('class', 'open');
                $(that).find('.subnav').show();
            } else {
                $(that).find('em').attr('class', 'fold');
                $(that).find('.subnav').hide();
            }
        });
    });  
})