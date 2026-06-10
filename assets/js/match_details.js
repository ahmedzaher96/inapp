

/*=============================================================================================*/
/*------------------------------------  match_details_page  -----------------------------------*/
/*=============================================================================================*/

$$(document).once('page:init','.page[data-name="match_details_page"]',function(e,page){

scroll_between_tabs_p2fun();

document.addEventListener("resume",function(){
if(app.views.current.router.currentRoute.name == "match_details_page"){reload_matchs_info_p2fun();} },false);

});

//================================================

$$(document).on('page:reinit','.page[data-name="match_details_page"]',function(e,page){

if(app.views.current.router.currentRoute.name == "match_details_page"){
reload_matchs_info_p2fun();
interval_reload_info_p2fun();
}

});

//================================================

$$(document).on('page:init','.page[data-name="match_details_page"]',function(e,page){

if(app.views.current.router.currentRoute.name == "match_details_page" ||
(app.views.current.router.currentRoute.name=="channel_details_page" && $("#match_details_page").hasClass("preloader_mode"))){

if(page.route.query["channel"]){$("#match_details_page").attr("channel",page.route.query["channel"]);}

if(page.route.query["tab"]){localStorage.setItem("p2_start_tab",page.route.query["tab"]);}
else{localStorage.removeItem("p2_start_tab");}

if(!page.route.query["match_id"]){
setTimeout(function(){app.views.current.router.navigate({name:"match_tab_page"});},1);
setTimeout(function(){app.views.current.router.navigate({name:"match_tab_page"});},1000);
}

if(page.route.query["match_id"]){
	
$("#match_details_page").attr("match_id",page.route.query["match_id"]);

get_match_channel_p2fun();

get_match_info_p2fun();

setTimeout(function(){
if(app.views.current.router.currentRoute.name=="match_details_page" && $("#match_details_page").hasClass("preloader_mode")){
preloader_mode_limit_p2fun();
} },4000);

}

interval_reload_info_p2fun();
tab_link_highlight_2();
subnavbar_click_p2fun();
landscape_mode_p2fun();
segmented_buts_click_p2fun();
scroll_event_p2fun();
share_but_click_p2fun();
open_channel_popup_p2fun();

} 
});

/*================================  interval_reload_info_p2fun  ===============================*/

function interval_reload_info_p2fun(){

var interval_reload_table = setInterval(function(){
if(app.views.current.router.currentRoute.name == "match_details_page"){reload_matchs_info_p2fun();}
},60*1000);

$$(document).on('page:beforeout','.page[data-name="match_tab_page"]',function(e,page){
clearInterval(interval_reload_table);
});

}

/*=================================  reload_matchs_info_p2fun  ================================*/

function reload_matchs_info_p2fun(){

if(app.views.current.router.currentRoute.name=="match_details_page" && !$("#match_details_page").hasClass("preloader_mode")){

get_match_info_p2fun("reload");

}

}

/*================================  preloader_mode_limit_p2fun  ===============================*/

function preloader_mode_limit_p2fun(){

$("#match_details_page").addClass("preloader_mode_limit");

if(!$(".p1_li_match.active").length){return;}

var date = $(".p1_li_match.active").attr("date");
var league_name = $(".p1_li_match.active").parents(".p1_ul_match").find(".p1_ul_match_title p").text();
var home_id = $(".p1_li_match.active").find(".p1_li_match_team.home p").attr("tid");
var away_id = $(".p1_li_match.active").find(".p1_li_match_team.away p").attr("tid");
var home_name = $(".p1_li_match.active").find(".p1_li_match_team.home p").text();
var away_name = $(".p1_li_match.active").find(".p1_li_match_team.away p").text();
var part_team_logo = "https://imagecache.365scores.com/image/upload/f_png,w_160,h_160,c_limit,q_auto:eco,d_Competitors:default1.png/Competitors/";
var home_logo = part_team_logo+home_id;
var away_logo = part_team_logo+away_id;

var minute_timer = Math.trunc(((new Date(date*1000).getTime())-(new Date().getTime()))/(60*1000));
$("#match_details_page").attr("minute_timer",minute_timer);

channel_popup_show_or_hide_p2fun();

$(".p2_navbar_team.home p").text(home_name);
$(".p2_navbar_team.away p").text(away_name);

if(!$(".p2_navbar_team img").length){
$(".p2_navbar_team.home").append('<img src="'+home_logo+'" />');
$(".p2_navbar_team.away").append('<img src="'+away_logo+'" />');
$(".p2_navbar_team.home img").prependTo(".p2_navbar_team.home");$(".p2_navbar_team.away img").prependTo(".p2_navbar_team.away");
}

$("#p2_navbar_league p:eq(0)").text(league_name).css("padding","7px 0");;


if($(".p1_li_match.active").attr("live") == 1){
var info_p1 = $(".p1_li_match.active").find(".p1_li_match_middle_info_p1").text();
var info_p2 = $(".p1_li_match.active").find(".p1_li_match_middle_info_p2").text();
if(!$("#p2_navbar_info_p1").length){$("#p2_navbar_info").append('<p class="minute" id="p2_navbar_info_p1">'+info_p1+'</p>');}
if(!$("#p2_navbar_info_p2").length){$("#p2_navbar_info").append('<p class="result" id="p2_navbar_info_p2" style="letter-spacing:4.5px;margin-right:-3px;">'+info_p2+'</p>');}
}
else{

var info_p = $(".p1_li_match.active").find(".p1_li_match_middle_info_p1.date").text();
if(!$("#p2_navbar_info_p2").length){$("#p2_navbar_info").append('<p id="p2_navbar_info_p2" style="margin-top:5px;font-size:14px;">'+info_p+'</p>');}

}


}

/*=================================  get_match_channel_p2fun  =================================*/

function get_match_channel_p2fun(){

if($("#match_details_page").attr("channel")){add_channel_buts_p2fun();}

else if(!$("#match_details_page").attr("channel") && !$(".p1_li_match.active").length){
var match_id = $("#match_details_page").attr("match_id");
var json_url = "https://mydb.sportmatchs.com/scores365_match/get_match.php?match_id="+match_id;
var p2_ajax_channel = $.ajax({url:json_url,dataType:"json",
complete:function(){add_channel_buts_p2fun();},
success:function(data){$("#match_details_page").attr("channel",data[0].channel);}
});
}

}

/*==================================  add_channel_buts_p2fun  =================================*/

function add_channel_buts_p2fun(){

var media_domain = localStorage.getItem("app-media_domain");
var channel = $("#match_details_page").attr("channel");

if(channel){
var channel_arr = JSON.parse(channel);
for(var k = 0; k < channel_arr.length; k++){
var channel_id = channel_arr[k]["id"];
var channel_name = channel_arr[k]["name"];
if(!$("#p2_channel_area span .button[channel_id='"+channel_id+"']").length){
$("#p2_channel_area span").append(
'<button class="button blue_click p2_channel_area_logo_but" channel_id="'+channel_id+'" >'+
'<p>'+channel_name+'</p>'+
'<img src="'+media_domain+'/channel/'+channel_id+'.jpg" />'+
'</button>');
}
//================================================
$("#p2_channel_area span .button").click(function(){
if(!$(this).hasClass("active")){var el = $(this);$(el).addClass("active");
setTimeout(function(){$(el).removeClass("active");},1500);}
});
//================================================
}
}

if($("#p2_channel_area .p2_channel_area_logo_but").length){$("#p2_channel_area").removeClass("hidden");}
else{$("#p2_channel_area").addClass("hidden");}

}

