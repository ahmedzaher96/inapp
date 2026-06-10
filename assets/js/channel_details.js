

/*=============================================================================================*/
/*-----------------------------------  channel_details_page  ----------------------------------*/
/*=============================================================================================*/

$$(document).once('page:init','.page[data-name="channel_details_page"]',function(e,page){

refresh_but_click_p14fun();
server_but_click_p14fun();

document.addEventListener("resume",function(){
if(app.views.current.router.currentRoute.name == "channel_details_page"){reload_channel_server_p14fun();} },false);

});

//================================================

$$(document).on('page:init','.page[data-name="channel_details_page"]',function(e,page){

localStorage.removeItem("p14_ajax_channel_fixed_url");
localStorage.removeItem("p14_ajax_channel_from_wedsite");
localStorage.removeItem("p14_ajax_complete");

if(page.route.query["channel_id"]){$("#channel_details_page").attr("channel_id",page.route.query["channel_id"]);}
if(page.route.query["match_id"]){$("#channel_details_page").attr("match_id",page.route.query["match_id"]);}

if(localStorage.getItem("user-app_activation") && !$("body").hasClass("app_in_review") && 
(page.route.query["channel_id"] || page.route.query["match_id"]) ){
get_last_update_json_p14fun();
interval_reload_server_p14fun();
}
else{
setTimeout(function(){app.views.current.router.navigate({name:"match_tab_page"});},1);
setTimeout(function(){app.views.current.router.navigate({name:"match_tab_page"});},1000);
}

});

/*==============================  interval_reload_server_p14fun  ==============================*/

function interval_reload_server_p14fun(){

var interval_reload_server = setInterval(function(){
if(app.views.current.router.currentRoute.name == "channel_details_page"){reload_channel_server_p14fun();}
},4*60*1000);

$$(document).on('page:beforeout','.page[data-name="channel_details_page"]',function(e,page){
clearInterval(interval_reload_server);
});

}

/*===============================  reload_channel_server_p14fun  ==============================*/

function reload_channel_server_p14fun(){

if(app.views.current.router.currentRoute.name == "channel_details_page" && !$("#channel_details_page").hasClass("preloader_mode") ){

localStorage.removeItem("p14_ajax_channel_fixed_url");
localStorage.removeItem("p14_ajax_channel_from_wedsite");
localStorage.removeItem("p14_ajax_complete");

get_last_update_json_p14fun();

}

}

/*===============================  get_last_update_json_p14fun  ===============================*/

function get_last_update_json_p14fun(){

var json_domain = localStorage.getItem("app-json_domain");
if(!json_domain){var json_domain = "https://mydb.sportmatchs.com";}

if(json_domain.includes("sportmatchs.com") == true){var json_url = json_domain+"/channel/last_update.json";}
else{var json_url = json_domain+"/last_update.json";}

$.ajax({url:json_url,timeout:6000,dataType:"json",cache:false,
success:function(data){

if(data["channel_fixed_url"] && localStorage.getItem("app-lastget-channel_fixed_url") &&
data["channel_fixed_url"] < localStorage.getItem("app-lastget-channel_fixed_url")){
localStorage.setItem("p14_ajax_channel_fixed_url","yes");
after_ajax_complete_p14fun();
}
else{
get_channel_fixed_url_arr_p14fun();
}

if(data["channel_from_wedsite"] && localStorage.getItem("app-lastget-channel_from_wedsite") &&
data["channel_from_wedsite"] < localStorage.getItem("app-lastget-channel_from_wedsite")){
localStorage.setItem("p14_ajax_channel_from_wedsite","yes");
after_ajax_complete_p14fun();
}
else{
get_channel_from_wedsite_arr_p14fun();
}

},

error:function(){

if(!localStorage.getItem("app-lastget-channel_fixed_url")){get_channel_fixed_url_arr_p14fun();}
if(!localStorage.getItem("app-lastget-channel_from_wedsite")){get_channel_from_wedsite_arr_p14fun();}

if(localStorage.getItem("app-lastget-channel_fixed_url") &&
localStorage.getItem("app-lastget-channel_from_wedsite")){
localStorage.setItem("p14_ajax_channel_from_wedsite","yes");
localStorage.setItem("p14_ajax_channel_fixed_url","yes");
after_ajax_complete_p14fun();
}

}

});

}

