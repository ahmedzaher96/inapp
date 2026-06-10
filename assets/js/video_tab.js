

/*=============================================================================================*/
/*--------------------------------------  video_tab_page  -------------------------------------*/
/*=============================================================================================*/

$$(document).once('page:init','.page[data-name="video_tab_page"]',function(e,page){

localStorage.removeItem("p13_ajax_video_list");
localStorage.removeItem("p13_ajax_trend_video");
localStorage.removeItem("p13_ajax_complete");

create_swiper_p13fun();
get_video_list_p13fun();
scroll_event_p13fun();

document.addEventListener("resume",function(){
if(app.views.current.router.currentRoute.name == "video_tab_page"){reload_video_list_p13fun();}},false);

});

//====================================================================

$$(document).on('page:init','.page[data-name="video_tab_page"]',function(e,page){

if(!localStorage.getItem("user-app_activation") || $("body").hasClass("app_in_review")){
setTimeout(function(){app.views.current.router.navigate({name:"match_tab_page"});},1);
setTimeout(function(){app.views.current.router.navigate({name:"match_tab_page"});},1000);
}

});

//====================================================================

$$(document).on('page:reinit','.page[data-name="video_tab_page"]',function(e,page){

$("#video_tab_page .page-content").scrollTop(localStorage.getItem("p13_scroll_position"));
reload_video_list_p13fun();
interval_swiper_p13fun();

});

//====================================================================

$$(document).on('page:beforeout','.page[data-name="video_tab_page"]',function(e,page){

localStorage.setItem("p13_scroll_position",($("#video_tab_page .page-content").scrollTop()));
$("#video_tab_page").find("img.lazy-fade-in").each(function(){$(this).removeClass("lazy-fade-in");});

});

/*=================================  reload_video_list_p13fun  ================================*/

function reload_video_list_p13fun(prm_fun){

if($(".p13_li_video:visible").length){

get_video_list_p13fun("reload");

}

}

/*==================================  get_video_list_p13fun  ==================================*/

function get_video_list_p13fun(prm_fun){

var user_language = localStorage.getItem("user-language");

if(localStorage.getItem("user-app_activation") != "full" || $("body").hasClass("app_in_review")){
var app_suspended_arr = JSON.parse(localStorage.getItem("app-suspended_arr"));
if(app_suspended_arr){if(app_suspended_arr["highlights_country"]){
var prm_suspended_country = "&suspended_country="+String(app_suspended_arr["highlights_country"]);}}
}

var page = $("#p13_ul_video").attr("page");if(!page){var page = 1;}
if(prm_fun == "reload"){var page = 1;}
if(prm_fun == "get_more"){var page = (page*1)+1;}

var json_url = "https://mydb.sportmatchs.com/highlights/?page="+page+"&lang="+user_language;

if(prm_suspended_country){json_url += prm_suspended_country;}

//alert(json_url)

var p13_ajax_video_list = $.ajax({url:json_url,dataType:"json",
complete:function(){localStorage.setItem("p13_ajax_video_list","yes");after_ajax_complete_p13fun();},
success:function(data){

if(prm_fun != "reload"){$("#p13_ul_video").attr("page",page);}

$(".p13_li_video").find("img.lazy-fade-in").each(function(){$(this).removeClass("lazy-fade-in");});

if(data.length == 0){$(".p13_li_video").last().addClass("stop_down");}

for(var i = 0; i < data.length; i++){

var video_id = data[i].video_id;
var video_date = data[i].date;
var video_title = data[i].title;
var video_image = data[i].image;
var video_url = data[i].url;
var video_source = data[i].source;
var player_type = data[i].player_type;

if($(".p13_li_video[video_id='"+video_id+"']").length){
$(".p13_li_video[video_id='"+video_id+"']").attr("url",video_url);
}

if($(".p13_li_video[video_id='"+video_id+"']").length &&
($(".p13_li_video[video_id='"+video_id+"']").find("img").attr("src")) != video_image){
$(".p13_li_video[video_id='"+video_id+"']").find("img").attr("src",video_image);
}

if(!$(".p13_li_video[video_id='"+video_id+"']").length){
$("#p13_ul_video").append(
'<li class="p13_li_video button click_color" video_id="'+video_id+'" url="'+video_url+'" '+
'date="'+video_date+'" source="'+video_source+'" player_type="'+player_type+'" >'+
'<span class="p13_li_video_time"></span>'+
'<img class="p13_li_video_image lazy lazy-fade-in" src="assets/img/app_logo.png" data-src="'+video_image+'" />'+
'<i class="ionicons-play"></i>'+
'<p class="p13_li_video_title">'+video_title+'</p>'+
'</li>'
);
}






}

after_get_video_list_p13fun(prm_fun);

}

});

}

