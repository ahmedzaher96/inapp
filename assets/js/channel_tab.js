

/*=============================================================================================*/
/*----------------------------------  channel_tab_page  ----------------------------------*/
/*=============================================================================================*/

$$(document).once('page:init','.page[data-name="channel_tab_page"]',function(e,page){

localStorage.removeItem("p17_ajax_channel_list");
localStorage.removeItem("p17_ajax_channel_fixed_url");
localStorage.removeItem("p17_ajax_complete");

get_last_update_json_p17fun();
channel_li_click_p17fun();
refresh_but_click_p17fun();

});

//====================================================================

$$(document).on('page:reinit','.page[data-name="channel_tab_page"]',function(e,page){

$("#channel_tab_page .page-content").scrollTop(localStorage.getItem("p17_scroll_position"));

var toolbar_last_pos = $("#channel_tab_page .toolbar_horizontal_scroll").attr("last_pos")
$("#channel_tab_page .toolbar_horizontal_scroll .toolbar-inner").scrollLeft(toolbar_last_pos);

});

//====================================================================

$$(document).on('page:init','.page[data-name="channel_tab_page"]',function(e,page){

if(localStorage.getItem("user-app_activation") != "full" || $("body").hasClass("app_in_review")){
setTimeout(function(){app.views.current.router.navigate({name:"match_tab_page"});},1);
setTimeout(function(){app.views.current.router.navigate({name:"match_tab_page"});},1000);
}

});

//====================================================================

$$(document).on('page:beforeout','.page[data-name="channel_tab_page"]',function(e,page){

localStorage.setItem("p17_scroll_position",($("#channel_tab_page .page-content").scrollTop()));

});

/*===============================  get_last_update_json_p17fun  ===============================*/

function get_last_update_json_p17fun(){

var json_domain = localStorage.getItem("app-json_domain");
if(!json_domain){var json_domain = "https://mydb.sportmatchs.com";}

if(json_domain.includes("sportmatchs.com") == true){var json_url = json_domain+"/channel/last_update.json";}
else{var json_url = json_domain+"/last_update.json";}

$.ajax({url:json_url,timeout:6000,dataType:"json",cache:false,
success:function(data){

if(data["channel_list"] && localStorage.getItem("app-lastget-channel_list") &&
data["channel_list"] < localStorage.getItem("app-lastget-channel_list")){
localStorage.setItem("p17_ajax_channel_list","yes");
after_ajax_complete_p17fun();
}
else{
get_channel_list_arr_p17fun();
}

if(data["channel_fixed_url"] && localStorage.getItem("app-lastget-channel_fixed_url") &&
data["channel_fixed_url"] < localStorage.getItem("app-lastget-channel_fixed_url")){
localStorage.setItem("p17_ajax_channel_fixed_url","yes");
after_ajax_complete_p17fun();
}
else{
get_channel_fixed_url_arr_p17fun();
}

},

error:function(){

if(!localStorage.getItem("app-lastget-last_update_channel_list")){get_channel_list_arr_p17fun();}
if(!localStorage.getItem("app-lastget-last_update_channel_fixed_url")){get_channel_fixed_url_arr_p17fun();}

if(localStorage.getItem("app-lastget-last_update_channel_list") &&
localStorage.getItem("app-lastget-last_update_channel_fixed_url")){
localStorage.setItem("p17_ajax_channel_list","yes");
localStorage.setItem("p17_ajax_channel_fixed_url","yes");
after_ajax_complete_p17fun();
}

}

});

}

/*===============================  get_channel_list_arr_p17fun  ===============================*/

function get_channel_list_arr_p17fun(){

var json_domain = localStorage.getItem("app-json_domain");
if(!json_domain){var json_domain = "https://mydb.sportmatchs.com";}

if(json_domain.includes("sportmatchs.com") == true){var json_url = json_domain+"/channel/channel_list.json";}
else{var json_url = json_domain+"/channel_list.json";}

$.ajax({url:json_url,timeout:6000,dataType:"json",cache:false,
success:function(data){
localStorage.setItem("app-channel_list_arr",JSON.stringify(data));
localStorage.setItem("app-lastget-channel_list",Math.trunc(new Date().getTime()/1000));
localStorage.setItem("p17_ajax_channel_list","yes");
after_ajax_complete_p17fun();
},
error:function(){
localStorage.setItem("p17_ajax_channel_list","yes");
after_ajax_complete_p17fun();
}
});

}

/*=============================  get_channel_fixed_url_arr_p17fun  ============================*/