/*===================================  get_match_info_p2fun  ==================================*/

function get_match_info_p2fun(prm_fun){

if(app.views.current.router.currentRoute.name != "match_details_page" && 
app.views.current.router.currentRoute.name != "channel_details_page"){return;}

var match_id = $("#match_details_page").attr("match_id");

var timezone = (new Date().getTimezoneOffset())/-60;
var user_language = localStorage.getItem("user-language");
var user_language_id = localStorage.getItem("user-language_id");
var translate_arr = JSON.parse(localStorage.getItem("app-translate_arr"));
var app_suspended_arr = JSON.parse(localStorage.getItem("app-suspended_arr"));

var json_url = "https://webws.365scores.com/web/game/?langId="+user_language_id+"&timezoneName=UTC&gameId="+match_id;

//alert(json_url);

var p2_ajax_details = $.ajax({url:json_url,dataType:"json",
success:function(data){

var match_id = data["game"].id;
var sport_id = data["game"].sportId;

if(match_id != $("#match_details_page").attr("match_id")){return;}

var status_group = data["game"].statusGroup;
if(status_group == 3){var live = 1;}else{var live = 0;}

var status_text = data["game"].statusText;
var short_status_text = data["game"].shortStatusText;
var status_display_type = data["game"].gameTimeAndStatusDisplayType;

var start_time = data["game"].startTime;
var date = (new Date(start_time).getTime())/1000;

var win_description = data["game"].winDescription;
if(win_description){
if(user_language == "ar" && win_description.includes("-") == true){
var wdn1 = (win_description.split('-')[0]).replace(/[^0-9]/gi,"");
var wdn2 = (win_description.split('-')[1]).replace(/[^0-9]/gi,"");
var win_description= win_description.replace(wdn1+"-"+wdn2,wdn2+"-"+wdn1);
}
if(win_description.includes("فازت") == true){var win_description = "فوز " + (win_description.replace("فازت ",""));}
}

var real_minute = (data["game"].gameTime)*1;
var text_minute = data["game"].gameTimeDisplay;
if(text_minute && text_minute.includes("+") == true){var gmin = (text_minute.split('+')[0])*1;}else{var gmin = real_minute;}

if(real_minute >= 100){$("#match_details_page").attr("extra_time",1);}

if(!sport_id || (sport_id && sport_id != 1)){var text_minute = "";var gmin = "";var real_minute = "";}

var round = "";
var round_num = data["game"].roundNum;
var round_name = data["game"].roundName;
var group_name = data["game"].groupName;

if(round_name || round_num){var round = round_name+" "+round_num;if(group_name){var round = group_name+" - "+round;}}
else if(group_name){var round = group_name}

if(data["game"]["officials"]){var referee = data["game"]["officials"][0].name;}else{var referee = "";}

if(data["game"]["venue"]){
var stadium_name = data["game"]["venue"].name;
var stadium_attendance = "";
if(data["game"]["venue"].attendance){var stadium_attendance = data["game"]["venue"].attendance;}
else if(data["game"]["venue"].capacity){var stadium_attendance = data["game"]["venue"].capacity;}
}

var league_id = data["game"].competitionId;
var league_name = ((data["game"].competitionDisplayName).split("-")[0]).split(", ")[1];
var n_league_name = (data["game"].competitionDisplayName).split(", ")[0];
if(n_league_name){var n_league_name = n_league_name+" - ";}

var league_logo = "https://imagecache.365scores.com/image/upload/f_png,w_160,h_160,c_limit,q_auto:eco,d_Countries:default1.png/Competitions/light/"+league_id;

if(data["competitions"]){for(var g = 0; g < data["competitions"].length; g++){
if(data["competitions"][g]["id"] == league_id){var league_country_id = data["competitions"][g]["countryId"];
var league_logo = league_logo.replace("default1.png","Round:"+league_country_id+".png");
if(league_name.length <= 5){var league_name = data["competitions"][g]["name"];}break;}}}

var home_id = data["game"]["homeCompetitor"].id;
var away_id = data["game"]["awayCompetitor"].id;
var home_name = data["game"]["homeCompetitor"].name;
var away_name = data["game"]["awayCompetitor"].name;
var home_score = data["game"]["homeCompetitor"].score;if(home_score == "-1"){var home_score = "";}
var away_score = data["game"]["awayCompetitor"].score;if(away_score == "-1"){var away_score = "";}
var part_team_logo = "https://imagecache.365scores.com/image/upload/f_png,w_160,h_160,c_limit,q_auto:eco,d_Competitors:default1.png/Competitors/";
var home_logo = part_team_logo+home_id;
var away_logo = part_team_logo+away_id;

var league_name = check_changed_names_fun(league_id,league_name,"league");
var home_name = check_changed_names_fun(home_id,home_name,"team");
var away_name = check_changed_names_fun(away_id,away_name,"team");

var half_home_score = "";var half_away_score = "";
var full_home_score = "";var full_away_score = "";
var penalty_home_score = "";var penalty_away_score = "";

if(data["game"]["stages"]){for(var k = 0; k < data["game"]["stages"].length; k++){
var stages_home_score = data["game"]["stages"][k].homeCompetitorScore;
var stages_away_score = data["game"]["stages"][k].awayCompetitorScore;
if(data["game"]["stages"][k].id == 7){
var half_home_score = stages_home_score;var half_away_score = stages_away_score;}
else if(data["game"]["stages"][k].id == 9){
var full_home_score = stages_home_score;var full_away_score = stages_away_score;}
else if(data["game"]["stages"][k].id == 11){
var penalty_home_score = stages_home_score;var penalty_away_score = stages_away_score;}
}}

var player_arr = {};
if(data["game"]["members"]){
for(var k = 0; k < data["game"]["members"].length; k++){
var members_player_id = data["game"]["members"][k].id;
var members_athlete_id = data["game"]["members"][k].athleteId;
var members_name = data["game"]["members"][k].name;
var members_short_name = data["game"]["members"][k].shortName;
var members_number = data["game"]["members"][k].jerseyNumber;
player_arr[members_player_id] = {athlete_id:members_athlete_id,name:members_name,short_name:members_short_name,number:members_number};
}}

if(data["game"]["events"]){var events = data["game"]["events"];}else{var events = "";}

$("#match_details_page").attr("live",live);

//====================================================================

if(localStorage.getItem("user-app_activation") != "full" || $("body").hasClass("app_in_review")){
if(app_suspended_arr){

if(app_suspended_arr["match_league"]){
if($.inArray(league_id,(app_suspended_arr["match_league"])) > -1){$("#match_details_page").addClass("suspended");}
}

if(app_suspended_arr["match_team"]){
if($.inArray(home_id,(app_suspended_arr["match_team"])) > -1 || 
$.inArray(away_id,(app_suspended_arr["match_team"])) > -1){$("#match_details_page").addClass("suspended");}
}

}}

//====================================================================

$("#p2_navbar_info_p2").detach();

if(prm_fun == "reload"){

//$("#p2_navbar_info p").not("#p2_navbar_info_p1").not("#p2_navbar_info_p3").detach();
$(".p2_t1div1_event_div").detach();
$(".p2_t2div1_lineup_player").detach();
$(".p2_t3div1_gauge_area").detach();
$(".p2_t3div1_statistics_area").detach();

}

//====================================================================

if(date){
var minute_timer = Math.trunc(((new Date(date*1000).getTime())-(new Date().getTime()))/(60*1000));
$("#match_details_page").attr("minute_timer",minute_timer);
if(minute_timer >= 0 && minute_timer <= 15){$("#match_details_page").removeClass("suspended");}
}

$(".p2_navbar_team.home").attr("team_id",home_id);
$(".p2_navbar_team.away").attr("team_id",away_id);

$(".p2_navbar_team.home p").text(home_name);
$(".p2_navbar_team.away p").text(away_name);

if(!$(".p2_navbar_team img").length){
$(".p2_navbar_team.home").append('<img class="lazy" src="assets/img/app_logo.png" data-src="'+home_logo+'" />');
$(".p2_navbar_team.away").append('<img class="lazy" src="assets/img/app_logo.png" data-src="'+away_logo+'" />');
$(".p2_navbar_team.home img").prependTo(".p2_navbar_team.home");$(".p2_navbar_team.away img").prependTo(".p2_navbar_team.away");
}

$("#p2_t2div1_lineup_segmented .button.home img").attr("src",home_logo);
$("#p2_t2div1_lineup_segmented .button.away img").attr("src",away_logo);

$("#p2_navbar_league").attr("league_id",league_id);
$("#p2_navbar_league p:eq(0)").text(n_league_name+league_name).css("padding","0");
$("#p2_navbar_league p:eq(1)").text(round);
if(!round){$("#p2_navbar_league p:eq(0)").css("padding","7px 0");}

//====================================================================

if(!$("#p2_t1div4 .p2_t1div4_divs").length){

var nyear = new Date(date*1000).getFullYear();var nnyear = new Date().getFullYear();
var nmonth = new Date(date*1000).getMonth()+1;var nnmonth = new Date().getMonth()+1;
var nday = new Date(date*1000).getDate();var nnday = new Date().getDate();
if(nyear==nnyear && nmonth==nnmonth && nday==nnday){var nnweekday = translate_arr["56"][user_language];}
else if(nyear==nnyear && nmonth==nnmonth && nday==(nnday*1)-1){var nnweekday = translate_arr["57"][user_language];}
else if(nyear==nnyear && nmonth==nnmonth && nday==(nnday*1)+1){var nnweekday = translate_arr["58"][user_language];}
else{
var dnum = (new Date(date*1000)).getDay();
var nnweekday_arr = JSON.parse(translate_arr["59"][user_language]);
var nnweekday = nnweekday_arr[dnum];
}

var mnum = (new Date(date*1000)).getMonth();
var nnmonth_arr = JSON.parse(translate_arr["61"][user_language]);
var month_name = nnmonth_arr[mnum];

$("#p2_t1div4").append('<div class="p2_t1div4_divs" type="date"><i class="ionicons-calendar-clear-outline" day="'+nday+'"></i>'+
'<p>'+nnweekday+' - '+nday+' '+month_name+' '+nyear+'</p></div>');

var msdate = new Date(date*1000);
var my_time = msdate.toLocaleString('en-US',{hour:'numeric',minute:'numeric',hour12:true});
if($("body").attr("app_dir") != "left"){var my_time = my_time.replace("AM","ص").replace("PM","م");}
var p2_t1div4_text_1 = translate_arr["64"][user_language];
$("#p2_t1div4").append('<div class="p2_t1div4_divs" type="time"><i class="ionicons-time-outline"></i>'+
'<p>'+(p2_t1div4_text_1.replace("xxxxx",my_time))+'</p></div>');

if(league_name){
if($("body").attr("app_dir") == "left"){var league_name = n_league_name+league_name;}
if(round){var text_league = league_name+" - "+round;}
else{var text_league = league_name;}
$("#p2_t1div4").append('<div class="p2_t1div4_divs" type="league"><i class="ionicons-trophy-outline"></i>'+
'<p>'+text_league+'</p></div>');
}

if(stadium_name){
var p2_t1div4_text_2 = translate_arr["65"][user_language];
if(stadium_attendance){var stadium_attendance = " - "+stadium_attendance+" "+p2_t1div4_text_2;}
$("#p2_t1div4").append('<div class="p2_t1div4_divs" type="stadium" >'+
'<i class="svg" style="--src:url(../../assets/img/stadium.svg);"></i>'+
'<p><span>'+stadium_name+'</span><span>'+stadium_attendance+'</span></p></div>');
}
/*
if(referee){
$("#p2_t1div4").append('<div class="p2_t1div4_divs" type="referee">'+
'<i class="svg" style="--src:url(../../assets/img/whistle3.svg);"></i>'+
'<p>'+referee+'</p></div>');
}
*/
if($(".p2_t1div4_divs").length){$("#p2_t1div4").addClass("show");}

}

//====================================================================

var navbar_percent = $(".p2_navbar_team img").css("--percent");

if(live==1 && text_minute && gmin!=45 || (gmin==45 && short_status_text==1)){
if(!$("#p2_navbar_info_p1").length){
$("#p2_navbar_info").append('<p class="minute" id="p2_navbar_info_p1">'+text_minute+'</p>');}
else{$("#p2_navbar_info_p1").text(text_minute);}
}

if(live==0 && (home_score==="" || away_score==="")){
var nyear = new Date(date*1000).getFullYear();var nnyear = new Date().getFullYear();
var nmonth = new Date(date*1000).getMonth()+1;var nnmonth = new Date().getMonth()+1;
var nday = new Date(date*1000).getDate();var nnday = new Date().getDate();
if(nyear==nnyear && nmonth==nnmonth && nday==nnday){var nnweekday = translate_arr["56"][user_language];}
else if(nyear==nnyear && nmonth==nnmonth && nday==(nnday*1)-1){var nnweekday = translate_arr["57"][user_language];}
else if(nyear==nnyear && nmonth==nnmonth && nday==(nnday*1)+1){var nnweekday = translate_arr["58"][user_language];}
else{
var dnum = (new Date(date*1000)).getDay();
var nnweekday_arr = JSON.parse(translate_arr["59"][user_language]);
var nnweekday = nnweekday_arr[dnum];
}

if(!$("#p2_navbar_info_p1").length){
$("#p2_navbar_info").append('<p id="p2_navbar_info_p1">'+nmonth+'/'+nday+' , '+nnweekday+'</p>');}
else{$("#p2_navbar_info_p1").text(nmonth+'/'+nday+' , '+nnweekday);}

}

if(home_score!=="" && away_score!==""){
if(penalty_home_score!=="" && penalty_home_score){
$("#p2_navbar_info").append('<p class="result" id="p2_navbar_info_p2" style="--percent:'+navbar_percent+'" >'+
'('+penalty_away_score+')  '+away_score+'  -  '+home_score+'  ('+penalty_home_score+')</p>');}
else{$("#p2_navbar_info").append('<p class="result" id="p2_navbar_info_p2" style="--percent:'+navbar_percent+'" >'+
away_score+'   -   '+home_score+'</p>');}
}
else{
var msdate = new Date(date*1000);
var my_time = msdate.toLocaleString('en-US',{hour:'numeric',minute:'numeric',hour12:true});
if($("body").attr("app_dir") != "left"){var my_time = my_time.replace("AM","ص").replace("PM","م");}
$("#p2_navbar_info").append('<p id="p2_navbar_info_p2" style="--percent:'+navbar_percent+'" >'+my_time+'</p>');
}

if(status_text == "شوط"){var status_text = "إستراحة";}

if(!$("#p2_navbar_info_p3").length){$("#p2_navbar_info").append('<p id="p2_navbar_info_p3">'+status_text+'</p>');}
else{$("#p2_navbar_info_p3").text(status_text);}
$("#p2_navbar_info_p3").appendTo("#p2_navbar_info");

//====================================================================

if(events && events.length && Object.entries(player_arr).length){

var lineup_statistics_arr = {};
lineup_statistics_arr['goal'] = [];
lineup_statistics_arr['own_goal'] = [];
lineup_statistics_arr['red_card'] = [];
lineup_statistics_arr['yellow_card'] = [];
lineup_statistics_arr['substitute'] = [];

$(".p2_t1div1_event_area").append('<div class="p2_t1div1_event_div icon stopwatch_icon">'+
'<i class="svg no-active-state" style="--src:url(../../assets/img/stopwatch.svg);"></i></div>');

for(var k = 0; k < events.length; k++){

var ev_time = data["game"]["events"][k]["gameTime"];
var ev_team_id = data["game"]["events"][k]["competitorId"];
if(ev_team_id == home_id){var ev_side = "home";}else if(ev_team_id == away_id){var ev_side = "away";}
var ev_id = data["game"]["events"][k]["eventType"]["id"];
var ev_name = data["game"]["events"][k]["eventType"]["name"];
var ev_sub_id = data["game"]["events"][k]["eventType"]["subTypeId"];
var ev_sub_name = data["game"]["events"][k]["eventType"]["subTypesubTypeName"];

var ev_player_id = data["game"]["events"][k]["playerId"];
if(!player_arr[ev_player_id]){continue;}
var ev_player_name = player_arr[ev_player_id]["name"];
if(data["game"]["events"][k]["extraPlayers"]){
var ev_assist_id = data["game"]["events"][k]["extraPlayers"][0];
if(!player_arr[ev_assist_id]){continue;}
var ev_assist_name = player_arr[ev_assist_id]["name"];}
else{var ev_assist_id = "";var ev_assist_name = "";}

var ev_type = "";
if(ev_id == 1000){var ev_type = "subst";}
else if(ev_id == 2){var ev_type = "yellow_card";}
else if(ev_id == 3 && ev_sub_id != 21){var ev_type = "red_card";}
else if(ev_id == 3 && ev_sub_id == 21){var ev_type = "red_card_2yellow";}
else if(ev_id == 1 && ev_sub_id != 2 && ev_sub_id != 3){var ev_type = "goal";}
else if(ev_id == 1 && ev_sub_id == 2){var ev_type = "own_goal";}
else if(ev_id == 1 && ev_sub_id == 3){var ev_type = "penalty_goal";}
else if(ev_id == 6){var ev_type = "penalty_missed";}
else if(ev_id == 11 && ev_sub_id == 25){var ev_type = "var";}
else if(ev_id == 11 && ev_sub_id != 25){var ev_type = "offside";}
else if(ev_id == 12){var ev_type = "woodwork";}

var append_player_name="";
if(ev_player_name && ev_assist_name){
var append_player_name = '<p><span>'+ev_player_name+'</span></br><span>'+ev_assist_name+'</span></p>';}
else if(ev_player_name && !ev_assist_name){var append_player_name = '<p><span>'+ev_player_name+'</span></p>';}

if(ev_type == "subst" && (!ev_player_name || !ev_assist_name)){var append_player_name="";}

if(ev_player_name && (ev_type == "var" || ev_type == "offside")){
var append_player_name = '<p><span>'+ev_player_name+'</span></br><span>'+ev_name+'</span></p>';}

if(ev_type=="subst" || ev_type=="yellow_card" || ev_type=="var" || ev_type=="woodwork"){var importance="all";}
else{var importance="main";}

if(ev_time > 45 && half_home_score!=="" && half_away_score!=="" && !$(".p2_t1div1_event_div.break[type='half']").length){
$(".p2_t1div1_event_area").append('<div class="p2_t1div1_event_div p2_player_statistics_but break" type="half" '+
'result="'+half_home_score+' - '+half_away_score+'"><h2>'+(translate_arr["66"][user_language])+'</h2></div>');}
if(ev_time > 90 && full_home_score!=="" && full_away_score!=="" && !$(".p2_t1div1_event_div.break[type='full']").length){
$(".p2_t1div1_event_area").append('<div class="p2_t1div1_event_div p2_player_statistics_but break" type="full" '+
'result="'+full_home_score+' - '+full_away_score+'"><h2>'+(translate_arr["67"][user_language])+'</h2></div>');}

if(append_player_name){

if(ev_type == "var"){
$(".p2_t1div1_event_area").append('<div class="p2_t1div1_event_div p2_player_statistics_but var '+ev_side+'" '+
'player_id="'+ev_player_id+'" minute="'+ev_time+'" importance="'+importance+'" > '+
'<i class="ionicons-tv-outline"></i>'+
append_player_name+
'</div>');
}
if(ev_type == "offside"){
$(".p2_t1div1_event_area").append('<div class="p2_t1div1_event_div p2_player_statistics_but offside '+ev_side+'" '+
'player_id="'+ev_player_id+'" minute="'+ev_time+'" importance="'+importance+'" > '+
'<img src="assets/img/ev_offside.png" />'+
append_player_name+
'</div>');
}
if(ev_type == "woodwork"){
$(".p2_t1div1_event_area").append('<div class="p2_t1div1_event_div p2_player_statistics_but woodwork '+ev_side+'" '+
'player_id="'+ev_player_id+'" minute="'+ev_time+'" importance="'+importance+'" > '+
'<img src="assets/img/ev_woodwork.png" />'+
append_player_name+
'</div>');
}
if(ev_type == "subst"){
if($.inArray(ev_player_id,lineup_statistics_arr['substitute']) < 0){lineup_statistics_arr['substitute'].push(ev_assist_id);}
$(".p2_t1div1_event_area").append('<div class="p2_t1div1_event_div p2_player_statistics_but substitution '+ev_side+'" '+
'player_id="'+ev_player_id+'" assist_id="'+ev_assist_id+'" minute="'+ev_time+'" importance="'+importance+'"> '+
'<img src="assets/img/ev_substitution.png" />'+
append_player_name+
'</div>');
}
if(ev_type == "yellow_card"){
if($.inArray(ev_player_id,lineup_statistics_arr['yellow_card']) < 0){lineup_statistics_arr['yellow_card'].push(ev_player_id);}
$(".p2_t1div1_event_area").append('<div class="p2_t1div1_event_div p2_player_statistics_but ycard '+ev_side+'" '+
'player_id="'+ev_player_id+'" minute="'+ev_time+'" importance="'+importance+'" >'+
'<img src="assets/img/ev_yellow_card.png" />'+
append_player_name+
'</div>');
}
if(ev_type == "red_card" || ev_type == "red_card_2yellow"){
if($.inArray(ev_player_id,lineup_statistics_arr['red_card']) < 0){lineup_statistics_arr['red_card'].push(ev_player_id);}
if(ev_type == "red_card_2yellow"){var clogo = "ev_red_card2";}else{var clogo = "ev_red_card";}
$(".p2_t1div1_event_area").append('<div class="p2_t1div1_event_div p2_player_statistics_but rcard '+ev_side+'" '+
'player_id="'+ev_player_id+'" minute="'+ev_time+'" importance="'+importance+'" >'+
'<img src="assets/img/'+clogo+'.png" />'+
append_player_name+
'</div>');
}
if(ev_type == "goal" || ev_type == "own_goal"){
if(ev_type == "goal"){var gcolor = "mode_wob_color";
if($.inArray(ev_player_id,lineup_statistics_arr['goal']) < 0){lineup_statistics_arr['goal'].push(ev_player_id);} }
if(ev_type == "own_goal"){var gcolor = "rose_color";
if($.inArray(ev_player_id,lineup_statistics_arr['own_goal']) < 0){lineup_statistics_arr['own_goal'].push(ev_player_id);} }
$(".p2_t1div1_event_area").append('<div class="p2_t1div1_event_div p2_player_statistics_but goal '+ev_side+'" '+
'player_id="'+ev_player_id+'" assist_id="'+ev_assist_id+'"minute="'+ev_time+'" importance="'+importance+'" >'+
'<i class="svg no-active-state" style="--src:url(../../assets/img/ball.svg);--color:var(--'+gcolor+');"></i>'+
append_player_name+
'</div>');
}
if(ev_type == "penalty_goal" || ev_type == "penalty_missed"){
var pclass = "";
if(ev_type == "penalty_missed"){var pclass = "missed";}
else{if($.inArray(ev_player_id,lineup_statistics_arr['goal']) < 0){lineup_statistics_arr['goal'].push(ev_player_id);} }
$(".p2_t1div1_event_area").append('<div class="p2_t1div1_event_div p2_player_statistics_but penalty '+pclass+' '+ev_side+'" '+
'player_id="'+ev_player_id+'" minute="'+ev_time+'" importance="'+importance+'" >'+
'<h1>p</h1>'+
append_player_name+
'</div>');
}
}

}

var all_events_len  = ($(".p2_t1div1_event_div:not(.icon)").length);
var main_events_len  = $(".p2_t1div1_event_div[importance='main']").length;

if(main_events_len && (main_events_len!=all_events_len) ){$("#p2_t1div1 .segmented").css("display","flex");}
else{$("#p2_t1div1 .segmented").css("display","none");$("#p2_t1div1").attr("importance","all");}

if(prm_fun != "reload"){
if(live==1 || !main_events_len || (main_events_len && main_events_len < 4 && all_events_len < 10)){
$("#p2_t1div1").attr("importance","all");
$("#p2_t1div1 .segmented .button-active").removeClass("button-active");
$("#p2_t1div1 .segmented .button[importance='all']").addClass("button-active");
}
else if( (all_events_len && all_events_len >= 10) || (main_events_len && main_events_len >= 4) ){
$("#p2_t1div1").attr("importance","main");
$("#p2_t1div1 .segmented .button-active").removeClass("button-active");
$("#p2_t1div1 .segmented .button[importance='main']").addClass("button-active");
}
}

if(live==0){$(".p2_t1div1_event_area").append('<div class="p2_t1div1_event_div icon whistle_icon">'+
'<i class="svg no-active-state" style="--src:url(../../assets/img/whistle.svg);"></i></div>');}

if($(".p2_t1div1_event_div").not(".stopwatch_icon").not(".whistle_icon").length){
$("#p2_t1div1").addClass("show");
}

}

//====================================================================

if(data["game"]["homeCompetitor"]["statistics"] && data["game"]["awayCompetitor"]["statistics"]){
for(var k = 0; k < data["game"]["homeCompetitor"]["statistics"].length; k++){
var ms_name = data["game"]["homeCompetitor"]["statistics"][k].name;
var ms_home_id = data["game"]["homeCompetitor"]["statistics"][k].id;
var ms_home_value = data["game"]["homeCompetitor"]["statistics"][k].value;
var ms_home_value_percent = data["game"]["homeCompetitor"]["statistics"][k].valuePercentage;
var ms_away_id = data["game"]["awayCompetitor"]["statistics"][k].id;
var ms_away_value = data["game"]["awayCompetitor"]["statistics"][k].value;
var ms_away_value_percent = data["game"]["awayCompetitor"]["statistics"][k].valuePercentage;
if(ms_home_value_percent == ms_away_value_percent){var ms_home_value_percent = 0.50;var ms_away_value_percent = 0.50;}
if(ms_home_id == ms_away_id){
if(ms_home_id == 10){
if(ms_name == "الاستحواذ"){var ms_name = "نسبة<br>الإستحواذ";}
if($("body").attr("color_theme")=="light"){var gcolor="var(--blue_color2)";}
if($("body").attr("color_theme")=="dark"){var gcolor="var(--blue_color)";}
$("#p2_t3div1").append(
'<div class="p2_t3div1_gauge_area">'+
'<div class="gauge p1_gauge"></div>'+
'<h1>'+ms_name+'</h1><p>'+ms_home_value+'</p><p>'+ms_away_value+'</p>'+
'</div>');
app.gauge.create({el:'#p2_t3div1 .p2_t3div1_gauge_area .gauge',type:'circle',size:90,
borderWidth:8.2,borderColor:gcolor,borderBgColor:'var(--orange_color)',value:ms_home_value_percent});
}
else{
$("#p2_t3div1").append(
'<div class="p2_t3div1_statistics_area">'+
'<h1>'+ms_name+'</h1>'+
'<p>'+ms_home_value+'</p>'+
'<p>'+ms_away_value+'</p>'+
'<span style="--home_val:'+(ms_home_value_percent*100)+'%;"></span>'+
'</div>');
}
}
}
if($("#p2_t3div1 .p2_t3div1_gauge_area").length){$("#p2_t3div1 .p2_t3div1_gauge_area").prependTo("#p2_t3div1");}
if($("#p2_t3div1 .p2_t3div1_gauge_area").length || $("#p2_t3div1 .p2_t3div1_statistics_area").length){
$("#p2_t3div1").addClass("show");}
}

//====================================================================

if(data["game"]["homeCompetitor"]["lineups"] && data["game"]["awayCompetitor"]["lineups"]){

for(var j = 1; j <= 2; j++){

if(j == 1){var side = "home";}else if(j == 2){var side = "away";}

var formation = data["game"][side+"Competitor"]["lineups"]["formation"];
$("#p2_t2div1_lineup_segmented .button."+side).attr("formation",formation);

if(formation){
if(formation.match(/-/g).length == 2){var middle_type=1;
var d_len = formation.split('-')[0];var mc_len = formation.split('-')[1];var f_len = formation.split('-')[2];}
if(formation.match(/-/g).length == 3){var middle_type=2;
var d_len = formation.split('-')[0];var md_len = formation.split('-')[1];
var ma_len = formation.split('-')[2];var f_len = formation.split('-')[3];}
if(formation.match(/-/g).length == 4){var middle_type=2;
var d_len = formation.split('-')[0];var md_len = formation.split('-')[1];var mc_len = formation.split('-')[2];
var ma_len = formation.split('-')[3];var f_len = formation.split('-')[4];
if(ma_len > md_len){var md_len = (md_len*1) + (mc_len*1);}else{var ma_len = (ma_len*1) + (mc_len*1);}}
}

var dd=1;var ff=1;var mm=1;

if(data["game"][side+"Competitor"]["lineups"]["members"]){
for(var k = 0; k < data["game"][side+"Competitor"]["lineups"]["members"].length; k++){

var player_id = data["game"][side+"Competitor"]["lineups"]["members"][k].id;
var athlete_id = player_arr[player_id]["athlete_id"];
var player_name = player_arr[player_id]["name"];
var player_short_name = player_arr[player_id]["short_name"];
var player_number = player_arr[player_id]["number"];
var player_status = data["game"][side+"Competitor"]["lineups"]["members"][k]["status"];
var player_rating = data["game"][side+"Competitor"]["lineups"]["members"][k]["ranking"];

if($("body").hasClass("app_in_review") || !localStorage.getItem("user-app_activation") ||
$("#match_details_page").hasClass("suspended")){
var player_logo = "assets/img/player.png";
}
else{
var player_logo = "https://imagecache.365scores.com/image/upload/f_png,w_160,h_160,c_limit,q_auto:eco,d_Athletes:default.png,r_max,c_thumb,g_face,z_0.65/Athletes/"+athlete_id;
}

if(data["game"][side+"Competitor"]["lineups"]["members"][k]["position"]){
var player_pos = data["game"][side+"Competitor"]["lineups"]["members"][k]["position"].id;}else{var player_pos = "";}

if(player_status == 1 && !$("#p2_t2div2 .p2_t2_player_area."+side+" .p2_t2_player[player_id='"+player_id+"']").length){
$("#p2_t2div2 .p2_t2_player_area."+side).append(
'<div class="p2_t2_player p2_player_statistics_but button click_color" player_id="'+player_id+'">'+
'<h1>'+player_number+'</h1>'+
'<img class="lazy lazy-fade-in" src="assets/img/app_logo.png" data-src="'+player_logo+'" />'+
'<p>'+player_name+'</p>'+
'</div>');
}
if(player_status == 2 && !$("#p2_t2div3 .p2_t2_player_area."+side+" .p2_t2_player[player_id='"+player_id+"']").length){
$("#p2_t2div3 .p2_t2_player_area."+side).append(
'<div class="p2_t2_player p2_player_statistics_but button click_color" player_id="'+player_id+'">'+
'<h1>'+player_number+'</h1>'+
'<img class="lazy lazy-fade-in" src="assets/img/app_logo.png" data-src="'+player_logo+'" />'+
'<p>'+player_name+'</p>'+
'</div>');
}
if(player_status == 4 && !$("#p2_t2div4 .p2_t2_player_area."+side+" .p2_t2_player[player_id='"+player_id+"']").length){
$("#p2_t2div4 .p2_t2_player_area."+side).append(
'<div class="p2_t2_player button click_color" player_id="'+player_id+'">'+
'<img class="lazy lazy-fade-in" src="assets/img/app_logo.png" data-src="'+player_logo+'" />'+
'<p>'+player_name+'</p>'+
'</div>');
}

//================================================

if(player_status == 1 && player_pos && formation){

if(player_pos=="2" && (dd-1)!=d_len){var rr = "2";}
if((dd-1)==d_len){var rr = "3";}
if( (middle_type==1 && (mm-1)==mc_len) || (middle_type==2 && (mm-1)==((md_len*1)+(ma_len*1))) ){var rr = "4";}

if(player_pos=="4" && !rr){var rr = "4";}else if(player_pos=="3" && !rr){var rr = "3";}

var lineup_pos="";
if(player_pos=="1"){var lineup_pos = "pos_g";}
if(player_pos!="1"){
if(rr=="2"){var lineup_pos = "pos_d"+d_len+"_"+dd;dd+=1;}
if(rr=="4"){var lineup_pos = "pos_f"+f_len+"_"+ff;ff+=1;}
if(rr=="3"&&middle_type==1){var lineup_pos = "pos_mc"+mc_len+"_"+mm;mm+=1;}
if(rr=="3"&&middle_type==2){
if(mm <= md_len){var lineup_pos = "pos_md"+md_len+"_"+mm;mm+=1;}
else{var lineup_pos = "pos_ma"+ma_len+"_"+(mm-md_len);mm+=1;} }
}
var append_spans="";

if(lineup_statistics_arr){
if($.inArray(player_id,lineup_statistics_arr['goal']) > -1){
append_spans += '<span info="2"><i class="svg no-active-state" style="--color:var(--blue_color);--src:url(../../assets/img/ball.svg);"></i></span>';
}
else if($.inArray(player_id,lineup_statistics_arr['own_goal']) > -1){
append_spans += '<span info="2"><i class="svg no-active-state" style="--color:var(--red_color);--src:url(../../assets/img/ball.svg);"></i></span>';
}
if($.inArray(player_id,lineup_statistics_arr['red_card']) > -1){
append_spans += '<span info="3" class="red_card"></span>';
}
else if($.inArray(player_id,lineup_statistics_arr['yellow_card']) > -1){
append_spans += '<span info="3"></span>';
}
if($.inArray(player_id,lineup_statistics_arr['substitute']) > -1){
append_spans += '<span info="4"></span>';
}
}

if(player_rating && player_rating != undefined){
if(player_rating){var player_rating = parseFloat(player_rating).toFixed(1);}
if(player_rating < 6){var degree="low";}
else if(player_rating >= 6 && player_rating < 7){var degree="medium";}
else if(player_rating >= 7){var degree="high";}
var tt = "";
if(!$(".p2_t2div1_lineup_player[side='"+side+"'] .top[info='5']").length){var tt = "top";}
else{
var current_top = $(".p2_t2div1_lineup_player[side='"+side+"'] .top[info='5']").text();
if(player_rating >= current_top){
var tt = "top";
$(".p2_t2div1_lineup_player[side='"+side+"'] .top[info='5']").removeClass("top");
}
}
append_spans += '<span info="5" class="'+tt+'" degree="'+degree+'">'+player_rating+'</span>';
}

$("#p2_t2div1_lineup_area").append(
'<div class="p2_t2div1_lineup_player p2_player_statistics_but" side="'+side+'" style="--pos:'+lineup_pos+';" player_id="'+player_id+'" >'+
'<img src="'+player_logo+'" />'+
'<p>'+player_short_name+'</p>'+
'<span info="1" num="'+player_number+'"></span>'+
append_spans+
'</div>');

}

//================================================

if($("#p2_t2div1_lineup_area .p2_t2div1_lineup_player").length == 22){$("#p2_t2div1").addClass("show");}
if($("#p2_t2div2 .p2_t2_player").length == 22){$("#p2_t2div2").addClass("show");}
if($("#p2_t2div3 .p2_t2_player").length){$("#p2_t2div3").addClass("show");}
if($("#p2_t2div4 .p2_t2_player").length){$("#p2_t2div4").addClass("show");}

}}

}
}

if(prm_fun != "reload" && !$("#match_details_page").hasClass("suspended")){ get_match_highlights_p2fun(prm_fun); }

if(prm_fun != "reload"){ get_standings_p2fun(league_id); }

after_get_match_info_p2fun(prm_fun);

}
});

}

