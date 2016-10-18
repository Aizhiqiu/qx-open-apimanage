var userId = localStorage.getItem("userId");
var user_dentity = localStorage.getItem("userIdentity");
var upload_img_url = "";
var date_img_url = "";
//跳转到个人用户
$(".zq_genbase").click(function(){
	if(user_dentity!="1"){
		window.location.href=skipHttp+"addmessage.html";
	}
});
//弹出弹窗
$(".zq_photo_get").click(function(){
	$(".zq_photo_upload").show();
	date_img_url="";
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
	date_img_url="1";
	$("#upload_word").html("点击上传");
	$('.zq_upload_thirphoto').attr('src','img/upload_example2.png');
});

$(function(){
	//用户修改跳转
	if(!isnull(user_dentity)){
		if(user_dentity=="0"||user_dentity=="1"){
			loadBasicUserInfo();
		}
	}
})
function loadBasicUserInfo(){
	var data={"userId":userId};
	 $.ajax({
     url:dataLink+"userInfo/loadBasicUserInfo", 
     type : "get",
     dataType: 'json',
     data:data, 
     success : function(date){
    	 if(date.msg=="success"){
    		var userInfo = date.userInfo;
    		$("#third_responsible_name").val(userInfo.developerName);
    		$("#third_user_name").val(userInfo.userName);
    		if(!isnull(userInfo.cardUrl)){
    			upload_img_url = userInfo.cardUrl;
    			$("#upload_word").html("已上传")
    			$('.zq_upload_thirphoto').attr('src',imageHeadSrc+userInfo.cardUrl);
    		}
    	 }                              
     }
	});
}



//图片上传
var _richText={
	_upload:function(obj){
		var text="";
		var len = obj.files.length
		for (var i =0 ; i < len ; i++){
	            text +=obj.files[i].size/1024/1024;
	    }
	    var _file_size=decimal(text,2);
		
		$("#post_party_content_upload").attr("action",dataLink+"post_image");	//赋予form表单上传地址
		//校验图片是否符合格式
		if(_upload._limit(document.getElementById("post_party_content_upload_file").value)){//得到本地图片路径
			alert("只能选择图片文件");
			return;
		}
		if(_file_size<=5){
			$("#upload_max_error").hide();
			$("#post_party_content_upload").submit();
		}else{
			$("#upload_max_error").show();
		}
	},
	_uploadOk:function(state,errorCode,saveUrl){
		if(isnull(date_img_url)){
			upload_img_url = saveUrl;
			$("#upload_word").html("已上传")
			$('.zq_upload_thirphoto').attr('src',imageHeadSrc+saveUrl);
		}
	}
};
//校验图片上传类型
var _upload={
	_limit:function(path){
		return path.match(/\.(gif|jpg|jpeg|png)$/i)==null;
	},
	_ok:null
};
//num表示要四舍五入的数,v表示要保留的小数位数。  
function decimal(num,v)  
{  
    var vv = Math.pow(10,v);  
    return Math.round(num*vv)/vv;  
}  
//验证第三方开发者姓名
$("#third_user_name").blur(function(){ 
	cerifyReName();
});

//负责人姓名
$("#third_responsible_name").blur(function(){ 
	cerifyFuName();
});
function uploadOk(){
	$(".zq_photo_upload").hide();
	date_img_url="";
}
function uploadNo(){
	$(".zq_photo_upload").hide();
	$('.zq_upload_thirphoto').attr('src','img/upload_example2.png');
	upload_img_url="";
	date_img_url="1";
	$("#upload_word").html("点击上传")
}
function cerifyFuName(){
	var userName = $("#third_responsible_name").val();
	var errorId = "zq_error_msg";
	$("#"+errorId).html("");
	if(!isnull(userName)){
		if(!/^[\u4e00-\u9fa5]+$/.test(userName)){
			$("#"+errorId).html("用户姓名必须为中文");
			$("#"+errorId).show();
			return false;
		}
		if(userName.length<2||userName.length>6){
			$("#"+errorId).html("姓名必须在2-6个汉字之间");
			$("#"+errorId).show();
			return false;
		}
	}else{
		$("#"+errorId).html("请填写负责人姓名");
		$("#"+errorId).show();
		return false;
	}
	$("#"+errorId).hide();
	return true;
}

function cerifyReName(){
	var userName = $("#third_user_name").val();
	var errorId = "third_error_msg";
	$("#"+errorId).html("");
	if(!isnull(userName)){
		if(!/^[\u4e00-\u9fa5]+$/.test(userName)){
			if(userName.length<4||userName.length>60){
				$("#"+errorId).html("第三方开发者名称必须在2-30个字之间");
				$("#"+errorId).show();
				return false;
			}
		}else{
			if(userName.length<2||userName.length>30){
				$("#"+errorId).html("第三方开发者名称必须在2-30个字之间");
				$("#"+errorId).show();
				return false;
			}
		}
	}else{
		$("#"+errorId).html("请填写第三方开发者名称");
		$("#"+errorId).show();
		return false;
	}
	$("#"+errorId).hide();
	return true;
}

function hide(idName){
	$("#"+idName).hide();
}
function thirdSubmit(){
	var is_approve = 2;
	if($("#no_examine").hasClass("zq_tication_tow")){
		is_approve = 0;
	}
	var thirdName = $("#third_user_name").val();
	var responsibleName = $("#third_responsible_name").val();
	var card_url = "";
	if(isnull(upload_img_url)){
		$("#img_error_msg").html("未上传营业执照");
		$("#img_error_msg").show();
	}else{
		$("#img_error_msg").hide();
	}
	if(cerifyReName()&&cerifyReName()&&!isnull(upload_img_url)){
		var data={"userName":responsibleName,"developerName":thirdName,"cardUrl":upload_img_url,"type":1,"userId":userId,"isApprove":is_approve};
		$.ajax({
	    url:dataLink+"userInfo/addUserInfo", 
	    type : "get",
	    dataType: 'json',
	    data:data, 
	    success : function(date){
	    	if(date.msg=="success"){
	    		//用户姓名
	     		localStorage.setItem("userName",date.user_name);
	     		//认证状态
	     		localStorage.setItem("isApprove",is_approve);
	     		localStorage.setItem("userIdentity",1);
	     		window.location.href= skipHttp+"joinsuccess.html";
     	    }
	    }
		});
	}
	
}
function skipSuccess(){
	var data={"type":6,"userId":userId,"skipType":1};
	$.ajax({
    url:dataLink+"userInfo/addUserInfo", 
    type : "get",
    dataType: 'json',
    data:data, 
    success : function(date){
    	if(date.msg=="success"){
    		localStorage.setItem("userIdentity",6);
    		localStorage.setItem("isApprove",0);
     		window.location.href= skipHttp+"joinsuccess.html";
 	    }
    }
	});
}

//点击是否认证
$(".zq_tication").click(function(){
	$(".zq_tication").removeClass("zq_tication_tow");
	$(this).addClass("zq_tication_tow");
});
