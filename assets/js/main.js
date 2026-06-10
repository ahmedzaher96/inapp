localStorage.clear();


/*=============================================================================================*/
/*-----------------------------------  target app function  -----------------------------------*/
/*=============================================================================================*/

var defprm_package_id = localStorage.getItem("app-package_id");
var defprm_device = localStorage.getItem("app-device");

if(!defprm_package_id){var defprm_package_id = "mobaryat_live_app6";}
if(!defprm_device){var defprm_device = "android";localStorage.setItem("app-device","android");}

if(defprm_package_id == "sport_match_app1" || defprm_package_id == "matchat_online_app1" ||
defprm_package_id == "mobaryat_live_plus_app1" || defprm_package_id == "mobaryat_live_plus_app2" ||
defprm_package_id == "ios_matchat_online_app1" || defprm_package_id == "yalla_match_app1"){
var def_theme_color = "blue";}

else if(defprm_package_id == "yalla_vamos_live_app1" || defprm_package_id == "kora_sport_app1"){
var def_theme_color = "green";}

else{var def_theme_color = "purple";}

$("body").attr("app_color",def_theme_color).attr("app_id",defprm_package_id).attr("device",defprm_device);

if(def_theme_color == "blue"){
document.documentElement.style.setProperty("--f7-theme-color","#1c7ed6");
document.documentElement.style.setProperty("--mode_theme_color","#1c7ed6");
document.documentElement.style.setProperty("--dark-theme-color","#0b467b");
document.documentElement.style.setProperty("--light-theme-color","#1c7ed6");
}

if(def_theme_color == "green"){
document.documentElement.style.setProperty("--f7-theme-color","#3b8359");
document.documentElement.style.setProperty("--mode_theme_color","#3b8359");
document.documentElement.style.setProperty("--dark-theme-color","#296241");
document.documentElement.style.setProperty("--light-theme-color","#3b8359");
}

if(defprm_package_id == "sport_match_app1"){$("body").attr("app_name","Sport Match|سبورت ماتش");}
else if(defprm_package_id == "yalla_vamos_live_app1"){$("body").attr("app_name","Yalla Vamos Live|يلا فاموس لايف");}
else if(defprm_package_id == "kora_sport_app1"){$("body").attr("app_name","Kora Sport|كورة سبورت");}
else if(defprm_package_id == "matchat_online_app1" || defprm_package_id == "ios_matchat_online_app1"){
$("body").attr("app_name","Matchat Online|ماتشات أونلاين");}
else if(defprm_package_id == "mobaryat_live_plus_app1" || defprm_package_id == "mobaryat_live_plus_app2"){
$("body").attr("app_name","Mobaryat Live Plus|مباريات لايف بلس");}
else if(defprm_package_id == "yalla_match_app1"){$("body").attr("app_name","Yalla Match|يلا ماتش");}
else{$("body").attr("app_name","Mobaryat Live|مباريات لايف");}


/*=============================================================================================*/
/*-----------------------------------------  app init  ----------------------------------------*/
/*=============================================================================================*/

var $$ = Dom7;
var app = new Framework7({
el:"#app",
theme:"md",
init:false,
routes:routes,
touch:{
tapHold:false,
activeStateElements:"ol,li",
},
view: {
mdSwipeBack: false,
},
rtl:true,
lazy:{
placeholder:"assets/img/app_logo.png",
},
toast:{
closeTimeout:3000
},
statusbar:{
androidTextColor:'white',
iosTextColor:'white',
},

});

//================================================

function check_custom_native_ads_fun(){};
function create_activation_popup_fun(){};

/*=========================  server_but_click_p14fun  ========================*/

function server_but_click_p14fun(){

$(document).on("click",".p14_chanpop_fixed_server_but,.p14_chanpop_static_server_but",function(){

$(".p14_chanpop_fixed_server_but.active").removeClass("active");
$(".p14_chanpop_static_server_but.active").removeClass("active");
$(this).addClass("active");
$("#channel_details_page").attr("active_server",($(this).attr("url")));

var url = $(this).attr("url");
var player_type = $(this).attr("player_type");
var channel_id = $(this).attr("channel_id");

if(player_type == "m3u8" || (player_type == "iframe" && localStorage.getItem("app-device") == "android") ){
app.views.current.router.navigate({ name:"video_player_page",query:{video_url:url,video_type:"live_stream",
channel_id:channel_id,player_type:player_type,previous_page:"force_back"} });
}
else if(player_type == "streaming_plugin"){
var options = {orientation:'landscape',shouldAutoClose:true,controls:true};
window.plugins.streamingMedia.playVideo(url,options);
}
else{
screen.orientation.lock("landscape");
setTimeout(function(){
var mode_theme_color = getComputedStyle(document.documentElement).getPropertyValue('--mode_theme_color');
var ref = cordova.InAppBrowser.open(url,'_blank','hardwareback=no,toolbarposition=top,location=no,hidenavigationbuttons=yes,toolbarcolor='+mode_theme_color+
',clearcache=yes,clearsessioncache=yes,hideurlbar=yes,lefttoright=yes,zoom=yes,closebuttoncaption=✕,closebuttoncolor=#ffffff,fullscreen=yes'); 
ref.addEventListener('loadstart',function(){setTimeout(function(){if($(".force_ads_popup").length){ref.close();}},20*1000);});
ref.addEventListener('exit',function(){screen.orientation.lock("portrait");});
},100);
}

});

}