/*================================  after_get_match_info_p2fun  ===============================*/

function after_get_match_info_p2fun(prm_fun){

setTimeout(function(){$("img.lazy").each(function(index,element){app.lazy.loadImage(element);});},100);

if(prm_fun == "reload"){
var current_scroll = $("#match_details_page .page-content").scrollTop();
$("#match_details_page .page-content").scrollTop(current_scroll+1).scrollTop(current_scroll);
}

channel_popup_show_or_hide_p2fun();

if($("#match_details_page").hasClass("preloader_mode")){

if($("#p2_tab_main .p2_block_div.show").length){$("#p2_tab_main").removeClass("hidden").addClass("tab");
$("#match_details_page .subnavbar a[href='#p2_tab_main']").removeClass("hidden").addClass("tab-link");}
else{$("#p2_tab_main,#match_details_page .subnavbar a[href='#p2_tab_main']").detach();}

if($("#p2_tab_lineup #p2_t2div1").hasClass("show")||$("#p2_tab_lineup #p2_t2div2").hasClass("show")){
$("#match_details_page .subnavbar a[href='#p2_tab_lineup']").removeClass("hidden").addClass("tab-link");}
else{$("#p2_tab_lineup,#match_details_page .subnavbar a[href='#p2_tab_lineup']").detach();}

if($("#p2_tab_statistics .p2_block_div.show").length){$("#p2_tab_statistics").addClass("hidden").removeClass("tab");
$("#match_details_page .subnavbar a[href='#p2_tab_statistics']").removeClass("hidden").addClass("tab-link");
$("#p2_tab_statistics").removeClass("hidden").addClass("tab");}
else{$("#p2_tab_statistics,#match_details_page .subnavbar a[href='#p2_tab_statistics']").detach();}

$("#match_details_page .subnavbar .tab-link").css("width","auto");
tab_link_highlight();

var start_tab = localStorage.getItem("p2_start_tab");
if(start_tab && !$("#match_details_page .subnavbar a[href='#"+start_tab+"']").hasClass("hidden")){
$("#match_details_page .subnavbar a[href='#"+start_tab+"']").click();app.tab.show("#"+start_tab);}
else{$("#match_details_page .subnavbar a.tab-link-active").click();}

if($("#match_details_page .subnavbar .tab-link").length > 1){$("#match_details_page").removeClass("hidden_subnavbar");}
else{$("#match_details_page").addClass("hidden_subnavbar");}

$("#match_details_page").removeClass("preloader_mode");

}

}

