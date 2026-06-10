

/*=============================================================================================*/
/*--------------------------------------  match_tab_page  -------------------------------------*/
/*=============================================================================================*/

$$(document).once('page:init','.page[data-name="match_tab_page"]',function(e,page){

get_matchs_ids_p1fun("today");

change_date_header_p1fun("today");
interval_reload_table_p1fun();
match_li_click_p1fun();
live_toggle_click_p1fun();
create_calendar_p1fun();
date_arrow_buts_click_p1fun();
table_swipe_p1fun();

document.addEventListener("resume",function(){
if(app.views.current.router.currentRoute.name == "match_tab_page"){reload_matchs_table_p1fun();}},false);

});

//====================================================================

$$(document).on('page:reinit','.page[data-name="match_tab_page"]',function(e,page){

if(app.views.current.router.currentRoute.name == "match_tab_page"){
$("#match_tab_page .page-content").scrollTop(localStorage.getItem("p1_scroll_position"));
reload_matchs_table_p1fun();
interval_reload_table_p1fun();
}

});

//====================================================================

$$(document).on('page:beforeout','.page[data-name="match_tab_page"]',function(e,page){

localStorage.setItem("p1_scroll_position",($("#match_tab_page .page-content").scrollTop()));

});

/*===============================  interval_reload_table_p1fun  ===============================*/

function interval_reload_table_p1fun(){

var interval_reload_table = setInterval(function(){
if(app.views.current.router.currentRoute.name == "match_tab_page"){reload_matchs_table_p1fun();}
},60*1000);

$$(document).on('page:beforeout','.page[data-name="match_tab_page"]',function(e,page){
clearInterval(interval_reload_table);
});

}

/*================================  reload_matchs_table_p1fun  ================================*/

function reload_matchs_table_p1fun(){

if(app.views.current.router.currentRoute.name == "match_tab_page" && $("#p1_day_area").attr("target_matchs_ids") &&
!$("#match_tab_page").hasClass("preloader_mode") ){

change_date_header_p1fun($("#p1_day_area").attr("date"));

get_matchs_table_p1fun("reload");

}

}

/*=================================  change_date_header_p1fun  ================================*/

function change_date_header_p1fun(prm_date){

var translate_arr = JSON.parse(localStorage.getItem("app-translate_arr"));
var user_language = localStorage.getItem("user-language");

var today_date = new Date().toLocaleDateString('en-us',
{year:'numeric',month:'2-digit',day:'2-digit'}).replace(/(\d+)\/(\d+)\/(\d+)/,'$3-$1-$2');
var yesterday_date = new Date(((new Date(today_date+"T00:00:00").getTime())-(24*60*60*1000))).toLocaleDateString('en-us',
{year:'numeric',month:'2-digit',day:'2-digit'}).replace(/(\d+)\/(\d+)\/(\d+)/,'$3-$1-$2');
var tomorrow_date = new Date(((new Date(today_date+"T00:00:00").getTime())+(24*60*60*1000))).toLocaleDateString('en-us',
{year:'numeric',month:'2-digit',day:'2-digit'}).replace(/(\d+)\/(\d+)\/(\d+)/,'$3-$1-$2');

if(!prm_date || prm_date=="today"){var prm_date = today_date;}

if(prm_date == today_date){var nnweekday = translate_arr["56"][user_language];}
else if(prm_date == yesterday_date){var nnweekday = translate_arr["57"][user_language];}
else if(prm_date == tomorrow_date){var nnweekday = translate_arr["58"][user_language];}
else{
var dnum = (new Date(prm_date)).getDay();
var nnweekday_arr = JSON.parse(translate_arr["59"][user_language]);
var nnweekday = nnweekday_arr[dnum];
}

$("#p1_date_header_middle p:eq(0)").text(nnweekday);
$("#p1_date_header_middle p:eq(1)").text(prm_date);

}

/*===================================  get_matchs_ids_p1fun  ==================================*/