/*===============================  after_get_video_list_p13fun  ===============================*/

function after_get_video_list_p13fun(prm_fun){

setTimeout(function(){$(".p13_li_video_image.lazy").each(function(index,element){app.lazy.loadImage(element);});},100);

if(prm_fun != "reload" && $("#p13_ul_video").attr("page")==1){
$("#p13_ul_video").removeClass("vh_height");
}

video_time_p13fun();
arrange_video_p13fun();

$(".p13_bottom_preloader").detach();

check_custom_native_ads_fun("video_tab_loaded",prm_fun);

}

/*====================================  video_time_p13fun  ====================================*/

function video_time_p13fun(){

var translate_arr = JSON.parse(localStorage.getItem("app-translate_arr"));
var user_language = localStorage.getItem("user-language");
var text_arr = JSON.parse(translate_arr["68"][user_language]);

$(".p13_li_video").each(function(){
var date = $(this).attr("date");
var nutc = Math.trunc((new Date().getTime())/1000);
var nt = Math.trunc(((nutc*1)-(date*1))/60);
if(nt < 60){if(nt <= 0){ var time_p = text_arr[0]; }		if(nt == 1){ var time_p = text_arr[1]; }
if(nt == 2){ var time_p = text_arr[2]; }					if(nt > 2 && nt <= 10){ var time_p = text_arr[3].replace("xxxxx",nt); }	
if(nt > 10){ var time_p = text_arr[4].replace("xxxxx",nt); }	}
if(nt >= 60 && nt < 24*60){var nt = Math.trunc((nt*1)/60);	if(nt <= 1){ var time_p = text_arr[5]; }
if(nt == 2){ var time_p = text_arr[6]; }					if(nt > 2 && nt <= 10){ var time_p = text_arr[7].replace("xxxxx",nt); }
if(nt > 10){ var time_p = text_arr[8].replace("xxxxx",nt); } }
if(nt >= 24*60 && nt < 7*24*60){ var nt = Math.trunc((nt*1)/(24*60));	 if(nt == 1){ var time_p = text_arr[9]; }
if(nt == 2){ var time_p = text_arr[10]; }					if(nt > 2){  var time_p = text_arr[11].replace("xxxxx",nt); }	}
if(nt >= 7*24*60 && nt < 4*7*24*60){ var nt = Math.trunc((nt*1)/(7*24*60));
if(nt == 1){ var time_p = text_arr[12]; }					if(nt == 2){ var time_p = text_arr[13]; }
if(nt == 3){ var time_p = text_arr[14]; }					if(nt == 4){ var time_p = text_arr[15]; }		}
if(nt >= 4*7*24*60 && nt < 2*4*7*24*60){ var time_p = text_arr[16]; }
if(nt >= 2*4*7*24*60){ var time_p = text_arr[17]; }
$(this).find(".p13_li_video_time").text(time_p);
});

}

/*===================================  arrange_video_p13fun  ==================================*/

function arrange_video_p13fun(){
var video_date_arr = [];
$(".p13_li_video").each(function(){
var date = $(this).attr("date");
if($.inArray(date,video_date_arr) < 0){ video_date_arr.push(date); }
});
video_date_arr.sort(function(a,b){ return b - a; });
for(var r = 0; r < video_date_arr.length; r++){
$(".p13_li_video[date='"+video_date_arr[r]+"']").appendTo("#p13_ul_video");
}
}

/*===================================  create_swiper_p13fun  ==================================*/

