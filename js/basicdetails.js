var is_approve = localStorage.getItem("isApprove");
var va_code = "";
var va_code_str = "";
var va_phone_code = "";
var va_code_time = "";
var is_zh = true;
//跳转到登陆
$(".zq_index_logins").click(function(){
	window.location.href="index.html"
});
//跳转到协议
$(".zq_protocol_src").click(function(){
	window.location.href=""
});
//选择协议
$(".zq_protocol_get").click(function(){
	$(this).toggleClass("zq_protocol_thisget");
	if($(".zq_protocol_get").hasClass("zq_protocol_thisget")){
		$(".zq_protocol_Getis").addClass("zq_protocol_Getthis");
		$("#basic_submit").attr("href","javascript:ba_submit();");
	}else{
		$(".zq_protocol_Getis").removeClass("zq_protocol_Getthis");
		$("#basic_submit").attr("href","javascript:void(0);");
	};
});
$(function(){
	//加载图片验证码
	loadImgCode();
	if(!isnull(is_approve)){
		window.location.href=skipHttp+"index.html"
	}
})

//获取图片验证码
function loadImgCode(){
	 var data={};
	 $.ajax({
      url:dataLink+"validation/getImgCode", 
      type : "get",
      dataType: 'json',
      data:data, 
      success : function(date){
     	 if(date.msg=="success"){
     		var imgUrl = date.validateImg;
     		$(".zq_code_img").attr("src",imageSrc+imgUrl);
     		va_code = date.validateCode;
     		va_code_str = date.validateNum;
     	 }
      }
	});
}
//获取手机验证码
function getPhoneCode(){
	if(cerifyPhone()){
		var phone_num = $("#user_mobile").val();
		var data={"tel":phone_num};
		 $.ajax({
	     url:dataLink+"validation/getValidCodebyPhone", 
	     type : "get",
	     dataType: 'json',
	     data:data, 
	     success : function(date){
	    	 if(date.msg=="success"){
	    		va_phone_code = date.phoneCode;
	    		va_code_time = date.sendCodeTime;
	    		alert(va_phone_code);
	    	 }                              
	     }
		});
	}
}
//验证用户手机号是否注册
function isRegister(){
	if(cerifyPhone()){
		var phone_num = $("#user_mobile").val();
		var data={"tel":phone_num};
		 $.ajax({
	     url:dataLink+"platformUser/isRegister", 
	     type : "get",
	     dataType: 'json',
	     data:data, 
	     success : function(date){
	    	 if(date.msg=="success"){
	    		if(date.is_register=="1"){
	    			$(".mobile_title").hide();
	    			is_zh =  true;
	    		}else{
	    			//已注册
	    			$(".mobile_title").html("手机号已被注册");
	    			$(".mobile_title").show();
	    			is_zh =  false;
	    		}
	    	 }                             
	     }
		});
	}
}

//验证码
var times;
function startMove(){
	clearInterval(times);
	var i=60;
	times=setInterval(function(){
			$(".zq_code_get").hide();
			$(".zq_code_ges").show();
//				$(".zq_obtain").css("background","#AEAFB1");
				if(i<1){
					$(".zq_code_ges").hide();
					$(".zq_code_get").show();
					clearInterval(times);
				}else{
					$(".zq_code_ges").html(i+"S后重试")
				};
				i-=1;

			},1000)
		};

$(".zq_code_get").click(function(){
	if(cerifyPhone()){
		startMove();
	}
});

function ba_submit(){
	var phone_num = $("#user_mobile").val();
	var user_key = $("#user_key").val();
	//图片验证码
	var img_input_code = $("#user_code").val();
	//手机验证码
	var phone_code = $("#user_tel_code").val();
	if(!is_zh){
		$(".mobile_title").html("手机号已被注册");
		$(".mobile_title").show();
	}
	if(is_zh&&cerifyPhone()&&cerifyPassword()&&cerifyRePassword()&&cerifyImgCode()&&cerifyPhoneCode()){
		var data={"tel":phone_num,"password":user_key,"enablePwd":user_key,"imgCode":img_input_code,"phoneCode":phone_code,"codeKeyNum":va_code_str};
		$.ajax({
			url:dataLink+"platformUser/createUser", 
			type : "get",
			dataType: 'json',
			data:data, 
			success : function(date){
				if(date.msg=="success"){
					localStorage.setItem("tel",phone_num);
					localStorage.setItem("userId",date.userId);
					localStorage.setItem("userSign",date.is_approve);
					//状态为6
					localStorage.setItem("userIdentity",6);
					window.location.href= skipHttp+"addmessage.html";
				}
			}
		});
	}
}

