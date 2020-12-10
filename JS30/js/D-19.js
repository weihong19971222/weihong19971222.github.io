// 更多效果 https://ithelp.ithome.com.tw/articles/10196426

const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');

const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

const b_img=document.querySelector('.b_img');
const canvas2 = document.querySelector('.photo2');
const ctx2 = canvas2.getContext('2d');

const ipt_rgb=document.querySelectorAll('.rgb input');
type = 0

// 取得視訊
function getViedo() {
    // JavaScript 的 navigator 物件讓你可以存取使用者的瀏覽器資訊
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(localMediaStream => {
            // srcObject 屬性是只有 <video> 、 <audio> 這種 HTMLMediaElement 才擁有的屬性
            // 其可以將任何支援的影音物件作為元素的來源
            video.srcObject = localMediaStream;
            video.play();
        })
        .catch(err => {
            // 錯誤時執行console
            console.log(`OH!! NO!!`, err);
        });
}

function switchType(num) {
    type = num;
    if (type == 3) {
        document.querySelector('.rgb').setAttribute('style', 'display:block;');
    }else{
        document.querySelector('.rgb').setAttribute('style', 'display:none;');
    }
    imgtoCan();
}

function imgtoCan(){
    const width2 = b_img.width;
    const height2 = b_img.height;
    canvas2.width = width2;
    canvas2.height = height2;
    ctx2.drawImage(b_img, 0, 0, width2, height2);
    let piexls2 = ctx2.getImageData(0, 0, width2, height2);
    switch (type) {
        case 0:
            //原始模式
            // piexls = original(piexls);
            break;
        case 1:
            //R G B 分離殘影模式
            piexls2 = rgbSplit(piexls2);
            break;
        case 2:
            //RED 效果模式
            piexls2 = redEffect(piexls2);
            break;
        case 3:
            //去背模式
            piexls2 = greenScreen(piexls2);
            break;
    }
    ctx2.putImageData(piexls2, 0, 0);
}
window.onload=function(){
    imgtoCan();
}

function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    // setInterval(function(){}, minSecs):設定運行頻率
    //回傳每16毫秒執行圖畫
    return setInterval(() => {
        //Canvas 2D 畫圖 4個參數
        ctx.drawImage(video, 0, 0, width, height);
        //將 canvas 上的圖像資訊存成畫素陣列
        let piexls = ctx.getImageData(0, 0, width, height);
        switch (type) {
            case 0:
                //原始模式
                // piexls = original(piexls);
                break;
            case 1:
                //R G B 分離殘影模式
                piexls = rgbSplit(piexls);
                break;
            case 2:
                //RED 效果模式
                piexls = redEffect(piexls);
                break;
            case 3:
                //去背模式
                piexls = greenScreen(piexls);
                break;
        }
        //輸出圖像資料到Canvas 2D
        ctx.putImageData(piexls, 0, 0);
    }, 16);
}

//takePhoto按鈕 拍照事件
function takePhoto(n) {
    //撥放音效
    snap.currentTime = 0;
    snap.volume=0.3;
    snap.play();

    //把canvas的資料轉成圖檔URL 的可下載連結並產生圖片再頁面下方
    // canvas.toDataURL('image/jpeg'):方法返回包括圖片展示的URL, type可在參數內自訂
    let data;
    if(n==0){
        data = canvas.toDataURL('image/jpeg');
    }else{
        data = canvas2.toDataURL('image/jpeg');
    }
    const link = document.createElement('a');
    link.href = data;
    // 設置下載功能:link.setAttribute('download', 'fileName');
    link.setAttribute('download', 'pretty');
    link.innerHTML = `<img src='${data}' alt='pretty gril' />`;
    // strip.insertBefore:插入功能。strip.insertBefore(data, location)
    // location使用:firstChild, lastChild, childNode[key]
    strip.insertBefore(link, strip.firstChild);
}

//R G B 分離殘影模式
function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {//因為 R G B A 所以迴圈要跳四
        pixels.data[i - 150] = pixels.data[i + 0]; //RED紅
        pixels.data[i + 500] = pixels.data[i + 1]; //GREEN綠
        pixels.data[i - 550] = pixels.data[i + 2]; //BLUE藍
        //pixels.data[i + 3];//A 透明度
    };
    return pixels;
}

//RED 效果模式
function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED
        pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
    }
    return pixels;
}

//去背模式
function greenScreen(pixels) {
    const levels = {};

    document.querySelectorAll('.rgb input').forEach((input) => {
        levels[input.name] = input.value;
    });
    for (i = 0; i < pixels.data.length; i = i + 4) {
        red = pixels.data[i + 0];
        green = pixels.data[i + 1];
        blue = pixels.data[i + 2];
        alpha = pixels.data[i + 3];

        if (red >= levels.rmin
            && green >= levels.gmin
            && blue >= levels.bmin
            && red <= levels.rmax
            && green <= levels.gmax
            && blue <= levels.bmax) {
            // take it out!
            pixels.data[i + 3] = 0;
        }
    }
    return pixels;
}

getViedo();
// 綁定事件canplay:當攝影頭準備使用時觸發
video.addEventListener('canplay', paintToCanvas);
ipt_rgb.forEach(function(){
    this.addEventListener("input",imgtoCan);
})