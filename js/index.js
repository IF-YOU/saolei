$(function(){
  var num = 0.99,
  data=0,
  timerid;
  var time = function(){
    data+=1;
    $('.time').text(data);
  }
  $(document).on('contextmenu',false);
  $('.begin').on('click',function(){
    timerid=setInterval(time,1000) 
    $('.sweep').empty()
    $('.action').slideUp()
    render()
  })
  $('.restart').on('click',function(){     
    $('.sweep').empty()      
    $('.btn').slideUp()
    data=0;
    timerid=setInterval(time,1000) 
    render()    
  })

  $('.ul li[data-id]').on('click',function(){
    $('.active').removeClass('active')
    $(this).addClass('active')
    $('.sweep').empty()
    num = Number($(this).attr('data-id'))     
    render()
    data=0;
    setInterval(timerid,1000)
  })

  $('.sweep').on('mouseenter',function(){
    $(this).css({cursor:"url(./image/we.png),auto"})
  })

  var xy2id = function(a,b){
   return a+'-'+b
 }
 var jisuan = function(x,y){
   var num = 0;
   if($('#'+xy2id(x,y-1)).is('.lei')){num++};
   if($('#'+xy2id(x-1,y-1)).is('.lei')){num++};
   if($('#'+xy2id(x+1,y-1)).is('.lei')){num++};
   if($('#'+xy2id(x+1,y+1)).is('.lei')){num++};
   if($('#'+xy2id(x,y+1)).is('.lei')){num++};
   if($('#'+xy2id(x+1,y)).is('.lei')){num++};
   if($('#'+xy2id(x-1,y)).is('.lei')){num++};
   if($('#'+xy2id(x-1,y+1)).is('.lei')){num++};
   return num;
 }

 var youjian = function(e){
   if($(this).is('.tip')){
    return
  }
  $(this).toggleClass('biaoji')
  if($('.biaoji.lei').length === $('.lei').length){
   alert('你太棒了！！！')
   $('.sweep').empty();
   render()
   data=0;
 }
}

var clickHandler = function(e){
 if (e.which === 1) {
  $.proxy(zuojian,this)(e)
}else if(e.which === 3){
  $.proxy(youjian,this)(e)
}
}

function render(){    
  for(var i=0;i<10;i++){
    for(var j=0;j<10;j++){
     var isLei = Math.random() > num;
     $('<div>')
     .attr('id',i+'-'+j)
     .on('mousedown',{x:i,y:j,lei:isLei},clickHandler)
     .addClass(function(){
      return 'block '+(isLei ? 'lei':'');
    })
     .appendTo('.sweep')
   }
 }
}
render()


var finding=function  (x,y) {
  var num=0;
  for(var i=x-1;i<=x+1;i++){
    for(var j=y-1;j<=y+1;j++){
      if($('#'+xy2id(i,j)).is('.lei')){
        num+=1;
      }
    }
  }
  return num;
}

var digui=function  (x,y) {
  var mine=finding(x,y);
  if(mine===0){
    for(var i = x - 1;i <= x + 1;i++){
      for(var j = y - 1;j <= y + 1;j ++) {
                      //越界
                      if(i>9||i<0||j<0||j>9){
                       continue;
                     }
                      //自己
                      if(i == x && j == y){
                       continue;
                     }
                      //已遍历
                      if($('#'+xy2id(i,j)).hasClass('tip')){
                       continue;
                     }

                     mine=finding(i,j);
                     $('#'+xy2id(i,j)).addClass('tip').text(mine);
                     if(mine===0){
                      $('#'+xy2id(i,j)).text('')
                    }

                    digui(i,j);
                  }
                }
              }
            } 



    //左击3种状态
    var zuojian=function  (e) {
      if($(this).is('.biaoji')){
        return;
      }else if(e.data.lei){
        $('.lei').addClass('fail');
        $('.btn').slideDown();
        data=0;
        clearInterval(timerid);                
      }else{
        var mine=finding(e.data.x,e.data.y);
        $(this).addClass('tip').text(mine);
        if(mine===0){
          $(this).text('')
        }
        digui(e.data.x,e.data.y)
      }
    }
  })