//加入成功页跳转
$(".join_get").click(function(){
	window.location.href="loggedindex.html"
});
//验证手机号
$("#user_mobile").blur(function(){ 
	cerifyPhone();
	isRegister();
}); 
//验证密码
$("#user_key").blur(function(){ 
	cerifyPassword();
});
//验证密码重复
$("#user_key_get").blur(function(){ 
	cerifyRePassword();
});
//验证图片验证码
$("#user_code").blur(function(){ 
	cerifyImgCode();
});
//手机验证码
$("#user_tel_code").blur(function(){ 
	cerifyPhoneCode();
});

//图片验证码
function cerifyImgCode(){
	if(isnull(va_code)){
		loadImgCode();
	}
	var img_input_code = $("#user_code").val();
	if(!isnull(img_input_code)){
        va_code.toLowerCase();
        var s_code = img_input_code.toLowerCase();
		if(s_code!=va_code){
			$(".code_title").html("请正确输入验证码");
			$(".code_title").show();
			return false;
		}
	}else{
		$(".code_title").html("请填写验证码");
		$(".code_title").show();
		return false;
	}
	$(".code_title").hide();
	return true;
}
//验证手机验证码
function cerifyPhoneCode(){
	var myDate = new Date();
	var phone_num = $("#user_tel_code").val();
	var timestamp = myDate.getTime();
	if(!isnull(phone_num)){
		if(va_phone_code!=phone_num){
			$(".code_title_basic").html("请正确输入验证码");
			$(".code_title_basic").show();
			return false;
		}
		var now_time = 600-(timestamp-va_code_time)/1000;
		if(now_time<=0){
			$(".code_title_basic").html("验证码已过期，请重新获取");
			$(".code_title_basic").show();
			return false;
		}
	}else{
		$(".code_title_basic").html("请填写验证码");
		$(".code_title_basic").show();
		return false;
	}
	$(".code_title_basic").hide();
	return true;
}
//验证手机号
function cerifyPhone(){
	var phone_num = $("#user_mobile").val();
	$(".mobile_title").html("");
	if(!isnull(phone_num)){
		if(!mobile(phone_num)){
		    //手机格式错误	
			$(".mobile_title").html("请正确输入手机号");
			$(".mobile_title").show();
			return false;
		}
	}else{
		$(".mobile_title").html("请填写手机号");
		$(".mobile_title").show();
		return false;
	}
	$(".mobile_title").hide();
	return true;
}
//验证密码
function cerifyPassword(){
	var user_password = $("#user_key").val();
	$(".pass_title").html("");
	if(!isnull(user_password)){
		if(user_password.length<6||user_password.length>12){
			$(".pass_title").html("密码必须在6-12个字符之间");
			$(".pass_title").show();
			return false;
		}
		if(!password(user_password)){
			$(".pass_title").html("请填写正确密码");
			$(".pass_title").show();
			return false;
		}else{
			$(".pass_title").hide();
		}
	}else{
		$(".pass_title").html("请填写密码");
		$(".pass_title").show();
		return false;
	}
	$(".pass_title").hide();
	return true;
}
//验证重复密码
function cerifyRePassword(){
	var user_password = $("#user_key").val();
	var user_re_password = $("#user_key_get").val();
	$(".passwd_title").html("");
	if(user_password!=user_re_password){
		$(".passwd_title").html("密码和密码确认不一致");
		$(".passwd_title").show();
		return false;
	}
	$(".passwd_title").hide();
	return true;
}
function hide(idName){
	$("."+idName).hide();
}