function get_matchs_ids_p1fun(prm_date,prm_fun){

change_date_header_p1fun(prm_date);

var timezone = (new Date().getTimezoneOffset())/-60;

var today_date = new Date().toLocaleDateString('en-us',
{year:'numeric',month:'2-digit',day:'2-digit'}).replace(/(\d+)\/(\d+)\/(\d+)/,'$3-$1-$2');

if(!prm_date || prm_date=="today"){var prm_date = today_date;}

$("#p1_day_area").attr("date",prm_date);

if(prm_date == today_date){$("#p1_day_area").addClass("today");}else{$("#p1_day_area").removeClass("today");}

if(prm_date != today_date && $("#match_tab_page").hasClass("live_mode") ){
$("#p1_live_toggle input").prop("checked",false);
$("#match_tab_page").removeClass("live_mode").removeClass("note_mode1").removeClass("note_mode2");
}

//================================================================================

if(prm_date == today_date){

var json_domain = localStorage.getItem("app-json_domain");
if(!json_domain){var json_domain = "https://mydb.sportmatchs.com";}

if(json_domain.includes("sportmatchs.com") == true){var json_url = json_domain+"/scores365_match/today_match.json";}
else{var json_url = json_domain+"/today_match.json";}

$.ajax({url:json_url,timeout:3000,dataType:"json",cache:false,
success:function(data){

localStorage.setItem("app-p1_today_match_table_arr",JSON.stringify(data));

localStorage.setItem("app-p1_match_table_arr",JSON.stringify(data));
var target_matchs_ids = "";
for(var i = 0; i < data.length; i++){var match_id = data[i].match_id;target_matchs_ids += match_id+",";}
var target_matchs_ids = target_matchs_ids.replace(/,\s*$/,"");
$("#p1_day_area").attr("target_matchs_ids",target_matchs_ids);

get_matchs_table_p1fun(prm_fun);

},

error:function(){

//========================================================

if($("#match_tab_page").hasClass("preloader_mode") && localStorage.getItem("app-p1_today_match_table_arr")){

var today_match_table_arr = JSON.parse(localStorage.getItem("app-p1_today_match_table_arr"));

localStorage.setItem("app-p1_match_table_arr",JSON.stringify(today_match_table_arr));

var target_matchs_ids = "";
for(var i = 0; i < today_match_table_arr.length; i++){
var match_id = today_match_table_arr[i].match_id;target_matchs_ids += match_id+",";}
var target_matchs_ids = target_matchs_ids.replace(/,\s*$/,"");
$("#p1_day_area").attr("target_matchs_ids",target_matchs_ids);

get_matchs_table_p1fun(prm_fun);

}

//========================================================

}

});

}

//================================================================================

if(prm_date != today_date){

var json_url = "https://mydb.sportmatchs.com/scores365_match/get_match.php?date="+prm_date+"&timezone="+timezone;

$.ajax({url:json_url,timeout:6000,dataType:"json",
success:function(data){

localStorage.setItem("app-p1_match_table_arr",JSON.stringify(data));
var target_matchs_ids = "";
for(var i = 0; i < data.length; i++){var match_id = data[i].match_id;target_matchs_ids += match_id+",";}
var target_matchs_ids = target_matchs_ids.replace(/,\s*$/,"");
$("#p1_day_area").attr("target_matchs_ids",target_matchs_ids);

get_matchs_table_p1fun(prm_fun);

}
});

}

}

/*==================================  get_matchs_table_p1fun  =================================*/

