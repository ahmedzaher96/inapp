

/*=============================================================================================*/
/*--------------------------------------  settings_page  --------------------------------------*/
/*=============================================================================================*/

$$(document).on('page:init','.page[data-name="settings_page"]',function(e,page){

if(page.route.query["preloader_mode"] == 1){$("#settings_page").addClass("preloader_mode");}
else{$("#settings_page").removeClass("preloader_mode");}

var user_language = localStorage.getItem("user-language");
$("#p7_but13 img").attr("src","assets/img/lang_"+user_language+".png");

color_theme_toggle_click_p7fun();
timezone_p7fun();

});

//====================================================================

$$(document).once('page:init','.page[data-name="settings_page"]',function(e,page){

buts_click_p7fun();

document.addEventListener("resume",function(){
if(app.views.current.router.currentRoute.name == "settings_page"){timezone_p7fun();}},false);

});


/*==============================  color_theme_toggle_click_p7fun  =============================*/

function color_theme_toggle_click_p7fun(){

if(localStorage.getItem("user-color_theme") == "dark"){$("#p7_but4_toggle input").prop("checked",true);}
else if(localStorage.getItem("user-color_theme") == "dark"){$("#p7_but4_toggle input").prop("checked",false);}

$("#p7_but4_toggle input").change(function(){

if($("#p7_but4_toggle input").prop("checked")==true){localStorage.setItem("user-color_theme","dark");}
else if($("#p7_but4_toggle input").prop("checked")==false){localStorage.setItem("user-color_theme","light");}
$("body").addClass("dialog_bg");

setTimeout(function(){
app.dialog.create({title:'',cssClass:'preloader_dialog',
content:'<div class="preloader"><span class="preloader-inner"><svg viewBox="0 0 36 36">'+
'<circle cx="18" cy="18" r="16"></circle></svg></span></div>'}).open();
setTimeout(function(){if($(".preloader_dialog").length){app.dialog.close();change_statusbar_color_fun();}},1000);
if($("#p7_but4_toggle input").prop("checked")==true){
$(".preloader_dialog").css("background-color","var(--dark_bg_color1)");
change_statusbar_color_fun("light-dark_bg_color2");
}
else if($("#p7_but4_toggle input").prop("checked")==false){
$(".preloader_dialog").css("background-color","var(--light_bg_color1)");
change_statusbar_color_fun("dark-light_bg_color2");
}
},100);
setTimeout(function(){default_theme_fun();},800);
setTimeout(function(){$("body").removeClass("dialog_bg");},1500);
});

};

/*======================================  timezone_p7fun  =====================================*/

function timezone_p7fun(){
var timezone = (new Date().getTimezoneOffset())/-60;
if(timezone >= 0){var timezone_utc = "UTC+"+timezone;}else if(timezone < 0){var timezone_utc = "UTC"+timezone;}
if(timezone_utc){$("#p7_but5_timezone").text(timezone_utc);}else{$("#p7_but5_timezone").text();}
};

/*=====================================  buts_click_p7fun  ====================================*/