//================================================

function create_new_video_p16fun(){

setTimeout(function(){

var video_url = $("#video_player_page").attr("video_url");
var video_type = $("#video_player_page").attr("video_type");
var player_type = $("#video_player_page").attr("player_type");
var poster = $("#video_player_page").attr("poster");
if(!poster){var poster = "https://3.bp.blogspot.com/-bAWqvsMrURY/W_N7Tplqp6I/AAAAAAAACXE/tdXNUQFsDskuvKxq_uvW90alU2spwijNACLcBGAs/s600/3.jpg";}

if(player_type == "m3u8" || video_url.substr(video_url.length - 5) == ".m3u8"){
new Clappr.Player({
source:video_url,
parentId:"#p16_player_area",
poster:{url:poster,showOnVideoEnd:false},
playback:{playInline:true},
});
}
else{
$("#video_player_page #p16_player_area").append('<iframe sandbox="allow-same-origin allow-forms allow-scripts" src="'+video_url+'" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" '+
'controls autoplay playsinline style="position:absolute;top:0;right:0;width:100%;height:100%;" ></iframe>');
}

},500);

}

//================================================

app.on('init',function(){

//================================================
localStorage.setItem("app-data_version","0.3.0");
//================================================

if(localStorage.getItem("user-app_activation")){$("body").attr("app_activation",(localStorage.getItem("user-app_activation")));}
else{$("body").removeAttr("app_activation");}

//$("head").append( $('<script src="https://app.sportmatchs.com/multi_code/check_package.js?d='+Date.now()+'"></script>') );

window.addEventListener(


-'online',function(){if($(".no_internet_popup").length){app.popup.close(".no_internet_popup");}});
window.addEventListener('offline',function(){if(!$(".no_internet_popup").length){append_no_internet_popup_fun();}});

if((localStorage.getItem("user-home_page")=="video_tab" && !localStorage.getItem("user-app_activation")) || 
(localStorage.getItem("user-home_page")=="channel_tab" && localStorage.getItem("user-app_activation") != "full")){
localStorage.setItem("user-home_page","match_tab");}

//====================================================================

if(localStorage.getItem("user-finish_intro_settings") != "yes"){
var mainView = app.views.create('.view-main',{url:'/language/'});
}
else if((window.location.href).includes("home_page=") == true){
var defprm_home_page = (window.location.href).split("home_page=")[1];
if(/%[0-9A-Fa-f]{2}/.test(defprm_home_page)){defprm_home_page = decodeURIComponent(defprm_home_page);}
var mainView = app.views.create('.view-main',{url:defprm_home_page});
setTimeout(function(){change_statusbar_color_fun();},1000);
}
else{
var user_home_page = localStorage.getItem("user-home_page");if(user_home_page == null){var user_home_page = "match_tab";}
var mainView = app.views.create('.view-main',{url:'/'+user_home_page+'/'});
setTimeout(function(){receive_onesignal_push_fun();},1000);
}

//====================================================================

//var mainView = app.views.create('.view-main',{url:'/match_tab/'});
//var mainView = app.views.create('.view-main',{url:'/match_tab/?open_browser='+(encodeURIComponent("https://www.mobaryatlive.com/2022/09/blog-post_69.html"))});
//var mainView = app.views.create('.view-main',{url:'/match_details/?match_id=4167733'});
//var mainView = app.views.create('.view-main',{url:'/match_details/?match_id=4167733&channel=[{"id":"ssc_sport_1"}]'});
//var mainView = app.views.create('.view-main',{url:'/match_details/?match_id=718188&tab=p2_tab_standings'});
//var mainView = app.views.create('.view-main',{url:'/league_tab/'});
//var mainView = app.views.create('.view-main',{url:'/league_and_team_details/?page_type=league&target_id=61'});
//var mainView = app.views.create('.view-main',{url:'/league_and_team_details/?page_type=league&target_id=4&tab=p4_tab_standings'});
//var mainView = app.views.create('.view-main',{url:'/league_and_team_details/?page_type=league&target_id=714&tab=p4_tab_standings'});
//var mainView = app.views.create('.view-main',{url:'/league_and_team_details/?page_type=team&target_id=1577'});
//var mainView = app.views.create('.view-main',{url:'/news_tab/'});
//var mainView = app.views.create('.view-main',{url:'/news_tab/?open_browser='+(encodeURIComponent("https://www.mobaryatlive.com/2022/09/blog-post_69.html"))});
//var mainView = app.views.create('.view-main',{url:'/news_details/?news_id=hihi2_2021_09_23_1737433'});
//var mainView = app.views.create('.view-main',{url:'/settings/'});
//var mainView = app.views.create('.view-main',{url:'/push_control/'});
//var mainView = app.views.create('.view-main',{url:'/user_notes/'});
//var mainView = app.views.create('.view-main',{url:'/favorite_team/'});
//var mainView = app.views.create('.view-main',{url:'/theme_color/'});
//var mainView = app.views.create('.view-main',{url:'/language/'});
//var mainView = app.views.create('.view-main',{url:'/video_tab/'});
//var mainView = app.views.create('.view-main',{url:'/video_tab/?open_browser='+(encodeURIComponent("https://www.mobaryatlive.com/2022/09/blog-post_69.html"))});
//var mainView = app.views.create('.view-main',{url:'/channel_details/?channel_id=dubai_sport_1'});
//var mainView = app.views.create('.view-main',{url:'/channel_details/?channel_id=bein_sport_news,bein_sport_1,ssc_sport_1&match_id=4125732'});
//var mainView = app.views.create('.view-main',{url:'/channel_tab/'});
//var mainView = app.views.create('.view-main',{url:'/video_player/?video_url='+(encodeURIComponent("https://vff.upfootvid.com/UpFiles/important/132/2024/7/15/283973/720p.m3u8"))});
//var mainView = app.views.create('.view-main',{url:'/video_player/?test_mode=yes&video_url='+(encodeURIComponent("https://cdnkoo22.koralast.com/UpFiles/important/132/2022/9/14/234228/0.m3u8"))});

//====================================================================

if(!document.getElementById("online_script_v2")){
var s = document.createElement("script");s.id = "online_script_v2";
s.src = "https://ahmedzaher96.github.io/inapp/multi_code/online_script_v2.js?d=" + Date.now();
document.head.appendChild(s);}

setTimeout(function(){
if(navigator.connection.type == "none"){
append_no_internet_popup_fun();
var oldScript = document.getElementById("online_script_v2");
if(oldScript){oldScript.remove();}
window.addEventListener('online',function(){
if(!document.getElementById("online_script_v2")){
var s = document.createElement("script");s.id = "online_script_v2";
s.src = "https://ahmedzaher96.github.io/inapp/multi_code/online_script_v2.js?d=" + Date.now();
document.head.appendChild(s);}
},{once:true});
} },1000);

});