/*================================  get_match_highlights_p2fun  ===============================*/

function get_match_highlights_p2fun(prm_fun){

if(app.views.current.router.currentRoute.name != "match_details_page" && 
app.views.current.router.currentRoute.name != "channel_details_page"){return;}

var user_language = localStorage.getItem("user-language");

var match_id = $("#match_details_page").attr("match_id");

var json_url = "https://mydb.sportmatchs.com/highlights/?target_match="+match_id+"&lang="+user_language;

var p2_ajax_highlights = $.ajax({url:json_url,dataType:"json",
success:function(data){

var db_highlights_arr = [];

for(var i = 0; i < data.length; i++){

var video_id = data[i].video_id;
var video_date = data[i].date;
var video_title = data[i].title;
var video_image = data[i].image;
var video_url = data[i].url;
var video_source = data[i].source;
var player_type = data[i].player_type;

db_highlights_arr.push(video_id);

if(prm_fun == "reload" && $(".p2_li_highlights[video_id='"+video_id+"']").length){
$(".p2_li_highlights[video_id='"+video_id+"'] img").removeClass("lazy-fade-in").attr("src",video_image);
}

if($(".p2_li_highlights[video_id='"+video_id+"']").length){
$(".p2_li_highlights[video_id='"+video_id+"']").attr("url",video_url);
}

if($(".p2_li_highlights[video_id='"+video_id+"']").length &&
($(".p2_li_highlights[video_id='"+video_id+"']").find("img").attr("src")) != video_image){
$(".p2_li_highlights[video_id='"+video_id+"']").find("img").attr("src",video_image);
}

if(!$(".p2_li_highlights[video_id='"+video_id+"']").length){
$("#p2_highlights_area ul").append(
'<li class="p2_li_highlights button click_color" video_id="'+video_id+'" url="'+video_url+'" '+
'date="'+video_date+'" source="'+video_source+'" player_type="'+player_type+'" >'+
'<img class="lazy lazy-fade-in" src="assets/img/app_logo.png" data-src="'+video_image+'" />'+
'<i class="ionicons-play"></i>'+
'<p>'+video_title+'</p>'+
'</li>'
);
}

}

//====================================================================

$("img.lazy").each(function(index,element){app.lazy.loadImage(element);});

$(".p2_li_highlights").each(function(){var video_id = $(this).attr("video_id");
if($.inArray(video_id,db_highlights_arr) < 0){$(".p2_li_highlights[video_id='"+video_id+"']").detach();}});

db_highlights_arr.forEach(function(video_id){$(".p2_li_highlights[video_id='"+video_id+"']").appendTo("#p2_highlights_area ul");});

if($(".p2_li_highlights").length){$("#p2_highlights_area").removeClass("hidden");}
else{$("#p2_highlights_area").addClass("hidden");}

check_custom_native_ads_fun("p2_li_highlights_loaded");

//====================================================================

}
});

setTimeout(function(){ p2_ajax_highlights.abort(); },5000);

}

