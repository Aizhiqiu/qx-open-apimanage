$(function(){
	verificationUserLogin();
//	点击客户选择弹出弹窗
	$(".Aht_client").click(function(){
		$(".Aht_empower").show();
	});
//	授权-点击关闭按钮关闭弹窗
	$(".Aht_empower_header img").click(function(){
		$(".Aht_empower").hide();
	});

	$(".Aht_head_one").click(function(){
		$(this).toggleClass("Aht_head_twoimg");
		if($(".Aht_head_one").hasClass("Aht_head_twoimg")){
			$(".Aht_headone").addClass("Aht_headone_imgtwo");
		}else{
			$(".Aht_headone").removeClass("Aht_headone_imgtwo");
		}
		
	});

//	点击上架出来上架弹窗
	$(".Aht_top").click(function(){
		$(".Aht_grounding").show();
	});
//	上架-点击关闭按钮关闭弹窗
	$(".Aht_grounding_header img").click(function(){
		$(".Aht_grounding").hide();
	});
//	上架-点击取消按钮关闭弹窗
	$(".Aht_grounding_btntwo").click(function(){
		$(".Aht_grounding").hide();
	});

//	下架-点击关闭按钮关闭弹窗
	$(".Aht_undercarriage img").click(function(){
		$(".Aht_undercarriage").hide();
	});
//	下架-点击取消按钮关闭弹窗
	$(".Aht_undercarriage_btntwo").click(function(){
		$(".Aht_undercarriage").hide();
	});

	_init._data();
});

/*
* 初始化授权应用列表
*
*/
var _init={
	_data:function(){
	
		var userId = localStorage.getItem("userId");
		
		var _url=dataLink+"authorize/appList";
		var _param={"userId":userId};
		//发送ajax请求
		 _asyn(_url,_param,"get",_init._Ok);
	},
	_Ok:function(json, code){
		if (json.msg=="success") {
			console.info(json);
			var _list=eval(json.appList);
			var _falg=json.identity==0||json.identity==1?0:1;
				_falg==0?$(".Aht_two").hide():$(".Aht_three").hide();
				$(".Aht_one").css("width","500px");
			for(var i=0;i<_list.length;i++){
				var _item=_list[i];
				var _html='<ul class="Aht_substance">';
					_html+='<li class="Aht_one"><p style="display: none;" class="zq_app">'+_item.applyId+'</p>'+_item.applyName+'</li>';
					_html+='<li class="Aht_three">'+_item.customers+'</li>';
					_html+=_init._show(_item);
					_html+='</li></ul>';
					$(".Aht_innercenter").append(_html);			
			}
			$(".Aht_one").css("width","500px");
			_operat._down();
			_operat._up();
			_operat._assig_show();
		}
	},
	_show:function(_item){
		var _html="";
	if (_item.auditStatus==3) {	
			switch(_item.shelfStatus){
					case 2:
					_html+='<li >下架</li>';
					_html+='<li class="Aht_five">';
					_html+=_item.customers==0?'<span>客户选择</span>':'<span class="Aht_client blue">客户选择</span>';
					_html+='<span class="Aht_top blue">上架</span>';
					break;
					default:
					_html+='<li >上架</li>';
					_html+='<li class="Aht_five">';
					//_html+='<span class="Aht_client blue">客户选择</span>';
					_html+=_item.customers==0?'<span >客户选择</span>':'<span class="Aht_client blue">客户选择</span>';
					_html+='<span class="Aht_edit blue">下架</span>';
			}
	}else{
		_html+='<li class="Aht_four">--</li>';
		_html+='<li class="Aht_five">';
		//_html+='<span class="Aht_client blue">客户选择</span>';
		_html+=_item.customers==0?'<span>客户选择</span>':'<span class="Aht_client blue">客户选择</span>';
		_html+='<span >上架</span>';
	 }	
		return _html;
	}
	
}
 
 var _app={
 	_app_down:function(_app_id,_type){
 		
		var _url=dataLink+"app/operation";
		var _param={"id":_app_id,"shelfStatus":_type};
		//发送ajax请求
		 _asyn(_url,_param,"post",_app._OK,_type);
 	},
 	_OK:function(json,code,type){
 		if (json.msg=="success") {
 			$(".Aht_undercarriage").hide();
 			$(".Aht_grounding").hide();
 			_g("authorization.html");
 		}
 	}
 }