function get_matchs_table_p1fun(prm_fun){

var user_language = localStorage.getItem("user-language");
var user_language_id = localStorage.getItem("user-language_id");
var app_suspended_arr = JSON.parse(localStorage.getItem("app-suspended_arr"));

var target_matchs_ids = $("#p1_day_area").attr("target_matchs_ids");
if(!target_matchs_ids || target_matchs_ids==null){after_get_matchs_table_p1fun();}

var prm_date = $("#p1_day_area").attr("date");
var today_date = new Date().toLocaleDateString('en-us',
{year:'numeric',month:'2-digit',day:'2-digit'}).replace(/(\d+)\/(\d+)\/(\d+)/,'$3-$1-$2');
var yesterday_date = new Date(((new Date(today_date+"T00:00:00").getTime())-(24*60*60*1000))).toLocaleDateString('en-us',
{year:'numeric',month:'2-digit',day:'2-digit'}).replace(/(\d+)\/(\d+)\/(\d+)/,'$3-$1-$2');
var tomorrow_date = new Date(((new Date(today_date+"T00:00:00").getTime())+(24*60*60*1000))).toLocaleDateString('en-us',
{year:'numeric',month:'2-digit',day:'2-digit'}).replace(/(\d+)\/(\d+)\/(\d+)/,'$3-$1-$2');

var prm_date_ms_start = (new Date(prm_date+"T00:00:00").getTime())/1000;
var prm_date_ms_end = (new Date(prm_date+"T23:59:59").getTime())/1000;

if(prm_fun == "reload" && (prm_date != today_date && prm_date != yesterday_date && prm_date != tomorrow_date)){return;}

var json_url = "https://webws.365scores.com/web/games/myscores/?langId="+user_language_id+"&timezoneName=UTC&games="+target_matchs_ids;

//prompt("",json_url);

var p1_ajax_matchs_table = $.ajax({url:json_url,timeout:7000,dataType:"json",

error:function(){
if($("#match_tab_page").hasClass("preloader_mode")){get_matchs_table_p1fun();}
},

success:function(data){

var user_color_theme = localStorage.getItem("user-color_theme");

if(prm_fun != "reload"){$(".p1_ul_match").detach();}

if(data["games"]){
for(var i = 0; i < data["games"].length; i++){

var match_id = data["games"][i].id;

var start_time = data["games"][i].startTime;
var date = (new Date(start_time).getTime())/1000;

var status_group = data["games"][i].statusGroup;
if(status_group == 3){var live = 1;}else{var live = 0;}

if(prm_date == today_date){
if( !(live == 1 || (date >= prm_date_ms_start && date<= prm_date_ms_end)) ){ continue; }
}
else{
if( !(date >= prm_date_ms_start && date<= prm_date_ms_end) ){ continue; }
}

var sport_id = data["games"][i].sportId;

var league_id = data["games"][i].competitionId;
var league_name = (data["games"][i].competitionDisplayName).split("-")[0];
var part_league_logo = "https://imagecache.365scores.com/image/upload/f_png,w_160,h_160,c_limit,q_auto:eco,d_Countries:default1.png/Competitions/";
if(user_color_theme == "light"){var league_logo = part_league_logo+"light/"+league_id;}
else{var league_logo = part_league_logo+league_id;}

if(data["competitions"]){for(var g = 0; g < data["competitions"].length; g++){
if(data["competitions"][g]["id"] == league_id){var league_country_id = data["competitions"][g]["countryId"];
var league_logo = league_logo.replace("default1.png","Round:"+league_country_id+".png");
if(league_name.length <= 5){var league_name = data["competitions"][g]["name"];}break;}}}

var home_country_id = data["games"][i]["homeCompetitor"].countryId;
var away_country_id = data["games"][i]["awayCompetitor"].countryId;
if(home_country_id == away_country_id){var country_id = home_country_id;}else{var country_id = "";}

var home_id = data["games"][i]["homeCompetitor"].id;
var away_id = data["games"][i]["awayCompetitor"].id;
var home_name = data["games"][i]["homeCompetitor"].name;
var away_name = data["games"][i]["awayCompetitor"].name;
var home_score = data["games"][i]["homeCompetitor"].score;if(home_score == "-1"){var home_score = "";}
var away_score = data["games"][i]["awayCompetitor"].score;if(away_score == "-1"){var away_score = "";}
var part_team_logo = "https://imagecache.365scores.com/image/upload/f_png,w_160,h_160,c_limit,q_auto:eco,d_Competitors:default1.png/Competitors/";
var home_logo = part_team_logo+home_id;
var away_logo = part_team_logo+away_id;

var league_name = check_changed_names_fun(league_id,league_name,"league");
var home_name = check_changed_names_fun(home_id,home_name,"team");
var away_name = check_changed_names_fun(away_id,away_name,"team");

var win_description = data["games"][i].winDescription;
if(win_description){
if(win_description.includes("-") == true){
win_description.replace(" - ","-");
var wdn1 = ((win_description.split("-")[0]).substr((win_description.split("-")[0]).length - 2)).replace(/[^0-9]/gi,"");
var wdn2 = ((win_description.split("-")[1]).substring(0,2)).replace(/[^0-9]/gi,"");
var win_description= win_description.replace(wdn1+"-"+wdn2,(Math.max(wdn1,wdn2)+" - "+Math.min(wdn1,wdn2)));
}
if(win_description.includes("فازت") == true){var win_description = "فوز " + (win_description.replace("فازت ",""));}
}

var real_minute = (data["games"][i].gameTime)*1;
var text_minute = data["games"][i].gameTimeDisplay;
if(text_minute && text_minute.includes("+") == true){var gmin = (text_minute.split('+')[0])*1;}else{var gmin = real_minute;}

if(real_minute >= 120 && text_minute < 30){var text_minute = "";}

if(!sport_id || (sport_id && sport_id != 1)){var text_minute = "";var gmin = "";var real_minute = "";}

var status_text = data["games"][i].statusText;
var short_status_text = data["games"][i].shortStatusText;
var status_display_type = data["games"][i].gameTimeAndStatusDisplayType;

if(status_text == "شوط"){var status_text = "إستراحة";}

var stage_name = data["games"][i].stageName;
var group_name = data["games"][i].groupName;
if(stage_name){var pround=" - "+stage_name;}
else if(group_name){var pround=" - "+group_name;}
else{var pround="";}

//====================================================================

if(prm_date != today_date && prm_date != yesterday_date && prm_date != tomorrow_date){
if(localStorage.getItem("user-app_activation") != "full" || $("body").hasClass("app_in_review")){
if(app_suspended_arr){

if(app_suspended_arr["match_league"]){
if($.inArray(league_id,(app_suspended_arr["match_league"])) > -1){ continue; }
}

if(app_suspended_arr["match_team"]){
if($.inArray(home_id,(app_suspended_arr["match_team"])) > -1 || 
$.inArray(away_id,(app_suspended_arr["match_team"])) > -1){ continue; }
}

}}}

//====================================================================

if(prm_fun == "reload" || (prm_date == yesterday_date && live == 1) ){

$(".p1_ul_match_title img.lazy-fade-in.lazy-loaded").removeClass("lazy-fade-in");

if($("#p1_match_"+match_id).attr("live")!=live){$("#p1_match_"+match_id).detach();}

if($("#p1_match_"+match_id).length){
$("#p1_match_"+match_id+" .p1_li_match_team.home p").text(home_name);
$("#p1_match_"+match_id+" .p1_li_match_team.away p").text(away_name);
$("#p1_match_"+match_id+" .p1_li_match_team.home img").removeClass("lazy-fade-in").attr("src",home_logo);
$("#p1_match_"+match_id+" .p1_li_match_team.away img").removeClass("lazy-fade-in").attr("src",away_logo);
$("#p1_match_"+match_id+" .p1_li_match_bottom_info").detach();
}

if(live == 1){
$("#p1_match_"+match_id+" .p1_li_match_middle_info_p1").detach();
$("#p1_match_"+match_id+" .p1_li_match_middle_info_p2").detach();
$("#p1_match_"+match_id+" .p1_li_match_middle_info_p3").detach();
$("#p1_match_"+match_id+" .p1_li_match_middle_info .p1_gauge").detach();
}

}

//====================================================================

if(live == 1){

if(!$("#p1_day_area .p1_ul_match[league_id='"+league_id+"'][live='"+live+"']").length){
$("#p1_day_area").append(
'<ul class="p1_ul_match" league_id="'+league_id+'" live="'+live+'" country_id="'+country_id+'" >'+
'<ol class="p1_ul_match_title button click_color">'+
'<img class="lazy lazy-fade-in" src="assets/img/app_logo.png" data-src="'+league_logo+'" />'+
'<p></p>'+
'</ol>'+
'</ul>'
);
}

if(!$("#p1_match_"+match_id).length){
$("#p1_day_area .p1_ul_match[league_id='"+league_id+"'][live='"+live+"']").append(
'<li id="p1_match_'+match_id+'" class="p1_li_match button click_color" live="'+live+'" date="'+date+'" >'+
'<div class="p1_li_match_team home">'+
'<img class="lazy lazy-fade-in" src="assets/img/app_logo.png" data-src="'+home_logo+'" />'+
'<p tid="'+home_id+'">'+home_name+'</p></div>'+
'<div class="p1_li_match_middle_info">'+
'</div>'+
'<div class="p1_li_match_team away">'+
'<img class="lazy lazy-fade-in" src="assets/img/app_logo.png" data-src="'+away_logo+'" />'+
'<p tid="'+away_id+'">'+away_name+'</p></div>'+
'</li>'
);
}

if(!text_minute){$("#p1_match_"+match_id+" .p1_li_match_middle_info").css("margin","6px 0 -6px");}

if(text_minute){
$("#p1_match_"+match_id+" .p1_li_match_middle_info").append('<div class="gauge p1_gauge"></div>');
if(gmin > 90){var max_gmin = 120;var border_color = "var(--rose_color)";}
else{var max_gmin = 90;var border_color = "var(--blue_color2)";}
var gsize = gmin/max_gmin;
app.gauge.create({el:'#p1_match_'+match_id+' .p1_gauge',type:'circle',size:74,
borderWidth:1.7,borderColor:border_color,borderBgColor:'#d5d5d5',value:gsize});
}

if( gmin && gmin <= 90 && (gmin!=45 || (gmin==45 && short_status_text==1)) ){
$("#p1_match_"+match_id+" .p1_li_match_middle_info").append(
'<p class="p1_li_match_middle_info_p1">'+text_minute+'</p>'+
'<p class="p1_li_match_middle_info_p2">'+away_score+' - '+home_score+'</p>');
}
else if(gmin > 90){
$("#p1_match_"+match_id+" .p1_li_match_middle_info").append(
'<p class="p1_li_match_middle_info_p1">'+text_minute+'</p>'+
'<p class="p1_li_match_middle_info_p2 text" style="--size:10.5px">'+status_text+'</p>'+
'<p class="p1_li_match_middle_info_p3">'+away_score+'-'+home_score+'</p>');
}
else if(sport_id && sport_id != 1){
$("#p1_match_"+match_id+" .p1_li_match_middle_info").append(
'<p class="p1_li_match_middle_info_p1" style="letter-spacing:0;">'+status_text+'</p>'+
'<p class="p1_li_match_middle_info_p2" style="top:47px;font-size:0.4px;font-size:13px;">'+away_score+'&nbsp;-&nbsp;'+home_score+'</p>');
}
else{
$("#p1_match_"+match_id+" .p1_li_match_middle_info").append(
'<p class="p1_li_match_middle_info_p1 result">'+away_score+'-'+home_score+'</p>'+
'<p class="p1_li_match_middle_info_p2 text">'+status_text+'</p>');
}

if(home_score==="" && away_score===""){
$("#p1_match_"+match_id+" .p1_li_match_middle_info_p1").detach();
$("#p1_match_"+match_id+" .p1_li_match_middle_info_p2").css("font-size","12.5px").css("top","36px");
}

}

//====================================================================

if(live != 1){

if(!$("#p1_day_area .p1_ul_match[league_id='"+league_id+"'][live='"+live+"']").length){
$("#p1_day_area").append(
'<ul class="p1_ul_match" league_id="'+league_id+'" live="'+live+'" country_id="'+country_id+'" >'+
'<ol class="p1_ul_match_title button click_color">'+
'<img class="lazy lazy-fade-in" src="assets/img/app_logo.png" data-src="'+league_logo+'" />'+
'<p></p>'+
'</ol>'+
'</ul>'
);
}

if(!$("#p1_match_"+match_id).length){
$("#p1_day_area .p1_ul_match[league_id='"+league_id+"'][live='"+live+"']").append(
'<li id="p1_match_'+match_id+'" class="p1_li_match button click_color" live="'+live+'" date="'+date+'" >'+
'<div class="p1_li_match_team home">'+
'<img class="lazy lazy-fade-in" src="assets/img/app_logo.png" data-src="'+home_logo+'" />'+
'<p tid="'+home_id+'">'+home_name+'</p></div>'+
'<div class="p1_li_match_middle_info">'+
'<p class="p1_li_match_middle_info_p1"></p>'+
'</div>'+
'<div class="p1_li_match_team away">'+
'<img class="lazy lazy-fade-in" src="assets/img/app_logo.png" data-src="'+away_logo+'" />'+
'<p tid="'+away_id+'">'+away_name+'</p></div>'+
'</li>'
);
}

if(prm_date == today_date || prm_date == yesterday_date || prm_date == tomorrow_date){
if(localStorage.getItem("user-app_activation") != "full" || $("body").hasClass("app_in_review")){
if(app_suspended_arr){

if(app_suspended_arr["match_league"]){
if($.inArray(league_id,(app_suspended_arr["match_league"])) > -1){
$("#p1_match_"+match_id).addClass("force_remove_channel");
$("#p1_match_"+match_id).parents(".p1_ul_match").addClass("suspended");
}}

if(app_suspended_arr["match_team"]){
if($.inArray(home_id,(app_suspended_arr["match_team"])) > -1 || 
$.inArray(away_id,(app_suspended_arr["match_team"])) > -1){$("#p1_match_"+match_id).addClass("force_remove_channel");}}

}}}

if(win_description && win_description.length > 1){
$("#p1_match_"+match_id).append('<div class="p1_li_match_bottom_info">'+win_description+'</div>');}

if(status_group == 4 && home_score !== "" && away_score !== ""){
$("#p1_match_"+match_id+" .p1_li_match_middle_info_p1").text(home_score+' - '+away_score);
}
else if(status_group == 4 && (home_score === "" || away_score === "") ){
var msdate = new Date(date*1000);
var my_time = msdate.toLocaleString('en-US',{hour:'numeric',minute:'numeric',hour12:true});
if($("body").attr("app_dir") != "left"){var my_time = my_time.replace("AM","ص").replace("PM","م");}
$("#p1_match_"+match_id+" .p1_li_match_middle_info_p1").text(my_time).addClass("date");
if(!$("#p1_match_"+match_id+" .p1_li_match_middle_info_p2").length){$("#p1_match_"+match_id+" .p1_li_match_middle_info").prepend(
'<p class="p1_li_match_middle_info_p2" style="margin-bottom:-22px;">'+short_status_text+'</p>');}
}
else{
var msdate = new Date(date*1000);
var my_time = msdate.toLocaleString('en-US',{hour:'numeric',minute:'numeric',hour12:true});
if($("body").attr("app_dir") != "left"){var my_time = my_time.replace("AM","ص").replace("PM","م");}
$("#p1_match_"+match_id+" .p1_li_match_middle_info_p1").text(my_time).addClass("date");
}

}

$(".p1_ul_match[league_id='"+league_id+"'][live='"+live+"'] .p1_ul_match_title p").html(league_name+'<span>'+pround+'</span>');

if(sport_id && sport_id != 1){
$("#p1_day_area .p1_ul_match[league_id='"+league_id+"'][live='"+live+"']").attr("sport_id",sport_id);}

}
}

//========================================================

if($("body").attr("app_dir") == "left"){
for(var i = 0; i < data["countries"].length; i++){
var country_id = data["countries"][i].id;
var country_name = data["countries"][i].name;
$(".p1_ul_match[country_id='"+country_id+"']").each(function(){
var league_name = ($(this).find(".p1_ul_match_title p").text()).replace(country_name+" - ","");
$(this).find(".p1_ul_match_title p").text(country_name+" - "+league_name);
});
}
}

//==============================  after  =============================

after_get_matchs_table_p1fun(prm_fun);

}
});

$$(document).on('page:beforeout','.page[data-name="match_tab_page"]',function(e,page){p1_ajax_matchs_table.abort();});
$(".p1_date_header_arrow").click(function(){p1_ajax_matchs_table.abort();});
$(".calendar-day").not(".calendar-day-selected").click(function(){p1_ajax_matchs_table.abort();});

}

