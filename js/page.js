/*
   使用场景:同一个页面多处需要分页
    使用该分页: 
     调用page方法传入后台返回值即可

*/
<!-- 分页 start -->

function page(page){
    console.info(page.pageInfo);
 
	 if(page.pageInfo!=""&&page.pageInfo.recordList!=null&&page.pageInfo.recordList.length>0&&page.pageInfo.pageCount>1){
        var _html='';
          //_html+='<div class="zq_paging_centent">';
        if (page.pageInfo.beginPageIndex<=page.pageInfo.endPageIndex){

            if(page.pageInfo.currentPage > 1){
               _html+='<a  href="javascript:pageinationView('+(page.pageInfo.currentPage - 1)+')">';
               _html+='<span class="zq_paging_up"></span></a>';
            }
			
                 for(var x=page.pageInfo.beginPageIndex;x<=page.pageInfo.endPageIndex;x++){
                        if(page.pageInfo.currentPage == x){
                         _html+='<span class="zq_paging_num">'+x+'/'+page.pageInfo.pageCount+'</span>';
                          }
                        }
                 }
                if (page.pageInfo.currentPage < page.pageInfo.pageCount) {
                //html+='<div class="page_right">';
                _html+='<a class="zq_paging_toget" href="javascript:pageinationView('+(page.pageInfo.currentPage + 1)+')"><span class="zq_paging_down"></span></a>'
                

             }
                _html+="<input type='text'id='zq_paging_val'  value='"+page.pageInfo.currentPage +"'>";
                _html+='<a class="zq_paging_get" id="zq_paging_numbget" href="javascriupt:;">跳转</a>'
               
        } 
        console.info(_html);
      return _html;
      
}

  /*  //提交数据
    function pageinationView(currentPage){
        _load._data(currentPage);
      
}

var _pageinationView={
   _currentPage:function(){
    $(".currentPage").click(function(){
        _load._data($(this).text());
    });
   },
   //跳转到某页
  _go:function(pageCount){
    $("#zq_paging_numbget").click(function(){
      var _temp=$("#zq_paging_numberget").val();
       if (_temp.replace(/\D/g,'')=="") {
          $("#zq_paging_numberget").val("");
          return;
       }
        var re = /^[1-9]+[0-9]*]*$/;
        if (!re.test(_temp)){
             $("#zq_paging_numberget").val("");
          return;
          }
        if(_temp>pageCount){
          return;
        }  
       _load._data(_temp);
    });
  }
}*/


