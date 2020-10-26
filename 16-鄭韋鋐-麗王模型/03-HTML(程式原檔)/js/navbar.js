var nav_btn=document.querySelector("#nav_btn");
var nav_list=document.querySelector("#nav_list");
// $("#nav_list li").hide().each(function(e){
//     $(this).delay(700*e).fadeIn(700);
// });

nav_btn.onclick=function(){
    if(!nav_list.classList.contains("active")){
        nav_list.classList.add("active");
    }else{
        nav_list.classList.remove("active");
    }
    $("#nav_list").slideToggle();
}
