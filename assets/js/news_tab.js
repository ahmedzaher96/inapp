

/*=============================================================================================*/
/*--------------------------------------  news_tab_page  --------------------------------------*/
/*=============================================================================================*/

$$(document).once('page:init','.page[data-name="news_tab_page"]',function(e,page){

localStorage.removeItem("p5_ajax_news_list");
localStorage.removeItem("p5_ajax_trend_news");
localStorage.removeItem("p5_ajax_complete");

create_swiper_p5fun();
get_news_list_p5fun();
get_toolbar_cat_p5fun();
toolbar_click_p5fun();
toolbar_swipe_p5fun();
scroll_event_p5fun();
news_li_click_p5fun();

document.addEventListener("resume",function(){
if(app.views.current.router.currentRoute.name == "news_tab_page"){reload_news_list_p5fun();}},false);

});

//====================================================================

$$(document).on('page:reinit','.page[data-name="news_tab_page"]',function(e,page){

$("#news_tab_page .page-content").scrollTop(localStorage.getItem("p5_scroll_position"));
reload_news_list_p5fun();
interval_swiper_p5fun();

var toolbar_last_pos = $("#news_tab_page .toolbar_horizontal_scroll").attr("last_pos")
$("#news_tab_page .toolbar_horizontal_scroll .toolbar-inner").scrollLeft(toolbar_last_pos);

});

//====================================================================

$$(document).on('page:beforeout','.page[data-name="news_tab_page"]',function(e,page){

localStorage.setItem("p5_scroll_position",($("#news_tab_page .page-content").scrollTop()));
$("#news_tab_page").find("img.lazy-fade-in").each(function(){$(this).removeClass("lazy-fade-in");});

});

/*==================================  reload_news_list_p5fun  =================================*/

function reload_news_list_p5fun(){

if($(".p5_li_news:visible").length){

get_news_list_p5fun("reload");

}

}

/*===================================  get_news_list_p5fun  ===================================*/

function get_news_list_p5fun(prm_fun){

var user_language = localStorage.getItem("user-language");

if(localStorage.getItem("user-app_activation") != "full" || $("body").hasClass("app_in_review")){
var app_suspended_arr = JSON.parse(localStorage.getItem("app-suspended_arr"));
if(app_suspended_arr){if(app_suspended_arr["news_country"]){
var prm_suspended_country = "&suspended_country="+String(app_suspended_arr["news_country"]);}}
}

var page = $("#p5_ul_news").attr("page");if(!page){var page=1;}
if(prm_fun == "reload"){var page = 1;}
if(prm_fun == "get_more"){var page = (page*1)+1;}

var json_url = "https://mydb.sportmatchs.com/news/?type=main&page="+page+"&lang="+user_language;

if(prm_suspended_country){json_url += prm_suspended_country;}

var type = $("#p5_toolbar .button.active").attr("type");
var type_id = $("#p5_toolbar .button.active").attr("type_id");

if(type && type_id){var json_url = json_url+"&tags="+type+"_"+type_id;}
else if(type && type != "all_news" && !type_id){var json_url = json_url+"&tags="+type;}

//alert(json_url);

var p5_ajax_news_list = $.ajax({url:json_url,dataType:"json",
complete:function(){localStorage.setItem("p5_ajax_news_list","yes");after_ajax_complete_p5fun();},
success:function(data){

if(prm_fun != "reload"){$("#p5_ul_news").attr("page",page);}

$(".p5_li_news").find("img.lazy-fade-in").each(function(){$(this).removeClass("lazy-fade-in");});

if(data.length == 0){$(".p5_li_news").last().addClass("stop_down");}

for(var i = 0; i < data.length; i++){

var news_id = data[i].news_id;
var news_date = data[i].date;
var news_title = data[i].title;
var news_image = data[i].image;
var news_url = data[i].url;

if(localStorage.getItem("user-app_activation") != "full" || $("body").hasClass("app_in_review")){
var news_title = news_title.replace("بالفيديو","").replace("فيديو:","").replace("فيديو :","").replace("فيديو","");}

if(!$(".p5_li_news[news_id='"+news_id+"']").length){
$("#p5_ul_news").append(
'<li class="p5_li_news button click_color" news_id="'+news_id+'" date="'+news_date+'" url="'+news_url+'" >'+
'<span class="p5_li_news_time"></span>'+
'<img class="p5_li_news_image lazy lazy-fade-in" src="assets/img/app_logo.png" data-src="'+news_image+'" />'+
'<p class="p5_li_news_title">'+news_title+'</p>'+
'</li>'
);
}

}

after_get_news_list_p5fun(prm_fun);

}
});

}