/*===============================  after_get_matchs_table_p1fun  ==============================*/

function after_get_matchs_table_p1fun(prm_fun){

add_channel_to_match_p1fun();
get_matchs_events_p1fun();
arrange_league_p1fun();

$("#p1_day_area .p1_ul_match").each(function(){
if(!$(this).find(".p1_li_match").length){$(this).detach();}
if($(this).find(".p1_li_match:not(.force_remove_channel)[channel!='']").length){$(this).addClass("with_channel");}
else{$(this).removeClass("with_channel");}
});

$("#p1_live_toggle input").removeAttr("disabled");

setTimeout(function(){$("img.lazy").each(function(index,element){app.lazy.loadImage(element);});
$("img.lazy-fade-in").each(function(){$(this).removeClass("lazy-fade-in");});},100);

$("#match_tab_page").removeClass("preloader_mode").removeClass("preloader_mode_limit");

if($("#match_tab_page").hasClass("live_mode")){
if(!$(".p1_ul_match:visible").length){$("#match_tab_page").addClass("note_mode1");}
else{$("#match_tab_page").removeClass("note_mode1");}
}

if(!$("#match_tab_page").hasClass("live_mode")){
if($(".p1_ul_match").length){$("#match_tab_page").removeClass("note_mode2");}
setTimeout(function(){
if(!$(".p1_ul_match").length && !$("#match_tab_page").hasClass("preloader_mode")){
$("#match_tab_page").addClass("note_mode2");
}
},700);
}

check_custom_native_ads_fun("match_tab_loaded",prm_fun);

}

