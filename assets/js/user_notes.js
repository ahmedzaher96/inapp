

/*=============================================================================================*/
/*-------------------------------------  user_notes_page  -------------------------------------*/
/*=============================================================================================*/

$$(document).on('page:init','.page[data-name="user_notes_page"]',function(e,page){


var placeholder_text = (JSON.parse(localStorage.getItem("app-translate_arr")))["74"][localStorage.getItem("user-language")];
$("#p9_textarea").attr("placeholder",placeholder_text);

$("#p9_send_but").click(function(){
if(!$("#p9_textarea").val()){return;}

var text_1 = (JSON.parse(localStorage.getItem("app-translate_arr")))["75"][localStorage.getItem("user-language")];
var text_2 = (JSON.parse(localStorage.getItem("app-translate_arr")))["76"][localStorage.getItem("user-language")];
var text_3 = (JSON.parse(localStorage.getItem("app-translate_arr")))["77"][localStorage.getItem("user-language")];

app.toast.show({text:text_1,position:'bottom',cssClass:'green_toast'});
setTimeout(function(){app.toast.close();},2000);

var from = "App@"+BuildInfo.packageName;
var subject = "onesignal_player_id="+localStorage.getItem("user-onesignal_player_id");
var message = '<p>'+(($('#p9_textarea').val()).replace(/\r?\n/g,'<br/>'))+'</p>';

$.ajax({type:"POST",url:"https://api.sportmatchs.com/send_email.php",data:{w_from:from,w_subject:subject,w_message:message}});

setTimeout(function(){$("#p9_textarea").val("");},100);

setTimeout(function(){
cordova.plugins.notification.local.schedule({
title:text_2,
text:text_3
});
},3000);

});


});





