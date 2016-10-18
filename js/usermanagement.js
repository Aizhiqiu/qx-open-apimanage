$(function(){
	applist();
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
	

});

//应用列表
function applist(){
	var userId  =  localStorage.getItem("userId"); 
	var currentPage=1;
	var data = {"userId":userId,"auditStatus":3,"currentPage":currentPage};
	 $.ajax({
		   type : "get",
	       url:dataLink+"userManage/getApplyList", 
	       data:data, 
	       dataType : "json",
	       success : function(json){
	    	   if(json.msg="success"){
	    		   localStorage.removeItem("applyId");
	    		   $("#apply_list").html("");
	    		   var lis = json.pageList;
					  list=lis.recordList;
	    		   if (list.length>0) {
	    			   for (var i = 0; i < list.length; i++) {
	    				   var item = list[i];
	    				   var html =' <ul class="User_substance">';
	    				   html +='<li class="User_one">'+item.applyName+'</li>';
	    				   html +='<span class="app_id" style="display: none;">'+item.applyId+'</span>';
	    				   html +='<li class="User_two">'+item.userAllNumber+'</li>';
	    				   if (item.userAllNumber==0) {
	    					   html +='<li class="User_three gray">'+"用户详情"+'</li></ul>';
							}else {
								html +='<li class="User_three blue" id="user_All_details">'+"用户详情"+'</li></ul>';
							}
	    				   
	    				   $("#apply_list").append(html);
					}
	    			  
	    			 //点击用户详情
    				   $(".blue").click(function(){
    				   	 	var applyId= $(this).parent().find(".app_id").html();
    				   	   localStorage.setItem("applyId",applyId);
    				   		window.location.href=skipHttp+"userdetails.html";
    				   });
					
				}
	    	   }
	       }
	 });
	
}
