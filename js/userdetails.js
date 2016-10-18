$(function(){
	localStorage.removeItem("_currentPage");
	localStorage.removeItem("type");
	localStorage.removeItem("isBlacklist");
	localStorage.removeItem("cname");
	var applyId=localStorage.getItem("applyId");
	$(".zq_paging").html("");
	appListAll(applyId,null,null,1);
	//登录验证
	verificationUserLogin();
	
//	点击用户详情跳转
	$(".User_three").click(function(){
		window.location.href="userdetails.html"; 
	});
//	鼠标经过的时候
	$(".Usdes_headfour").hover(function(){
		$(".Usdes_headfour em").show();
	},function(){
		$(".Usdes_headfour em").hide();
	});
//	点击全选按钮
	$(".Usdes_headone_one").click(function(){
		
		$(this).toggleClass("Usdes_headone_two");
		if($(".Usdes_headone_one").hasClass("Usdes_headone_two")){
			$(".Usdes_tableone").addClass("Usdes_tableonetwo");
		}else{
			$(".Usdes_tableone").removeClass("Usdes_tableonetwo");
		}
	});
	

//	右侧边栏tab切换
	$(".Usdes_Rcontent li").click(function(){
		$(this).addClass("Usdes_Rcontent_current").siblings().removeClass("Usdes_Rcontent_current");
	});
//	点击加入黑名单弹出弹窗
	$(".Usdes_headthree").click(function(){
		var _arr=new Array();
		$(".Usdes_tableonetwo").each(function(index){
			var string= '{"id":"'+$(this).parent().find(".au_id").html()+'"}';
			_arr.push(string);

		});
		if (_arr.length>0) {
			$(".Usdes_blacklist").show();
		}else{
			$(".Usdes_headfive").show();
			setTimeout("$('.Usdes_headfive').hide()",3000);
		}
		
	});
//	点击加入黑名单确定按钮
	$(".Usdes_blacklist_Lbtn").click(function(){
		$(".Usdes_blacklist").hide();
	});
//	点击加入黑名单取消按钮
	$(".Usdes_blacklist_Rbtn").click(function(){
		$(".Usdes_blacklist").hide();
	});
//	点击移除黑名单弹出弹窗
	$(".Usdes_headthree_two").click(function(){
		var _arrList=new Array();
		$(".Usdes_tableonetwo").each(function(index){
			var string= '{"id":"'+$(this).parent().find(".au_id").html()+'"}';
			_arrList.push(string);

		});
		if (_arrList.length>0) {
			$(".Usdes_shiftout").show();
		}else{
			$(".Usdes_headfive").show();
			setTimeout("$('.Usdes_headfive').hide()",3000);
		}
		
	});
//	点击移出黑名单确定按钮
	$(".Usdes_shiftout_Lbtn").click(function(){
		$(".Usdes_shiftout").hide();
	});
//	点击移出黑名单取消按钮
	$(".Usdes_shiftout_Rbtn").click(function(){
		$(".Usdes_shiftout").hide();
	});
});