/*===================================  arrange_league_p1fun  ==================================*/

function arrange_league_p1fun(){

var app_p1_arrange_league_arr = JSON.parse(localStorage.getItem("app-p1_arrange_league_arr"));
var user_country_id = localStorage.getItem("user-country_id");

//================================================

for(var i = 0; i < app_p1_arrange_league_arr.length; i++){
var target_league_id = app_p1_arrange_league_arr[i];
if($(".p1_ul_match[league_id='"+target_league_id+"']").length){
$(".p1_ul_match[league_id='"+target_league_id+"']").appendTo("#p1_day_area");
}}

//================================================

$(".p1_ul_match").each(function(){
var league_id = $(this).attr("league_id");
if($.inArray(league_id,app_p1_arrange_league_arr) < 0){$(this).appendTo("#p1_day_area");}
});

//================================================

if(user_country_id && $(".p1_ul_match:not(.suspended)[country_id='"+user_country_id+"']").length){
$(".p1_ul_match:not(.suspended)[country_id='"+user_country_id+"']").prependTo("#p1_day_area");
}

//================================================

for(var j=2; j <= 20; j++){
if($(".p1_ul_match[sport_id='"+j+"']").length){$(".p1_ul_match[sport_id='"+j+"']").prependTo("#p1_day_area");
}}

//================================================

if($(".p1_ul_match[live=1]").length){
$(".p1_ul_match").each(function(){if($(this).attr("live") != 1){$(this).appendTo("#p1_day_area");}});
}

}