/*================================  after_get_news_list_p5fun  ================================*/

function after_get_news_list_p5fun(prm_fun){

setTimeout(function(){$(".p5_li_news_image.lazy").each(function(index,element){app.lazy.loadImage(element);});},100);

if(prm_fun != "reload" && $("#p5_ul_news").attr("page")==1){
$("#p5_ul_news").removeClass("vh_height");
}

news_time_p5fun();
arrange_news_p5fun();

$("#news_tab_page").removeClass("preloader_mode2");
$(".p5_bottom_preloader").detach();

check_custom_native_ads_fun("news_tab_loaded",prm_fun);

}

/*=====================================  news_time_p5fun  =====================================*/

function news_time_p5fun(){

var user_language = localStorage.getItem("user-language");
var translate_arr = JSON.parse(localStorage.getItem("app-translate_arr"));
var text_arr = JSON.parse(translate_arr["68"][user_language]);

$(".p5_li_news").each(function(){
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
$(this).find(".p5_li_news_time").text(time_p);
});

}

/*====================================  arrange_news_p5fun  ===================================*/

function arrange_news_p5fun(){
var news_date_arr = [];
$(".p5_li_news").each(function(){
var date = $(this).attr("date");
if($.inArray(date,news_date_arr) < 0){ news_date_arr.push(date); }
});
news_date_arr.sort(function(a,b){ return b - a; });
for(var r = 0; r < news_date_arr.length; r++){
$(".p5_li_news[date='"+news_date_arr[r]+"']").appendTo("#p5_ul_news");
}
}

/*====================================  scroll_event_p5fun  ===================================*/

function scroll_event_p5fun(){
var previous_scroll = 0;
$("#news_tab_page .page-content").scroll(function(){

var current_scroll = $(this).scrollTop();
var height_area = $("#p5_ul_news").height();

if(current_scroll > previous_scroll){var scroll_direction = "down";}
if(current_scroll < previous_scroll){var scroll_direction = "up";}

if(scroll_direction == "down" && $(".p5_li_news:visible").length && !$(".p5_bottom_preloader").length
&& !$(".p5_li_news.stop_down").length && current_scroll+700 > height_area){

if(!$(".p5_bottom_preloader").length){$("#news_tab_page .page-content").append('<div class="preloader p5_bottom_preloader">'+
'<span class="preloader-inner"><svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="16"></circle></svg></span></div>');}

get_news_list_p5fun("get_more");

}

previous_scroll = current_scroll;
});
}

/*===================================  toolbar_click_p5fun  ===================================*/

function toolbar_click_p5fun(){
$(document).on("click","#p5_toolbar .button",function(){
if(!$(this).hasClass("active")){
$("#news_tab_page .page-content").scrollTop(0);
var h1 = $(window).height();var h2 = $("#p5_toolbar").offset().top;var top = h2+ ((h1-h2)/2) - 16;
$("#p5_list_preloader").css("top",top+"px");
$("#news_tab_page").addClass("preloader_mode2");
$("#p5_ul_news").addClass("vh_height");
$("#p5_ul_news").attr("page",1);
$("#p5_toolbar .button.active").removeClass("active");
$(this).addClass("active");
$("#p5_ul_news .p5_li_news").detach();
get_news_list_p5fun();
}
});
}

/*===================================  toolbar_swipe_p5fun  ===================================*/