/*========================  get_channel_fixed_url_arr_p14fun  ========================*/

function get_channel_fixed_url_arr_p14fun(){

var json_domain = localStorage.getItem("app-json_domain");
if(!json_domain){var json_domain = "https://mydb.sportmatchs.com";}

if(json_domain.includes("sportmatchs.com") == true){var json_url = json_domain+"/channel/channel_fixed_url.json";}
else{var json_url = json_domain+"/channel_fixed_url.json";}

$.ajax({url:json_url,timeout:6000,dataType:"json",cache:false,
success:function(data){
localStorage.setItem("app-channel_fixed_url_arr",JSON.stringify(data));
localStorage.setItem("app-lastget-channel_fixed_url",Math.trunc(new Date().getTime()/1000));
localStorage.setItem("p14_ajax_channel_fixed_url","yes");
after_ajax_complete_p14fun();
},
error:function(){
localStorage.setItem("p14_ajax_channel_fixed_url","yes");
after_ajax_complete_p14fun();
}
});

}

/*===========================  get_channel_from_wedsite_arr_p14fun  ===========================*/

function get_channel_from_wedsite_arr_p14fun(){

var json_domain = localStorage.getItem("app-json_domain");
if(!json_domain){var json_domain = "https://mydb.sportmatchs.com";}

if(json_domain.includes("sportmatchs.com") == true){var json_url = json_domain+"/channel/channel_from_wedsite.json";}
else{var json_url = json_domain+"/channel_from_wedsite.json";}

$.ajax({url:json_url,timeout:6000,dataType:"json",cache:false,
success:function(data){
localStorage.setItem("app-channel_from_wedsite_arr",JSON.stringify(data));
localStorage.setItem("app-lastget-channel_from_wedsite",Math.trunc(new Date().getTime()/1000));
localStorage.setItem("p14_ajax_channel_from_wedsite","yes");
after_ajax_complete_p14fun();
},
error:function(){
localStorage.setItem("p14_ajax_channel_from_wedsite","yes");
after_ajax_complete_p14fun();
}
});

}

/*================================  after_ajax_complete_p14fun  ===============================*/

function after_ajax_complete_p14fun(){

if(localStorage.getItem("p14_ajax_complete") != "yes" && localStorage.getItem("p14_ajax_channel_fixed_url") == "yes"
&& localStorage.getItem("p14_ajax_channel_from_wedsite") == "yes"){

create_channel_server_p14fun();

localStorage.setItem("p14_ajax_complete","yes");

check_custom_native_ads_fun("p14_channel_details_loaded");

}

}

/*===============================  create_channel_server_p14fun  ==============================*/

function create_channel_server_p14fun(){

var channel_id_attr = $("#channel_details_page").attr("channel_id");
var match_id = $("#channel_details_page").attr("match_id");
var media_domain = localStorage.getItem("app-media_domain");

//====================================================================

if(channel_id_attr){

$(".p14_chanpop_fixed_server_but").attr("found","no");

$.each(channel_id_attr.split(','),function(index,channel_id){

var channel_fixed_url_arr = JSON.parse(localStorage.getItem("app-channel_fixed_url_arr"));

//========================================================

if(channel_fixed_url_arr[channel_id]){

for(var i = 0; i < channel_fixed_url_arr[channel_id].length; i++){

var url = channel_fixed_url_arr[channel_id][i].url;
var player_type = channel_fixed_url_arr[channel_id][i].player_type;
var quality = channel_fixed_url_arr[channel_id][i].quality;

if(!$(".p14_chanpop_fixed_server_but[channel_id='"+channel_id+"'][url='"+url+"']").length){
$("#p14_chanpop_fixed_server_area").append(`
<button class="button p14_chanpop_fixed_server_but" channel_id="${channel_id}" url="${url}" player_type="${player_type}" >
<img src="${media_domain}/channel/${channel_id}.jpg" >
<p>${quality}</p>
</button>
`);
}

$(".p14_chanpop_fixed_server_but[url='"+url+"']").attr("found","yes");

}

}

});
}

//====================================================================

if(match_id){

var channel_from_wedsite_arr = JSON.parse(localStorage.getItem("app-channel_from_wedsite_arr"));

$(".p14_chanpop_static_server_but").attr("found","no");

if(channel_from_wedsite_arr[match_id]){

for(var i = 0; i < channel_from_wedsite_arr[match_id].length; i++){

var url = channel_from_wedsite_arr[match_id][i].url;
var player_type = channel_from_wedsite_arr[match_id][i].player_type;

if(!$(".p14_chanpop_static_server_but[url='"+url+"']").length){
$("#p14_chanpop_static_server_area").append(`
<button class="button p14_chanpop_static_server_but" url="${url}" player_type="${player_type}" >
<i class="ionicons-tv-outline"></i>
<p></p>
</button>
`);
}

$(".p14_chanpop_static_server_but[url='"+url+"']").attr("found","yes");

}

}

}

//====================================================================

after_create_channel_server_p14fun();

}