/*=============================================================================================*/

app.once('init',function(){

$(document).on("click",".close_dialog",function(){$(".dialog *").detach();app.dialog.close();});
$(document).on("click",".dialog-backdrop",function(){
if(!$(".preloader_dialog").length && !$(".lock_backdrop_dialog").length){$(".dialog *").detach();app.dialog.close();}});

set_default_localstorage_fun();

if(localStorage.getItem("app-translate_arr") == null){get_translate_local_json_fun();}
if(localStorage.getItem("app-lastget-translate_arr") == null){setTimeout(function(){get_translate_json_fun();},1000);}
else{get_last_update_translate_json_fun();}

check_language_and_direction_fun();
default_theme_fun();
click_custom_class_fun();
get_default_country_code_fun();
no_internet_popup_buts_click_fun();

$("#index_toolbar .tab-link.app_activation").click(function(){ create_activation_popup_fun("area2"); });

setTimeout(function(){change_statusbar_color_fun();},500);

setTimeout(function(){if(navigator.language){
if((navigator.language).includes("ar") == true){$("body").attr("mobile_lang","ar");}else{$("body").attr("mobile_lang","en");}
}},500);

if(localStorage.getItem("app-device") == "android"){var noSleep = new NoSleep();noSleep.enable();}

$("body").attr("orientation","portrait");

window.addEventListener("orientationchange",function(){
if(window.orientation == "0"){$("body").attr("orientation","portrait");StatusBar.show();}
else if(window.orientation=="90" || window.orientation=="-90"){
$("body").attr("orientation","landscape");StatusBar.hide();
if(localStorage.getItem("app-device") == "ios"){change_statusbar_color_fun();}
}
},false);

$(document).on("click",".navbar_notification_but",function(){
app.views.current.router.navigate({ name:"push_control_page",query:{previous_page:"force_back"} });
});

$(document).on("click","#p12_footer_left_but",function(){setTimeout(function(){ navigator.app.exitApp(); },500);});

setTimeout(function(){

run_translate_fun();
tab_link_highlight();
back_button_click();

$(".open_settings").click(function(){
app.views.current.router.navigate({name:"settings_page",query:{previous_page:app.views.current.router.currentRoute.name}});});

if(!$("#index_toolbar .toolbar-inner .tab-link.tab-link-active").length){
var user_home_page = localStorage.getItem("user-home_page");if(user_home_page == null){var user_home_page = "match_tab";}
$("#index_toolbar .toolbar-inner .tab-link[href='/"+user_home_page+"/']").click();
}

},100);

});