function get_channel_fixed_url_arr_p17fun(){

var json_domain = localStorage.getItem("app-json_domain");
if(!json_domain){var json_domain = "https://mydb.sportmatchs.com";}

if(json_domain.includes("sportmatchs.com") == true){var json_url = json_domain+"/channel/channel_fixed_url.json";}
else{var json_url = json_domain+"/channel_fixed_url.json";}

$.ajax({url:json_url,timeout:6000,dataType:"json",cache:false,
success:function(data){
localStorage.setItem("app-channel_fixed_url_arr",JSON.stringify(data));
localStorage.setItem("app-lastget-channel_fixed_url",Math.trunc(new Date().getTime()/1000));
localStorage.setItem("p17_ajax_channel_fixed_url","yes");
after_ajax_complete_p17fun();
},
error:function(){
localStorage.setItem("p17_ajax_channel_fixed_url","yes");
after_ajax_complete_p17fun();
}
});

}

/*================================  after_ajax_complete_p17fun  ===============================*/

function after_ajax_complete_p17fun(){

if(localStorage.getItem("p17_ajax_complete") != "yes" && localStorage.getItem("p17_ajax_channel_list") == "yes"
&& localStorage.getItem("p17_ajax_channel_fixed_url") == "yes"){

create_channel_list_p17fun();

localStorage.setItem("p17_ajax_complete","yes");

check_custom_native_ads_fun("p17_channel_tab_loaded");

}

}

/*================================  create_channel_list_p17fun  ===============================*/

function create_channel_list_p17fun(){

var channel_list_arr = JSON.parse(localStorage.getItem("app-channel_list_arr"));
var channel_fixed_url_arr = JSON.parse(localStorage.getItem("app-channel_fixed_url_arr"));
var media_domain = localStorage.getItem("app-media_domain");

if((!channel_list_arr || !channel_fixed_url_arr) && !$(".p17_li_channel").length){
$("#p17_channel_area").addClass("hidden");
$("#p17_no_channel_area").removeClass("hidden");
}

//====================================================================

var live_channel_arr = [];

$.each((channel_fixed_url_arr),function(channel_id){
if($.inArray(channel_id,live_channel_arr) < 0){live_channel_arr.push(channel_id);}
});

if(!live_channel_arr.length && !$(".p17_li_channel").length){
$("#p17_channel_area").addClass("hidden");
$("#p17_no_channel_area").removeClass("hidden");
}

//====================================================================

if(channel_list_arr && live_channel_arr.length){

$("#p17_channel_area").removeClass("hidden");
$("#p17_no_channel_area").addClass("hidden");

$("#p17_channel_area .p17_ul_channel").detach();

for(var i = 0; i < Object.entries(channel_list_arr["channel"]).length;i++){

var channel_id = channel_list_arr["channel"][i]["id"];
var channel_name = channel_list_arr["channel"][i]["name"];
var channel_group = channel_list_arr["channel"][i]["group"];

var channel_group_name = "";

if(channel_group && channel_list_arr["group"][channel_group]){
var channel_group_name = channel_list_arr["group"][channel_group]["name"];
}

if(channel_name.includes("|") == true){if($("body").attr("app_dir") != "left"){
var channel_name = channel_name.split("|")[1];}else{var channel_name = channel_name.split("|")[0];}}

if(channel_group_name.includes("|") == true){if($("body").attr("app_dir") != "left"){
var channel_group_name = channel_group_name.split("|")[1];}else{var channel_group_name = channel_group_name.split("|")[0];}}

//====================================================================

if($.inArray(channel_id,live_channel_arr) > -1){

if(!$("#p17_channel_area .p17_ul_channel[group='"+channel_group+"']").length){
$("#p17_channel_area").append(`
<ul class="p17_ul_channel gray_click" group="${channel_group}" >
<ol class="button no-active-state"><p>${channel_group_name}</p></ol>
</ul>
`);
}

if(/[\u0600-\u06FF]/.test(channel_name) == true){var len = "ar";}else{var len = "en";}

if(!$(".p17_li_channel[channel_id='"+channel_id+"']").length){
$(".p17_ul_channel[group='"+channel_group+"']").append(`
<li class="p17_li_channel button gray_click" channel_id="${channel_id}" >
<img class="lazy" src="assets/img/app_logo.png" data-src="${media_domain}/channel/${channel_id}.jpg" >
<p len="${len}">${channel_name}</p>
</li>
`);
}

}

//====================================================================

}}

setTimeout(function(){$("img.lazy").each(function(index,element){app.lazy.loadImage(element);});},100);
$("#channel_tab_page").removeClass("preloader_mode");

}

/*=================================  channel_li_click_p17fun  =================================*/

function channel_li_click_p17fun(){

$(document).on("click",".p17_li_channel",function(){

var channel_id = $(this).attr("channel_id");

app.views.current.router.navigate({name:"channel_details_page",query:{channel_id:channel_id,previous_page:"channel_tab_page"}});

});

}

/*=================================  refresh_but_click_p17fun  ================================*/

function refresh_but_click_p17fun(){

$("#p17_refresh_but").click(function(){

$("#channel_tab_page").addClass("preloader_mode");

localStorage.removeItem("p17_ajax_channel_list");
localStorage.removeItem("p17_ajax_channel_fixed_url");
localStorage.removeItem("p17_ajax_complete");

get_last_update_json_p17fun();

});

}


