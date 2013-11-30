var url="http://mobile.oa.com/appdigger/index.php/appdigger/like_obj",
    userInfo=document.querySelector(".userInfo"),
    tmpReason=document.querySelector(".textarea_medium"),
    tmpDes=document.querySelector(".textarea_large"),
    subBtn=document.querySelector(".button"),
    mainBtn=document.querySelector(".button-wrap"),
    mainBtn_left=document.querySelector(".button_half_left"),
    userName,
    appDes,
    promoteReason,
    submitTime,
    appIconSrc,
    appName,
    screenShotSrc={},
    appLink,
    appCategory,
    userSend;

function switchWarn(event){
    var eTarget=event.target;
    if(eTarget.name==="reason"){
        if(eTarget.value.length>=10){
            eTarget.parentNode.querySelector(".warn").setAttribute("class","warn hide");
        }else{
            eTarget.parentNode.querySelector(".warn").setAttribute("class","warn");
        }
    }else{
        if(eTarget.value.length>=20){
            eTarget.parentNode.querySelector(".warn").setAttribute("class","warn hide");
        }else{
            eTarget.parentNode.querySelector(".warn").setAttribute("class","warn");
        }
    }
}
function switchWarnWithClip(event){
    var clip=event.clipboardData.getData('text/plain');
    var eTarget=event.target;
    if(eTarget.name==="reason"){
        if(eTarget.value.length+clip.length>=10){
            eTarget.parentNode.querySelector(".warn").setAttribute("class","warn hide");
        }else{
            eTarget.parentNode.querySelector(".warn").setAttribute("class","warn");
        }
    }else{
        if(eTarget.value.length+clip.length>=20){
            eTarget.parentNode.querySelector(".warn").setAttribute("class","warn hide");
        }else{
            eTarget.parentNode.querySelector(".warn").setAttribute("class","warn");
        }
    }
}
function decideSender(){
    if(userName==userSend){
        chrome.browserAction.setBadgeBackgroundColor({color: "#3498DB"});
        chrome.browserAction.setBadgeText({text: "E"});
        chrome.browserAction.setIcon({path:"icon_current.png"});
        mainBtn.setAttribute("class","button-wrap");
    }else{
        subBtn.setAttribute("class","button");
        chrome.browserAction.setBadgeBackgroundColor({color: "transparent"});
        chrome.browserAction.setBadgeText({text: ""});
        chrome.browserAction.setIcon({path:"icon.png"});
    }
}
function getSender(){
    var url='http://meeting.tmt.io/recorder.json#';
    var xhr = new XMLHttpRequest();
    try {
        xhr.onreadystatechange = function () {
            console.log(xhr);
            if (xhr.readyState != 4)
                return;
            if(xhr.responseText){
                var jsonCallback=xhr.responseText.toString();
                jsonCallback=jsonCallback.slice(13,jsonCallback.length-4);
                userSend=jsonCallback;
                decideSender();
            }
        };
        xhr.onerror = function (error) {
            console.log(error)
        };
        xhr.open("GET", url, true);
        xhr.send(null);
    } catch (e) {
        console.error("exception"+ e);
    }
}
function getUserInfo(){
    var urlOA='http://www.oa.com/api/GetPendingCount.ashx';
    var xhr = new XMLHttpRequest();
    try {
        xhr.onreadystatechange = function () {
            console.log(xhr);
            if (xhr.readyState != 4)
                return;
            if(xhr.responseText){
                var jsonCallback=xhr.responseText.toString();
                jsonCallback=jsonCallback.substr(1,jsonCallback.length-2);
                if(jsonCallback.indexOf(",")===15){
					userInfo.querySelector("img").setAttribute("style","display:none;");
					userInfo.querySelector("span").innerHTML="Please Login OA!";
                    chrome.tabs.create({url:'http://passport.oa.com/modules/passport/signin.ashx'}, function(tab){console.log(tab)});
					setTimeout(window.close,1500);       
                }else{
                    var oaName=JSON.parse(jsonCallback);
                    userName=oaName.EnglishName;
                    userInfo.querySelector("img").src="http://dayu.oa.com/avatars/"+userName+"/avatar.jpg";
                    userInfo.querySelector("span").innerHTML=userName;
                    localStorage.setItem("userName",userName);
                    getSender();
                }
            }
        };

        xhr.onerror = function (error) {
            console.log(error)
        };

        xhr.open("GET", urlOA, true);
        xhr.send(null);
    } catch (e) {
        console.error("exception"+ e);
    }
}
function gatherInformation(){
    localStorage.removeItem("reason");
    localStorage.removeItem("des");
    promoteReason=document.querySelector(".textarea_medium").value;
    appDes=document.querySelector(".textarea_large").value;
    submitTime=new Date();
    submitTime=submitTime.toISOString();
        if(promoteReason.length>=10){
            if(appDes.length>=20){
                if(userName!=="" && submitTime!=="" && appName!=="" && appIconSrc!=="" && appDes!=="" && promoteReason!==""){
                    var info={
                        "userName": userName,
                        "submitTime": submitTime,
                        "appName": appName,
                        "appIconSrc": appIconSrc,
                        "screenShotSrc": [
                            {"shot_1":screenShotSrc[0]},
                            {"shot_2":screenShotSrc[1]},
                            {"shot_3":screenShotSrc[2]},
                            {"shot_4":screenShotSrc[3]}
                        ],
                        "appDes":appDes,
                        "promoteReason":promoteReason,
                        "appLink":appLink,
                        "appCategory":appCategory
                    }
                    var subForm=document.createElement("form");
                    var subInput=document.createElement("input");
                    subForm.appendChild(subInput);
                    subInput.type="text";
                    subInput.value=JSON.stringify(info);
                    subInput.name="info";
                    subForm.action=url;
                    subForm.method="post";
                    subForm.submit();
                }else{
                    document.querySelector("#pop").setAttribute("class","pop");
                    setTimeout(function(){
                        document.querySelector("#pop").setAttribute("class","pop hide");
                    },1000);
                }
            }else{
                document.querySelector("#desWarn").setAttribute("class","warn");
            }
        }else if(appDes.length<20){
            document.querySelector("#reasonWarn").setAttribute("class","warn");
            document.querySelector("#desWarn").setAttribute("class","warn");
        }else{
            document.querySelector("#reasonWarn").setAttribute("class","warn");
        }
}