function create_swiper_p13fun(){

var user_language = localStorage.getItem("user-language");

if(localStorage.getItem("user-app_activation") != "full" || $("body").hasClass("app_in_review")){
var app_suspended_arr = JSON.parse(localStorage.getItem("app-suspended_arr"));
if(app_suspended_arr){if(app_suspended_arr["highlights_country"]){
var prm_suspended_country = "&suspended_country="+String(app_suspended_arr["highlights_country"]);}}
}

var json_url = "https://mydb.sportmatchs.com/highlights/trend/?lang="+user_language;

if(prm_suspended_country){json_url += prm_suspended_country;}

//alert(json_url)

var p13_ajax_trend_video = $.ajax({url:json_url,dataType:"json",
complete:function(){localStorage.setItem("p13_ajax_trend_video","yes");after_ajax_complete_p13fun();},
success:function(data){

for(var i = 0; i < data.length; i++){

var video_id = data[i].video_id;
var video_date = data[i].date;
var video_title = data[i].title;
var video_image = data[i].image;
var video_url = data[i].url;
var video_source = data[i].source;
var player_type = data[i].player_type;

app.swiper.get("#p13_swiper_area .swiper-container").appendSlide(
'<div class="swiper-slide p13_swiper_slide" video_id="'+video_id+'" url="'+video_url+'" '+
'date="'+video_date+'" source="'+video_source+'" player_type="'+player_type+'" >'+
'<img class="lazy lazy-fade-in" src="assets/img/app_logo.png" data-src="'+video_image+'" />'+
'<i class="ionicons-play"></i>'+
'<p>'+video_title+'</p></div>'
);

}

app.swiper.get("#p13_swiper_area .swiper-container").removeSlide(0);

app.swiper.get("#p13_swiper_area .swiper-container").on('slideChange',function(){
$("#p13_swiper_area .swiper-container").attr("next_swiper",((Math.trunc((new Date()).getTime()/1000))*1)+10);
});

interval_swiper_p13fun();

}
});

}

/*===================================  interval_swiper_p13fun  ==================================*/

function interval_swiper_p13fun(){

$("#p13_swiper_area .swiper-container").attr("next_swiper",((Math.trunc((new Date()).getTime()/1000))*1)+10);

var interval_swiper = setInterval(function(){
var current_ms = Math.trunc((new Date()).getTime()/1000);
var next_ms_attr = $("#p13_swiper_area .swiper-container").attr("next_swiper");
if(current_ms >= next_ms_attr){
if($("body").attr("app_dir") != "left"){app.swiper.get("#p13_swiper_area .swiper-container").slideNext();}
else{app.swiper.get("#p13_swiper_area .swiper-container").slidePrev();}
}
},1000);

$$(document).on('page:beforeout','.page[data-name="video_tab_page"]',function(e,page){clearInterval(interval_swiper);});

}

/*================================  after_ajax_complete_p13fun  ===============================*/

function after_ajax_complete_p13fun(){

if(localStorage.getItem("p13_ajax_complete")!="yes" && localStorage.getItem("p13_ajax_video_list")=="yes"
&& localStorage.getItem("p13_ajax_trend_video")=="yes"){

setTimeout(function(){$("#p13_swiper_area").find("img.lazy").each(function(index,element){app.lazy.loadImage(element);});},100);

if(!$(".p13_swiper_slide[video_id]").length){$("#p13_swiper_area").detach();}

$("#video_tab_page").removeClass("preloader_mode");

localStorage.setItem("p13_ajax_complete","yes");

}
}

/*===================================  scroll_event_p13fun  ===================================*/

function scroll_event_p13fun(){
var previous_scroll = 0;
$("#video_tab_page .page-content").scroll(function(){

var current_scroll = $(this).scrollTop();
var height_area = $("#p13_ul_video").height();

if(current_scroll > previous_scroll){var scroll_direction = "down";}
if(current_scroll < previous_scroll){var scroll_direction = "up";}

if(scroll_direction == "down" && $(".p13_li_video:visible").length && !$(".p13_bottom_preloader").length
&& !$(".p13_li_video.stop_down").length && current_scroll+700 > height_area){

if(!$(".p13_bottom_preloader").length){$("#video_tab_page .page-content").append('<div class="preloader p13_bottom_preloader">'+
'<span class="preloader-inner"><svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="16"></circle></svg></span></div>');}

get_video_list_p13fun("get_more");

}

previous_scroll = current_scroll;
});
}






