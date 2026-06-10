

/*=============================================================================================*/
/*--------------------------------------  language_page  --------------------------------------*/
/*=============================================================================================*/

$$(document).on('page:init','.page[data-name="language_page"]',function(e,page){

if(localStorage.getItem("user-language") == null){localStorage.setItem("user-language","ar");}

var user_language = localStorage.getItem("user-language");
$(".p12_lang_but[lang='"+user_language+"']").addClass("active");

if(page.route.query["in_intro"] == "no"){
$("#p12_footer_right_but,#p12_footer_left_but").removeClass("hidden");
$("#p12_footer_center_but").addClass("hidden");
}

//====================================================================

$(".p12_lang_but").click(function(){

$(".p12_lang_but.active").removeClass("active");
$(this).addClass("active");

$("#p12_footer_right_but").html(JSON.parse(localStorage.getItem("app-translate_arr"))["72"][($(this).attr("lang"))]);
$("#p12_footer_center_but").html(JSON.parse(localStorage.getItem("app-translate_arr"))["83"][($(this).attr("lang"))]);
$("#p12_footer_left_but").html(JSON.parse(localStorage.getItem("app-translate_arr"))["84"][($(this).attr("lang"))]);

});

//====================================================================

$("#p12_footer_center_but").click(function(){

localStorage.setItem("user-language",($(".p12_lang_but.active").attr("lang")));

if($("body").hasClass("app_in_review")){
localStorage.setItem("user-finish_intro_settings","yes");
app.views.current.router.navigate("/"+(localStorage.getItem("user-home_page"))+"/");
}
else{
app.views.current.router.navigate({ name:"push_control_page" });
}

});

//====================================================================

$("#p12_footer_right_but").click(function(){
app.views.current.router.navigate({ name:"settings_page" });
});

//====================================================================

$("#p12_footer_left_but").click(function(){
localStorage.setItem("user-language",($(".p12_lang_but.active").attr("lang")));
$("body").attr("app_lang",($(".p12_lang_but.active").attr("lang")));
$("body").addClass("dialog_bg");
app.dialog.create({title:'',cssClass:'preloader_dialog',
content:'<div class="preloader"><span class="preloader-inner"><svg viewBox="0 0 36 36">'+
'<circle cx="18" cy="18" r="16"></circle></svg></span></div>'}).open();
setTimeout(function(){
var params={};
window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(str,key,value){params[key]=value;});
if(!params["home_page"]){window.location.href = window.location.href;}
else{window.location.href = (window.location.href).replace("&home_page="+params["home_page"],"").replace("?home_page="+params["home_page"],"");}
},500);
});

//====================================================================


});