function toolbar_swipe_p5fun(){
$("#p5_ul_news").swipe({
swipe:function(event,direction){
var ib = $("#p5_toolbar .button.active").index();
var mib = $("#p5_toolbar .button").length-1;
if($("body").attr("app_dir") == "left"){
if(direction == "left"){var direction="right";}else if(direction == "right"){var direction = "left";}
}
if(direction == "left"){ var nib = (ib*1)-1;if(nib >= 0){ $("#p5_toolbar .button").eq(nib).click(); }  }
if(direction == "right"){ var nib = (ib*1)+1;if(nib <= mib){ $("#p5_toolbar .button").eq(nib).click(); }  }
},threshold:80,allowPageScroll:"vertical"
});
}

/*==================================  get_toolbar_cat_p5fun  ==================================*/

function get_toolbar_cat_p5fun(){

var app_news_toolbar_category = JSON.parse(localStorage.getItem("app-news_toolbar_category"));
var translate_arr = JSON.parse(localStorage.getItem("app-translate_arr"));
var user_language = localStorage.getItem("user-language");
var media_domain = localStorage.getItem("app-media_domain");
var app_suspended_arr = JSON.parse(localStorage.getItem("app-suspended_arr"));

for(var i = 0; i < app_news_toolbar_category.length; i++){

var cat_type = app_news_toolbar_category[i].type;
var cat_type_id = app_news_toolbar_category[i].type_id;
var cat_logo = (media_domain+"/news_toolbar_category/"+
(cat_type.toLowerCase())+"_"+(cat_type_id.toLowerCase())+".png").replace("_.png",".png");

var cat_name_id = app_news_toolbar_category[i].name_id;
var cat_name_arr = JSON.parse(translate_arr["91"][user_language]);
var cat_name = cat_name_arr[cat_name_id];

if(localStorage.getItem("user-app_activation") != "full" || $("body").hasClass("app_in_review")){
if(app_suspended_arr){if(app_suspended_arr["news_country"]){
if(cat_type == "country" && $.inArray(cat_type_id,(app_suspended_arr["news_country"])) > -1){ continue; }
}}
}

if(!$("#p5_toolbar .toolbar-inner .button[type='"+cat_type_id+"']").length){
$("#p5_toolbar .toolbar-inner").append(
'<button class="button gray_click" type="'+cat_type+'" type_id="'+cat_type_id+'" >'+
'<img class="lazy" src="assets/img/app_logo.png" data-src="'+cat_logo+'" />'+
'<p>'+cat_name+'</p>'+
'</button>');
}

}

$("#p5_toolbar .toolbar-inner .button:hidden").detach();

$("#p5_toolbar .button.active").removeClass("active");
$("#p5_toolbar .toolbar-inner .button").first().addClass("active");

var user_country_code = localStorage.getItem("user-country_code");
if($("#p5_toolbar .button[type_id='"+user_country_code+"']").length){
$("#p5_toolbar .button[type_id='"+user_country_code+"']").insertBefore("#p5_toolbar .button[type='country']:first");
}

}

/*===================================  create_swiper_p5fun  ===================================*/

function create_swiper_p5fun(){

var user_language = localStorage.getItem("user-language");

if(localStorage.getItem("user-app_activation") != "full" || $("body").hasClass("app_in_review")){
var app_suspended_arr = JSON.parse(localStorage.getItem("app-suspended_arr"));
if(app_suspended_arr){if(app_suspended_arr["news_country"]){
var prm_suspended_country = "&suspended_country="+String(app_suspended_arr["news_country"]);}}
}

var json_url = "https://mydb.sportmatchs.com/news/trend/?lang="+user_language;

if(prm_suspended_country){json_url += prm_suspended_country;}

//alert(json_url)

var p5_ajax_trend_news = $.ajax({url:json_url,dataType:"json",
complete:function(){localStorage.setItem("p5_ajax_trend_news","yes");after_ajax_complete_p5fun();},
success:function(data){

for(var i = 0; i < data.length; i++){

var news_id = data[i].news_id;
var news_date = data[i].date;
var news_title = data[i].title;
var news_image = data[i].image;
var news_url = data[i].url;

app.swiper.get("#p5_swiper_area .swiper-container").appendSlide(
'<div class="swiper-slide p5_swiper_slide" news_id="'+news_id+'" date="'+news_date+'" url="'+news_url+'" >'+
'<img class="lazy lazy-fade-in" src="assets/img/app_logo.png" data-src="'+news_image+'" />'+
'<p>'+news_title+'</p></div>'
);

}

app.swiper.get("#p5_swiper_area .swiper-container").removeSlide(0);

app.swiper.get("#p5_swiper_area .swiper-container").on('slideChange',function(){
$("#p5_swiper_area .swiper-container").attr("next_swiper",((Math.trunc((new Date()).getTime()/1000))*1)+10);
});

interval_swiper_p5fun();

}
});

}