//================================================

app.on('pageBeforeIn',function(page){

if((localStorage.getItem("user-home_page"))+"_page" == app.views.current.router.currentRoute.name){
$("#"+app.views.current.router.currentRoute.name).addClass("user_home_page");}

textarea_auto_height_fun();
screen.orientation.lock('portrait');

if(navigator.connection.type == "none"){append_no_internet_popup_fun();}

$("#video_player_page #p16_player_area *").detach();

});

//================================================

setTimeout(function(){
app.on('pageAfterIn',function(page){change_statusbar_color_fun();});
},1000);

//================================================

app.on('pageAfterIn',function(page){

if( page.route.query["previous_page"] ){$("#"+(page.name)).attr("previous_page",page.route.query["previous_page"]);}

run_translate_fun();
tab_link_highlight();
//back_button_click();

$(".open_settings").click(function(){
app.views.current.router.navigate({name:"settings_page",query:{previous_page:app.views.current.router.currentRoute.name}});});

if(!$("#index_toolbar .toolbar-inner .tab-link.tab-link-active").length || 
$("#index_toolbar .toolbar-inner .tab-link.tab-link-active").attr("href") != page.route.path){
if($("#index_toolbar .toolbar-inner .tab-link[href='"+page.route.path+"']").length){
$("#index_toolbar .toolbar-inner .tab-link[href='"+page.route.path+"']").click();
}}

});

/*===============================  set_default_localstorage_fun  ==============================*/

var localstorage_user_arr = [
{"name":"user-color_theme","value":"light"},
{"name":"user-favorite_channel_arr","value":JSON.stringify([])},
//{"name":"user-language","value":"ar"},
{"name":"user-push_control","value":JSON.stringify([{"news":"enable","match_begin":"enable","match_second_half":"enable","match_goals":"enable","match_importance":"important_only"}])},
{"name":"user-home_page","value":"match_tab"}
];

if(localStorage.getItem("user-language") == null){
if(navigator){if(navigator.language){if((navigator.language).includes("ar") == true){
localStorage.setItem("user-language","ar");}else{localStorage.setItem("user-language","en");}}}
}

//====================================================================

function set_default_localstorage_fun(){

for(var i = 0; i < localstorage_user_arr.length; i++){
var ls_name = localstorage_user_arr[i]["name"];
var ls_value = localstorage_user_arr[i]["value"];
if(localStorage.getItem(ls_name) == null){localStorage.setItem(ls_name,ls_value);}
}

//====================================================================

$.ajax({url:"https://mydb.sportmatchs.com/app_json/app_arrays.json",timeout:4000,dataType:"json",cache:false,
success:function(data){

for(var i = 0; i < data.length; i++){
var array_name = data[i].id;
var array_value = data[i].value1;
localStorage.setItem(array_name,array_value);
if(!array_value){localStorage.setItem(array_name,JSON.stringify([]));}
if(array_value=="remove_localstorage"){localStorage.removeItem(array_name);}
}

},

error:function(){

//========================================================

$.ajax({url:"https://sport-json.pages.dev/app_arrays.json",dataType:"json",cache:false,
success:function(data){

for(var i = 0; i < data.length; i++){
var array_name = data[i].id;
var array_value = data[i].value1;
localStorage.setItem(array_name,array_value);
if(!array_value){localStorage.setItem(array_name,JSON.stringify([]));}
if(array_value=="remove_localstorage"){localStorage.removeItem(array_name);}
}

}
});

//========================================================

}

});

}

/*====================================  back_button_click  ====================================*/

function back_button_click(){

$(document).on('click','.back_button',function(){

var current_router = app.views.current.router.currentRoute.name;
var previous_page = $("#"+current_router).attr("previous_page");

if(current_router=="push_control_page" && $("#push_control_page").hasClass("intro")){return;}

if($("#"+current_router).find(".back_button").length){

if(!previous_page){
if(current_router=="match_details_page"){var previous_page = "match_tab_page";}
else if(current_router=="news_details_page"){var previous_page = "news_tab_page";}
else if(current_router=="push_control_page"){var previous_page = "settings_page";}
else{var previous_page = (localStorage.getItem("user-home_page"))+"_page";}
}

//================================================
	
if(previous_page && previous_page!="force_back"){app.views.current.router.navigate({ name:previous_page });}
else if(previous_page=="force_back"){app.views.current.router.back();}

//================================================

}

});
}