/*=============================  channel_popup_show_or_hide_p2fun  ============================*/

function channel_popup_show_or_hide_p2fun(){

var translate_arr = JSON.parse(localStorage.getItem("app-translate_arr"));
var user_language = localStorage.getItem("user-language");
var text_1 = translate_arr["29"][user_language];
var text_3_arr = JSON.parse(translate_arr["63"][user_language]);

var minimum_match_channel_open = (localStorage.getItem("app-minimum_match_channel_open"))*1;
var maximum_match_channel_open = (localStorage.getItem("app-maximum_match_channel_open"))*1;
var maximum_match_channel_open_ex = (localStorage.getItem("app-maximum_match_channel_open_ex"))*1;

var minute_timer = $("#match_details_page").attr("minute_timer");
var match_live = $("#match_details_page").attr("live");
var extra_time = $("#match_details_page").attr("extra_time");

if(extra_time == 1){var maximum_match_channel_open = maximum_match_channel_open_ex;}

if(match_live==1){
$("#p2_open_channel_popup_but").css("display","block");
$("#p2_channel_not_active_but").css("display","none");
return;
}

if(minimum_match_channel_open > 0 && minute_timer > minimum_match_channel_open){
$("#p2_open_channel_popup_but").css("display","none");
if(minimum_match_channel_open <= 10){var mword = (text_3_arr[0]).replace("xxxxx",minimum_match_channel_open);}
if(minimum_match_channel_open > 10 && minimum_match_channel_open < 60){var mword = (text_3_arr[1]).replace("xxxxx",minimum_match_channel_open);}
if(minimum_match_channel_open >= 60){var mword = text_3_arr[2];}
$("#p2_channel_not_active_but").css("display","block").html(text_1.replace("xxxxx",mword));
}
else if(maximum_match_channel_open > 0 && minute_timer < (maximum_match_channel_open*-1) && match_live != 1){
$("#p2_channel_area").css("display","none");
//$("#p2_open_channel_popup_but").css("display","none");
//$("#p2_channel_not_active_but").css("display","none");
}
else{
$("#p2_open_channel_popup_but").css("display","block");
$("#p2_channel_not_active_but").css("display","none");
}

}

