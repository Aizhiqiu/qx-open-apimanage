var userId=localStorage.getItem("userId");
$(function(){
	 verificationUserLogin();
	 $(".sign_btn i").hide();
	 getUserInfoById(userId);
});
//弹窗提示
//关闭弹窗
$(".alert_remove").click(function(){
	$(".zq_alert").hide();
});
$(".zq_get_tow").click(function(){
	$(".zq_alert").hide();
});



function getUserInfoById(userId){
	
	var data = {"userId":userId};
	 $.ajax({
		   type : "get",
	       url:dataLink+"userInfo/getUserInfoById", 
	       data:data, 
	       dataType : "json",
	       success : function(json){
	    	   var userInfo = json.userInfo;
	    	 if(userInfo.isApprove==1){
	    		   $(".text_clo").html("已认证");
	    		   $(".sign_btnNot").show();
  			 }else if(userInfo.isApprove==0){
  				 $(".text_clo").html("未认证");
  				 $(".zq_hidden").show();
  			 }else if(userInfo.isApprove==2){
  				 $(".text_clo").html("认证中");
  			     $(".sign_btnOK").show();
  			 }else if(userInfo.isApprove==3){
  				 $(".text_clo").html("未认证");
  				 $(".zq_hidden").show();
  			 }
	    	 localStorage.setItem("isApprove",userInfo.isApprove);
	    //	  localStorage.setItem("user_identity",userInfo.type);
	    	 if(userInfo.type == 0){
	    		 //普通用户
	    		if(isnull(userInfo.userName) || isnull(userInfo.cardNumber) || isnull(userInfo.cardUrl) ){
	    			 $(".zq_sign_get").click(function(){
	    				$(".zq_Get_signis").attr("href",skipHttp+"addmessage.html");
	 	    			$(".zq_sign_B").show();
	 	    	    });
	    		}else{
	    			$(".zq_sign_get").click(function(){
	 	    			$(".zq_sign_A").show();
	 	    	    });
	    			
	    		}
	    		
	    	 }else if(userInfo.type == 1){
	    		 //第三方开发者
	    		 if(isnull(userInfo.userName) || isnull(userInfo.developerName) || isnull(userInfo.cardUrl) ){
	    			 $(".zq_sign_get").click(function(){
		    				$(".zq_Get_signis").attr("href",skipHttp+"thirdparty.html");
		 	    			$(".zq_sign_B").show();
		 	    	    });
	    		 }else{
	    			 $(".zq_sign_get").click(function(){
		 	    			$(".zq_sign_A").show();
		 	    	    });
	    		 }
	    	 }
	    	 
	       }
	 });
}

$(".zq_Get_sign").click(function(){
	var data = {"userId":userId,"isApproveStr":"2"};
	$.ajax({
		   type : "post",
	       url:dataLink+"userInfo/updateUserInfo", 
	       data:data, 
	       dataType : "json",
	       success : function(json){
	    	   if(json.msg="success"){
	    			   $(".zq_sign_A").hide();
	    			   localStorage.setItem("isApprove","2");
	    			   window.location.href="authenticate.html";
	    	   }
	       }
	});

});