function buts_click_p7fun(){

$(document).on('click','#p7_but1',function(){

var but_id = $(this).attr("id");

var translate_arr = JSON.parse(localStorage.getItem("app-translate_arr"));
var user_language = localStorage.getItem("user-language");
var text_1 = translate_arr["69"][user_language];var text_2 = translate_arr["70"][user_language];
var text_3 = translate_arr["3"][user_language];var text_4 = translate_arr["4"][user_language];
var text_5 = translate_arr["71"][user_language];var text_6 = translate_arr["72"][user_language];

app.dialog.create({title:'',cssClass:'p7_dialog1 '+but_id,
content:
`
<div class="p7_dialog1_radio_area">
<button class="button click_color" value="match_tab"><i class="icon f7-icons">sportscourt</i><p>${text_1}</p></button>
<button class="button click_color" value="news_tab"><i class="icon f7-icons">book</i><p>${text_2}</p></button>
<button class="button click_color" value="video_tab"><i class="ionicons-caret-forward-circle-outline"></i><p>${text_3}</p></button>
<button class="button click_color" value="channel_tab"><i class="fa fa-television"></i><p>${text_4}</p></button>
</div>
<div class="dialog_bottom_area">
<button class="button gray_click close_dialog ok_but">${text_5}</button>
<button class="button gray_click close_dialog">${text_6}</button>
</div>
`,

on:{

open:function(){
$(".p7_dialog1_radio_area .button[value='"+(localStorage.getItem("user-home_page"))+"']").addClass("selected");
},

opened:function(){

$(".p7_dialog1_radio_area .button").click(function(){
$(".p7_dialog1_radio_area .button.selected").removeClass("selected");
$(this).addClass("selected");
});

$(".p7_dialog1 .ok_but").click(function(){
localStorage.setItem("user-home_page",($(".p7_dialog1_radio_area .button.selected").attr("value")));
});

}
}

}).open();

});

//====================================================================

$(document).on('click','#p7_but3',function(){
app.views.current.router.navigate({ name:"push_control_page",query:{previous_page:"settings_page"} });
});

//====================================================================

$(document).on('click','#p7_but5',function(){
window.cordova.plugins.settings.open("date");
});

//====================================================================

$(document).on('click','#p7_but7',function(){
if(localStorage.getItem("app-device") == "android"){
window.open("market://details?id="+BuildInfo.packageName,"_system");
}
else if(localStorage.getItem("app-device") == "ios"){
cordova.InAppBrowser.open("https://apps.apple.com/app/id"+(localStorage.getItem("app-ios_id"))+"?action=write-review",'_system');
}
});

//====================================================================

$(document).on('click','#p7_but9',function(){
app.views.current.router.navigate({ name:"user_notes_page",query:{previous_page:"settings_page"} });
});

//====================================================================

$(document).on('click','#p7_but8',function(){
var url = localStorage.getItem("app-privacy_policy");
var mode_theme_color = getComputedStyle(document.documentElement).getPropertyValue('--mode_theme_color');
var ref = cordova.InAppBrowser.open(url,'_blank','toolbarposition=top,location=no,hidenavigationbuttons=yes,toolbarcolor='+mode_theme_color+
',clearcache=yes,clearsessioncache=yes,hideurlbar=yes,lefttoright=yes,zoom=yes,closebuttoncaption=✕,closebuttoncolor=#ffffff,fullscreen=yes'); 
});

//====================================================================

$(document).on('click','#p7_but11',function(){
create_activation_popup_fun("area2");
});

//====================================================================

$(document).on('click','#p7_but12',function(){

var atext_1 = (JSON.parse(localStorage.getItem("app-translate_arr")))["51"][localStorage.getItem("user-language")];
var atext_2 = (JSON.parse(localStorage.getItem("app-translate_arr")))["79"][localStorage.getItem("user-language")];
var atext_3 = (JSON.parse(localStorage.getItem("app-translate_arr")))["78"][localStorage.getItem("user-language")];

var activation_code = localStorage.getItem("app-activation_code");

app.dialog.create({title:'',cssClass:'p7_activation_dialog',
content:
`
<button class="button ripple-inset gray_click close_dialog xclose_dialog"><i class="ionicons-close"></i></button>
<h1>${atext_1}</h1>
<h2>${activation_code}</h2>
<div class="dialog_bottom_area">
<button class="button gray_click">${atext_2}</button>
<button class="button gray_click">${atext_3}</button>
</div>
`,
on:{opened:function(){

var activation_code = $(".p7_activation_dialog").find("h2").text();

$(".p7_activation_dialog .dialog_bottom_area .button:eq(0)").click(function(){
app.dialog.close();
app.dialog.create({title:'',cssClass:'preloader_dialog',
content:'<div class="preloader"><span class="preloader-inner"><svg viewBox="0 0 36 36">'+
'<circle cx="18" cy="18" r="16"></circle></svg></span></div>'}).open();
setTimeout(function(){if($(".preloader_dialog").length){app.dialog.close();}},7000);
var app_share_link = localStorage.getItem("app-share_link");

if($("body").attr("app_dir") != "left"){
var app_name = ($("body").attr("app_name")).split("|")[1];
var message = "رمز تفعيل تطبيق "+app_name+" هو "+"\n"+activation_code+"\n"+"تطبيق "+app_name+" لمشاهدة المباريات بث مباشر بدون تقطيع .. حمله الآن مجانا";
}
else{
var app_name = ($("body").attr("app_name")).split("|")[0];
var message = app_name+" App activation code is "+"\n"+activation_code+"\n"+app_name+" App to watch matches broadcast live without cutting .. Download it now for free";
}

window.plugins.socialsharing.share(message,null,null,null);
setTimeout(function(){if($(".preloader_dialog").length){app.dialog.close();}},3000);
});

$(".p7_activation_dialog .dialog_bottom_area .button:eq(1)").click(function(){
var atext_4 = (JSON.parse(localStorage.getItem("app-translate_arr")))["98"][localStorage.getItem("user-language")];
cordova.plugins.clipboard.copy(activation_code);
app.toast.show({text:atext_4,position:'bottom',cssClass:'green_toast'});
app.dialog.close();
});

}}
}).open();

});

//====================================================================

$(document).on('click','#p7_but13',function(){
app.views.current.router.navigate({ name:"language_page",query:{in_intro:"no"} });
});

//====================================================================


}




