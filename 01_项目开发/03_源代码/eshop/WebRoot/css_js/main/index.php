document.write('<link href="http://www.zol.com/css/Index/topbar.css" rel="stylesheet" type="text/css" /><div class="zc-topbar"><div class="wrapper clearfix"><div class="zc-login-info"><span class="zc-back-home"><a href="http://www.zol.com">商城首页</a></span>                                     <span class="zc-login">Hi~欢迎来到ZOL商城，请<a href="https://login.zol.com/">登录</a></span><span class="zc-register"><a href="https://login.zol.com/index.php?c=Default&a=Register">免费注册</a></span>            </div><ul class="zc-quick-menu"><li><a href="http://my.zol.com/index.php?c=OrderManage">我的订单</a></li><li class="zc-my-center" onmouseover="showUI(this)" onmouseout="hideUI(this)"><a href="http://my.zol.com/" class="zc-hd" >买家中心<i class="ico"></i></a><div class="zc-my-center-bd" id="zc-my-center-bd" style="display:none;"><a href="#" style="display:none;">我的优惠券&nbsp;&nbsp;<em>8</em></a><a href="http://my.zol.com/index.php?c=FollowMerchant">关注的店铺&nbsp;&nbsp;<em id="focusShopNum">0</em></a><a href="http://my.zol.com/index.php?c=FollowGoods">关注的商品&nbsp;&nbsp;<em id="focusGoodsNum">0</em></a></div></li><li><a href="http://order.zol.com/index.php?c=Cart" id="shop-cart-num">购物车5件</a></li><li><a href="http://help.zol.com/">帮助中心</a></li><li class="zc-separator">|</li><li class="zc-mobile" onmouseover="showUI(this)" onmouseout="hideUI(this)"><a href="javascript:;" class="zc-hd zc-mobile-hd">手机商城<i class="ico"></i></a><div class="zc-mobile-bd" id="zc-mobile-bd" style="display:none;"><img src="http://icon.zol-img.com.cn/newtuan/ZTuanWechat.jpg" width="130" height="130"></div></li><li><a href="http://www.zol.com.cn">中关村在线</a></li><li><a href="http://zs.zol.com/">商家入驻</a></li><li class="lianxikefu"><a href="javascript:;"  onmouseover="showUI(this)" onmouseout="hideUI(this)" class="zc-hd">联系客服<i class="ico"></i></a><div class="zc-service-tel">400-678-0068</div></li></ul></div></div><script>    var Z_now_time = "1441941185";    var z_user_id  = "";    function showUI(obj){        var className = obj.className;        if(className == "zc-my-center"){            obj.className = "zc-my-center zc-hover";            document.getElementById("zc-my-center-bd").style.display="block";        }else if(className == "zc-mobile"){            obj.className = "zc-mobile zc-hover";            document.getElementById("zc-mobile-bd").style.display="block";        }else{            obj.parentNode.className = "lianxikefu zc-hover";            obj.nextSibling.style.display = "block";        }    }        function hideUI(obj){        var className = obj.className;        if(className == "zc-my-center zc-hover"){            obj.className = "zc-my-center";            document.getElementById("zc-my-center-bd").style.display="none";        }else if(className == "zc-mobile zc-hover"){            obj.className = "zc-mobile";            document.getElementById("zc-mobile-bd").style.display="none";        }else{            obj.parentNode.className = "lianxikefu";            obj.nextSibling.style.display = "none";        }    }        function getApiNumber(){        var xmlHttp = null;        if (window.XMLHttpRequest) {            xmlHttp = new XMLHttpRequest();        } else {            if (window.ActiveXObject) {                xmlHttp = new ActiveXObject("Microsoft.XMLHttp");            }        }        var url="http://www.zol.com/index.php?c=Ajax_Topbar&t="+Math.random();        xmlHttp.open("GET",url,false);        xmlHttp.send(null);        var responseHtml = "";        if(xmlHttp.readyState == 4){            if(xmlHttp.status = 200){                responseHtml = eval(" ( " + xmlHttp.responseText + " ) ");            }        }        if("" != responseHtml && "object" == typeof(responseHtml)){            document.getElementById("shop-cart-num").innerHTML = "购物车"+responseHtml.cartNumber+"件";            document.getElementById("focusShopNum").innerHTML  = responseHtml.shopNumber;            document.getElementById("focusGoodsNum").innerHTML = responseHtml.goodsNumber;        }    }    getApiNumber();</script>')