//所有用户列表
function appListAll(applyId,type,cname,_currentPage){
	
	var data = {"applyId":applyId,"type":type,"cname":cname,"currentPage":_currentPage};
	localStorage.setItem("isBlacklist",0);
	var isBlacklist=localStorage.getItem("isBlacklist");
	 $.ajax({
		   type : "get",
	       url:dataLink+"userManage/getApplyUseInfo", 
	       data:data, 
	       dataType : "json",
	       contentType: "application/json; charset=utf-8",
	       success : function(json){
	    	   if(json.msg="success"){
	    		   $("#total_user").html("");
	    		   var manage = json.manage;
	    		   if(isBlacklist==0){
	    			   $(".Usdes_headthree_two").hide();
	    			   $(".Usdes_headthree").show();
	    		   }else {
	    			   $(".Usdes_headthree_two").show();
	    			   $(".Usdes_headthree").hide();
				}
	    		   		$(".Usdes_headfour").show();
	    		   		$("#all_users").html("全部用户("+manage.userAllNumber+")");
	    		   		$("#client").html("客户("+manage.customerNumber+")");
	    		   		$("#licensees").html("企信授权客户("+manage.authorizeNumber+")");
	    		   		$("#blacklist_user").html("黑名单("+manage.blacklistNumber+")");
	    		   
	    		   var lis = json.pageInfo;
					  list=lis.recordList;
	    		   if (list.length>0) {
	    			   for (var i = 0; i < list.length; i++) {
	    				   var item = list[i];
	    				   var type="客户";
	    				   if (item.type==0) {
	    					   type="客户";
	    				   }else if(item.type==1){
	    					   type= "企信授权用户";
	    				   }
	    				   var html ='<ul class="Usdes_table">';
	    				   html +='<li class="Usdes_tableone"></li>';
	    				   html +='<li class="Usdes_tabletwo"></li>';
	    				   html +='<li class="Usdes_tablethree">';
	    				   html +='<span class="au_id" style="display: none;">'+item.userId+'</span>';
	    				   html +='<span class="c_id" style="display: none;">'+item.cid+'</span>';
	    				   html +='<p class="Usdes_tablethree_one">'+item.uname+'</p>';
	    				   html +='<p class="Usdes_tablethree_two blue">'+item.cname+'</p>';
	    				   html +='<p class="Usdes_tablethree_three blue">'+type+'</p></li></ul>';
	    				   $("#total_user").append(html); 
					}
	    			   $(".zq_paging").html(page(json));
	    			    _pageinationView._go(json.pageInfo.pageCount); 
	    			   
//	    				点击选框的时候选中或者不选中
	    				$(".Usdes_tableone").click(function(){
	    					$(this).toggleClass("Usdes_tableonetwo");
	    					if($(".Usdes_tableone").hasClass("Usdes_tableonetwo")){
	    						$(".Usdes_headone_one").removeClass("Usdes_headone_two");
	    					}
	    					if($(".Usdes_tableone").length == $(".Usdes_tableonetwo").length){
	    						$(".Usdes_headone_one").addClass("Usdes_headone_two");
	    					}
	    				});
					
				}else if (list.length==0 && cname !=null && cname !="") {
					var htm ='<p class="Usdes_nocentent_font">暂无结果，请重新搜索或查看 &nbsp;<span class="blue">全部用户</span></p>';
					$("#total_user").html(htm); 
					//点击全部用户(搜索)
					$(".blue").click(function(){
						$(".Usdes_headone_one").removeClass("Usdes_headone_two");
						localStorage.removeItem("_currentPage");
						localStorage.removeItem("type");
						localStorage.removeItem("isBlacklist");
						localStorage.removeItem("cname");
						var applyId=localStorage.getItem("applyId");
						$("#use_name").val("");
						$(".zq_paging").html("");
						appListAll(applyId,null,null,1);
					});
				}
	    	   }
	       }
	 });
	
}



