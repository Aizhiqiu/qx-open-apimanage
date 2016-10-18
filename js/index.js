var is_zh = true;
$(function(){
	rememberLogin();
	isUserLogin();
});   

function isUserLogin(){
	var userId=localStorage.getItem("userId");
	var is_approve=localStorage.getItem("isApprove");
	if(!isnull(userId)&&!isnull(is_approve)){
		window.location.href=skipHttp+"loggedindex.html";
	}
}
//是否记住密码
$(".key_metes span").click(function(){
	$(this).toggleClass("get_key");
	if ($(this).hasClass("get_key")) {//记住密码
		localStorage.setItem("local","key");
	} else{//忘记密码
		localStorage.setItem("local","");
	};
});
$(".login_get").click(function(){
	console.log(Local().getItem("local"))
});

$("#get_back").click(function(){
	window.location.href=skipHttp+"verifymobile.html";
});
function gotoDetails(){
	window.location.href=skipHttp+"basicdetails.html";
}
function userLogin(){
	cerifyPhone();
	isRegister();
	if(cerifyPhone()){
		cerifyPassword();
	}
	var phone_num = $("#user_phone_num").val();
	var user_password = $("#user_password").val();
	if(!isnull(phone_num)){
		if(!is_zh){
			$("#error_msg").html("您输入的账号或者密码不正确,请重新输入");
			$("#error_msg").show();
		}
	}else{
		$("#error_msg").html("请输入账号");
		$("#error_msg").show();
	}
	if(is_zh&&cerifyPhone()&&cerifyPassword()){
		var data = {"tel":phone_num,"password":user_password};
		$.ajax({
	      url:dataLink+"platformUser/userLogin", 
	      type : "get",
	      dataType: 'json',
	      data:data, 
	      success : function(date){
	     	  if(date.msg=="success"){
	     		localStorage.setItem("userName",date.user_name);
	     		localStorage.setItem("userTel",date.user_tel);
	     		localStorage.setItem("userId",date.user_id);
	     		localStorage.setItem("userSign",date.user_sign);
	     		localStorage.setItem("isApprove",date.is_approve);
	     		localStorage.setItem("userIdentity",date.user_identity);
	     		var is_login=localStorage.getItem("local");
	     		if(!isnull(is_login)){
	     			$.cookie("userPassword", user_password, { expires: 30 });
	     			$.cookie("userTel", date.user_tel, { expires: 30 });
	     		}
	     		if(!isnull(date.user_sign)&&!isnull(date.user_tel)){
	     			window.location.href=skipHttp+"loggedindex.html";
	     		}
	     	  }else{
	     		$("#error_msg").html("您输入的账号或者密码不正确,请重新输入");
	     		$("#error_msg").show();
	     	  }
	      }
		});
	}
}
function rememberLogin(){
	var user_tel = $.cookie('userTel');
	var user_password = $.cookie('userPassword');
	if(!isnull(user_tel)&&!isnull(user_password)){
		localStorage.setItem("local","key");
		$(".key_metes span").addClass("get_key");
		$("#user_phone_num").val(user_tel);
		$("#user_password").val(user_password);
	}
}

//验证用户手机号是否注册
function isRegister(){
	if(cerifyPhone()){
		var phone_num = $("#user_phone_num").val();
		var data={"tel":phone_num};
		 $.ajax({
	     url:dataLink+"platformUser/isRegister", 
	     type : "get",
	     dataType: 'json',
	     data:data, 
	     success : function(date){
	    	 if(date.msg=="success"){
	    		if(date.is_register=="1"){
		    		//已注册
		    		$("#error_msg").html("您输入的账号或者密码不正确,请重新输入");
		    		$("#error_msg").show();
		    		is_zh = false;
	    		}else{
	    			is_zh = true;  
	    			$("#error_msg").hide();
	    		}
	    	 }                             
	     }
		});
	}
}


function cerifyPhone(){
	$("#error_msg").html("");
	var phone_num = $("#user_phone_num").val();
	if(!isnull(phone_num)){
		if(!mobile(phone_num)){
		    //手机格式错误	
			$("#error_msg").html("您输入的账号或者密码不正确,请重新输入");
			$("#error_msg").show();
			return false;
		}
	}else{
		$("#error_msg").html("请输入账号");
		$("#error_msg").show();
		return false;
	}
	$("#error_msg").hide();
	return true;
}
function cerifyPassword(){
	$("#error_msg").html("");
	var user_password = $("#user_password").val();
	if(!isnull(user_password)){
		if(user_password.length<6||user_password.length>12){
			$("#error_msg").html("您输入的账号或者密码不正确,请重新输入");
			$("#error_msg").show();
			return false;
		}
		if(!password()){
			$("#error_msg").html("您输入的账号或者密码不正确,请重新输入");
			$("#error_msg").show();
		}else{
			$("#error_msg").hide();
		}
	}else{
		$("#error_msg").html("请输入密码");
		$("#error_msg").show();
		return false;
	}
	$("#error_msg").hide();
	return true;
}

function hide(){
	$("#error_msg").hide();
}
//键盘事件
document.onkeydown = function (e){
            var theEvent = window.event || e;
            var code = theEvent.keyCode || theEvent.which;
            if(code == 13){
               userLogin();
            }
}