/*===================================  interval_swiper_p5fun  ===================================*/

function interval_swiper_p5fun(){

$("#p5_swiper_area .swiper-container").attr("next_swiper",((Math.trunc((new Date()).getTime()/1000))*1)+10);

var interval_swiper = setInterval(function(){
var current_ms = Math.trunc((new Date()).getTime()/1000);
var next_ms_attr = $("#p5_swiper_area .swiper-container").attr("next_swiper");
if(current_ms >= next_ms_attr){
if($("body").attr("app_dir") != "left"){app.swiper.get("#p5_swiper_area .swiper-container").slideNext();}
else{app.swiper.get("#p5_swiper_area .swiper-container").slidePrev();}
}
},1000);

$$(document).on('page:beforeout','.page[data-name="news_tab_page"]',function(e,page){clearInterval(interval_swiper);});

}

/*=================================  after_ajax_complete_p5fun  =================================*/

function after_ajax_complete_p5fun(){

if(localStorage.getItem("p5_ajax_complete")!="yes" && localStorage.getItem("p5_ajax_news_list")=="yes"
&& localStorage.getItem("p5_ajax_trend_news")=="yes"){

setTimeout(function(){$("#p5_toolbar .button").find("img.lazy").each(function(index,element){app.lazy.loadImage(element);});},100);
setTimeout(function(){$("#p5_swiper_area").find("img.lazy").each(function(index,element){app.lazy.loadImage(element);});},100);

if(!$(".p5_swiper_slide[news_id]").length){$("#p5_swiper_area").detach();}

$("#news_tab_page").removeClass("preloader_mode");

localStorage.setItem("p5_ajax_complete","yes");
}
}

/*===================================  news_li_click_p5fun  ===================================*/

function news_li_click_p5fun(){
$(document).on("click",".p5_li_news,.p5_swiper_slide",function(){

var news_id = $(this).attr("news_id");
var news_date = $(this).attr("date");
var news_url = $(this).attr("url");
var news_title = $(this).find(".p5_li_news_title").text();
var news_image = $(this).find(".p5_li_news_image").attr("src");

if(news_id.includes("browser") == true){
var mode_theme_color = getComputedStyle(document.documentElement).getPropertyValue('--mode_theme_color');
if(localStorage.getItem("app-device") == "ios"){
var ref = cordova.InAppBrowser.open(news_url,'_blank','toolbarposition=top,location=no,hidenavigationbuttons=yes,toolbarcolor='+mode_theme_color+
',clearcache=yes,clearsessioncache=yes,hideurlbar=yes,lefttoright=yes,zoom=yes,closebuttoncaption=✕,closebuttoncolor=#ffffff,fullscreen=yes');
}
else{
var ref = cordova.InAppBrowser.open(news_url,'_blank','location=yes,hidenavigationbuttons=yes,toolbarcolor='+mode_theme_color+
',clearcache=yes,clearsessioncache=yes,hideurlbar=yes,lefttoright=yes,zoom=no,closebuttoncaption=✕,closebuttoncolor=#ffffff');
}
}
else{
app.views.current.router.navigate({ name:"news_details_page",
query:{news_id:news_id,news_date:news_date,news_title:news_title,news_image:news_image,previous_page:"news_tab_page"} });
}

});
}





