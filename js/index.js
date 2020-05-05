function chongzhi(){
    document.querySelector("#touzhukuang").value=1;
}
function queren(){
    tanchukuang.style.display="none";
    removeUnScroll();

    cebian_zhetu[2].style.display="none";
    var yaoqing_ma=document.querySelector("#shuruyaoqin").value;
    setCookie("yaoqingma",yaoqing_ma,7);
}

function kuaisutouzhu(ethvalue){
   
    var touzhuinput= document.querySelector('#touzhukuang').value;
    touzhuinput=parseInt(touzhuinput)+parseInt(ethvalue);
    document.querySelector("#touzhukuang").value=touzhuinput;
}
var languageforselect=getCookie("language_for_select");   
var touzhudoc1 = document.getElementById("touzhuid1");
var touzhudoc2 = document.getElementById("touzhuid2");
var touzhudoc3 = document.getElementById("touzhuid3");
var touzhudoc4 = document.getElementById("touzhuid4");
var touzhudoc5 = document.getElementById("touzhuid5");
var touzhudoc6 = document.getElementById("touzhuid6");
touzhudoc1.onclick= function (){
    kuaisutouzhu(1);
}
touzhudoc2.onclick= function (){
    kuaisutouzhu(3);
}
touzhudoc3.onclick= function (){
    kuaisutouzhu(5);
}
touzhudoc4.onclick= function (){
    kuaisutouzhu(10);
}
touzhudoc5.onclick= function (){
    kuaisutouzhu(20);
}
touzhudoc6.onclick= function (){
    kuaisutouzhu(30);
}


$(document).ready(function(){
 getEthBalance();
 $('#ljtz').click(function(){
	$('.wrap-dialog').removeClass("hide");
 });
 $('#confirm').click(function(){
  console.log('confirm');
  $('.wrap-dialog').addClass("hide");
  getEthBalance();
  var tempbetting1 = parseFloat(document.querySelector("#touzhukuang").value);
  if(parseInt(first_betting)==1){
        if((tempbetting1>=1)&&(tempbetting1<=3))
        {
            if(window.ethBalance<tempbetting1)
            {
                //alert("eth余额不足");
                alerttanchu1();
            }
            else
            {
                if(document.querySelector("#touzhukuang").value.toString().split(".")[1]==null||document.querySelector("#touzhukuang").value.toString().split(".")[1].length<=2){
                    window.newethbalance = window.ethBalance;
                    window.ethNumber = parseInt(tempbetting1);
                
                    handleBuy();
                    alerttanchu();
               // alert("区块确认中,请稍候查看");
                window.timeintervalnumber = 0;
                }else{
                       // alert('输入投注额小数点位数不得超过2位');   
                       alerttanchu2();
                }
            }
        }
        else
        {
        //alert("首轮投注1~3ETH!");
        alerttanchu3();
        }
  }else if(parseInt(first_betting)==3){
		  if((tempbetting1>=3)&&(tempbetting1<=300))
		  {
			  if(window.ethBalance<tempbetting1)
			  {
				  alerttanchu1();
			  }
			  else
			  {
				  if(document.querySelector("#touzhukuang").value.toString().split(".")[1]==null||document.querySelector("#touzhukuang").value.toString().split(".")[1].length<=2){
					  window.newethbalance = window.ethBalance;
					  window.ethNumber = parseInt(tempbetting1);

					  handleBuy();
					  alerttanchu();
					  window.timeintervalnumber = 0;
				  }else{
					  alerttanchu2();
				  }
			  }
		  }
		  else
		  {
			  alert("次轮投注3~300ETH!");
		  }
  }else{
      //alert ('首轮已参与过投注');
      alerttanchu4();
  }
 });
 $('#cancel').click(function(){
  console.log('cancel');
  $('.wrap-dialog').addClass("hide");
 });
});