/*================================  add_channel_to_match_p1fun  ===============================*/

function add_channel_to_match_p1fun(){

var match_table_arr = JSON.parse(localStorage.getItem("app-p1_match_table_arr"));
for(var i = 0; i < match_table_arr.length; i++){
var match_id = match_table_arr[i].match_id;
var channel = match_table_arr[i].channel;
$("#p1_match_"+match_id).attr("channel",channel);
}

//====================================================================

$(".p1_li_match").each(function(){

if($(this).hasClass("force_remove_channel")){return;}

var match_id = $(this).attr("id").replace("p1_match_","");
var sport_id = $(this).parents(".p1_ul_match").attr("sport_id");
var live = $(this).parents(".p1_ul_match").attr("live");
var channel = $(this).attr("channel");
var date = $(this).attr("date");
var current_utc = Math.trunc(new Date().getTime()/1000);
var sub_minutes = Math.trunc((date-current_utc)/60);

if(channel && live == 1){
if(!$("#p1_match_"+match_id+" .p1_li_match_middle_info .p1_li_match_middle_info_p3").length){
$("#p1_match_"+match_id+" .p1_li_match_middle_info").append(
'<p class="p1_li_match_middle_info_p3"><i class="ionicons-tv-outline p1_li_match_live_stream_i" pos="1"></i></p>');
$("#p1_match_"+match_id+" .p1_li_match_middle_info_p2").css("margin-top","-2px");
if(!$(this).find(".p1_gauge").length){
$("#p1_match_"+match_id+" .p1_li_match_middle_info_p1").css("margin-top","-13px");
$("#p1_match_"+match_id+" .p1_li_match_middle_info_p2").css("margin-top","-12px");
$("#p1_match_"+match_id+" .p1_li_match_middle_info_p3").css("margin-top","-2px");
}
}
else{
if($("body").attr("app_dir") == "left"){var side = "home";}else{var side = "away";}
$("#p1_match_"+match_id+" .p1_li_match_team."+side).append(
'<p class="p1_li_match_middle_info_p3"><i class="ionicons-tv-outline p1_li_match_live_stream_i" pos="1"></i></p>');
}
}

if(channel && live != 1 && sub_minutes > -30){
if(!$("#p1_match_"+match_id+" .p1_li_match_middle_info .p1_li_match_middle_info_p2").length){
$("#p1_match_"+match_id+" .p1_li_match_middle_info").prepend(
'<p class="p1_li_match_middle_info_p2 live">Live</p>');
}
}

});

}