/*====================================  default_theme_fun  ====================================*/

function default_theme_fun(){
var color_key_arr = ["bg_color1","bg_color2","shadow_color","wob_color","wob_color2"];
var user_color_theme = localStorage.getItem("user-color_theme");

//var user_color_theme = "dark";

$("body").attr("color_theme",user_color_theme);

for(var i = 0; i < color_key_arr.length; i++){
var key = user_color_theme+"_"+color_key_arr[i];
var get_color = getComputedStyle(document.documentElement).getPropertyValue("--"+key);
document.documentElement.style.setProperty("--mode_"+color_key_arr[i],get_color);
}

var main_user_color_theme = getComputedStyle(document.documentElement).getPropertyValue("--"+user_color_theme+"-theme-color");
var arrBuff = new ArrayBuffer(4);var vw = new DataView(arrBuff);
vw.setUint32(0,parseInt(main_user_color_theme.replace("#",""),16),false);var arrByte = new Uint8Array(arrBuff);
var main_user_color_theme_rgb = arrByte[1] + "," + arrByte[2] + "," + arrByte[3];
document.documentElement.style.setProperty("--mode_theme_color",main_user_color_theme);
document.documentElement.style.setProperty("--f7-theme-color",main_user_color_theme);
document.documentElement.style.setProperty("--f7-theme-color-shade",main_user_color_theme);
document.documentElement.style.setProperty("--f7-theme-color-tint",main_user_color_theme);
document.documentElement.style.setProperty("--f7-theme-color-rgb",main_user_color_theme_rgb);

}

/*==================================  click_custom_class_fun  =================================*/

function click_custom_class_fun(){

$(document).on("click",".toolbar_toggle_icon .tab-link",function(){
if(!$(this).hasClass("tab-link-active")){
$(this).parent().find(".tab-link").each(function(){
var iel = $(this).find("i");
if($(iel).hasClass("f7-icons")){
$(iel).html(($(iel).html()).replace("_fill",""));
}
if($(iel).attr('class').includes("ionicons")==true && $(iel).attr('class').includes("-outline")==false){
var ociel = $(iel).attr('class').split(" ")[0];
var nciel = ($(iel).attr('class').split(" ")[0])+"-outline";
$(iel).attr('class',($(iel).attr('class')).replace(ociel,nciel));
}
});
}
});

//====================================================================

$(document).on("click",".toolbar_manual_click .tab-link",function(){
var el_tab_link = $(this);
var el_toolbar = $(this).parents(".toolbar");
if(!el_tab_link.hasClass("tab-link-active") || el_tab_link.attr("href")){
el_toolbar.find(".tab-link.tab-link-active").removeClass("tab-link-active");
el_tab_link.addClass("tab-link-active");
}
});

//====================================================================

$(document).on("click",".toolbar_horizontal_scroll .tab-link,.toolbar_horizontal_scroll .button",function(){

var animate_speed = $(this).parents(".toolbar").attr("animate_speed");if(!animate_speed){var animate_speed = 250;}
var scroll_pos = $(this).parents(".toolbar-inner").scrollLeft();
var tb_width = $(this).parents(".toolbar-inner").width();
var but_offset_left = $(this).offset().left;
var but_width = $(this).outerWidth();
var but_roff = tb_width-($(this).offset().left)-($(this).outerWidth());

$(this).parents(".toolbar").attr("last_pos",scroll_pos);

if(but_offset_left < 0){
$(this).parents(".toolbar-inner").animate({ scrollLeft: scroll_pos+but_offset_left-1 },animate_speed*1);
$(this).parents(".toolbar").attr("last_pos",scroll_pos+but_offset_left-1);
}
else if(but_offset_left > (tb_width-but_width)){
$(this).parents(".toolbar-inner").animate({ scrollLeft: scroll_pos-but_roff+1 },animate_speed*1);
$(this).parents(".toolbar").attr("last_pos",scroll_pos-but_roff+1);
}

/*
var animate_speed = $(this).parents(".toolbar").attr("animate_speed");if(!animate_speed){var animate_speed = 250;}
var scroll_pos = $(this).parents(".toolbar-inner").scrollLeft();
var tb_width = $(this).parents(".toolbar-inner").width();
var but_roff = tb_width-($(this).offset().left)-($(this).outerWidth());
var new_but_roff = scroll_pos+(tb_width/2)-(($(this).outerWidth())/2);
$(this).parents(".toolbar-inner").animate({ scrollLeft: new_but_roff-but_roff },animate_speed*1);
$(this).parents(".toolbar").attr("last_pos",new_but_roff-but_roff);
*/

});

//====================================================================

$(document).on("click",".segmented_manual_click .button",function(){
var el_button = $(this);
var el_segmented = $(this).parent();
if(!el_button.hasClass("button-active")){
el_segmented.find(".button.button-active").removeClass("button-active");
el_button.addClass("button-active");
}
});

//====================================================================

$(document).on("click",".toggle_icon",function(){
if($(this).prop("tagName")=="i" || $(this).prop("tagName")=="I"){var element = $(this);}
else{var element = $(this).find("i");}
if($(element).hasClass("f7-icons")){
setTimeout(function(){$(element).html(($(element).html())+"_fill");},40);
}
if($(element).attr('class').includes("ionicons")==true){
setTimeout(function(){$(element).attr("class",$(element).attr("class").replace("-outline",""));},40);
}
});

}