document.addEventListener('DOMContentLoaded', function (){

    chrome.tabs.executeScript(null, {file: "content_script.js"});
    chrome.runtime.onMessage.addListener(
        function(request,sender, sendResponse) {
            appName=request.appName;
            appIconSrc=request.appIconSrc;
            appLink=request.appLink;
            appCategory=request.appCategory;
            screenShotSrc[0]=request.shot_1;
            screenShotSrc[1]=request.shot_2;
            screenShotSrc[2]=request.shot_3;
            screenShotSrc[3]=request.shot_4;
            sendResponse({farewell: "goodbye"});
        }
    );
    if(localStorage.getItem("userName")){
        userName=localStorage.getItem("userName");
        userInfo.querySelector("img").src="http://dayu.oa.com/avatars/"+userName+"/avatar.jpg";
        userInfo.querySelector("span").innerHTML=userName;
        getSender();
    }else{
        getUserInfo();
    }
    if(localStorage.getItem("reason")){
        tmpReason.value=localStorage.getItem("reason");
    }
    if(localStorage.getItem("des")){
        tmpDes.value=localStorage.getItem("des");
    }
    var textareaAll=document.querySelectorAll(".textarea");
    for(var i=0;i<textareaAll.length;i++){
        if(i==1){
            textareaAll[i].addEventListener("focus",switchWarn,false);
        }
        textareaAll[i].addEventListener("keyup",switchWarn,false);
        textareaAll[i].addEventListener("paste",switchWarnWithClip,false);
        textareaAll[i].addEventListener("blur",function(event){
            localStorage.setItem(event.target.name,event.target.value);
            switchWarn(event);
        },false);
    }
    subBtn.addEventListener("click",gatherInformation,false);
    mainBtn_left.addEventListener("click",gatherInformation,false);
});