/*================================  segmented_buts_click_p2fun  ===============================*/

function segmented_buts_click_p2fun(){

$("#p2_t1div1 .segmented .button").click(function(){
var importance = $(this).attr("importance");
$("#p2_t1div1").attr("importance",importance);
});

$("#p2_t2div1_lineup_segmented .button").click(function(){
if($(this).hasClass("home")){$("#p2_t2div1_lineup_area").attr("side","home");}
if($(this).hasClass("away")){$("#p2_t2div1_lineup_area").attr("side","away");}
});

}

/*===================================  subnavbar_click_p2fun  =================================*/

function subnavbar_click_p2fun(){
$("#match_details_page .subnavbar .tab-link").click(function(){
if($(this).attr("href")=="#p2_tab_standings"){screen.orientation.unlock();}
else{screen.orientation.lock('portrait');}
var event = ($(this).attr("href").replace("#",""))+"_loaded";
check_custom_native_ads_fun(event);
});
}

/*===================================  landscape_mode_p2fun  ==================================*/

function landscape_mode_p2fun(){
window.addEventListener("orientationchange",function(){
if(window.orientation == "0"){
$("#match_details_page").removeClass("landscape_mode");
(app.swiper.get("#match_details_page .swiper-container")).allowTouchMove = true;
} 
else if(window.orientation == "90" || window.orientation == "-90"){
$("#match_details_page").addClass("landscape_mode");
(app.swiper.get("#match_details_page .swiper-container")).allowTouchMove = false;
}
},false);
}

