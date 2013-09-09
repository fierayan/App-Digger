var userName,appDes,promoteReason,submitTime,appIconSrc, appName,screenShotSrc={},appLink,appCategory;
var url="http://appshare.sinaapp.com/index.php/appdigger/like_obj";

function gatherInformation(){
    localStorage.removeItem("reason");
    localStorage.removeItem("des");
    userName=localStorage.getItem("userName");
    promoteReason=document.querySelector(".textarea_medium").value;
    appDes=document.querySelector(".textarea_large").value;
    submitTime=new Date();
    submitTime=submitTime.toISOString();
        if(promoteReason.length>=10){
            if(appDes.length>=20){
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

    var tmpName=document.querySelector(".textarea_small"),
        alwaysInfo=document.querySelector(".userInfo"),
        tmpReason=document.querySelector(".textarea_medium"),
        tmpDes=document.querySelector(".textarea_large"),
        subBtn=document.querySelector(".button");



    if(localStorage.getItem("userName")){
        tmpName.parentNode.setAttribute("class","wrap hide");
        alwaysInfo.setAttribute("class","userInfo");
        document.querySelector(".userInfo img").src="http://dayu.oa.com/avatars/"+localStorage.getItem("userName")+"/avatar.jpg";
        document.querySelector(".userInfo span").innerHTML=localStorage.getItem("userName");
    }else{
        tmpName.parentNode.setAttribute("class","wrap");
        alwaysInfo.setAttribute("class","userInfo  hide");
        tmpName.addEventListener("blur",function(event){
            var pattern=/[a-z]{5,}/;
            if(pattern.test(event.target.value)){
                tmpName.parentNode.setAttribute("class","wrap hide");
                alwaysInfo.querySelector("img").src="http://dayu.oa.com/avatars/"+event.target.value+"/avatar.jpg";
                alwaysInfo.querySelector("span").innerHTML=event.target.value;
                alwaysInfo.setAttribute("class","userInfo");
                localStorage.setItem("userName",event.target.value);
            }
        },false);
    }
    if(localStorage.getItem("reason")){
        tmpReason.value=localStorage.getItem("reason");
    }
    if(localStorage.getItem("des")){
        tmpDes.value=localStorage.getItem("des");
    }

    var textareaAll=document.querySelectorAll(".textarea");
    for(var i=0;i<textareaAll.length;i++){
        textareaAll[i].addEventListener("focus",function(event){
            event.target.parentNode.querySelector(".warn").setAttribute("class","warn");
        },false);
        textareaAll[i].addEventListener("blur",function(event){
            event.target.parentNode.querySelector(".warn").setAttribute("class","warn hide");
            localStorage.setItem(event.target.name,event.target.value);
        },false);
    }
    subBtn.addEventListener("click",gatherInformation,false);
});





