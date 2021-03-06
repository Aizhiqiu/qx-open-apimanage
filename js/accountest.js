var img_url ="";
var userId=localStorage.getItem("userId");
var userIdentity = localStorage.getItem("userIdentity");
var isApprovez = localStorage.getItem("isApprove");
//取消弹窗
$(".alert_remove").click(function(){
	$(".zq_alert").hide();
	$(".zq_name_val").val("");
});


$(function(){
	verificationUserLogin();
	$(".aq_is_approve").hide();
	$(".zq_approve_to").hide();
	$(".zq_photo_upload").hide();
	if(userIdentity==6){
		$(".to_authenticate").click(function(){
			sessionStorage.setItem("thisnavleft",4);
			window.location.href="authenticate.html";
		});
		$(".zq_business").hide();
		$(".Altn_unauthorized").show();
	}else{
		getUserInfoById(userId);	
	}
	
});
	


function getUserInfoById(userId){
	
	var data = {"userId":userId};
	 $.ajax({
		   type : "get",
	       url:dataLink+"userInfo/getUserInfoById", 
	       data:data, 
	       dataType : "json",
	       success : function(json){
	    	   if(json.msg="success"){
	    		   
	    		var userInfo = json.userInfo;
	    		
	    		$(".zq_developer_name").html(userInfo.developerName);
	    		$(".info_name").html(userInfo.userName);
	    		$(".info_card").html(userInfo.cardNumber);
	    		localStorage.setItem("userName",userInfo.developerName);
    			 if(userInfo.usernameTimeStr ==0 || isApprovez ==2){
    				 $('.zq_modify_name a').removeClass();
    			 }
    			 if(userInfo.developerTimeStr ==0 || isApprovez ==2){
    				 $('.zq_modify_developer a').removeClass();
    			 }
    			 if(userInfo.isApprove==1){
    				 $(".approve_formright").html("已认证");
    				// $(".aq_is_approve").html("已认证");
    				// $(".zq_approve_to").hide();
    			 }else if(userInfo.isApprove==0){
    				 $(".aq_is_approve").show();
    				 $(".zq_approve_to").show();
    				 $(".aq_is_approve").html("未认证");
    				//跳转到去认证页面
    				 $(".zq_alert_ba").click(function(){
    					 sessionStorage.setItem("thisnavleft",4);
    				 	window.location.href="authenticate.html";
    				 });
    			 }else if(userInfo.isApprove==2){
    				 $(".approve_formright").html("认证中");
    				// $(".aq_is_approve").html("认证中");
    				//$(".zq_approve_to").hide();
    			 }else if(userInfo.isApprove==3){
    				 $(".approve_formright").html("未通过认证");
     				 
     			 }
    			 if(isnull(userInfo.cardUrl)){
    				 $(".zq_carurl").html("立即上传");
    				 $(".zq_carurl").addClass("zq_carurlGet");
    				 $(".zq_carurl").click(function(){
                         $(".zq_photo_upload").show();
    				 });
    				//下一步点击事件
    				 $(".zq_upload_photoGet").click(function(){
    				 	$(".zq_upload_tabto").hide();
    				 	$(".zq_thir_tabto").show();
    				 	$(".upload_tab li").removeClass("upload_tab_this");
    				 	$(".upload_tab li").eq(1).addClass("upload_tab_thes");
    				 });
    				 //点击上一步
    				 $(".zq_cofirm_col").click(function(){
    				 	$(".zq_upload_tabto").show();
    				 	$(".zq_thir_tabto").hide();
    				 	$(".upload_tab li").removeClass("upload_tab_thes");
    				 	$(".upload_tab li").eq(0).addClass("upload_tab_this");
    				 });
    				 //点击取消
    				 $(".zq_upload_cancel ").click(function(){
    				 	$(".zq_upload_tabto").show();
    				 	$(".zq_thir_tabto").hide();
    				 	$(".upload_tab li").removeClass("upload_tab_thes");
    				 	$(".upload_tab li").eq(0).addClass("upload_tab_this");
    				 	$(".zq_photo_upload").hide();
    				 });
    			 }else{
    				 $(".zq_carurl").html("已上传");
    			 }
    			 
    			//修改名称
    			 $(".zq_name_sent").click(function(){
    			 	$(".zq_alertS").show();
    			 });
    			 //修改负责人
    			 $(".zq_name_Ent").click(function(){
    			 	$(".zq_alertSen").show();
    			 });
    			 
	    	   }
	       }
	   });
}


$(".get_developer_to").click(function(){
	var developerName = $(".name_developer_inp").val();
	if(!isnull(developerName)){
		if(!/^[\u4e00-\u9fa5]+$/.test(developerName)){
			if(developerName.length<4||developerName.length>60){
				$(".zq_name_deve").html("第三方开发者名称必须在2-30个字之间");
				return false;
			}
		}else{
			if(developerName.length<2||developerName.length>30){
				$(".zq_name_deve").html("第三方开发者名称必须在2-30个字之间");
				return false;
			}
		}
	}else{
		$(".zq_name_deve").html("第三方开发者名称不能为空");
		return false;
	}
	var data = {"userId":userId,"developerName":developerName,"userIdentity":userIdentity};
	updateUserInfo(data);
});


$(".get_name_to").click(function(){
	var userName = $(".name_text_inp").val();
	if(!isnull(userName)){
		if(userName.length<2||userName.length>6){
			$(".zq_name_info").html("姓名长度为2-6个汉字");
			return false;
		}
		if(!/^[\u4e00-\u9fa5]+$/.test(userName)){
			$(".zq_name_info").html("姓名必须为中文");
			return false;
		}
	}else{
		$(".zq_name_info").html("姓名不能为空");
		return false;
	}
	var data = {"userId":userId,"userName":userName,"userIdentity":userIdentity};
	updateUserInfo(data);
});


function updateUserInfo(data){
	
	$.ajax({
		   type : "post",
	       url:dataLink+"userInfo/updateUserInfo", 
	       data:data, 
	       dataType : "json",
	       success : function(json){
	    	   if(json.msg="success"){
	    		   $(".zq_alertS").hide();
	    		   $(".zq_alertSen").hide();
	    		   window.location.href="accountset.html";
	    	   }
	       }
	});
}


var _richText={
		_upload:function(){
			$("#post_party_content_upload").attr("action",dataLink+"post_image");	//赋予form表单上传地址
			//校验图片是否符合格式
			if(_upload._limit(document.getElementById("post_party_content_upload_file").value)){//得到本地图片路径
				alert("只能选择图片文件");
				return;
			}
			$("#post_party_content_upload").submit();
		},
		_uploadOk:function(state,errorCode,saveUrl){
			//alert(saveUrl);
		  	$('.zq_upload_thirphoto').attr('src',imageHeadSrc+saveUrl);
		  	img_url = saveUrl;
		  //	alert(img_url);
		  	
		}
	};
//校验图片上传类型
var _upload={
	_limit:function(path){
		return path.match(/\.(gif|jpg|jpeg|png)$/i)==null;
	},
	_ok:null
};


function upload_img_over(){
	$("#upload_img_oo").attr('src',imageHeadSrc+img_url);
}

function update_img_info(){
	if(!isnull(img_url)){
		var data = {"userId":userId,"cardUrl":img_url};
		updateUserInfo(data);	
	}else{
		alert("上传失败，请重新上传！");
		window.location.href="accountset.html";
	}
	
}



