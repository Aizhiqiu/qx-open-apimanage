$(function(){
	verificationUserLogin();
//	提交审核弹窗点击确定
	$(".Altn_referto_sure").click(function(){
		$(".Altn_referto").hide();
	});
//	提交审核弹窗点击取消
	$(".Altn_referto_no").click(function(){
		$(".Altn_referto").hide();
	});

//	应用信息-点击关闭按钮关闭弹窗
	$(".Altn_info_title img").click(function(){
		$(".Altn_info").hide();
	});
//	应用信息点击确定按钮
	$(".Altn_info_sure").click(function(){
		$(".Altn_info").hide();
	});

//	退回原因-点击关闭按钮关闭弹窗
	$(".Altn_return_title img").click(function(){
		$(".Altn_return").hide();
	});
	//	提交审核-点击关闭按钮关闭弹窗
	$(".Altn_referto_title img").click(function(){
		$(".Altn_referto").hide();
	});
//	应用信息点击确定按钮
	$(".Altn_return_sure").click(function(){
		$(".Altn_return").hide();
	});	
	_init._data();
	_operat._app_add();
	_verifyvt._all_param();
	_operat._go();
	
});



/**
 *初始化应用管理数据
*/
var _init={
		_data:function(){
				var userId = localStorage.getItem("userId");
				
				var _url=dataLink+"app/init";
				var _param={"userId":userId};
				//发送ajax请求
				_asyn(_url,_param,"get",_init._Ok);
		},
		_Ok:function(json, code){
			console.info(json);
		 if(json.msg=="success"){
		 	$("#create_num").html("每个账号最多只能创建"+json.appNumber+"个应用");
		 	var _isApprove=localStorage.getItem("isApprove");
		 	 var _list=json.appList;
		 	if(_isApprove==0||_isApprove==2||_isApprove==3){ //未认证
		 		$(".Altn_unauthorized").show();
		 		$(".Altn_title").find("span").removeClass("Altn_found");
		 	 	$(".Altn_title").find("span").addClass("Altn_found_two");
		 	}else if(_isApprove==1&&_list.length==0){
		 		$(".Altn_nocontent").show();
		 		$(".Altn_found").show();
		 	}else if (_isApprove==1&&_list.length>0) {
		 		$(".Altn_innercenter").show();
		 		$(".Altn_found").show();
		 	}
		 	 if (json.limit==1) {
		 	 	$(".Altn_title").find("span").removeClass("Altn_found");
		 	 	$(".Altn_title").find("span").addClass("Altn_found_two");

		 	 }else{
		 	 	_operat._app_show();
		 	 }
		  
		   for (var i = 0; i < _list.length; i++) {
		    	var _item=_list[i];
		    	//var _state_str=_init._show(_item);
		   		var _html='<ul class="Altn_substance">';
		   	   _html+='<li class="Altn_one">'+_item.applyName+'</li>';
		   	   $(".Altn_innercenter").append(_init._show(_item,_html));
		 	}
		 	_app._show_info();
		 	_operat._referto_show();
		 	_operat._cause_show();
		 	_operat._edit_info();
		 	_operat._app_close();

		 	
		}

   },
	   _show:function(_item,_html){
	   	   
	   		switch(_item.auditStatus){
	   			case 0:
	   			_html+='<li class="Altn_two">'+"未提交审核"+'</li>';
	   			_html+='<li class="Altn_three">';
	   			_html+='<span class="Altn_three_use blue"><p style="display: none;" class="zq_app">'+_item.id+'</p>应用信息</span>';
	   			_html+='<span class="Altn_three_edit blue">编辑</span>';
		   	    _html+='<span class="Altn_three_referto blue">提交审核</span>';
		   	    _html+='<span >退回原因</span>';
		   	    _html+='</li></ul>';
	   			break;
	   			case 1:
	   			_html+='<li class="Altn_two">'+"审核中"+'</li>';
	   			_html+='<li class="Altn_three">';
	   			_html+='<span class="Altn_three_use blue"><p style="display: none;" class="zq_app">'+_item.id+'</p>应用信息</span>';
	   			_html+='<span>编辑</span>';
		   	    _html+='<span >提交审核</span>';
		   	    _html+='<span >退回原因</span>';
		   	    _html+='</li></ul>';
	   			break;
	   			case 2:
	   			_html+='<li class="Altn_two">'+"审核不通过"+'</li>';
	   			_html+='<li class="Altn_three">';
	   			_html+='<span class="Altn_three_use blue"><p style="display: none;" class="zq_app">'+_item.id+'</p>应用信息</span>';
	   			_html+='<span class="Altn_three_edit blue">编辑</span>';
		   	    _html+='<span class="Altn_three_referto blue">提交审核</span>';
		   	    _html+='<span class="Altn_three_cause blue">退回原因</span>';
	   			break;
	   			default:
	   			_html+='<li class="Altn_two">'+"审核通过"+'</li>';
	   			_html+='<li class="Altn_three">';
	   			_html+='<span class="Altn_three_use blue"><p style="display: none;" class="zq_app">'+_item.id+'</p>应用信息</span>';
	   			_html+='<span class="Altn_three_edit blue">编辑</span>';
		   	    _html+='<span>提交审核</span>';
		   	    _html+='<span>退回原因</span>';
	   			
	   		}
	   		return _html;
	   }
}