function lijitouzhu(ethuservalue){
var xhr=new XMLHttpRequest();
        xhr.open("POST","./touzhu/touzhu.html",true);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&xhr.status==200){
		console.log(xhr.responseText);
                var arr=JSON.parse(xhr.responseText);                                        
                console.log(arr);              
                                    var tanchu=document.getElementsByClassName("touzhutanchu")[0];
                                    console.log(languageforselect);     
                                    if(arr.tz_status=='1'){
                                        if(languageforselect=="en"){
                                            tanchu.innerHTML="Bet Successful";
                                        }else if(languageforselect=="jp"){
                                            tanchu.innerHTML="成功した賭け";
                                        }else if(languageforselect=="kr"){
                                            tanchu.innerHTML="성공적인 내기";
                                        }else{                           
                                            tanchu.innerHTML="投注成功";
                                        }
										
                                        document.querySelector("#touzhukuang").value=1;

                                    }else{
                                        if(languageforselect=="en"){
                                            tanchu.innerHTML="Bet failed";
                                        }else if(languageforselect=="jp"){
                                            tanchu.innerHTML="ベット失敗";
                                        }else if(languageforselect=="kr"){
                                            tanchu.innerHTML="내기 실패";
                                        }else{
                                            tanchu.innerHTML="投注失败";                       
                                        }
                                        
                                        document.querySelector('.test4').querySelector('p').style.color='red';
                                        document.querySelector('.test4').querySelector('p').innerHTML= arr.prompt;
                                        /*
                                        document.querySelector("#touzhukuang").onporpertychanger=function(){
                                            document.querySelector('.test4').querySelector('p').style.color='#1AB6FF';
                                        }*/
                                       
                                    }
                                    tanchu.style.transform="translateY(-40vh) ";
                                    setTimeout(function(){
                                        tanchu.style.display="none";
                                         tanchu.style.transform="translateY(0) ";
                                        setTimeout(function(){tanchu.style.display="block";window.location.reload();},500)
                                        
                                    },2000)                                        
                            }
                        }
                xhr.send("tznum="+document.querySelector("#touzhukuang").value+"&&myeth="+ethuservalue);  
}

document.querySelector(".test3").querySelectorAll("button")[0].onclick=function(){
    window.location.href="goumaimenpiao.html"
};