/*=================================  get_matchs_events_p1fun  =================================*/

function get_matchs_events_p1fun(prm_fun){

$(".p1_li_match[live='1']").each(function(){

var el = $(this);
var match_id = el.attr("id").replace("p1_match_","");

if(!(el.find(".p1_li_match_middle_info .p1_gauge").length)){
$("#p1_match_"+match_id+" .p1_li_match_middle_info .micon").detach();
$("#p1_match_"+match_id+" .p1_li_match_middle_info .picon").detach();
$("#p1_match_"+match_id+" .p1_li_match_middle_info .rcicon").detach();
}

//====================================================================

if(el.find(".p1_li_match_middle_info .p1_gauge").length){

var user_language_id = localStorage.getItem("user-language_id");

var json_url = "https://webws.365scores.com/web/game/?langId="+user_language_id+"&timezoneName=UTC&gameId="+match_id;

var p1_ajax_matchs_events = $.ajax({url:json_url,dataType:"json",
success:function(data){

$("#p1_match_"+match_id+" .p1_li_match_middle_info .micon").detach();
$("#p1_match_"+match_id+" .p1_li_match_middle_info .picon").detach();
$("#p1_match_"+match_id+" .p1_li_match_middle_info .rcicon").detach();

if(data["game"]["events"]){
var last_event_id = "";var last_event_sub_id = "";var last_event_time = "";
for(var i = 0; i < data["game"]["events"].length; i++){

var event_id = data["game"]["events"][i]["eventType"]["id"];
var event_sub_id = data["game"]["events"][i]["eventType"]["subTypeId"];
var event_time = data["game"]["events"][i]["gameTime"];

if(event_id == 1 || event_id == 6 || event_id == 3){

if(last_event_id && last_event_sub_id && last_event_time){
var mm = Math.abs(event_time - last_event_time);
if(mm < 2 && event_id == last_event_id && event_sub_id == last_event_sub_id){var event_time = last_event_time+2.5;}
if(mm < 5 && (event_id != last_event_id || event_sub_id != last_event_sub_id)){var event_time = last_event_time+5;}
}
if(event_time < 0){var event_time = 0;}
if(event_time > 90){var max_gmin = 120;}else{var max_gmin = 90;}
var degree = (event_time/max_gmin)*360;
var posx = Math.round(36.5 * (Math.sin( degree*Math.PI/180 )));
var posy = Math.round(36.5 * (Math.cos( degree*Math.PI/180 )));
var postop = 42.3 - parseInt(posy);
var posleft = 34.2 + parseInt(posx);
if(event_id == 1 && event_sub_id == 1){
$("#p1_match_"+match_id+" .p1_li_match_middle_info").append(
'<span class="bgcircle micon" style="top:'+postop+'px;left:'+posleft+'px;--color:var(--blue_color2);--size:11px;">'+
'<i class="svg no-active-state" style="--src:url(../../assets/img/ball.svg);--color:#fff;"></i></span>');
}
else if(event_id == 1 && event_sub_id == 2){
$("#p1_match_"+match_id+" .p1_li_match_middle_info").append(
'<span class="bgcircle micon" style="top:'+postop+'px;left:'+posleft+'px;--color:var(--rose_color);--size:11px;">'+
'<i class="svg no-active-state" style="--src:url(../../assets/img/ball.svg);--color:#fff;"></i></span>');
}
else if(event_id == 1 && event_sub_id == 3){
$("#p1_match_"+match_id+" .p1_li_match_middle_info").append(
'<h1 class="picon" style="top:'+postop+'px;left:'+posleft+'px;">P</h1>');
}
else if(event_id == 6){
$("#p1_match_"+match_id+" .p1_li_match_middle_info").append(
'<h1 class="picon missed" style="top:'+postop+'px;left:'+posleft+'px;">P</h1>');
}
else if(event_id == 3){
$("#p1_match_"+match_id+" .p1_li_match_middle_info").append(
'<span class="rcicon" style="top:'+postop+'px;left:'+posleft+'px;"></span>');
}
last_event_id = event_id;last_event_sub_id = event_sub_id;last_event_time = event_time;
}
}}

}
});
}

});
}

/*===================================  match_li_click_p1fun  ==================================*/

function match_li_click_p1fun(){
$(document).on("click",".p1_li_match",function(){

$(".p1_li_match").removeClass("active");
$(this).addClass("active");


var match_id = $(this).attr("id").replace("p1_match_","");
var channel = $(this).attr("channel");
var date = $(this).attr("date");

var team_id = $(this).find(".p1_li_match_team.home p").attr("tid")+"|"+$(this).find(".p1_li_match_team.away p").attr("tid");
var team_name = $(this).find(".p1_li_match_team.home p").text()+"|"+$(this).find(".p1_li_match_team.away p").text();
var team = team_id+"|"+team_name;

app.views.current.router.navigate({ name:"match_details_page",query:{match_id:match_id,channel:channel,team:team,date:date,previous_page:"match_tab_page"} });

});
}

