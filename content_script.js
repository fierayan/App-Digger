var appIconSrc, appName,screenShot, screenShotSrc={},appLink,appCategory;
var webHost=location.host;
appLink=location.href;
if(webHost=="play.google.com"){
    appName=document.querySelector(".document-title>div").innerText;
    appIconSrc=document.querySelector(".cover-image").getAttribute("src");
    appCategory=document.querySelector(".category>span").innerText;
    screenShot=document.querySelectorAll(".thumbnails>img.screenshot");
}else if(webHost=="itunes.apple.com"){
    var appIcon=document.querySelector("div.product img.artwork");
    appIconSrc=appIcon.getAttribute("src");
    appName=appIcon.getAttribute("alt");    //实体字符问题
    appCategory=document.querySelector(".genre>a").innerText;
    screenShot=document.querySelectorAll("img.portrait,img.landscape");
}
if(screenShot.length!==0&&screenShot.length>=4){
    for(var i=0;i<4;i++){
        screenShotSrc[i]=screenShot[i].getAttribute("src");
    }
}else if(screenShot.length!==0&screenShot.length<4){
    for(var i=0;i<screenShot.length;i++){
        screenShotSrc[i]=screenShot[i].getAttribute("src");
    }
}

chrome.runtime.sendMessage({
    appName:appName,
    appIconSrc:appIconSrc,
    shot_1:screenShotSrc[0],
    shot_2:screenShotSrc[1],
    shot_3:screenShotSrc[2],
    shot_4:screenShotSrc[3],
    appLink:appLink,
    appCategory:appCategory

}, function(response) {
    console.log(response.farewell);
});