/*================================  scroll_between_tabs_p2fun  ================================*/

function scroll_between_tabs_p2fun(){
$(document).on("click","#match_details_page .subnavbar .tab-link",function(){
var active_tab_href = $("#match_details_page .subnavbar .tab-link-active").attr("href");
var scroll_pos = $("#match_details_page .subnavbar .tab-link[href='"+active_tab_href+"']").attr("scroll_pos");
var current_scroll = $("#match_details_page .page-content").scrollTop();
if(scroll_pos == undefined){
if(current_scroll > 85){$("#match_details_page .page-content").scrollTop(85);}
else{$("#match_details_page .page-content").scrollTop(scroll_pos);}
}
else{
if(current_scroll < 85){$("#match_details_page .page-content").scrollTop(current_scroll);}
else if(current_scroll > 85 && scroll_pos < 85){$("#match_details_page .page-content").scrollTop(85);}
else{$("#match_details_page .page-content").scrollTop(scroll_pos);}
}
$("#match_details_page .subnavbar .tab-link[href='"+active_tab_href+"']").attr("scroll_pos",$("#match_details_page .page-content").scrollTop());
$("#match_details_page #p2_tabs_area "+active_tab_href).addClass("tab-active");
});
}

/*====================================  scroll_event_p2fun  ===================================*/

