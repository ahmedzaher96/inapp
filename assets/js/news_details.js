

/*=============================================================================================*/
/*------------------------------------  news_details_page  ------------------------------------*/
/*=============================================================================================*/

$$(document).on('page:init','.page[data-name="news_details_page"]',function(e,page){

var query_news_id = page.route.query["news_id"];
var query_news_date = page.route.query["news_date"];
var query_news_title = page.route.query["news_title"];
var query_news_image = page.route.query["news_image"];

if(query_news_id){$("#news_details_page").attr("news_id",query_news_id);}
else{
setTimeout(function(){app.views.current.router.navigate({name:"news_tab_page"});},1);
setTimeout(function(){app.views.current.router.navigate({name:"news_tab_page"});},1000);
}

if(query_news_title && query_news_image && query_news_date){
var h2 = ($("#p6_news_image").height()) + ($("#p6_news_date").height()) + ($("#p6_news_title").height());
var h1 = $(window).height();var top = h2+ ((h1-h2)/2) - 20;
$("#p6_middle_preloader").css("top",top+"px");
$("#p6_news_title").text(query_news_title);
$("#p6_news_image").attr("src",query_news_image);
var msdate = new Date(query_news_date*1000);
var my_time = msdate.toLocaleString('en-US',{hour:'numeric',minute:'numeric',hour12:true});
if($("body").attr("app_dir") != "left"){var my_time = my_time.replace("AM","ص").replace("PM","م");}
var date_text = (msdate.getDate())+"/"+(msdate.getMonth()+1)+"/"+(msdate.getFullYear())+" - "+my_time;
$("#p6_news_date p").text(date_text);
$("#news_details_page").removeClass("hide_top_info");
}
else{
$("#p6_middle_preloader").css("top","calc(50% - 16px)");
$("#news_details_page").addClass("hide_top_info");
}

navbar_color_p6fun();
get_news_info_p6fun();
share_but_click_p6fun();

});

//====================================================================

$$(document).once('page:init','.page[data-name="news_details_page"]',function(e,page){

open_news_url_p6fun();

});

//====================================================================

$$(document).on('page:beforeout','.page[data-name="news_details_page"]',function(e,page){

$("#p6_news_content *").detach();

});

/*====================================  navbar_color_p6fun  ===================================*/

function navbar_color_p6fun(){
$("#news_details_page .page-content").scroll(function(){
var hh = ($("#p6_news_image").height()) - ($("#news_details_page .navbar").height());
var st = $(this).scrollTop();
if(st >= hh){var op = 1;}else{var op = st/hh;}
$("#news_details_page .navbar .navbar-bg").css("--opacity",op);
});
}

/*===================================  get_news_info_p6fun  ===================================*/

function get_news_info_p6fun(){

var news_id = $("#news_details_page").attr("news_id");
var user_language = localStorage.getItem("user-language");

var json_url = "https://mydb.sportmatchs.com/news/?select=all&news_id="+news_id+"&lang="+user_language;

if(localStorage.getItem("user-app_activation")=="full" && !$("body").hasClass("app_in_review")){json_url+="&allow_video=1";}

var p6_ajax_news_info = $.ajax({url:json_url,dataType:"json",
complete:function(){
$("#news_details_page").removeClass("preloader_mode").removeClass("hide_top_info");
check_custom_native_ads_fun("news_details_loaded");
var news_id = $("#news_details_page").attr("news_id");

},
success:function(data){

var news_content = data[1].content;
$("#p6_news_content").html(news_content);

var news_date = data[0].date;
var news_title = data[0].title;
var news_image = data[0].image;
var news_url = data[0].url;
if(data[0].tags){var news_tags = JSON.parse(data[0].tags);}

if(localStorage.getItem("user-app_activation") != "full" || $("body").hasClass("app_in_review")){
var news_title = news_title.replace("بالفيديو","").replace("فيديو:","").replace("فيديو :","").replace("فيديو","");}

$("#p6_news_title").text(news_title);
$("#p6_news_image").attr("src",news_image);

if(news_url){$("#p6_open_source_but").css("display","flex").attr("news_url",news_url);}
else{$("#p6_open_source_but").css("display","none");}

//================================================

var msdate = new Date(news_date*1000);
var my_time = msdate.toLocaleString('en-US',{hour:'numeric',minute:'numeric',hour12:true});
if($("body").attr("app_dir") != "left"){var my_time = my_time.replace("AM","ص").replace("PM","م");}
var date_text = (msdate.getDate())+"/"+(msdate.getMonth()+1)+"/"+(msdate.getFullYear())+" - "+my_time;
$("#p6_news_date p").text(date_text);

//================================================

if(data[0].tags){
var news_tags_text = "";
$.each(news_tags,function(key,value){
if(!value.length){news_tags_text += key+",";}
if(value.length){news_tags[key].forEach(function(value2){
if(key=="country"){news_tags_text += key+"_"+value2["cid"]+",";}
else if(key=="league"){news_tags_text += key+"_"+value2["lid"]+",";}
else if(key=="team"){news_tags_text += key+"_"+value2["tid"]+",";}
else if(key=="player"){news_tags_text += key+"_"+value2["pid"]+",";}
});}
});
if(news_tags_text){ get_more_news_p6fun(news_tags_text); }
}

//================================================

}
});

}