/*============================  after_create_channel_server_p14fun  ===========================*/

function after_create_channel_server_p14fun(){

$(".p14_chanpop_fixed_server_but[found='no']").detach();
$(".p14_chanpop_static_server_but[found='no']").detach();

$("#channel_details_page").removeClass("preloader_mode");

var atext = (JSON.parse(localStorage.getItem("app-translate_arr")))["87"][localStorage.getItem("user-language")];
$(".p14_chanpop_static_server_but p").each(function(eq){$(this).text(atext+" "+(eq+1));});

var active_server = $("#channel_details_page").attr("active_server");
if(active_server && $(".p14_chanpop_static_server_but[url='"+active_server+"']").length){
$(".p14_chanpop_static_server_but[url='"+active_server+"']").addClass("active");}

if(!$(".p14_chanpop_static_server_but").length){$("#p14_chanpop_static_server_area").addClass("hidden");}
else{$("#p14_chanpop_static_server_area").removeClass("hidden");}

if(!$(".p14_chanpop_fixed_server_but").length){$("#p14_chanpop_fixed_server_area").addClass("hidden");}
else{$("#p14_chanpop_fixed_server_area").removeClass("hidden");}

if($("#p14_chanpop_static_server_area").hasClass("hidden") && $("#p14_chanpop_fixed_server_area").hasClass("hidden")){
$("#p14_chanpop_no_server").removeClass("hidden");$("#p14_chanpop_server_area").addClass("hidden");}
else{$("#p14_chanpop_no_server").addClass("hidden");$("#p14_chanpop_server_area").removeClass("hidden");}

if($(".p14_chanpop_fixed_server_but").length && !$(".p14_chanpop_static_server_but").length){
$("#p14_chanpop_fixed_server_area .line-divider").addClass("hidden");}
else{$("#p14_chanpop_fixed_server_area .line-divider").removeClass("hidden");}

if($(".p14_chanpop_static_server_but").length && !$(".p14_chanpop_fixed_server_but").length){
$("#p14_chanpop_static_server_area .line-divider").addClass("hidden");}
else{$("#p14_chanpop_static_server_area .line-divider").removeClass("hidden");}

if($(".p14_chanpop_static_server_but").length > 5){$("#p14_chanpop_static_server_area").attr("row","3");}
else{$("#p14_chanpop_static_server_area").removeAttr("row");}

if($(".p14_chanpop_fixed_server_but").length > 5){$("#p14_chanpop_fixed_server_area").attr("row","3");}
else{$("#p14_chanpop_fixed_server_area").removeAttr("row");}

}

/*=================================  refresh_but_click_p14fun  ================================*/

function refresh_but_click_p14fun(){

$(document).on("click","#p14_chanpop_reload_but",function(){
$("#channel_details_page").addClass("preloader_mode");

localStorage.removeItem("p14_ajax_channel_fixed_url");
localStorage.removeItem("p14_ajax_channel_from_wedsite");
localStorage.removeItem("p14_ajax_complete");

get_last_update_json_p14fun();

});

}