function scroll_event_p2fun(){
$("#match_details_page .page-content").scroll(function(){
var current_scroll = $(this).scrollTop();

//================================================

var active_tab_href = $("#match_details_page .subnavbar .tab-link-active").attr("href");
$("#match_details_page .subnavbar .tab-link[href='"+active_tab_href+"']").attr("scroll_pos",current_scroll);

//================================================

if(current_scroll >= 85){$("#match_details_page .subnavbar").css("--opacity","0");}
else{$("#match_details_page .subnavbar").css("--opacity","1");}

if(current_scroll >= 85){var percent = 1;}else{var percent = (Math.round((current_scroll/85)*100)/100).toFixed(2);}

$("#match_details_page .subnavbar").css("--percent",percent);
$("#p2_navbar_info_p2").css("--percent",percent);
$(".p2_navbar_team").css("--percent",percent);
$(".p2_navbar_team img").css("--percent",percent);
$("#p2_navbar_info").css("--percent",percent);
$("#p2_navbar_area").css("--percent",percent);

//================================================

if(current_scroll >= 20){var op1 = 0;}else{var op1 = (Math.round((1-(current_scroll/20))*100)/100).toFixed(2);}
if(current_scroll >= 50){var op2 = 0;}else{var op2 = (Math.round((1-(current_scroll/50))*100)/100).toFixed(2);}

$("#p2_navbar_league").css("opacity",op1);
$("#p2_navbar_info p").not("#p2_navbar_info_p2").css("opacity",op2);
$(".p2_navbar_team p").css("opacity",op2);

//================================================

$("#match_details_page .page-content .tabs").attr("scroll_pos",current_scroll);
});
}

/*==================================  share_but_click_p2fun  ==================================*/

function share_but_click_p2fun(){

$("#p2_navbar_buts a.share-social").click(function(){
var subnavbar_active_tab = $("#match_details_page .subnavbar .tab-link-active").attr("href").replace("#","");

app.dialog.create({title:'',cssClass:'preloader_dialog',
content:'<div class="preloader"><span class="preloader-inner"><svg viewBox="0 0 36 36">'+
'<circle cx="18" cy="18" r="16"></circle></svg></span></div>'}).open();
setTimeout(function(){if($(".preloader_dialog").length){app.dialog.close();}},7000);

var app_share_link = localStorage.getItem("app-share_link");
var home_team_name = $(".p2_navbar_team.home p").text();
var away_team_name = $(".p2_navbar_team.away p").text();

if($("body").attr("app_dir") != "left"){var app_name = ($("body").attr("app_name")).split("|")[1];}
else{var app_name = ($("body").attr("app_name")).split("|")[0];}

if($("body").attr("app_dir") != "left"){
var message = "شاهد مباراة "+home_team_name+" و"+away_team_name+" بدون تقطيع مجانا"+
"\n"+"من خلال تطبيق "+app_name+" لبث المباريات"+"\n"+app_share_link;
}else{
var message = "Watch ("+home_team_name+" X "+away_team_name+") match for free"+
"\n"+"Download "+app_name+" app to live broadcasts"+"\n"+app_share_link;
}

if(localStorage.getItem("user-app_activation") != "full" || $("body").hasClass("app_in_review")){
if($("body").attr("app_dir") != "left"){var message = "تطبيق "+app_name+" .. حمله الآن مجانا"+"\n"+app_share_link;}
else{var message = app_name+" App .. Download it now for free"+"\n"+app_share_link;}}

window.plugins.socialsharing.share(message,null,null,null);
setTimeout(function(){if($(".preloader_dialog").length){app.dialog.close();}},3000);

});

}

/*=================================  open_channel_popup_p2fun  ================================*/

function open_channel_popup_p2fun(){

$("#p2_open_channel_popup_but").click(function(){

if(!$(".p2_channel_area_logo_but").length){return;}

var match_id = $("#match_details_page").attr("match_id");

var all_channel_id = "";
$(".p2_channel_area_logo_but").each(function(){all_channel_id = ($(this).attr("channel_id"))+","+all_channel_id;});
var all_channel_id = all_channel_id.slice(0,-1);

app.views.current.router.navigate({name:"channel_details_page",query:{channel_id:all_channel_id,match_id:match_id,previous_page:"force_back"}});

});

}

/*===================================  get_standings_p2fun  ===================================*/

function get_standings_p2fun(prm_league_id){

var json_url = "https://webws.365scores.com/web/competitions/?competitions="+prm_league_id;

var p2_ajax_standings = $.ajax({url:json_url,dataType:"json",
complete:function(){

if($(".p2_standings_iframe").hasClass("hidden")){
$("#p2_tab_standings").addClass("hidden").removeClass("tab");
$("#match_details_page .subnavbar a[href='#p2_tab_standings']").addClass("hidden").removeClass("tab-link");}
else{$("#p2_tab_standings").removeClass("hidden").addClass("tab");
$("#match_details_page .subnavbar a[href='#p2_tab_standings']").removeClass("hidden").addClass("tab-link");}

$("#match_details_page .subnavbar .tab-link").css("width","auto");
tab_link_highlight();

if($("#match_details_page .subnavbar .tab-link").length > 1){$("#match_details_page").removeClass("hidden_subnavbar");}
else{$("#match_details_page").addClass("hidden_subnavbar");}

},
success:function(data){

var check_standings = data.competitions[0].hasStandings;
var check_brackets = data.competitions[0].hasBrackets;

if(check_standings == true || check_brackets == true){

var user_language_id = localStorage.getItem("user-language_id");
var user_color_theme = localStorage.getItem("user-color_theme");

var ifr_src = "https://365scorestable.blogspot.com/?id="+prm_league_id+"&lang_id="+user_language_id+"&theme="+user_color_theme;

$(".p2_standings_iframe").attr("src",ifr_src);
$(".p2_standings_iframe").removeClass("hidden");
}

}
});

}