/*===================================  get_more_news_p6fun  ===================================*/

function get_more_news_p6fun(prm_news_tags){

var news_id = $("#news_details_page").attr("news_id");
var user_language = localStorage.getItem("user-language");

if(localStorage.getItem("user-app_activation") != "full" || $("body").hasClass("app_in_review")){
var app_suspended_arr = JSON.parse(localStorage.getItem("app-suspended_arr"));
if(app_suspended_arr){if(app_suspended_arr["news_country"]){
var prm_suspended_country = "&suspended_country="+String(app_suspended_arr["news_country"]);}}
}

var json_url = "https://mydb.sportmatchs.com/news/?type=more_news&lang="+user_language+"&tags="+prm_news_tags+"&not="+news_id;

if(prm_suspended_country){json_url += prm_suspended_country;}

//prompt("",json_url)

var p6_ajax_more_news = $.ajax({url:json_url,dataType:"json",
success:function(data){

if(data.length){$("#p6_more_news_area").css("display","block");}
else{$("#p6_more_news_area").css("display","none");}

for(var i = 0; i < data.length; i++){

var news_id = data[i].news_id;
var news_date = data[i].date;
var news_title = data[i].title;
var news_image = data[i].image;
var news_url = data[i].url;

if(localStorage.getItem("user-app_activation") != "full" || $("body").hasClass("app_in_review")){
var news_title = news_title.replace("بالفيديو","").replace("فيديو:","").replace("فيديو :","").replace("فيديو","");}

if(!$(".p6_li_more_news[news_id='"+news_id+"']").length && news_id != $("#news_details_page").attr("news_id")){
$("#p6_ul_more_news").append(
'<li class="p6_li_more_news button gray_click" news_id="'+news_id+'" date="'+news_date+'" url="'+news_url+'" >'+
'<img src="'+news_image+'" /><p>'+news_title+'</p></li>'
);
}

}

more_news_click_p6fun();

}
});

}

/*==================================  more_news_click_p6fun  ==================================*/

function more_news_click_p6fun(){

$(".p6_li_more_news").click(function(){

var news_id = $(this).attr("news_id");
var news_date = $(this).attr("date");
var news_url = $(this).attr("url");
var news_title = $(this).find("img").text();
var news_image = $(this).find("p").attr("src");

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
query:{news_id:news_id,news_date:news_date,news_title:news_title,news_image:news_image,previous_page:"news_tab_page"}},
{reloadCurrent:true});
}

});

}

/*===================================  open_news_url_p6fun  ===================================*/

function open_news_url_p6fun(){
$(document).on("click","#p6_open_source_but",function(){
$("#p6_news_content iframe,#p6_news_content video").each(function(){
var vsrc = $(this).attr("src");$(this).attr("src",vsrc);});
var news_url = $(this).attr("news_url");
var mode_theme_color = getComputedStyle(document.documentElement).getPropertyValue('--mode_theme_color');
if(localStorage.getItem("app-device") == "ios"){
var ref = cordova.InAppBrowser.open(news_url,'_blank','toolbarposition=top,location=no,hidenavigationbuttons=yes,toolbarcolor='+mode_theme_color+
',clearcache=yes,clearsessioncache=yes,hideurlbar=yes,lefttoright=yes,zoom=yes,closebuttoncaption=✕,closebuttoncolor=#ffffff,fullscreen=yes');
}
else{
screen.orientation.unlock();
var ref = cordova.InAppBrowser.open(news_url,'_blank','location=yes,hidenavigationbuttons=yes,toolbarcolor='+mode_theme_color+
',clearcache=yes,clearsessioncache=yes,hideurlbar=yes,lefttoright=yes,zoom=no,closebuttoncaption=✕,closebuttoncolor=#ffffff');
ref.addEventListener('exit',function(){screen.orientation.lock('portrait');});
}
});
}

/*==================================  share_but_click_p6fun  ==================================*/

function share_but_click_p6fun(){

$("#news_details_page .navbar .share-social,#p6_share_but").click(function(){

app.dialog.create({title:'',cssClass:'preloader_dialog',
content:'<div class="preloader"><span class="preloader-inner"><svg viewBox="0 0 36 36">'+
'<circle cx="18" cy="18" r="16"></circle></svg></span></div>'}).open();
setTimeout(function(){if($(".preloader_dialog").length){app.dialog.close();}},7000);

var app_share_link = localStorage.getItem("app-share_link");
var news_image = $("#p6_news_image").attr("src");
var news_title = $("#p6_news_title").text();

if($("body").attr("app_dir") != "left"){var app_name = ($("body").attr("app_name")).split("|")[1];}
else{var app_name = ($("body").attr("app_name")).split("|")[0];}

if($("body").attr("app_dir") != "left"){
var message = news_title+"\n"+"للمزيد من التفاصيل حمل تطبيق "+app_name+" مجانا"+"\n"+app_share_link;
}
else{
var message = news_title+"\n"+"For more details .. Download "+app_name+" App for free"+"\n"+app_share_link;
}

window.plugins.socialsharing.share(message,null,news_image,null);
setTimeout(function(){if($(".preloader_dialog").length){app.dialog.close();}},3000);

});

}





