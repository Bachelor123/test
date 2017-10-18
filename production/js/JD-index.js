/**
 * Created by XUFU on 2017/9/9.
 */
  window.onload=function(){

      //获取标签名函数
      function selector(tag){
          return document.querySelector(tag);
      }

      //top-ad顶部广告
      selector('.top-ad-close').onclick=function(){
          selector('.ad').style.opacity='0';
          setTimeout(function(){
              selector('.ad').style.display='none';
          },500)
      }
      //导航栏选择地址
      var oLocaF=document.querySelectorAll('.site li a');
      oLocaF[1].className='location_select';
      for(var i=0;i<oLocaF.length;i++){
          oLocaF[i].value=i;
          oLocaF[i].onclick=function(){
              for(var i=0;i<oLocaF.length;i++){
                  oLocaF[i].className='';
              }
              this.className='location_select';
              selector('.present').innerText=this.innerText;
          }
      }
      //网站导航导航块延时提示框
      selector('.wrap-web-nav').onmouseover=selector('.web-cover').onmouseover=function(){
          selector('.wrap-web-nav').style.display='block';
          selector('.nav-spec').className='nav-mouseover nav-font nav-spec';
      }
      selector('.wrap-web-nav').onmouseout=selector('.web-cover').onmouseout=function(){
          selector('.wrap-web-nav').style.display='none';
          selector('.nav-spec').className='nav-font nav-cover nav-spec';
      }
      //搜索栏下拉框函数块
      var oDelete=document.querySelector('.delete');
      var oDUl=document.querySelector('.draw ul');
      var oDSpan=document.querySelectorAll('.draw li span');
      var oDLi=document.querySelectorAll('.draw li');
      var oDLiI=document.querySelectorAll('.draw li i');
      var oDraw=document.querySelector('.draw');
      var oForm=document.querySelector('.form');
      var oSTxt=document.querySelector('.search-txt');
      var x=null;
      for(var i=0;i<oDLi.length-1;i++){
          oDLi[i].value=i;
          oDSpan[i].value=i;
          oDLi[i].onmouseover=function(){
              x=this.value;
              oDSpan[x].innerText='删除';
          }
          oDLi[i].onmouseout=function(){
              x=this.value;
              oDSpan[x].innerText='搜索历史';
          }
          oDLi[i].onclick=function(){      //点击这条历史记录开始搜索
              oSTxt.value=oDLiI[this.value].innerText;
              oDraw.style.display='none';
          }
          oDSpan[i].onclick=function(ev){   //删除单个历史记录
              oDUl.removeChild(oDLi[this.value]);
              //oDUl.removeChild(oDUl.children[this.value]);//这里使用这个是错误的，因为oDUl的子元素删除一个少一个，（this.value指向的会变得不正确）所以这里不能使用
              if(oDUl.children.length==1){
                  oForm.removeChild(oDraw);
              }
             bubble(ev);
          }
      }
      oSTxt.onclick=function(ev){  //搜索框点击阻止冒泡
          bubble(ev);
      }
      oSTxt.onfocus=function(ev){  //搜索框得到焦点
          oSTxt.placeholder='';
          oDraw.style.display='block';
          bubble(ev);
      }
      document.onclick=function(){   //点击页面其他任何地方，历史输入记录收起
          oDraw.style.display='none';
          oSTxt.placeholder='大疆 Spark';
      }
      oDelete.onclick=function(){    //删除所有历史记录
          oForm.removeChild(oDraw);
      }
      //阻止事件冒泡函数
      function bubble(ev){
          var ev=ev||event;
          if(ev.cancelBubble) {    //阻止事件冒泡兼容
              ev.cancelBubble = true;
          }
          else{
              ev.stopPropagation()
          }
      }


      //主导航栏的显示隐藏
      var oMLi=document.querySelectorAll('.main-list li');
      var oMCon=document.querySelectorAll('.content');
      var timer1=null;
      var Y=null;
      for(var i=0;i<oMLi.length;i++){
          oMLi[i].value=i;
          oMCon[i].value=i;
          oMLi[i].onmouseover=oMCon[i].onmouseover=function(){
              Y=this.value;
              clearTimeout(timer1);
              for(var i=0;i<oMLi.length;i++){
                  oMCon[i].style.display='none';
                  oMLi[i].style.background='';
              }
              selector('.main-detail').style.display='block';
              oMCon[this.value].style.display='block';
              oMLi[this.value].style.background='#999395';
          }
          oMLi[i].onmouseout=oMCon[i].onmouseout=function(){
              Y=this.value;
              timer1=setTimeout(function(){
                  selector('.main-detail').style.display='none';
                  oMCon[Y].style.display='none';
                  oMLi[Y].style.background='';
              },100)
          }
      }

      //轮播
      var oImg=document.querySelectorAll('.rolling a');
      var oCircle=document.querySelectorAll('.circle li');
      var y=0;
      var timer2=null;
      oCircle[0].style.background='#DB192A';
      oImg[0].className='changePic';
      //定时器函数
      function oTimer2(){
          timer2=setInterval(function(){
              y++;
              if(y>oCircle.length-1){
                  y=0;
              }
              roll();
          },3500)
      }
      //轮播切换函数
      function roll(){
          for(var i=0;i<oCircle.length;i++){
              oCircle[i].style.background='';
              oImg[i].className='';
          }
          oCircle[y].style.background='#DB192A';
          oImg[y].className='changePic';
      }
      //点击圆点切换图片
      for(var i=0;i<oCircle.length;i++){
          oCircle[i].value=i;
          oCircle[i].onmouseover=function(){
              y=this.value;
              roll();
          }
      }
      selector('.left-btn').onclick=function(){
          y--;
          if(y<0){
              y=oCircle.length-1;
          }
          roll();
      }
      selector('.right-btn').onclick=function(){
          y++;
          if(y>oCircle.length-1){
              y=0;
          }
          roll();
      }
      selector('.rolling').onmouseover=function(){
          clearInterval(timer2);
      }
      selector('.rolling').onmouseout=function(){
          oTimer2();
      }
      oTimer2();

      //右侧边栏促销底下tab的移动
      selector('.onSell').onmouseover=function(){
          selector('.tab-active').style.transform='translateX(0px)';
          selector('.news1').style.display='block';
          selector('.news2').style.display='none';
      }
      selector('.notice').onmouseover=function(){
          selector('.tab-active').style.transform='translateX(52px)';
          selector('.news1').style.display='none';
          selector('.news2').style.display='block';

      }
      //右侧边栏的底下的服务板块(就是包含那四个子板块的东西)
      var oSeLi=document.querySelectorAll('.bot-service li');
      var oSeA=document.querySelectorAll('.bot-service a');
      var oSeSpan=document.querySelectorAll('.bot-service span');
      var oSeP=document.querySelectorAll('.bot-service p');
      var oSubF=document.querySelectorAll('.sub-font');
      var oSubB=document.querySelectorAll('.sub-border');
      var oSecCon=document.querySelectorAll('.b-con1>div');
      var z=null;
      var timer3=null;
      function GameChange(){
          for(var i=0;i<4;i++){
              oSeLi[i].value=i;
              oSeLi[i].onmouseover=function(){
                  z=this.value;
                  for(var i=0;i<4;i++){
                      oSeA[i].style.top='-38px';
                      oSeSpan[i].style.borderColor='';
                      oSecCon[i].style.display='none';
                  }
                  oSeSpan[z].style.borderColor='#e01121';
                  oSecCon[z].style.display='block';
                  for(var i=0;i<oSubB.length;i++){
                      oSubB[i].style.display='none';
                      oSubF[i].style.display='none';
                      oSeP[i].className='service-sub service-sub-dot';
                  }
                  clearTimeout(timer3);
                  oSeLi[3].onmouseover=function(){
                      for(var i=0;i<4;i++){
                          oSeA[i].style.top='-38px';
                          oSeSpan[i].style.borderColor='';
                          oSecCon[i].style.display='none';
                      }
                      oSeSpan[3].style.borderColor='#e01121';
                      oSecCon[3].style.display='block';
                      for(var i=0;i<oSubB.length;i++){
                          oSubB[i].style.display='none';
                          oSubF[i].style.display='none';
                          oSeP[i].className='service-sub service-sub-dot';
                      }
                      //console.log('bbb');
                  };
                  selector('.bot-service-content').style.top='30px';
              }
          }
      }
      GameChange();

      selector('.bot-service-close').onclick=function(){
          selector('.bot-service-content').style.top='210px';
          for(var i=0;i<4;i++){
              oSeA[i].style.top='';
              oSeSpan[i].style.borderColor='';
          }
          for(var i=0;i<oSubB.length;i++){
              oSubB[i].style.display='block';
              oSubF[i].style.display='block';
              oSeP[i].className='service-sub';
          }
          oSeLi[3].onmouseover=null;
          timer3=setTimeout(function(){
                  GameChange();
                  //console.log('dsafads');
          },3000)
      }



      //右侧底部话费部分
      var oBTitLi=document.querySelectorAll('.con1-tit li');
      var oMobSec=document.querySelectorAll('.con1-in-con>div');
      var M=0;
      for(var i=0;i<oBTitLi.length;i++){
          oBTitLi[i].value=i;
          oBTitLi[i].onmouseover=function(){
              //alert('afdadsf');
              M=this.value;
              for(var i=0;i<oBTitLi.length;i++){
                  oBTitLi[i].className='';
                  oMobSec[i].style.display='none';
              }
              oBTitLi[M].className='tit-select';
              oMobSec[M].style.display='block';
          }
      }
      //右侧底部话费的select
      var oOption=document.querySelectorAll('.mob-selector option');
      selector('.mob-selector').onclick=function(){
          for(var i=0;i<oOption.length;i++){
              if(oOption[i].selected){
                  console.log(i);
                  switch(i){
                      case 0:
                          selector('.fav-price').innerText='￥9.98';
                          break;
                      case 1:
                          selector('.fav-price').innerText='￥19.96';
                          break;
                      case 2:
                          selector('.fav-price').innerText='￥29.94';
                          break;
                      case 3:
                          selector('.fav-price').innerText='￥49.90';
                          break;
                      case 4:
                          selector('.fav-price').innerText='￥99.80';
                          break;
                      case 5:
                          selector('.fav-price').innerText='￥199.60';
                          break;
                      case 6:
                          selector('.fav-price').innerText='￥299.40';
                          break;
                      default :
                          selector('.fav-price').innerText='￥499';
                  }
              }
          }
      }
      //流量充值
      var oOptionFlow=document.querySelectorAll('.mob-flow-selector option');
      selector('.mob-flow-selector').onclick=function(){
          for(var i=0;i<oOptionFlow.length;i++){
              if(oOptionFlow[i].selected){
                  console.log(i);
                  switch(i){
                      case 0:
                          selector('.flow-price').innerText='￥7.5-￥10.0';
                          break;
                      case 1:
                          selector('.flow-price').innerText='￥9.95-￥20.0';
                          break;
                      case 2:
                          selector('.flow-price').innerText='￥19.9-￥20.5';
                          break;
                      case 3:
                          selector('.flow-price').innerText='￥29.0-￥29.9';
                          break;
                      default:
                          selector('.flow-price').innerText='￥49.0-￥50.0';
                  }
              }
          }
      }
      //套餐变更
      var oOptionPlan=document.querySelectorAll('.mob-plan-selector option');
      selector('.mob-plan-selector').onclick=function(){
          for(var i=0;i<oOptionPlan.length;i++){
              if(oOptionPlan[i].selected){
                  console.log(i);
                  switch(i){
                      case 0:
                          selector('.plan-price').innerText='50分钟300M流量';
                          break;
                      case 1:
                          selector('.plan-price').innerText='50分钟500M流量';
                          break;
                      case 2:
                          selector('.plan-price').innerText='100分钟500M流量';
                          break;
                      case 3:
                          selector('.plan-price').innerText='220分钟700M流量';
                          break;
                      case 4:
                          selector('.plan-price').innerText='500分钟1G流量';
                          break;
                      case 5:
                          selector('.plan-price').innerText='500分钟2G流量';
                          break;
                      case 6:
                          selector('.plan-price').innerText='1000分钟2G流量';
                          break;
                      case 7:
                          selector('.plan-price').innerText='1000分钟3G流量';
                          break;
                      case 8:
                          selector('.plan-price').innerText='2000分钟3G流量';
                          break;
                      default:
                          selector('.plan-price').innerText='4000分钟6G流量';
                  }
              }
          }
      }

      //右侧底部机票部分
      var oPlaneLi=document.querySelectorAll('.con2-tit li');
      var oPlane=document.querySelector('.con2-inner-con');
      var N=0;
      for(var i=0;i<oPlaneLi.length;i++){
          oPlaneLi[i].value=i;
          oPlaneLi[i].onmouseover=function(){
              //alert('afdadsf');
              N=this.value;
              for(var i=0;i<oPlaneLi.length;i++){
                  oPlaneLi[i].className='';
              }
              oPlaneLi[N].className='tit-select';
              oPlane.style.left=-oPlane.children[0].offsetWidth*N+"px";
              console.log(-oPlane.children[0].offsetWidth*N);
          }
      }
      //右侧底部酒店部分
      var oHotelLi=document.querySelectorAll('.con3-tit li');
      var oHotel=document.querySelector('.con3-inner-con');
      var O=0;
      for(var i=0;i<oHotelLi.length;i++){
          oHotelLi[i].value=i;
          oHotelLi[i].onmouseover=function(){
              //alert('afdadsf');
              O=this.value;
              for(var i=0;i<oHotelLi.length;i++){
                  oHotelLi[i].className='';
              }
              oHotelLi[O].className='tit-select';
              oHotel.style.left=-oHotel.children[0].offsetWidth*O+"px";
              console.log(-oHotel.children[0].offsetWidth*O);
          }
      }
      //右侧底部游戏部分
      var oGameLi=document.querySelectorAll('.con4-tit li');
      var oGame=document.querySelector('.con4-inner-con');
      var P=0;
      for(var i=0;i<oGameLi.length;i++){
          oGameLi[i].value=i;
          oGameLi[i].onmouseover=function(){
              //alert('afdadsf');
              P=this.value;
              for(var i=0;i<oGameLi.length;i++){
                  oGameLi[i].className='';
              }
              oGameLi[P].className='tit-select';
              oGame.style.left=-oGame.children[0].offsetWidth*P+"px";
              console.log(-oGame.children[0].offsetWidth*P);
          }
      }

  //    京东秒杀  倒计时模块
      var cs=58,cm=59,ch=1;
      setInterval(function(){
          cs--;
          if(cs<0){
              cm--;
              if(cm<0){
                  ch--;
                  if(ch<0){
                      ch=1;
                  }
                  cm=59;
                  //selector('.t-hour span').innerText="0"+ch;
              }
              cs=59;
              //selector('.t-minute span').innerText=(cm<10)?("0"+cm):cm;
          }
          selector('.t-hour span').innerText="0"+ch;
          selector('.t-minute span').innerText=(cm<10)?("0"+cm):cm;
          selector('.t-second span').innerText=(cs<10)?("0"+cs):cs;
      },1000);

      //京东秒杀底下的轮播（左）


          //这一块主要是自适应屏幕宽度时，轮播一次滚动的个数
      var oKillLi=document.querySelectorAll('.kill-con-list>li');
      //改变窗口的大小判断的函数块
      window.onresize=function(){
          suit();
      }
      function suit(){
          var node1=oKillLi[0].cloneNode(true);
          var node2=oKillLi[29].cloneNode(true);
          selector('.kill-con-list').style.transition="";
          if(document.documentElement.clientWidth<=1190&&selector(".kill-con-list").offsetWidth==6000){
              selector(".kill-con-list").style.left=-selector(".kill-con-left").offsetWidth*bbb+'px';
              selector(".kill-con-list").style.width=5600+'px';
              selector(".kill-con-list").removeChild(selector(".kill-con-list").firstElementChild);
              selector(".kill-con-list").removeChild(selector(".kill-con-list").lastElementChild);
          }
          else if(document.documentElement.clientWidth>1190&&selector(".kill-con-list").offsetWidth==5600){
              selector(".kill-con-list").style.left=-selector(".kill-con-left").offsetWidth*bbb+'px';
              selector(".kill-con-list").style.width=6000+'px';
              selector(".kill-con-list").insertBefore(node1,selector(".kill-con-list").firstChild);
              selector(".kill-con-list").append(node2);
          }
      }
      suit();


      selector(".kill-con-left").onmouseenter=function(){
          selector('.kill-btnL').style.display="block";
          selector('.kill-btnR').style.display="block";
      }
      selector(".kill-con-left").onmouseleave=function(){
          selector('.kill-con-left>div').style.display="none";
          selector('.kill-btnR').style.display="none";
      }
      var c=true,bbb=1;
      selector('.kill-btnL').onclick=function(){
          if(!bbb){
              return false;
          }
          bbb--;
          selector('.kill-con-list').style.transition="all .6s";
          selector(".kill-con-list").style.left=-selector(".kill-con-left").offsetWidth*bbb+'px';
          console.log(selector(".kill-con-list").style.left);
          if(selector(".kill-con-list").style.left==0+'px'){
              setTimeout(function(){
                  bbb=selector(".kill-con-list").offsetWidth/selector('.kill-con-left').offsetWidth-2;
                  selector('.kill-con-list').style.transition="";
                  selector(".kill-con-list").style.left=-selector(".kill-con-left").offsetWidth*bbb+'px';
              },600)
          }
      };

      selector('.kill-btnR').onclick=function(){
          if(!bbb){
              return false;
          }
          bbb++;
          selector('.kill-con-list').style.transition="all .6s";
          selector(".kill-con-list").style.left=-selector(".kill-con-left").offsetWidth*bbb+'px';
          if(selector(".kill-con-list").style.left==-selector(".kill-con-list").offsetWidth+selector(".kill-con-left").offsetWidth+"px"){
              bbb=0;
              setTimeout(function(){
                  bbb=1;
                  selector('.kill-con-list').style.transition="";
                  selector(".kill-con-list").style.left=-selector(".kill-con-left").offsetWidth+'px';
              },600)
          }
      }

      //京东秒杀底下的轮播（右）
      var oSDot=document.querySelectorAll('.switch-dot li');
      var oSPic=document.querySelectorAll('.small-scroll li');
      var aa= 0,tt=null;
      oSDot[0].style.background='#ff1021';
      oSPic[1].style.zIndex='3';
      oSPic[1].style.opacity='0';
      for(var i= 0;i<oSDot.length;i++){
          oSDot[i].value=i;
          oSDot[i].onmouseover=function(){
              aa=this.value;
              smallScroll();
          }
      }
      function smallScroll(){
          for(var i= 0;i<oSDot.length;i++){
              oSDot[i].style.background='';
              oSPic[i].style.zIndex='3';
              oSPic[i].style.opacity='0';
          }
          oSDot[aa].style.background='#ff1021';
          oSPic[aa].style.zIndex='5';
          oSPic[aa].style.opacity='1';
      }
      function t1(){
          tt=setInterval(function(){
              if(aa){
                  aa=0;
              }
              else{
                  aa=1;
              }
              smallScroll();
          },1500)
      }
      selector('.kill-con-right').onmouseover=function(){
          clearInterval(tt);
      };
      selector('.kill-con-right').onmouseout=function(){
          t1();
      };
     t1();

  //    会买专辑(轮播)
      // 作js方法（会员专辑轮播）
      var OthirdDot=document.querySelectorAll(".third-dot li");
      var OthirdInner=document.querySelectorAll(".third-con2-inner");
      var third_show=null;
      var third_timer=null;
      OthirdInner[0].style.opacity=1;
      OthirdDot[0].style.background="#E01222";
      //底下圆点，和图片的切换
      function third_change(){
          for(var i=0;i<OthirdDot.length;i++){
              OthirdInner[i].style.transition="";
              OthirdDot[i].style.background="";
              OthirdInner[i].style.opacity="0";
          }
          OthirdInner[third_show].style.transition="opacity .5s linear";
          OthirdDot[third_show].style.background="#E01222";
          OthirdInner[third_show].style.opacity=1;
      }
      //循环给每个点绑定一个事件
      for(var i=0;i<OthirdDot.length;i++){
          OthirdDot[i].value=i;
          OthirdDot[i].onmouseover=function(){
              third_show=this.value;
              third_change();
          }
      }
      //向左的按键
      selector(".third-btnL").onclick=function(){
          third_show--;
          if(third_show<0){
              third_show=OthirdDot.length-1;
          }
          third_change();
      };
      //向右的按键
      selector(".third-btnR").onclick=function(){
          third_show++;
          if(third_show>OthirdDot.length-1){
              third_show=0;
          }
          third_change();
      }
      //自动切换
       function third_loop(){
           third_timer=setInterval(function(){
               third_show++;
               if(third_show>OthirdDot.length-1){
                   third_show=0;
               }
               third_change();
           },2000)
       }
      selector(".third-con2").onmouseover=function(){
          clearInterval(third_timer);
      }
      selector(".third-con2").onmouseout=function(){
          third_loop();
      }
      third_loop();

      //jquery方法
      // var third_li=2;
      // var third_timer=null;
      // $(".third-dot li").eq(2).css("backgroundColor","#E01222");
      // //鼠标点击小圆点
      // $(".third-dot li").mouseover(function(){
      //     third_li=$(this).index();
      //     $(this).css({background:'#E01222'}).siblings().css("background","");
      //     $(".third-con2-inner").eq($(this).index()).fadeIn().siblings("div:lt(2)").fadeOut();
      // });
      // //定时器循环轮播
      // function third_loop(){
      //     third_timer=setInterval(function(){
      //         third_li++;
      //         if(third_li>2){
      //             third_li=0;
      //         }
      //         $(".third-dot li").eq(third_li).css({background:'#E01222'}).siblings().css("background","");
      //         $(".third-con2-inner").eq(third_li).fadeIn().siblings("div:lt(2)").fadeOut();
      //     },2500);
      // }
      // //鼠标移入  轮播暂停
      // $(".third-con2").mouseover(function(){
      //    clearInterval(third_timer);
      //    $(".third-btnL").show().siblings("div:gt(2)").show();
      // });
      // $(".third-con2").mouseout(function(){
      //     third_loop();
      //     $(".third-btnL").hide().siblings("div:gt(2)").hide();
      // });
      // //左右按钮
      // $(".third-btnR").click(function(){
      //     third_li++;
      //     if(third_li>2){
      //         third_li=0;
      //     }
      //     $(".third-dot li").eq(third_li).css({background:'#E01222'}).siblings().css("background","");
      //     $(".third-con2-inner").eq(third_li).fadeIn().siblings("div:lt(2)").fadeOut();
      // });
      // $(".third-btnL").click(function(){
      //     third_li--;
      //     if(third_li<0){
      //         third_li=2;
      //     }
      //     $(".third-dot li").eq(third_li).css({background:'#E01222'}).siblings().css("background","");
      //     $(".third-con2-inner").eq(third_li).fadeIn().siblings("div:lt(2)").fadeOut();
      // });
      // //轮播函数
      // third_loop();


  //    排行榜模块
      //排行榜模块  标题下面的小红线滑块
      var Ul3=null;
      var oCon3Tit=document.querySelectorAll(".third-con3-tit>a");
      var oCon3Ul=document.querySelectorAll(".third-con3-con-cate");
      for(var i=0;i<oCon3Tit.length;i++){
          oCon3Tit[i].value=i;
          oCon3Tit[i].onmouseover=function(){
              Ul3=this.value;
              for(var i=0;i<oCon3Tit.length;i++){
                  oCon3Ul[i].style.display="none";
                  selector(".red-bottom-line").style.left=75*Ul3+10+"px";
              }
              oCon3Ul[Ul3].style.display="block";
          }
      }
      selector(".red-bottom-line")
























  }