/*==================================  live_toggle_click_p1fun  ================================*/

function live_toggle_click_p1fun(){

$("#p1_live_toggle input").change(function(){

if($("#match_tab_page").hasClass("note_mode2")){$("#p1_live_toggle input").prop("disabled",true).prop("checked",false);}
else{$("#p1_live_toggle input").prop("disabled",false);}

if($("#p1_live_toggle input").prop("checked") == true){
$("#match_tab_page").addClass("live_mode");
$("#match_tab_page .page-content").scrollTop(0);
if(!$(".p1_ul_match:visible").length){$("#match_tab_page").addClass("note_mode1");}
else{$("#match_tab_page").removeClass("note_mode1");}
}
if($("#p1_live_toggle input").prop("checked") == false){
$("#match_tab_page").removeClass("live_mode");
$("#match_tab_page").removeClass("note_mode1");
}

});

//====================================================================

$("#p1_note_but1").click(function(){$("#p1_live_toggle").click();});

}

/*===================================  create_calendar_p1fun  =================================*/

function create_calendar_p1fun(){

$("#p1_date_header_middle").click(function(){setTimeout(function(){$("#p1_open_calendar_but").click();},200);});

var translate_arr = JSON.parse(localStorage.getItem("app-translate_arr"));
var user_language = localStorage.getItem("user-language");
var day_names = JSON.parse(translate_arr["60"][user_language]);
var month_names = JSON.parse(translate_arr["61"][user_language]);

var calendar = app.calendar.create({
inputEl:"#p1_open_calendar_but,#p1_note_but2",
cssClass:"p1_calendar",
dateFormat:"dd.mm.yyyy",
monthNames:month_names,
dayNamesShort:day_names,
openIn:'customModal',
firstDay:6,
locale:"en",
header:false,
footer:false,
backdrop:true,
closeByBackdropClick:false,
closeByOutsideClick:false,
closeOnSelect:true,
monthPicker:false,
yearPicker:false,
scrollToInput:false,
touchMove:true,
animate:true,
on:{
init:function(){
$("#p1_note_but2").attr("calendar","yes");
},
opened:function(){
calendar.setValue([($("#p1_day_area").attr("date"))]);
$(".p1_calendar").append('<a onclick="app.calendar.close()" class="p1_close_calendar_but link ripple-inset">'+
'<i class="ionicons-close-outline"></i></a>');
},
close:function(calendar){
if(calendar.value){
var msdate = new Date(calendar.value).getTime();
var syear = new Date(msdate).getFullYear();
var smonth = String(new Date(msdate).getMonth()+1).padStart(2,'0');
var sday = String(new Date(msdate).getDate()).padStart(2,'0');
var selected_date = syear+"-"+smonth+"-"+sday;
if(selected_date != $("#p1_day_area").attr("date")){
$("#match_tab_page").addClass("preloader_mode");
$(".p1_ul_match").detach();
get_matchs_ids_p1fun(selected_date);
}}
},
}
});
}

/*===============================  date_arrow_buts_click_p1fun  ===============================*/

function date_arrow_buts_click_p1fun(){
$(".p1_date_header_arrow").click(function(){
var current_date = $("#p1_day_area").attr("date");
var type = $(this).attr("type");
if($("body").attr("app_dir") == "left"){if(type=="previous"){var type="next";}else if(type=="next"){var type = "previous";}}
if(type == "previous"){
var target_date = new Date(((new Date(current_date+"T00:00:00").getTime())-(24*60*60*1000))).toLocaleDateString('en-us',
{year:'numeric',month:'2-digit',day:'2-digit'}).replace(/(\d+)\/(\d+)\/(\d+)/,'$3-$1-$2');
}
if(type == "next"){
var target_date = new Date(((new Date(current_date+"T00:00:00").getTime())+(24*60*60*1000))).toLocaleDateString('en-us',
{year:'numeric',month:'2-digit',day:'2-digit'}).replace(/(\d+)\/(\d+)\/(\d+)/,'$3-$1-$2');
}
if(target_date){
$("#match_tab_page").addClass("preloader_mode");
$(".p1_ul_match").detach();
get_matchs_ids_p1fun(target_date);
}

});
}

/*====================================  table_swipe_p1fun  ====================================*/

function table_swipe_p1fun(){
$("#match_tab_page .swiper-container").swipe({swipe:function(event,direction){
if(direction == "left"){ $(".p1_date_header_arrow[type='previous']").click(); }
if(direction == "right"){ $(".p1_date_header_arrow[type='next']").click(); }},threshold:90,
allowPageScroll:"vertical"});
}