/*====================================  tab_link_highlight  ===================================*/

function tab_link_highlight(){
var current_page = app.views.current.router.currentRoute.name;

if(current_page == "channel_details_page" && $("#match_details_page").hasClass("preloader_mode")){
var current_page = "match_details_page";}

if($("#"+current_page+" .toolbar_manual_click").length){
$("#"+current_page+" .toolbar_manual_click").each(function(){
var el_toolbar = $(this);
if(el_toolbar.find(".toolbar-inner").outerWidth() < el_toolbar.outerWidth()){
var nw = (el_toolbar.outerWidth())/(el_toolbar.find(".toolbar-inner .tab-link").length);
el_toolbar.find(".toolbar-inner .tab-link").css("width",nw);
}
});
if($("#"+current_page+" .swiper-container").length){(app.swiper.get("#"+current_page+" .swiper-container")).update();}
}
}

/*===================================  tab_link_highlight_2  ==================================*/

function tab_link_highlight_2(){
var current_page = app.views.current.router.currentRoute.name;

if(current_page == "channel_details_page" && $("#match_details_page").hasClass("preloader_mode")){
var current_page = "match_details_page";}

$("#"+current_page+" .toolbar .toolbar-inner .tab-link").click(function(){
var eq = $(this);$(eq).addClass("disable_swiper_click");
setTimeout(function(){ $(eq).removeClass("disable_swiper_click"); },100);
});

if($("#"+current_page+" .swiper-container").length){
var swiper = app.swiper.get("#"+current_page+" .swiper-container");
swiper.on('slideChange',function(){

setTimeout(function(){
var tab_link_a = $("#"+current_page+" .toolbar .toolbar-inner .tab-link").eq(swiper.activeIndex);
if(!$(tab_link_a).hasClass("disable_swiper_click")){
$("#"+current_page+" .toolbar .toolbar-inner .tab-link").eq(swiper.activeIndex).click();
}
},50);

});
}
}

/*===============================  get_default_country_code_fun  ==============================*/

function get_default_country_code_fun(){

var ccajax = $.get("https://ipinfo.io/json",function(date){
var user_country_code = date.country;
if(user_country_code){localStorage.setItem("user-country_code",user_country_code.toUpperCase());
if(localStorage.getItem("app-country_id_arr")){var app_country_id_arr = JSON.parse(localStorage.getItem("app-country_id_arr"));
if(app_country_id_arr[user_country_code]){localStorage.setItem("user-country_id",(app_country_id_arr[user_country_code]));}} }
});

//================================================

setTimeout(function(){
if(!localStorage.getItem("user-country_code")){

navigator.globalization.getLocaleName(function(locale){
if((locale.value).includes("-") == true){var user_country_code = (locale.value).split("-")[1];}
else{var user_country_code = locale.value;}
if(user_country_code){localStorage.setItem("user-country_code",user_country_code.toUpperCase());
if(localStorage.getItem("app-country_id_arr")){var app_country_id_arr = JSON.parse(localStorage.getItem("app-country_id_arr"));
if(app_country_id_arr[user_country_code]){localStorage.setItem("user-country_id",(app_country_id_arr[user_country_code]));}} }
});

}
},1500);

//================================================

setTimeout(function(){
if(!localStorage.getItem("user-country_code")){

if(navigator.language){
if((navigator.language).includes("-") == true){
var user_country_code = (navigator.language).split("-")[1];
if(user_country_code){localStorage.setItem("user-country_code",user_country_code.toUpperCase());
if(localStorage.getItem("app-country_id_arr")){var app_country_id_arr = JSON.parse(localStorage.getItem("app-country_id_arr"));
if(app_country_id_arr[user_country_code]){localStorage.setItem("user-country_id",(app_country_id_arr[user_country_code]));}} }
}}

}
},1700);

//================================================

}

/*=================================  textarea_auto_height_fun  ================================*/

