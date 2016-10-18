$(function(){
	$(".Jog_Lcon_li ul").eq(0).css("display","block");
//	点击左侧导航切换
	$(".Jog_Lcon_li a").click(function(){
		$(".Jog_Lcon_li ul").hide();
		$(this).next().show();
	});
	$(".Jog_Lcon_li li").click(function(){
		$(this).addClass("Jog_Lcon_current").siblings().removeClass("Jog_Lcon_current");
	});
//	点击前往认证
	$(".Jog_Right_nocontent span").click(function(){
		sessionStorage.setItem("thisnavleft",4);
		window.location.href="authenticate.html";
	});
	getClassifyList(2,1);
});



function getClassifyChild(parentId){
	
	var data = {"parentId":parentId};
	 $.ajax({
		   type : "get",
	       url:dataLink+"classify/getClassifyByParentId", 
	       data:data, 
	       dataType : "json",
	       success : function(json){
	    	   if(json.msg="success"){
	    		   
	    		   var _classUl = ".Lcon_li_ul"+parentId;
    			   $(_classUl).html("");
    			   if(json.classifyMag.length !=0){
 	    			  for(i=0;i<json.classifyMag.length;i++){
 	    				 var item = json.classifyMag[i];
 	    				 var html = '';
 	    				 if(i==0){
 	    					 html = ' <li class="Jog_Lcon_current" id="'+item.id+'"><i></i>'+item.title+'</li> ';
 	    				 }else{
 	    					 html = ' <li id="'+item.id+'"><i></i>'+item.title+'</li> ';
 	    				 }
 	    				  
 	    				 $(_classUl).append(html);
 	    			  }
 	    			 $(".Jog_Lcon_li li").click(function(){
 	    				$(this).addClass("Jog_Lcon_current").siblings().removeClass("Jog_Lcon_current");
 	    				var towId = $(this).attr("id");
 	    				getContentById(towId);
 	    			});
 	    			  getContentById(json.classifyMag[0].id);
    			   }
    			   
	    	   }
	       }
	    		   });
}


function getClassifyList(parentId,treeLevel){
	
	var data = {"parentId":parentId};
	
	 $.ajax({
	   type : "get",
       url:dataLink+"classify/getClassifyByParentId", 
       data:data, 
       dataType : "json",
       success : function(json){
    	   if(json.msg="success"){
    		   
    		   if(treeLevel==1){
    			   $(".Jog_left_con").html("");
    	    		  
    			   if(json.classifyMag.length !=0){
    	    			  for(i=0;i<json.classifyMag.length;i++){
    	    	    			var item = json.classifyMag[i];
    	    	    			var html  = ' <li class="Jog_Lcon_li" > <a href="javascript:;" onclick="getClassifyList('+item.id+',2)" >'+item.title+' <span></span></a> ';
    	    	    			    html += ' <ul class="Lcon_li_ul'+item.id+'"> </ul> </li>';
    	    	    			$(".Jog_left_con").append(html);
    	    	    		 }
    	    			  getClassifyChild(json.classifyMag[0].id);
    	    			
    	    			  $(".Jog_Lcon_li ul").eq(0).css("display","block");
    	    		  } 
    		   }else if(treeLevel==2){
    			   var _classUl = ".Lcon_li_ul"+parentId;
    			   $(_classUl).html("");
    			   if(json.classifyMag.length !=0){
 	    			  for(i=0;i<json.classifyMag.length;i++){
 	    				 var item = json.classifyMag[i];
 	    				 var html = '';
 	    				 if(i==0){
 	    					 html = ' <li class="Jog_Lcon_current" id="'+item.id+'"><i></i>'+item.title+'</li> ';
 	    				 }else{
 	    					 html = ' <li id="'+item.id+'"><i></i>'+item.title+'</li> ';
 	    				 }
 	    				  
 	    				 $(_classUl).append(html);
 	    			  }
 	    			 getContentById(json.classifyMag[0].id);
    			   }
    			   
    		   }
    		   $(".Jog_Lcon_li a").click(function(){
					$(".Jog_Lcon_li ul").hide();
					$(this).next().show();
				}); 
    		   $(".Jog_Lcon_li li").click(function(){
    				$(this).addClass("Jog_Lcon_current").siblings().removeClass("Jog_Lcon_current");
    				var towId = $(this).attr("id");
    				getContentById(towId);
    			});
    		 
    		   
    	   }
       
       }
	
	  });
	
}

function getContentById(contentId){
	
	var data = {"parentId":contentId};
	
	 $.ajax({
		   type : "get",
	       url:dataLink+"classify/getContentByParentId", 
	       data:data, 
	       dataType : "json",
	       success : function(json){
	    	   if(json.msg="success"){
	    		 if(!isnull(json.contentMag)){
	    			 var contentMag = json.contentMag;
	    			 $(".Jog_Right_title").html(contentMag.title);
	    			 if(contentMag.isApprove == 1){
	    				 $(".Jog_Right_nocontent").show();
	    			 }else{
	    				 $(".Jog_Right_content").show();
	    				 $(".Jog_Right_nocontent").hide();
	    				 $(".Jog_Right_content").html(contentMag.guide);
	    			 }
	    			 if(!isnull(contentMag.url)){
	    				 var url ='<p><span class="blue"><a href="'+contentMag.url+'"></a>下载附件</span></p>';
	    				 $(".Jog_Right_content").append(url);
	    			 }
	    			
	    			$(".content_mag").click(function(){
	    				  var _url_path =documentSrc+contentMag.url;
	  					  window.open(_url_path);
	  				});
	    			
	    		 }else{
	    			 $(".Jog_Right_content").hide();
	    			 $(".Jog_Right_nocontent").show();
	    		 }
	    	   }
	       }
	 });
	
}


