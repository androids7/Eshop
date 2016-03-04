/**
 * �������ͷ��JS
 * publicHead.js
 *
 * @author  yhx
 * @date    2013-01-23
 */
// �������������
$('.zlogin .buyer_center').hover(
        function() {
            $('.buyer_center').addClass('cur');
            $('.buyer_center .buyer_center_list').show();
        },
        function() {
            $('.buyer_center').removeClass('cur');
            $('.buyer_center .buyer_center_list').hide();
        }
);

// ����������
$('.searchmod').find('input').bind({
    keyup: function() {
        var inputContent = $(this).val().substring(0, 20);
        if (inputContent) {
            var liContent = '';
            liContent += '<li><a href="javascript:void(0)" class="searchTypes" dataid="1">������' + inputContent + '����Ʒ</a></li>';
            liContent += '<li><a href="javascript:void(0)" class="searchTypes" dataid="2">������' + inputContent + '������</a></li>';
            $(this).siblings('ul').html(liContent).show();
        } else {
            $(this).siblings('ul').html(liContent).hide();
        }
    },
    click: function() {
        var inputContent = $(this).val().substring(0, 20);
        if (inputContent === '������Ʒ/����') {
            $(this).val('');
            $(this).siblings('ul').hide();
        } else {
            if (inputContent) {
                var liContent = '';
                liContent += '<li><a href="javascript:void(0)" class="searchTypes" dataid="1">������' + inputContent + '����Ʒ</a></li>';
                liContent += '<li><a href="javascript:void(0)" class="searchTypes" dataid="2">������' + inputContent + '������</a></li>';
                $(this).siblings('ul').html(liContent).show();
            } else {
                $(this).siblings('ul').html(liContent).hide();
            }
        }
    }
});

// �������ύ
$('.searchTypes').live('click', function() {
    var searchTypes = $(this).attr('dataid');
    var cName = 'List';
    if (searchTypes == 2) {
        cName = 'MerchantSearch';
    }
    $(this).parents('.searchmod').find('input[name="searchType"]').val(searchTypes);
    $(this).parents('.searchmod').find('input[name="c"]').val(cName).parents('form').submit();
});

// �����̳�/������
//$('.searchbox .findmod').hover(
//        function() {
//            $(this).children('span').addClass('fold').siblings("ul").show();
//        },
//        function() {
//            $(this).children('span').removeClass('fold').siblings("ul").hide();
//        }
//);
//$('.searchbox .findmod ul li').hover(
//        function() {
//            $(this).addClass('hov');
//        },
//        function() {
//            $(this).removeClass('hov');
//        }
//);
//$('.searchbox .findmod ul li').click(function() {
//    var searchType = $(this).html()+'<i></i>';
//    $(this).parent().siblings(".fold").html(searchType);
//    $(this).parent().hide();
//});