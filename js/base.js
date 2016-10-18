//跳转
var skipHttp="https://test.eyouxin.net/qx-open/"; 
//var skipHttp="http://localhost:8020/qx-open/";
//数据传输
//var dataLink="http://192.168.139.1/"; 
//var dataLink="http://localhost:80/op/"; 
//数据传输
var dataLink="https://test.eyouxin.net/op/"; 
var imageHeadSrc="https://test.eyouxin.net/imageFile/img-upload/";
var imageSrc="https://test.eyouxin.net/imageFile/img/";
var documentSrc="https://test.eyouxin.net/imageFile/document/";


//储存调用函数

function Local(){
	var local=localStorage.getItem("local");
	if (isnull(local)) {
		return sessionStorage;
	} else{
		return localStorage;
	};
};
function go_header(){
	var userId=localStorage.getItem("userId");
	var is_approve=localStorage.getItem("isApprove");
	if(!isnull(userId)&&!isnull(is_approve)){
		window.location.href=skipHttp+"loggedindex.html";
	}
}
$(function(){
	//加载头部
	indexall();
	Height(".all_bag");
	Userid();
});
//判断是否是登陆进行显示---三种状态的切换
function Userid(){
	var userId=localStorage.getItem("userId");
	var user_name=localStorage.getItem("userName");
	var is_approve=localStorage.getItem("isApprove");
	if(isnull(userId)){//未注册未登录
		$(".header_box #dext_logion").css("display","block");
	}else{
		if(isnull(user_name)){
			user_name = "企信用户";
		}
		if(is_approve=="0"){//未认证
			$("#n_approve").html(user_name);
			$(".header_box #noeexit").css("display","block");
		}else if(is_approve=="1"){//已认证
			$(".header_box #isexit").css("display","block");
			$("#y_approve").html(user_name);
		}else if(is_approve=="2"){
			$(".header_box #islooding").css("display","block");
			$("#nn_approve").html(user_name);
		}else{
			$("#n_approve").html(user_name);
			$(".header_box #noeexit").css("display","block");
		}
	}
};
function userExit(){
	localStorage.removeItem("userId");
	localStorage.removeItem("isApprove");
	localStorage.removeItem("userIdentity");
	localStorage.removeItem("userName");
	localStorage.removeItem("userSign");
	localStorage.removeItem("userTel");
	sessionStorage.removeItem("thisnavleft");
	window.location.href=skipHttp+"index.html";
}
//加载边角的点击方式
function allclick(){
	//点击立即注册
	$(".all_registe").click(function(){
		window.location.href="basicdetails.html";
	});
	//点击使用帮助
	$(".all_help").click(function(){
		window.location.href="help.html";
	});
	//点击退出
	$(".all_exit").click(function(){
		localStorage.removeItem("userId");
		localStorage.removeItem("isApprove");
		localStorage.removeItem("userIdentity");
		localStorage.removeItem("userName");
		localStorage.removeItem("userSign");
		localStorage.removeItem("userTel");
		sessionStorage.removeItem("thisnavleft");
		window.location.href="index.html";
	});
	//点击名字的时候
	$(".user_name p").click(function(){
		
	});
	//点击已认证
	$(".all_certified").click(function(){
		
	});
	//点击未验证
	$(".exit_certified").click(function(){
		
	});
};
//左侧导航点击事件
function navleftclick(){
	//点击应用管理
	$(".application_title_anage").click(function(){
		sessionStorage.setItem("thisnavleft",0);
		window.location.href="application.html";
	});
	//点击应用授权
	$(".application_title_senten").click(function(){
		sessionStorage.setItem("thisnavleft",1);
		window.location.href="authorization.html";
	});
	//点击用户管理
	$(".admin_user_anage").click(function(){
		sessionStorage.setItem("thisnavleft",2);
		window.location.href="usermanagement.html";
	});
	//点击账号设置
	$(".account_title_anage").click(function(){
		sessionStorage.setItem("thisnavleft",3);
		var userIdentity = localStorage.getItem("userIdentity");
		if(userIdentity==0){
			window.location.href="accoiunman.html";
		}else if(userIdentity==1){
			window.location.href="accountset.html";
		}
		
	});
	//点击企信认证
	$(".account_title_exit").click(function(){
		sessionStorage.setItem("thisnavleft",4);
		window.location.href="authenticate.html";
	});
	//点击接口说明
	$(".Interface_title_").click(function(){
		sessionStorage.setItem("thisnavleft",5);
		window.location.href="joggle.html";
	});
	//点击帮助
	$(".help_title_Get").click(function(){
		sessionStorage.setItem("thisnavleft",6);
		window.location.href="help.html";
	});
	var thisnavleft=sessionStorage.getItem("thisnavleft");
	if(!isnull(thisnavleft)){
		$(".navleft_box li").eq(thisnavleft).css({"background":"#00be3c","color":"#fff"});
	};
	
};
//页面加载等其他通用方法
//勿动！！！！
function indexall(){
	//下列代码勿动！！！
		ajax("header.html",function(str){
			var sA=str.indexOf("body>")
			var sB=str.indexOf("</body")
		   	var scr=str.substring((sA+5),sB)
			$('.all_header').html(scr);
			//判断是否登陆，显示样式
			Userid();
			allclick();
		},function(scr){
		});
		ajax("navleft.html",function(str){
			var sA=str.indexOf("body>")
			var sB=str.indexOf("</body")
		    var scr=str.substring((sA+5),sB)
			$('.zq_centent_left').html(scr);
			navleftclick();
		},function(scr){
		});
		ajax("footer.html",function(str){
			var sA=str.indexOf("body>")
			var sB=str.indexOf("</body")
		    var scr=str.substring((sA+5),sB)
			$('.all_footer').html(scr);
		},function(scr){
		});
		$(".zq_centent_left").css("height",$(".all_centent").height()+"px");
		
};
//框架主体调用内容
function ajax(url,fnSucc,fnFaild){
		if(window.XMLHttpRequest){
			var oAjax= new XMLHttpRequest();
		}else{
			var oAjax= new ActiveXObject("Microsoft.XMLHTP");
		};
		oAjax.open("GET",url,true);
		oAjax.send(null);
		oAjax.onreadystatechange=function(){
			if(oAjax.readyState==4){
				if(oAjax.status==200){
					fnSucc(oAjax.responseText);
				}else{
					fnFaild(oAjax.status);
				}
			}
		};
	};
