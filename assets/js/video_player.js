

/*=============================================================================================*/
/*------------------------------------  video_player_page  ------------------------------------*/
/*=============================================================================================*/

$$(document).on('page:init','.page[data-name="video_player_page"]',function(e,page){

if(!localStorage.getItem("user-app_activation") || $("body").hasClass("app_in_review")){
setTimeout(function(){app.views.current.router.navigate({name:"match_tab_page"});},1);
setTimeout(function(){app.views.current.router.navigate({name:"match_tab_page"});},1000);
}

if(page.route.query["video_url"]){

$("#video_player_page").attr("video_url",(decodeURIComponent(page.route.query["video_url"]))).attr("video_type",page.route.query["video_type"]);
if(page.route.query["player_type"]){$("#video_player_page").attr("player_type",page.route.query["player_type"]);}
if(page.route.query["poster"]){$("#video_player_page").attr("poster",page.route.query["poster"]);}
if(page.route.query["channel_id"]){$("#video_player_page").attr("channel_id",page.route.query["channel_id"]);}

create_new_video_p16fun();

}
else{
setTimeout(function(){app.views.current.router.navigate({name:"match_tab_page"});},1);
setTimeout(function(){app.views.current.router.navigate({name:"match_tab_page"});},1000);
}

setTimeout(function(){screen.orientation.unlock();},500);
setTimeout(function(){ $("#video_player_page").removeClass("preloader_mode"); },1000);

refresh_but_click_p16fun();
resize_but_click_p16fun();

});

//================================================

$$(document).on('page:beforeout','.page[data-name="video_player_page"]',function(e,page){
$("#video_player_page .page-content *").detach();
});

//================================================

$$(document).once('page:init','.page[data-name="video_player_page"]',function(e,page){
orientation_change_p16fun();
});

/*================================  orientation_change_p16fun  ================================*/

function orientation_change_p16fun(){
window.addEventListener("orientationchange",function(){
if(window.orientation == "0"){
$("#video_player_page").attr("orientation","portrait");
}
if(window.orientation == "90" || window.orientation == "-90"){
$("#video_player_page").attr("orientation","landscape");
}
},false);
}

/*=================================  refresh_but_click_p16fun  ================================*/

function refresh_but_click_p16fun(){

$("#p16_refresh_but").click(function(){

$("#video_player_page #p16_player_area *").detach();

$("#video_player_page").addClass("preloader_mode");
setTimeout(function(){ $("#video_player_page").removeClass("preloader_mode"); },1000);

create_new_video_p16fun();

});

}

/*=================================  resize_but_click_p16fun  =================================*/

function resize_but_click_p16fun(){

$("#p16_resize_but").click(function(){

var orientation = $("#video_player_page").attr("orientation");

if(orientation == "portrait"){
$("#video_player_page").attr("orientation","landscape");
screen.orientation.lock("landscape");
setTimeout(function(){document.exitFullscreen();},1000);
}

else if(orientation == "landscape"){
$("#video_player_page").attr("orientation","portrait");
screen.orientation.lock("portrait");
}

});

}














