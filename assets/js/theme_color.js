

/*=============================================================================================*/
/*-------------------------------------  theme_color_page  ------------------------------------*/
/*=============================================================================================*/

$$(document).on('page:init','.page[data-name="theme_color_page"]',function(e,page){

image_area_click_p11fun();
footer_but_click_p11fun();

$(".p11_image_area.active").removeClass("active");
$(".p11_image_area."+(localStorage.getItem("user-color_theme"))).addClass("active");

});

/*=================================  image_area_click_p11fun  =================================*/

function image_area_click_p11fun(){

$(".p11_image_area").click(function(){

$(".p11_image_area.active").removeClass("active");

$(this).addClass("active");

if($(this).hasClass("light")){localStorage.setItem("user-color_theme","light");}
else if($(this).hasClass("dark")){localStorage.setItem("user-color_theme","dark");}

default_theme_fun();change_statusbar_color_fun();

});
}

/*=================================  footer_but_click_p11fun  =================================*/

function footer_but_click_p11fun(){

$("#p11_footer_center_but").click(function(){

localStorage.setItem("user-finish_intro_settings","yes");

app.views.current.router.navigate("/"+(localStorage.getItem("user-home_page"))+"/");

});

}