var button_collapse_category=document.getElementById("button-collapse-category");
    var button_collapse_account=document.getElementById("button-collapse-account");
    var nav_mobile_category=document.getElementById("nav-mobile-category");
    var nav_mobile_account=document.getElementById("nav-mobile-account");
    var cebian_zhetu=document.querySelectorAll(".cebian_zhetu");

    var change_lang=document.getElementsByClassName("search-result-head");

    /*取消滚轮默认事件*/
    function unScroll() {
        var top = $(document).scrollTop();
        $(document).on("scroll.unable",function (e) {
            $(document).scrollTop(top);
        })
    }
    function removeUnScroll() {
        $(document).unbind("scroll.unable");
    }


    //左侧导航
     button_collapse_category.onclick=function(){
         unScroll();
        nav_mobile_category.style.transition="-webkit-transform 300ms ease-out";
        nav_mobile_category.style.transform="translateX(250px) ";
        cebian_zhetu[0].style.display="block";
        cebian_zhetu[0].onclick=function(){
            removeUnScroll();
            nav_mobile_category.style.transition="-webkit-transform 300ms ease-out";
            nav_mobile_category.style.transform="translateX(0) ";
            cebian_zhetu[0].style.display="none";
        }
    };

    //右侧导航

    function clear_language(){
        removeUnScroll();
        nav_mobile_account.style.transition="-webkit-transform 500ms ease-out";
        nav_mobile_account.style.transform="translateX(0) ";
        cebian_zhetu[1].style.display="none";
    }

    button_collapse_account.onclick=function(){

        unScroll();
        nav_mobile_account.style.transition="-webkit-transform 500ms ease-out";
        nav_mobile_account.style.transform="translateX(-250px) ";
        cebian_zhetu[1].style.display="block";
        cebian_zhetu[1].onclick=function(){clear_language()};
        for(var i=0;i<change_lang.length;i++){
            change_lang[i].onclick=function(){
                clear_language()
            };
        }

    };
    var insurance_amount=0;
    var starttime=0;
    //var starttime = 72*3600000;//new Date(2020,2,25,12,0,0);
    function Remaining_time(){
        var xhre=new XMLHttpRequest();
        xhre.open("GET","./insurance/get_time.html",true);
        xhre.onreadystatechange=function(){
            if(xhre.readyState==4&&xhre.status==200){
                var insurance_news=JSON.parse(xhre.responseText);
                starttime=parseInt(insurance_news.Remaining_time);
                if(insurance_news.insurance_amount.toString().split(".")[1]==null||insurance_news.insurance_amount.toString().split(".")[1].length<=4){
                  var insurance_amount=insurance_news.insurance_amount;
                  }else{
                   var  insurance_amount=Number(insurance_news.insurance_amount).toFixed(4);
                  }
                if(insurance_news.newbettingdata.toString().split(".")[1]==null||insurance_news.newbettingdata.toString().split(".")[1].length<=4){
                   var  newbettingdata_num=insurance_news.insurance_amount;
                }else{
                  var   newbettingdata_num=Number(insurance_news.newbettingdata).toFixed(4);
                }
                //document.querySelector('#insurance').innerHTML=insurance_amount;
                document.querySelector('#betting_global_sum').innerHTML=newbettingdata_num;
            }
        }
        xhre.send(null);
    }

    function my_betting_num(account){
        var xhrea=new XMLHttpRequest();
        //console.log('get_betting_num_per:'+account);
	xhrea.open("GET","./php/get_betting_num_per.php?account="+account,true);
        xhrea.onreadystatechange=function(){
            if(xhrea.readyState==4&&xhrea.status==200){
                var my_betting_eth_str=xhrea.responseText;
		var strs= new Array();
		strs=my_betting_eth_str.split(",");
                //console.log(my_betting_eth_str);
                document.getElementById('my_betting_eth').innerHTML=strs[0];
                first_betting=parseInt(strs[1]);
            }
        }
        xhrea.send(null);
    }


    
    
    function daojishi() {
        //var nowtime = new Date();
	if(starttime>1000)
	starttime = starttime - 1000;
        var hour = parseInt(starttime / 1000 /60/60);
        var minute = parseInt(starttime / 1000 / 60%60);
        var seconds = parseInt(starttime / 1000 % 60);

        if(hour<10){
	    if(hour<1) hour='00';
            else hour="0"+hour;
        }
        if(minute<10){
	    if(minute<1) minute='00';
            else minute="0"+minute;
        }
        if(seconds<10){
	    if(seconds<1) seconds='00';
            else seconds="0"+seconds;
        }
        document.querySelector("#test5_1_1_h").innerHTML=hour;
        document.querySelector("#test5_1_1_min").innerHTML=minute;
        document.querySelector("#test5_1_1_s").innerHTML=seconds;
    }
    Remaining_time();
    daojishi();
    setInterval(function(){
        Remaining_time();
	user_account = window.accountcurrent;
	//console.log(window.accountcurrent+','+user_account);
        my_betting_num(user_account);
    },5000)
    setInterval(function(){
	    daojishi();
    }, 1000);

    var firsttime=false;
    var tanchukuang=document.querySelector(".tanchukuang");
    var gonggaowenzi=document.querySelector(".yaoqin_form").getElementsByTagName("div");
    var i=0;

        if(firsttime){
            unScroll();
            cebian_zhetu[2].style.display="block";
        timer1=setInterval(function(){
            tanchukuang.style.top=50-0.4*i+"vh";
            tanchukuang.style.left=50-0.7*i+"%";
            tanchukuang.style.width=1.4*i+"%";
            tanchukuang.style.height=0.5*i+"vh";
            i++;
            if(i>=50){
                clearInterval(timer1);
                for(var j=1;j<gonggaowenzi.length;j++){
                    gonggaowenzi[j].style.display="block";
                }
            }
        },10);
    }else{
        tanchukuang.style.display="none";
            firsttime=false;
    }