//得到页面高
function Height(cleass){
	$(cleass).css("min-height",$(window).height()+"px")
}
//转换时间格式
function Time(long,siem){
		var remindTime = new Date(long);
		function Substr(str){
			var bestime="00"+str
			return bestime.substr(bestime.length-2)
		};
		var Times = remindTime.getFullYear()+"-"+Substr(remindTime.getMonth()+1)+"-"+Substr(remindTime.getDate())+" "+Substr(remindTime.getHours())+":"+Substr(remindTime.getMinutes());
		if(siem){
			Times=Times+":"+Substr(remindTime.getSeconds());
		};
		return Times;
	};
//		Time(1491080884000,15)//2017-04-02 05:08:04    //15可以为任意值，只要不为空
//		Time(1491080884000)//2017-04-02 05:08
//判断是否为空
function isnull(thiscoler){
	var thisnull=true;
	if(thiscoler==null ||thiscoler=="" || thiscoler==undefined ||thiscoler=="null" || thiscoler=="undefined"){
		thisnull=true;
	}else{
		thisnull=false;
	};
	return thisnull;
};
//tab切换插件
function tab(sect,moer,reali){//tab切换插件
	$(sect).click(function(){
	        $(sect).eq($(this).index()).addClass(moer).siblings().removeClass(moer);
			$(reali).hide().eq($(this).index()).show();
	   });
};
//校验内容长度，islengthA为最短，islengthB为最长，centent要效验的内容,islengthB不传只判断最短
function centen(centent,islengthA,islengthB){
	var isarrart=true
	if(!isnull(islengthB)){
		if(centent.replace(/[^\x00-\xff]/g, "**").length<islengthA||centent.replace(/[^\x00-\xff]/g, "**").length>islengthB){
			isarrart=false;
		};
	}else if(centent.replace(/[^\x00-\xff]/g, "**").length<islengthA){
		isarrart=false;
	}
	return isarrart;
};
//验证主函数
function maneyNumber(thit,reg){
	var ismaney=true
	if(!isnull(thit)){
		if(!reg.test(thit)){
			ismaney=false;
		}else{
			ismaney=true;
		};
	}else{
		ismaney=false;
	};
	return ismaney;
};
//时为金额效验带后两位小数
function maneytest(thit){
	var reg =/^[0-9]*[1-9][0-9]*$/;
	return maneyNumber(thit,reg);
};
//正整数效验
function numberFant(thit){
	var reg =/^\+?[1-9][0-9]*$/;
	return maneyNumber(thit,reg);
};
//手机验证
function mobile(thit){
	var reg=/^0?(13[0-9]|17[7]|15[012356789]|18[02356789]|14[57])[0-9]{8}$/;
	return maneyNumber(thit,reg);
};
//验证邮箱
function Eimel(thit){
	var reg =/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return maneyNumber(thit,reg);
};

//校验身份证
function check_card(thit){
	 var reg=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/; 
	return maneyNumber(thit,reg);
};

//验证密码
function password(thit){
	var reg =/^[a-zA-Z0-9]{6,16}$/;
	return maneyNumber(thit,reg);
};

//验证短信验证码
function check_code(thit){
	var reg =/^\d{5}$/;
	return maneyNumber(thit,reg);
};

/**发送ajxa请求 简单对象**/
var _asyn= function(url, param,method,fun,type){
    $.ajax({
        type: method,
        url: url,
        data: param,
        dataType: "json",
        success: function(data) {
                var _msg = data.msg;
                //请求正常
                if (_msg == 'success') {
                   fun(data,200, type);
                }else{
                	fun(data,200, type);
                }
        },
        error: function() {

      		 fun(data,500, type);   
        }
    });
}
/**发送ajxa请求 复杂对象**/
var _asyn_s= function(url, param,method,fun,type){
    $.ajax({
        type: method,
        url: url,
        data: param,
        dataType: "json",
       contentType: "application/json; charset=utf-8",
        success: function(data) {
                var _msg = data.msg;
                //请求正常
                if (_msg == 'success') {
                   fun(data,200, type);
                }else{
                	fun(data,200, type);
                }
        },
        error: function() {

      		 fun(data,500, type);   
        }
    });
}
/**跳转链接*/
var _g= function(url) {
    location.href = url;
};
/**验证用户是否登录*/
function verificationUserLogin(){
	var userId=localStorage.getItem("userId");
	var is_approve=localStorage.getItem("isApprove");
	if(isnull(userId)&&isnull(is_approve)){
		localStorage.removeItem("userId");
		localStorage.removeItem("isApprove");
		localStorage.removeItem("userIdentity");
		localStorage.removeItem("userName");
		localStorage.removeItem("userSign");
		localStorage.removeItem("userTel");
		sessionStorage.removeItem("thisnavleft");
		window.location.href=skipHttp+"index.html";
	}
}
var _check={
	_url:function(thit){
	   var reg=/^(http|ftp|https):\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?$/;
		var objExp=new RegExp(reg);
	  	return objExp.test(thit)
	}
}
