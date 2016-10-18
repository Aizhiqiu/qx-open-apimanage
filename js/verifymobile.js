//验证码
var times;
function startMove(){
	clearInterval(times);
	var i=60;
	times=setInterval(function(){
			$(".zq_code_get").hide();
			$(".zq_code_mos").show();
			$(".zq_code_mos").css("display","inline-block");
				if(i<1){
					$(".zq_code_mos").hide();
					$(".zq_code_get").show();
					clearInterval(times);
				}else{
					$(".zq_code_mos").html(i+"S后重试")
				};
				i-=1;

			},1000)
};

//校验密码长度和格式
$("#reset_key").blur(function(){
	var Password  =  $("#reset_key").val();
	if (password(Password)) {
		$(".zq_password_tile").hide();
	}else{
		$(".zq_password_tile").show();
	}
}); 

//两次密码验证
$("#reset_key_tou").blur(function(){
	var Password    =  $("#reset_key").val();
	var newPassword =  $("#reset_key_tou").val();
	if(Password!=newPassword){
		 $(".zq_password_tow").show();
		$("#reset_key_tou").val("");
	}else{
		$(".zq_password_tow").hide();
		
	}
}); 


function check_two(){
	$("#amend").html("");
	$("#amend").html('<div class="zq_reset_Getmose zq_reset_Getmensi"  id="" href="javascript:;">确定</div>');
}

$('#reset_key_tou').bind('input propertychange', function() {check_two();}); 


//修改密码
$("#amend").click(function(){
	var Password    =  $("#reset_key").val();
	var newPassword =  $("#reset_key_tou").val();
	var userId      =  localStorage.getItem("userId"); 
	if( Password!="" && Password!=null && Password==newPassword ){
		
		var data = {"id":userId,"Password":newPassword};
		$.ajax({
			url:dataLink+"platformUser/updateUser",
			data:data,
		
			type:"post",
			timeout:1000,
			async:true,
			dataType:"json",
			success:function(result){
				if(result.msg=="success"){
				    window.location.href=skipHttp+"index.html";
				}else{
					   $("#reset_key_tou").val("");
				}
			  
			     
			}
		});
		
	}else{
	     $("#reset_key_tou").val("");
	}
})

//验证是否是注册用户
$("#check_account").click(function(){
	var tel = $("#mobile").val();
	if (mobile(tel)) {
		var data = {"tel":tel};
		$.ajax({
			type : "get",
			url:dataLink+"platformUser/getUser",
			data:data, 
		    dataType : "json",
			success:function(result){
				if(result.msg=="success"){
					if (result.use == null) {
						$("#is_tel").hide();
						$("#tel_null").hide();
						$("#no_tel").show();
						//setTimeout("$('#no_tel').hide()",3000);
						$("#mobile").val("");
					}else{
						$("#tel_null").hide();
						$("#is_tel").hide();
						$("#no_tel").hide();
						startMove();
						note();
					}
					
				}
			  
			     
			}
		});
	}else if(tel == null || tel=="") {
		$("#tel_null").show();
		$("#is_tel").hide();
		$("#no_tel").hide();
	}else{
		$("#tel_null").hide();
		$("#no_tel").hide();
		$("#is_tel").show();
		//setTimeout("$('#is_tel').hide()",3000);

	}
	
})

//短信验证
function note(){
	var tel = $("#mobile").val();
	var data = {"tel":tel};
	$.ajax({
		type : "get",
		url:dataLink+"validation/getValidCodebyPhone",
		data:data, 
	    dataType : "json",
		success:function(result){
			if(result.msg=="success"){
				
			}
		  
		     
		}
	});
};

//进入修改密码页面
$("#is_code").click(function(){
	var tel = $("#mobile").val();
	var validated = $("#code_mose").val();
	var data = {"tel":tel,"validated":validated};
	$.ajax({
		type : "get",
		url:dataLink+"validation/getTelCode",
		data:data, 
	    dataType : "json",
		success:function(result){
			if(result.msg=="success"){
				if (result.code != null) {
					var userId=result.userId;
					localStorage.setItem("userId",userId);
					window.location.href=skipHttp+"resetkey.html";
				}else{
				     $(".zq_code_tile").show();
					//setTimeout("$('.zq_code_tile').hide()",3000);
				}
			}
		  
		     
		}
	});
})


//手机号验证码是否存在
function is_code_no(){
	var code    =  $("#code_mose").val();
	var tel =  $("#mobile").val();
	if(mobile(tel) && check_code(code) && code!="" && code != null && tel !=null && tel!=""){
		$("#is_code").html("");
		$("#is_code").html('<div class="zq_reset_Getmose zq_reset_Getmensi" href="javascript:;">下一步</div>');
	}else{
		$("#is_code").html("");
		$("#is_code").html('<div class="zq_reset_Getmose" href="javascript:;">下一步</div>');
		}
};
//输入框实时输入触发事件
$('#code_mose').bind('input propertychange', function() {is_code_no();}); 



