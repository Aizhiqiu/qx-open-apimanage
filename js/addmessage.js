var userId = localStorage.getItem("userId");
var user_dentity = localStorage.getItem("userIdentity");
var upload_img_url = "";
var date_img_url = "";
//弹窗弹出
$(".zq_photo_get").click(function(){
	$(".zq_photo_upload").show();
	date_img_url = "";
});
//关闭弹窗
$(".zq_upload_cancel ").click(function(){
	$(".zq_photo_upload").hide();
	upload_img_url="";
	date_img_url="1"
	$("#upload_word").html("点击上传");
	$('#upload_img_load').attr('src','img/upload_example1.png');
});
//点击下一步的时候
$(".zq_upload_photoGet").click(function(){
	$(".zq_upload_tabtois").hide();
	$(".zq_upload_confirm").show();
	$(".upload_tab li").removeClass("upload_tab_this");
	$(".upload_tab li").eq(1).addClass("upload_tab_thto");
});  

//点击上一步的时候
$(".zq_cofirm_col").click(function(){
	$(".zq_upload_confirm").hide();
	$(".zq_upload_tabtois").show();
	$(".upload_tab li").removeClass("upload_tab_thto");
	$(".upload_tab li").eq(0).addClass("upload_tab_this");
});
//跳转到第三方开发者登记信息
$(".zq_third").click(function(){
	if(user_dentity!="0"){
		window.location.href=skipHttp+"thirdparty.html";
	}
});
//验证姓名
$("#user_info_name").blur(function(){
	cerifyReName();
});
//验证身份证号
$("#user_info_cardnum").blur(function(){
	cerifyCardNum();
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
    		$("#user_info_name").val(userInfo.userName);
    		$("#user_info_cardnum").val(userInfo.cardNumber);
    		if(!isnull(userInfo.cardUrl)){
    			$('#upload_img_load').attr('src',userInfo.cardUrl);
    			$("#upload_word").html("已上传");
    			upload_img_url = userInfo.cardUrl;
    		}
    	 }                              
     }
	});
}
function uploadOk(){
	date_img_url = "";
	$(".zq_photo_upload").hide();
}
function uploadNo(){
	$(".zq_photo_upload").hide();
	$('#upload_img_load').attr('src','img/upload_example1.png');
	upload_img_url="";
	date_img_url="1";
	$("#upload_word").html("点击上传");
}
function cerifyCardNum(){
	var cardNum = $("#user_info_cardnum").val();
	var errorId = "zq_show_titletow";
	$("."+errorId).html("");
	if(!isnull(cardNum)){
		if(!check_card(cardNum)){
			$("."+errorId).html("请正确填写身份证号码");
			$("."+errorId).show();
			return false;
		}
	}else{
		$("."+errorId).html("请填写身份证号码");
		$("."+errorId).show();
		return false;
	}
	$("."+errorId).hide();
	return true;
}


function cerifyReName(userName,errorId){
	var userName = $("#user_info_name").val();
	var errorId = "zq_show_title";
	$("."+errorId).html("");
	if(!isnull(userName)){
		if(!/^[\u4e00-\u9fa5]+$/.test(userName)){
			$("."+errorId).html("用户姓名必须为中文");
			$("."+errorId).show();
			return false;
		}
		if(userName.length<2||userName.length>6){
			$("."+errorId).html("姓名必须在2-6个汉字之间");
			$("."+errorId).show();
			return false;
		}
	}else{
		$("."+errorId).html("请填写用户姓名");
		$("."+errorId).show();
		return false;
	}
	$("."+errorId).hide();
	return true;
}

function userInfoSubmit(){
	var is_approve = 2;
	if($("#no_examine").hasClass("zq_tication_tow")){
		is_approve = 0;
	}
	//type,0,企信用户 1,第三方开发者
	var user_name = $("#user_info_name").val();
	var user_cardNum = $("#user_info_cardnum").val();
	if(isnull(upload_img_url)){
		$(".zq_show_titlephoto").html("未上传身份证照片");
		$(".zq_show_titlephoto").show();
		setTimeout("hide('zq_show_titlephoto')",3000);
	}
	
	if(cerifyReName()&&cerifyCardNum()&&!isnull(upload_img_url)){
		var data={"userId":userId,"userName":user_name,"type":0,"cardNumber":user_cardNum,"cardUrl":upload_img_url,"isApprove":is_approve};
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
	     		localStorage.setItem("userIdentity",0);
	     		window.location.href= skipHttp+"joinsuccess.html";
	     	  }
	      }
		});
	}
}
function upload_img_over(){
	$("#upload_img_oo").attr('src',imageHeadSrc+upload_img_url);
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
			$("#upload_word").html("已上传");
			$('#upload_img_load').attr('src',imageHeadSrc+saveUrl);
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

function skipSuccess(){
	var data={"type":6,"userId":userId,"skipType":1};
	$.ajax({
    url:dataLink+"userInfo/addUserInfo", 
    type : "get",
    dataType: 'json',
    data:data, 
    success : function(date){
    	if(date.msg=="success"){
     		//认证状态
     		localStorage.setItem("isApprove",0);
     		localStorage.setItem("userIdentity",6);
     		window.location.href= skipHttp+"joinsuccess.html";
 	    }
    }
	});
}

function hide(idName){
	$("."+idName).hide();
}
//点击是否认证
$(".zq_tication").click(function(){
	$(".zq_tication").removeClass("zq_tication_tow");
	$(this).addClass("zq_tication_tow");
});


