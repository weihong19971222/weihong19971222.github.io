var nav_btn=document.querySelector("#nav_btn");
var nav_list=document.querySelector("#nav_list");
nav_btn.onclick=function(){
    if(!nav_list.classList.contains("active")){
        nav_list.classList.add("active");
    }else{
        nav_list.classList.remove("active");
    }
    nav_list.slideToggle("slow");
}