var _app={
	//创建应用
   _create:function(appId){
   		var userId = localStorage.getItem("userId");
	   var _app_name=$(".Altn_apply_name").find("input").val();
	   var _app_url=$(".Altn_apply_access").find("input").val();
	   var _conext=$(".Altn_apply_present").find("textarea").val();
	 if (_verifyvt._apply_name(_app_name)&&_verifyvt._apply_logo(_logo)&&_verifyvt._apply_access(_app_url)&&_verifyvt._apply_present(_conext)) {
	   var _url=dataLink+"app/save";
			var _param={"id":appId,"userId":userId,"applyName":_app_name,"applyUrl":_app_url,"applyIntroduce":_conext,"applyLogo":_logo};
			_asyn(_url,_param,"post",_app._Ok,1);
		}
	  
   },
	 _show_info:function(){
   	//	点击应用信息按钮弹出弹窗
	 $(".Altn_three_use").click(function(){
	 	var userId = localStorage.getItem("userId");
		var _app_id=$(this).find(".zq_app").html();
			
			var _url=dataLink+"app/getApplyinfo";
			var _param={"userId":userId,"id":_app_id};
			//发送ajax请求
			_asyn(_url,_param,"get",_app._Ok,2);
		 
	  })
   },
   _sumbmit:function(appId){//提交审核
   	$(".Altn_referto_sure").click(function(){
   	   var userId = localStorage.getItem("userId");
   	   	 
   	   	  var _url=dataLink+"app/operation";
			var _param={"userId":userId,"id":appId};
			//发送ajax请求
			_asyn(_url,_param,"post",_app._Ok,3);
   	});
   },
   _cause_info:function(appId){//退回原因
   		 var userId = localStorage.getItem("userId");
   	   	  var _url=dataLink+"app/getApplyinfo";
			var _param={"userId":userId,"id":appId};
			//发送ajax请求
			_asyn(_url,_param,"get",_app._Ok,4);
   },
   _edit_info:function(appId){//编辑
   	 var userId = localStorage.getItem("userId");
   	   	 
   	var _url=dataLink+"app/getApplyinfo";
	var _param={"userId":userId,"id":appId};
			//发送ajax请求
	_asyn(_url,_param,"get",_app._Ok,5);
   },
   _Ok:function(json, code,type){ 
   		if(json.msg=="success"){
   			switch(type){
	   			case 1: //创建应用
	   					_operat._app_close();
   						_g("application.html");
	   			break;
	   			case 2://获取应用信息
	   				var _obj=eval(json);
		   			var _app_id=_obj.app.appId;
		   			var _app_secret=_obj.app.appSecret;
		   			$(".Altn_info_font").find("i").html(_app_id);
		   			$(".Altn_info_fonttwo").find("i").html(_app_secret);
		   			$(".Altn_info").show();
	   			break;
	   			case 3:
	   				_g("application.html");
	   			break;
	   			case 4:
	   			var _obj=eval(json);
	   			$(".Altn_return_font").html(_obj.app.rejectReason);
	   				$(".Altn_return").show();
	   			break;
	   			case 5:
	   			_verifyvt._clear();
	   			var _obj=eval(json);
				$(".personal_newimg").html("点击重新上传");
	   			$(".Altn_apply_header").find("span").html("编辑应用");
				$(".Altn_apply_logo div").eq(0).removeClass("Altn_apply_logo_btn").addClass("Altn_apply_logo_photo");
				$(".Altn_apply_logo_no").addClass("Altn_apply_logo_photobtn");
		 		$(".Altn_apply_logo_photobtn").show();
		 		$(".Altn_apply_logo_bg").show();
		 		$(".Altn_apply_logo_img").show();
	   			   $(".Altn_apply_name").find("input").val(_obj.app.applyName);
	   			    $(".Altn_apply_access").find("input").val(_obj.app.applyUrl);
	 				$(".Altn_apply_present").find("textarea").val(_obj.app.applyIntroduce);
					_logo=_obj.app.applyLogo;
	 				$(".Altn_apply_logo_photo img").attr("src",imageHeadSrc+_obj.app.applyLogo);
	 				$(".Altn_apply_logo").addClass("Altn_apply_logo_two");
					$(".Altn_apply_logo_btn").hide();
					$(".Altn_apply_logo_photo").show();
	   			    $(".Altn_apply").show();
	   			break;
	   			default:
	   			
	   		}
   			
   		}
   }
}