var _operat={
	_down:function(){//	点击下架出来上架弹窗
	$(".Aht_edit").click(function(){
		var _app_id=$(this).parent().parent().find(".zq_app").html();
		$(".Aht_undercarriage").show();
		_operat._down_confirm(_app_id);
	 });
	},
	_up:function(){
		$(".Aht_top").click(function(){
			var _app_id=$(this).parent().parent().find(".zq_app").html();
			$(".Aht_grounding").show();
			_operat._up_confirm(_app_id);
		});
	},
	_down_confirm:function(_app_id){//	下架-点击确定按钮关闭弹窗
		$(".Aht_undercarriage_btnone").click(function(){
			_app._app_down(_app_id,2);
	  });
	},
	_up_confirm:function(_app_id){//	上架-点击确定按钮关闭弹窗
		$(".Aht_grounding_btnone").click(function(){
			//$(".Aht_grounding").hide();
			_app._app_down(_app_id,1);
		});
	},
	_assig_show:function(){//	点击客户选择弹出弹窗
		$(".Aht_client").click(function(){
			 localStorage.setItem("_currentPage",1);
			var _app_id=$(this).parent().parent().find(".zq_app").html();
			_assigned._custom(_app_id,1,0);
			$(".Aht_empower").show();
	  });
	},

  _choose:function(){
  	//	点击选择按钮
	$(".Aht_headone").click(function(){
		$(this).toggleClass("Aht_headone_imgtwo");
		if($(".Aht_headone").hasClass("Aht_headone_imgtwo")){
			$(".Aht_head_one").removeClass("Aht_head_twoimg");
		}
		if($(".Aht_headone").length == $(".Aht_headone_imgtwo").length){
			$(".Aht_head_one").addClass("Aht_head_twoimg");
		}
	});
  }

}

 

//选择授权客户
var _assigned={
	_custom:function(_app_id,_currentPage,abbreviated){
		 localStorage.setItem("_app_id",_app_id);
		var userId = localStorage.getItem("userId");
		
		var _url=dataLink+"authorize/defineAuthorize";
		var _param={"id":_app_id,"userId":userId,"currentPage":_currentPage,"isAbbreviated":abbreviated};
		//发送ajax请求
		 _asyn(_url,_param,"get",_assigned._Ok,"custom");
	},
	//授权
	_authorize:function(_arr){
		var _app_id= localStorage.getItem("_app_id");
		var _url=dataLink+"authorize/customer";
		var userId = localStorage.getItem("userId");
		var _currentPage=localStorage.getItem("_currentPage");
		var Json='"id":"'
				+_app_id
				+'","userId":"'
				+userId
				+'","currentPage":"'
				+_currentPage
				+'","isAbbreviated":"'
				+isAbbreviated
				+'",';
		var _param='{'+Json+'"authorityList":'+'['+_arr+']'+'}';
		console.info(_param);
		//发送ajax请求
		 _asyn_s(_url,_param,"post",_assigned._Ok,"authorize");
	},
	_Ok:function(json,code,type){
		if(type=="custom"){
			var _list =eval(json.pageInfo);
			$(".Aht_head_one").removeClass("Aht_head_twoimg");
			_list=_list.recordList;
			 $(".reslut").html("");
			  $(".zq_paging").html("");
			var _is_all=true;
			for(var i=0;i<_list.length;i++){
			var _item=_list[i];
			if(_item.isAuthorize!=1){
						_is_all=false
			}
			var _ctype=_item.ctype==0?"客户":"企信授权";  //Aht_headone_imgtwo
			var _html='<ul class="Aht_empower_substance">';
			    _html+=_item.isAuthorize==1?'<li class="Aht_headone Aht_headone_imgtwo"></li>':'<li class="Aht_headone"></li>';
			    _html+='<li class="Aht_headtwo"><p style="display: none;" class="zq_app">'+_item.id+'</p>'+_item.cName+'</li>';
			    _html+='<li class="Aht_headthree">'+_ctype+'</li>';
			    _html+='</ul>';
			    $(".reslut").append(_html);
			}
			_is_all==true?$(".Aht_head_one").addClass(" Aht_head_twoimg"):$(".Aht_head_one").removeClass("Aht_head_twoimg");
			_operat._choose();
		  $(".zq_paging").append(page(json));
		    _pageinationView._go(json.pageInfo.pageCount); 
		}
		if (type=="authorize") {
			$(".Aht_empower").hide();
		} 
	}
}


  //提交数据
    function pageinationView(currentPage){
      var _app_id= localStorage.getItem("_app_id");
      localStorage.setItem("_currentPage",currentPage);
      _assigned._custom(_app_id,currentPage,isAbbreviated);
}

var _pageinationView={
   //跳转到某页
  _go:function(pageCount){
    $("#zq_paging_numbget").click(function(){
      var _temp=$("#zq_paging_val").val();
       if (_temp.replace(/\D/g,'')=="") {
          $("#zq_paging_val").val("");
          return;
       }
        var re = /^[1-9]+[0-9]*]*$/;
        if (!re.test(_temp)){
             $("#zq_paging_val").val("");
          return;
          }
        if(_temp>pageCount){
        	$("#zq_paging_val").val("");
          return;
        }  
         var _app_id= localStorage.getItem("_app_id");
      	_assigned._custom(_app_id,_temp,isAbbreviated);
      	 localStorage.setItem("_currentPage",_temp);
       
    });
  }
}

	var _arr=new Array();
	//授权弹窗点击确定按钮
	$(".Aht_empower_footer span").click(function(){
		 var _arr=new Array();
		$(".Aht_headone_imgtwo").each(function(index){
			var string= '{"id":"'+$(this).parent().find(".zq_app").html()+'"}';
			_arr.push(string);

		});
		_assigned._authorize(_arr);
	});

//按公司名称A-Z排序
var isAbbreviated=0;
$(".Aht_head_two").click(function(){
 var _currentPage= localStorage.getItem("_currentPage");
 var _app_id= localStorage.getItem("_app_id");
	isAbbreviated=1;
 	_assigned._custom(_app_id,_currentPage,isAbbreviated);
});