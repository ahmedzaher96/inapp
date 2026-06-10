

/*=============================================================================================*/
/*------------------------------------  push_control_page  ------------------------------------*/
/*=============================================================================================*/

$$(document).on('page:init','.page[data-name="push_control_page"]',function(e,page){

if(localStorage.getItem("user-finish_intro_settings") != "yes"){
$("#push_control_page").addClass("intro").attr("statusbar_color","auto-mode_bg_color2");}

check_toggle_p8fun();
toggle_click_p8fun();
radio_click_p8fun();

$("#p8_footer_center_but").click(function(){app.views.current.router.navigate({ name:"theme_color_page" });});

});

/*====================================  check_toggle_p8fun  ===================================*/

function check_toggle_p8fun(){
var user_push_control = JSON.parse(localStorage.getItem("user-push_control"));
$.each(user_push_control[0],function(key,value){

if($("#p8_toggle_"+key+" input").length){
if(value == "enable"){$("#p8_toggle_"+key+" input").prop("checked",true);}
if(value == "disable"){$("#p8_toggle_"+key+" input").prop("checked",false);}
}

if(key == "match_importance"){
$("#p8_ul_match_importance input[value='"+value+"']").prop("checked",true);
}

});
}

/*====================================  toggle_click_p8fun  ===================================*/

function toggle_click_p8fun(){
$(".p8_ul_group li .toggle input").change(function(){
var toggle_name = $(this).parents(".toggle").attr("id").replace("p8_toggle_","");
var user_push_control = JSON.parse(localStorage.getItem("user-push_control"));
if($(this).prop("checked")==true){
user_push_control[0][toggle_name] = "enable";
localStorage.setItem("user-push_control",JSON.stringify(user_push_control));
}
else if($(this).prop("checked")==false){
user_push_control[0][toggle_name] = "disable";
localStorage.setItem("user-push_control",JSON.stringify(user_push_control));
}
});
}

/*====================================  radio_click_p8fun  ====================================*/

function radio_click_p8fun(){
$("#p8_ul_match_importance input[type=radio][name=p8_radio_match_importance]").change(function(){
var radio_value = this.value;
var user_push_control = JSON.parse(localStorage.getItem("user-push_control"));
user_push_control[0]["match_importance"] = radio_value;
localStorage.setItem("user-push_control",JSON.stringify(user_push_control));
});
}