//黑名单用户
function blackUser(applyId,cname,_currentPage){
	
	var data={"applyId":applyId,"cname":cname,"currentPage":_currentPage}
	var isBlacklist=localStorage.getItem("isBlacklist");
	 $.ajax({
		   type : "get",
	       url:dataLink+"userManage/getRosterInfo", 
	       data:data, 
	       dataType : "json",
	       contentType: "application/json; charset=utf-8",
	       success : function(json){
	    	   if(json.msg="success"){
	    		   $("#total_user").html("");
	    		   var manage = json.manage;
	    		   if(isBlacklist==0){
	    			   $(".Usdes_headthree_two").hide();
	    			   $(".Usdes_headthree").show();
	    		   }else {
	    			   $(".Usdes_headthree_two").show();
	    			   $(".Usdes_headthree").hide();
				}
	    		   
	    		   		$(".Usdes_headfour").hide();
	    		   		$("#all_users").html("全部用户("+manage.userAllNumber+")");
	    		   		$("#client").html("客户("+manage.customerNumber+")");
	    		   		$("#licensees").html("企信授权客户("+manage.authorizeNumber+")");
	    		   		$("#blacklist_user").html("黑名单("+manage.blacklistNumber+")");
	    		   
	    		   var lis = json.pageInfo;
					  list=lis.recordList;
	    		   if (list.length>0) {
	    			   for (var i = 0; i < list.length; i++) {
	    				   var item = list[i];
	    				   var type="客户";
	    				   if (item.type==0) {
	    					   type="客户";
	    				   }else if(item.type==1){
	    					   type= "企信授权用户";
	    				   }
	    				   var html ='<ul class="Usdes_table">';
	    				   html +='<li class="Usdes_tableone"></li>';
	    				   html +='<li class="Usdes_tabletwo"></li>';
	    				   html +='<li class="Usdes_tablethree">';
	    				   html +='<span class="au_id" style="display: none;">'+item.userBlacklistId+'</span>';
	    				   html +='<p class="Usdes_tablethree_one">'+item.uname+'</p>';
	    				   html +='<p class="Usdes_tablethree_two blue">'+item.cname+'</p>';
	    				   html +='<p class="Usdes_tablethree_three blue">'+type+'</p></li></ul>';
	    				   $("#total_user").append(html); 
					}
	    			   $(".zq_paging").html(page(json));
	    			    _pageinationView._go(json.pageInfo.pageCount); 
	    			   
//	    				点击选框的时候选中或者不选中
	    				$(".Usdes_tableone").click(function(){
	    					$(this).toggleClass("Usdes_tableonetwo");
	    					if($(".Usdes_tableone").hasClass("Usdes_tableonetwo")){
	    						$(".Usdes_headone_one").removeClass("Usdes_headone_two");
	    					}
	    					if($(".Usdes_tableone").length == $(".Usdes_tableonetwo").length){
	    						$(".Usdes_headone_one").addClass("Usdes_headone_two");
	    					}
	    				});
					
				}else if (list.length==0 && cname !=null && cname !="") {
					var htm ='<p class="Usdes_nocentent_font">暂无结果，请重新搜索或查看 &nbsp;<span class="blue">全部用户</span></p>';
					$("#total_user").html(htm); 
					//点击全部用户(搜索)
					$(".blue").click(function(){
						$(".Usdes_headone_one").removeClass("Usdes_headone_two");
						localStorage.removeItem("_currentPage");
						localStorage.removeItem("type");
						localStorage.removeItem("isBlacklist");
						localStorage.removeItem("cname");
						var applyId=localStorage.getItem("applyId");
						$("#use_name").val("");
						$(".zq_paging").html("");
						appListAll(applyId,null,null,1);
					});
				}
	    	   }
	       }
	 });
}






//点击全部用户
$("#all_users").click(function(){
	$(".Usdes_headone_one").removeClass("Usdes_headone_two");
	localStorage.removeItem("_currentPage");
	localStorage.removeItem("type");
	localStorage.removeItem("isBlacklist");
	localStorage.removeItem("cname");
	var applyId=localStorage.getItem("applyId");
	$(".zq_paging").html("");
	appListAll(applyId,null,null,1);
});




//点击客户
$("#client").click(function(){
	$(".Usdes_headone_one").removeClass("Usdes_headone_two");
	localStorage.removeItem("_currentPage");
	localStorage.removeItem("type");
	localStorage.removeItem("isBlacklist");
	localStorage.removeItem("cname");
	localStorage.setItem("type",0);
	var applyId=localStorage.getItem("applyId");
	$(".zq_paging").html("");
	appListAll(applyId,0,null,1);
});

