var userId = localStorage.getItem("userId");
$(function(){
	verificationUserLogin();
	loadAnnounceList(1);
})
function loadAnnounceList(currentPage){
	var data={"userId":userId,"currentPage":currentPage};
	 $.ajax({
      url:dataLink+"announce/getAnnounceList", 
      type : "get",
      dataType: 'json',
      data:data, 
      success : function(date){
     	if(date.msg=="success"){
     		$("#announce_list").html("");
     		var loggedList = date.pageInfo.recordList;
     		for(var i=0;i<loggedList.length;i++){
     			var loggedItem = loggedList[i];
     			var logged_html = '';
     			logged_html+='<li class="zq_entry_none">';
     			if(currentPage=="1"&&i==0){
     				logged_html+='<span>'+loggedItem.title+'</span>';
     			}else{
     				logged_html+='<span style="background:none;">'+loggedItem.title+'</span>';
     			}
     			var announce_time = Time(loggedItem.cTime);
     			logged_html+='<div class="zq_entry_right">'+announce_time+'<span></span></div>';
     			logged_html+='<div class="zq_entry_tentext">';
     			logged_html+='<p>'+loggedItem.content+'</p>';
     			if(!isnull(loggedItem.url)){
     				var d_split =loggedItem.url.split(".");
     				var load_url = d_split[1];
     				var timestamp = new Date().getTime();
     				var download_name = timestamp+"."+load_url;
     				logged_html+='<a href="'+documentSrc+loggedItem.url+'" download="'+download_name+'" style="color:blue;">下载附件</a>';
     			}
     			logged_html+='</div>';
     			logged_html+='</li>';
     			$("#announce_list").append(logged_html);
     		} 
     		$(".zq_paging").html(page(date));
		    _pageinationView._go(date.pageInfo.pageCount); 
     	 }
     	 $(".zq_text_entry li").each(function(){
     		$(this).click(function(){
     			if($(this).find(".zq_entry_tentext").is(":hidden")){
     				$(".zq_text_entry li").removeClass("zq_entry_bloak");
     				$(this).addClass("zq_entry_bloak");
     			}else{
     				$(".zq_text_entry li").removeClass("zq_entry_bloak");
     			};
     		});
     	});
      }
	});
};

//提交数据
function pageinationView(currentPage){
	loadAnnounceList(currentPage);
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
   
    loadAnnounceList(_temp);
  	localStorage.setItem("_currentPage",_temp);
   
});
}
}

function download(obj){   
	 if(document.all.ifrm==null){   
	 objIframe=document.createElement("IFRAME");   
	 document.body.insertBefore(objIframe);
	 objIframe.outerHTML="<iframe name=ifrm style='width:0;hieght:0' src="+obj.href+"></iframe>";   
	 re=setTimeout("download()",1)   
	  }   
	 else{   
	 clearTimeout(re)   
	 files=window.open(obj.href,"ifrm")   
	 files.document.execCommand("SaveAs")   
	 document.all.ifrm.removeNode(true)   
}} 