//上传海报
     var _logo="";
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
		 if(state==1){
				$(".personal_newimg").html("点击重新上传");
		 		$(".Altn_apply_logo div").eq(0).removeClass("Altn_apply_logo_btn").addClass("Altn_apply_logo_photo");
		 		$(".Altn_apply_logo_no").addClass("Altn_apply_logo_photobtn");
				$(".Altn_apply_logo_photobtn").show();
		 		$(".Altn_apply_logo_bg").show();
		 		$(".Altn_apply_logo_img").show();
				$(".Altn_apply_logo").addClass("Altn_apply_logo_two");
				$(".Altn_apply_logo_btn").hide();
				$(".Altn_apply_logo_photo").show();
				_logo=saveUrl;
				_verifyvt._apply_logo(_logo);
		 		$(".Altn_apply_logo_photo img").attr("src",imageHeadSrc+saveUrl);
		   }else{
				alert(errorCode);
			}
		 }
	};
		//校验图片上传类型
var _upload={
	_limit:function(path){
		return path.match(/\.(gif|jpg|jpeg|png|ico|bmp)$/i)==null;
	},
	_ok:null
};

//	点击创建应用按钮弹出弹窗
var _app_id_temp=null;  //null 创建  否则编辑
var _operat={
	 _app_add:function(){  //添加创建应用
	 		$(".Altn_apply_ok em").click(function(){
	 			_app._create(_app_id_temp);
	 	});
	 },
	 _app_show:function(){
	 	$(".Altn_found").click(function() {
			_logo="";
			_verifyvt._clear();
			$(".personal_newimg").html("上传图片");
	 		$(".Altn_apply_header").find("span").html("创建应用");
	 		$(".Altn_apply_name").find("input").val("");
	   		$(".Altn_apply_access").find("input").val("");
	 		$(".Altn_apply_present").find("textarea").val("");
			$(".Altn_apply_logo div").eq(0).removeClass("Altn_apply_logo_photo").addClass("Altn_apply_logo_btn");
			$(".Altn_apply_logo_no").removeClass("Altn_apply_logo_photobtn");
			$(".Altn_apply_logo_photobtn").hide();
			$(".Altn_apply_logo_bg").hide();
			$(".Altn_apply_logo_img").hide();
	 		_app_id_temp=null;
			$(".Altn_apply").show();
		}); 
	 },
	//	创建应用-点击关闭按钮关闭弹窗
	 _app_close:function(){
	$(".Altn_apply_header img").click(function(){
		$(".Altn_apply").hide();
	    });
	 },
	 _referto_show:function(){
	 		//	点击提交审核,弹出弹窗
	$(".Altn_three_referto").click(function(){
		var _app_id=$(this).parent().find(".zq_app").html();
		$(".Altn_referto").show();
		_app._sumbmit(_app_id);
	});
  },
  //	点击退回原因按钮弹出弹窗
  _cause_show:function(){
  	$(".Altn_three_cause").click(function(){
  		var _app_id=$(this).parent().find(".zq_app").html();
  		_app._cause_info(_app_id);
		
	});
  },
  //点击编辑
 _edit_info:function(){
 	$(".Altn_three_edit").click(function(){
 		var _app_id=$(this).parent().find(".zq_app").html();
 		_app_id_temp=_app_id;
 		_app._edit_info(_app_id);

 	});
 },
 _go:function(){
 	$(".blue").click(function(){
		sessionStorage.setItem("thisnavleft",4);
 		_g("authenticate.html");
 	});
 }
}
var _verifyvt={
	_apply_name:function(_app_name){
		 var _flag=true;
	   	  if(isnull(_app_name)==true){
	   	  	$(".Altn_apply_name p").html("请输入应用名称");
	   	  	_flag=false;
	   	  }else if(!centen(_app_name,4,80)){
	   	  	 $(".Altn_apply_name p").html("名称必须在2-40个字之间");
	   	  	 _flag=false;
	   	  }
	   	  isnull(_app_name)==true?$(".Altn_apply_name p").show():$(".Altn_apply_name p").hide();
	   	  centen(_app_name,4,80)==false?$(".Altn_apply_name p").show():$(".Altn_apply_name p").hide();
	   	 
	   	  //centen
	   	 return _flag;
	},
	_apply_logo:function(_logo){
		isnull(_logo)==true?$(".Altn_apply_logo i").html("请上传logo图片"):$(".Altn_apply_logo i").html("");
		isnull(_logo)==true?$(".Altn_apply_logo i").show():$(".Altn_apply_logo i").hide();
		return isnull(_logo)==true?false:true;
	},
	_apply_access:function(apply_access){
		var _flag=true;
		 if (isnull(apply_access)==true) {
		 	 $(".Altn_apply_access p").html("请填写访问地址");
		 	 	_flag=false;
		 }else if (!_check._url(apply_access)) {
		 		 $(".Altn_apply_access p").html("请填写正确访问地址");
		 		 	_flag=false;
		 }else if(!centen(apply_access,4,300)){
	   	  	 $(".Altn_apply_name p").html("访问地址必须在2-50个字之间");
	   	  	 	_flag=false;
	   	  }
	   	  isnull(apply_access)==true?$(".Altn_apply_access p").show():$(".Altn_apply_access p").hide();
	   	  _check._url(apply_access)==false?$(".Altn_apply_access p").show():$(".Altn_apply_access p").hide();
	   	 return _flag;
	   	},
	_apply_present:function(_present){
		var _flag=true;
		 	if(isnull(_present)==true){
	   	  		$(".Altn_apply_present p").html("请填写介绍");
	   	  		_flag=false;
	   		  }else if (!centen(_present,4,300)) {
	   		 	$(".Altn_apply_present p").html("介绍必须在2-150个汉字之间");
	   		 	_flag=false;
	   		 }
		    isnull(_present)==true?$(".Altn_apply_present p").show():$(".Altn_apply_present p").hide();
		    centen(_present,4,300)==false?$(".Altn_apply_present p").show():$(".Altn_apply_present p").hide();
		return _flag;
	},
	_all_param:function(){
		$(".Altn_apply_name").find("input").blur(function(){
	   	  var _access=$(this).val();
	   	  //isnull(_access)==true?$(".Altn_apply_name p").show():$(".Altn_apply_name p").hide();
	   	  if(isnull(_access)==true){
	   	  	$(".Altn_apply_name p").html("请输入应用名称");
	   	  
	   	  }else if(!centen(_access,4,80)){
	   	  	 $(".Altn_apply_name p").html("名称必须在2-40个字之间");
	   	  }
	   	  isnull(_access)==true?$(".Altn_apply_name p").show():$(".Altn_apply_name p").hide();
	   	  centen(_access,4,80)==false?$(".Altn_apply_name p").show():$(".Altn_apply_name p").hide();
	   });
		$(".Altn_apply_access").find("input").blur(function(){
	   	  var _access=$(this).val();
	   	   if (isnull(_access)==true) {
		 	 $(".Altn_apply_access p").html("请填写访问地址");
		 	 
		 }else if (!_check._url(_access)) {
		 		 $(".Altn_apply_access p").html("请填写正确访问地址");
		 		 	
		 }else if(!centen(_access,4,300)){
	   	  	 $(".Altn_apply_name p").html("访问地址必须在2-50个字之间");
	   	  	 
	   	  }
	   	  isnull(_access)==true?$(".Altn_apply_access p").show():$(".Altn_apply_access p").hide();
	   	  _check._url(_access)==false?$(".Altn_apply_access p").show():$(".Altn_apply_access p").hide();
	   });
		$(".Altn_apply_present").find("textarea").blur(function(){
	   		  var _present=$(this).val();
	   		  if(isnull(_present)==true){
	   	  		$(".Altn_apply_present p").html("请填写介绍");
	   		  }else if (!centen(_present,4,300)) {
	   		 	$(".Altn_apply_present p").html("介绍必须在2-150个汉字之间");
	   		 }
		    isnull(_present)==true?$(".Altn_apply_present p").show():$(".Altn_apply_present p").hide();
		    centen(_present,4,300)==false?$(".Altn_apply_present p").show():$(".Altn_apply_present p").hide();
	   		 
	   });
	},
	_clear:function(){
	$(".Altn_apply_name p").html("");
	$(".Altn_apply_logo i").html("")
	$(".Altn_apply_access p").html("");
	$(".Altn_apply_present p").html("");
	}
}
  