//点击企信授权用户
$("#licensees").click(function(){
	$(".Usdes_headone_one").removeClass("Usdes_headone_two");
	localStorage.removeItem("_currentPage");
	localStorage.removeItem("type");
	localStorage.removeItem("isBlacklist");
	localStorage.removeItem("cname");
	localStorage.setItem("type",1);
	var applyId=localStorage.getItem("applyId");
	$(".zq_paging").html("");
	appListAll(applyId,1,null,1);
});
//点击黑名单
$("#blacklist_user").click(function(){
	$(".Usdes_headone_one").removeClass("Usdes_headone_two");
	localStorage.removeItem("_currentPage");
	localStorage.removeItem("type");
	localStorage.removeItem("isBlacklist");
	localStorage.removeItem("cname");
	localStorage.setItem("isBlacklist",1);
	var applyId=localStorage.getItem("applyId");
	$(".zq_paging").html("");
	blackUser(applyId,null,1);
});

//点击搜索
$("#search_user").click(function(){
	$(".Usdes_headone_one").removeClass("Usdes_headone_two");
	localStorage.removeItem("_currentPage");
	var type=localStorage.getItem("type");
	var isBlacklist=localStorage.getItem("isBlacklist");
	var applyId=localStorage.getItem("applyId");
	var cname = $("#use_name").val();
	$(".zq_paging").html("");
	if(isBlacklist==0){
		appListAll(applyId,type,cname,1);
	}else {
		blackUser(applyId,cname,1);
	}
	
});

//添加黑名单
$(".Usdes_blacklist_Lbtn").click(function(){
	add_exist();
});

//移除黑名单
$(".Usdes_shiftout_Lbtn").click(function(){
	delete_exist();
});

//删除黑名单
function delete_exist(){
	 var _arr=new Array();
	$(".Usdes_tableonetwo").each(function(index){
		var string= '{"id":"'+$(this).parent().find(".au_id").html()+'"}';
		_arr.push(string);

	});
	var data='{'+'"appBlackList":'+'['+_arr+']'+'}';
	$.ajax({
		url:dataLink+"userManage/deleteRoster",
		data:data,
		type:"post",
		timeout:1000,
		async:true,
		dataType:"json",
		contentType: "application/json; charset=utf-8",
		success:function(result){
			if(result.msg=="success"){
			    window.location.href=skipHttp+"userdetails.html";
			}
		  
		     
		}
	});


}

//添加黑名单
function add_exist(){
	var applyId=localStorage.getItem("applyId");
	var userId=localStorage.getItem("userId");
	 var _arr=new Array();
	$(".Usdes_tableonetwo").each(function(index){
		var string= '{"userId":"'+$(this).parent().find(".au_id").html()+'",'+'"cid":"'+$(this).parent().find(".c_id").html()+'"}';
		_arr.push(string);

	});
	var Json='"applyId":"'
		+applyId
		+'",'+'"ope_id":"'
		+userId
		+'",';
	var data='{'+Json+'"appBlackList":'+'['+_arr+']'+'}';
	console.info(data);
	$.ajax({
		url:dataLink+"userManage/saveRoster",
		data:data,
		type:"post",
		timeout:1000,
		async:true,
		dataType:"json",
		contentType: "application/json; charset=utf-8",
		success:function(result){
			if(result.msg=="success"){
			    window.location.href=skipHttp+"userdetails.html";
			}
		  
		     
		}
	});


}



//提交数据
function pageinationView(currentPage){
	
  var type=localStorage.getItem("type");
  $(".Usdes_headone_one").removeClass("Usdes_headone_two");
	var isBlacklist=localStorage.getItem("isBlacklist");
	var cname=$("#use_name").val();
	var applyId=localStorage.getItem("applyId");
  localStorage.setItem("_currentPage",currentPage);
  if(isBlacklist==1){
	  blackUser(applyId,cname,currentPage)
  }else{
	  appListAll(applyId,type,cname,currentPage);
  }
 
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
    var type=localStorage.getItem("type");
	var cname=$("#use_name").val();
	var isBlacklist=localStorage.getItem("isBlacklist");
	var applyId=localStorage.getItem("applyId");
	$(".Usdes_headone_one").removeClass("Usdes_headone_two");
  if(isBlacklist==1){
	  blackUser(applyId,cname,currentPage)
  }else{
	  appListAll(applyId,type,cname,currentPage);
  }
  	 localStorage.setItem("_currentPage",_temp);
   
});
}
}
