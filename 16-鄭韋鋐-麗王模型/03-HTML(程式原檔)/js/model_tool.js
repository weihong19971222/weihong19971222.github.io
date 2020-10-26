var model_tool_basic={name:["斜口鉗","筆刀","砂紙"],url:["rLmxM94zhXg","bgf1PbvxF8s","Kp5GYYwjRB8"],icon:["plier","pen_knife","sandpaper"],
      text:["斜口鉗的構造是一面是平的，另一面是凹進去的，使用的時候平的一面面向零件，並距離零件本體2~3mm剪切，這樣可以避免對零件本體造成傷害，給後續處理帶來麻煩。",
      "筆刀是模型里常用的切割工具，比如說刮除零件的合模線（由於模型零件是將塑料熱熔然後壓入模具里形成的，兩塊模具之前會有縫隙，液態的塑料流到模具里會形成一條實物上沒有的細線，這就是合模線，合模線會使成品會很失真，所以要把合模線刮掉。）之前用剪鉗剪下的零件因為留下了兩2~3mm的水口，這時候可以用筆刀小心削去部分水口，但依然不要一次性削到零件本體。",
      "砂紙可以根據需要剪裁合適的大小使用，水砂紙沾水後打磨可以有效避免粉塵。砂紙有不同的目數，也就是粗細程度，模型常用的是400,600，800,1000，2000等。目數越小越粗糙反之越細膩，打磨零件的順序就是從小號依次使用一直到最大號。"]};
      var model_tool_advanced={name:["墨線液","刻線刀","模型膠水"],url:["w9_QiJIuqx0","YymvX9dvcp0","8XXb4sgxClU"],icon:["black_jar","knife","glue"],
      text:["墨線液常見的顏色有黑色和灰色，用來加深模熊輪廓增加細節，通常墨線液會內附筆刷頭，新手使用非常簡單。",
      "刻線刀是來加深或增加模型上的刻線，通常搭配刻線膠帶一起使用。刻線刀也有分許多尺寸，增加刻線能豐富模型的細節。",
      "模型專用膠水的原理是溶解塑料零件表面一層的塑料，將兩個零件拼接在一起後溶解部分乾燥使兩個零件合二為一。當然由於這種性質，這種膠水不存在解膠劑也就是說，如果你發現拼錯了只能將兩個零件切開。模型膠水有揮發性，氣味略大，製作儘量選擇通風的地方。"]};
      var model_tool_painting={name:["空壓機","噴筆","顏料"],url:["Ja9x-Y5zxYk","zA-x66X2TTw","ytMvMZT9_io"],icon:["air_pump","airbrush","pigment"],
      text:["空壓機是用來產生高壓空氣以推動氣動工具或噴槍的裝置，空壓機馬力越大，能產生的高壓空氣就越強；以美術用（或模型用）的空壓機而言，馬力大約在1/8HP～1/6HP之間，原則上運轉時約能產生 1kg~2kg 的持續空氣推力。",
      "噴筆是有分口徑的，口徑越大，表示最大噴幅越廣；通常 0.3～0.5口徑是屬於泛用型的噴槍，而 0.2以下口徑則屬於細工型噴槍。",
      "模型漆可分為樹脂硝基漆,法瑯油性漆,壓克力水性漆；樹脂硝基漆毒性最強，漆膜最硬，乾燥時間最快。法瑯油性漆毒性中等，漆膜弱，乾燥時間最久。壓克力水性漆幾乎無毒、無味，但是漆膜最弱，乾燥時間中等。大多數漆都需要添加相對應溶劑稀釋後才能使用。"]};
      var model_tool=model_tool_basic;
    
      $(".model_tool_btn").on("click",function(){
        $(".model_tool_btn").removeClass("active");
        $(this).addClass("active");
        switch($(this).attr("data-type")){
          case "basic":
            model_tool=model_tool_basic;
            break;
          case "advanced":
            model_tool=model_tool_advanced;
            break;
          case "painting":
            model_tool=model_tool_painting;
            break;  
        };
        $(".model_tool_imgbtn_mask").next().each(function(i){
          $(this).text(model_tool.name[i]);
        });
        $(".model_tool_imgbtn img").each(function(j){
          $(this).attr("src","img/model_tool/"+model_tool.icon[j]+"_icon.png");
        });
        $("#model_tool_video").html(`<iframe  src="https://www.youtube.com/embed/${model_tool.url[1]}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
        $("#model_tool_text p").text(model_tool.text[1]);
        $(".model_tool_imgbtn").removeClass("active");
        $(".model_tool_imgbtn")[1].classList.add("active");
      });
      
      $(".model_tool_imgbtn").on("click",function(){
        $(".model_tool_imgbtn").removeClass("active");
        $(this).addClass("active");
        $("#model_tool_text p").text(model_tool.text[$(this).attr("data-num")]);
        $("#model_tool_video").html(`<iframe  src="https://www.youtube.com/embed/${model_tool.url[$(this).attr("data-num")]}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
      });