function textarea_auto_height_fun(){
$('textarea[auto_height]').each(function(){
this.setAttribute('style','height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
}).on('input',function(){
this.style.height = 'auto';
this.style.height = (this.scrollHeight) + 'px';
});
}

/*================================  change_statusbar_color_fun  ===============================*/

function change_statusbar_color_fun(prm_color){

StatusBar.overlaysWebView(false);

var statusbar_color = $("#"+(app.views.current.router.currentRoute.name)).attr("statusbar_color");
if(prm_color){var statusbar_color = prm_color;}

if(!statusbar_color){
$("#fixed_top_banner").css("background-color","#000");
StatusBar.backgroundColorByHexString("#000");StatusBar.styleLightContent();
}

if(statusbar_color){
var bg_color = getComputedStyle(document.documentElement).getPropertyValue("--"+(statusbar_color.split("-")[1]));
var font_color = statusbar_color.split("-")[0];
$("#fixed_top_banner").css("background-color",bg_color);
StatusBar.backgroundColorByHexString(bg_color);
if(font_color=="light"){StatusBar.styleLightContent();}
if(font_color=="dark"){StatusBar.styleDefault();}
if(font_color=="auto"){if(localStorage.getItem("user-color_theme")=="dark"){StatusBar.styleLightContent();}
else if(localStorage.getItem("user-color_theme")=="light"){StatusBar.styleDefault();}}
}

}

/*===============================  append_no_internet_popup_fun  ==============================*/

function append_no_internet_popup_fun(){

if($(".no_internet_popup").length){return;}

var translate_arr = JSON.parse(localStorage.getItem("app-translate_arr"));
var user_language = localStorage.getItem("user-language");
var text_1 = translate_arr["93"][user_language];var text_2 = translate_arr["94"][user_language];
var text_3 = translate_arr["95"][user_language];var text_4 = translate_arr["96"][user_language];

app.popup.create({
content:`
<div class="no_internet_popup popup popup-model">
<div class="preloader">
<span class="preloader-inner"><svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="16"></circle></svg></span></div>
<div id="no_internet_popup_content">
<i class="ionicons-wifi animated fade-in"></i>
<h1>${text_1}</h1>
<p>${text_2}</p>
<button id="no_internet_popup_but1" class="button gray_click no-active-state">${text_3}</button>
<button id="no_internet_popup_but2" class="button gray_click no-active-state">${text_4}</button>
</div>
</div>
`
}).open();

}

/*=============================  no_internet_popup_buts_click_fun  ============================*/

function no_internet_popup_buts_click_fun(){

$(document).on("click","#no_internet_popup_but1",function(){
if(navigator.connection.type=="2g" || navigator.connection.type=="3g" || navigator.connection.type=="4g" ||
navigator.connection.type=="5g"){window.cordova.plugins.settings.open("data_roaming");}
else{window.cordova.plugins.settings.open("wifi");}
});

$(document).on("click","#no_internet_popup_but2",function(){
$(".no_internet_popup").addClass("preloader_mode");
setTimeout(function(){
if(navigator.connection.type != "none"){app.popup.close(".no_internet_popup");}
else{$(".no_internet_popup").removeClass("preloader_mode");}
},3000);
});

}

/*================================  receive_onesignal_push_fun  ===============================*/

function receive_onesignal_push_fun(){

window.plugins.OneSignal.Notifications.addEventListener("click",function(event){

if(localStorage.getItem("app-receive_onesignal_push") == "yes" ||
localStorage.getItem("user-download_zip_file_complete") != "yes"){return;}

localStorage.setItem("app-receive_onesignal_push","yes");
setTimeout(function(){change_statusbar_color_fun();},1000);

//==================================================================

var launch_url = event?.notification?.launchURL;
if(launch_url && localStorage.getItem("app-device") == "ios"){
cordova.InAppBrowser.open(launch_url,'_system');
}

//==================================================================

var additionalData = event?.notification?.additionalData;

if(additionalData?.prm_home_page){
var prm_home_page = String(additionalData.prm_home_page).replace(/["']/g,'');
if( (prm_home_page.includes("channel_tab") == false && prm_home_page.includes("video_player") == false) ||
(prm_home_page.includes("video_player") == true && localStorage.getItem("user-app_activation")) ||
(prm_home_page.includes("channel_tab") == true && localStorage.getItem("user-app_activation") == "full") ){
if(/%[0-9A-Fa-f]{2}/.test(prm_home_page)){prm_home_page = decodeURIComponent(prm_home_page);}
app.views.current.router.navigate(prm_home_page);
}
}

//==================================================================

else if(additionalData?.prm_facebook_post){
var prm_facebook_post = String(additionalData.prm_facebook_post).replace(/["']/g,'');
var parts = prm_facebook_post.split("|");var page_id = parts[0];var post_id = parts[1];
if(page_id && post_id){
cordova.InAppBrowser.open("https://www.facebook.com/"+page_id+"/posts/"+post_id,"_system");
}
}

});

};

/*=================================  check_changed_names_fun  =================================*/

function check_changed_names_fun(prm_id,prm_name,prm_type){
var prm_name = prm_name.split("َ").join("").split("ُ").join("").split("ِ").join("").split("ْ").join("");
var prm_name = prm_name.split("ً").join("").split("ٌ").join("").split("ٍ").join("").split("ّ").join("");
var user_language = localStorage.getItem("user-language");
var scores365_changed_names_arr = JSON.parse(localStorage.getItem("app-scores365_changed_names_arr"));
if(scores365_changed_names_arr && scores365_changed_names_arr[prm_type+"_"+user_language] && 
scores365_changed_names_arr[prm_type+"_"+user_language][prm_id]){
var prm_name = scores365_changed_names_arr[prm_type+"_"+user_language][prm_id];}
return prm_name;
}


/*============================  get_last_update_translate_json_fun  ===========================*/

function get_last_update_translate_json_fun(){

var json_domain = localStorage.getItem("app-json_domain");
if(!json_domain){var json_domain = "https://mydb.sportmatchs.com";}

if(json_domain.includes("sportmatchs.com") == true){var json_url = json_domain+"/app_json/last_update.json";}
else{var json_url = json_domain+"/last_update.json";}

$.ajax({url:json_url,timeout:6000,dataType:"json",cache:false,
success:function(data){

if(!data["translate"] || !localStorage.getItem("app-lastget-translate_arr") ||
data["translate"] > localStorage.getItem("app-lastget-translate_arr")){

get_translate_json_fun();

}

}
});

}

/*==================================  get_translate_json_fun  =================================*/

function get_translate_json_fun(){

var json_domain = localStorage.getItem("app-json_domain");
if(!json_domain){var json_domain = "https://mydb.sportmatchs.com";}

if(json_domain.includes("sportmatchs.com") == true){var json_url = json_domain+"/app_json/translate.json";}
else{var json_url = json_domain+"/translate.json";}

$.ajax({url:json_url,timeout:6000,dataType:"json",cache:false,
success:function(data){
localStorage.setItem("app-translate_arr",JSON.stringify(data));
localStorage.setItem("app-lastget-translate_arr",Math.trunc(new Date().getTime()/1000));
}
});

}

/*===============================  get_translate_local_json_fun  ==============================*/

function get_translate_local_json_fun(){

$.ajax({url:"assets/json/translate.json",dataType:"json",cache:false,
success:function(data){
localStorage.setItem("app-translate_arr",JSON.stringify(data));
}
});

}

/*====================================  run_translate_fun  ====================================*/

function run_translate_fun(){

var translate_arr = JSON.parse(localStorage.getItem("app-translate_arr"));
var user_language = localStorage.getItem("user-language");
var current_page = app.views.current.router.currentRoute.name;

if($("#"+current_page+" .translate").length){
$("#"+current_page+" .translate").each(function(){
var value = $(this).attr("value");
if(translate_arr[value]){ $(this).html(translate_arr[value][user_language]); }
});
}

if(!$("#index_toolbar").hasClass("toolbar-hidden")){
$("#index_toolbar .translate").each(function(){
var value = $(this).attr("value");
if(translate_arr[value]){ $(this).html(translate_arr[value][user_language]); }
});
}

if($("body").attr("app_dir") != "left"){var app_name = ($("body").attr("app_name")).split("|")[1];}
else{var app_name = ($("body").attr("app_name")).split("|")[0];}
$("#app_title_tag").text(app_name);
if($("#"+current_page+" .navbar_title").length){$(".navbar_title").text(app_name);}

check_language_and_direction_fun();

}

/*=============================  check_language_and_direction_fun  ============================*/

function check_language_and_direction_fun(){

var user_language = localStorage.getItem("user-language");

if(user_language){$("body").attr("app_lang",user_language);}

if(user_language == "ar"){localStorage.setItem("user-language_id","27");}
else if(user_language == "en"){localStorage.setItem("user-language_id","1");}
else if(user_language == "fr"){localStorage.setItem("user-language_id","15");}
else if(user_language == "de"){localStorage.setItem("user-language_id","16");}
else if(user_language == "it"){localStorage.setItem("user-language_id","12");}
else if(user_language == "es"){localStorage.setItem("user-language_id","14");}
else if(user_language == "tr"){localStorage.setItem("user-language_id","33");}
else if(user_language == "pt"){localStorage.setItem("user-language_id","30");}
else if(user_language == "ru"){localStorage.setItem("user-language_id","21");}
else if(user_language == "in"){localStorage.setItem("user-language_id","216");}
else if(user_language == "cn"){localStorage.setItem("user-language_id","141");}
else if(user_language == "jp"){localStorage.setItem("user-language_id","57");}

if(user_language == "ar"){$("body").attr("app_dir","right");}
else{$("body").attr("app_dir","left");}

}



