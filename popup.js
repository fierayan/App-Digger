var userName,appDes,promoteReason,submitTime,appIconSrc, appName,screenShotSrc={},appLink,appCategory;
var url="http://appshare.sinaapp.com/index.php/appdigger/like_obj";

function gatherInformation(){
    userName=localStorage.getItem("userName");
    promoteReason=document.querySelector(".textarea_medium").value;
    appDes=document.querySelector(".textarea_large").value;
    submitTime=new Date();
    submitTime=submitTime.toISOString();

    if(pattern.test(userName)){
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
                subForm.action="http://appshare.sinaapp.com/index.php/appdigger/like_obj";
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
    }else if(promoteReason.length<10){
        if(appDes.length<20){
            document.querySelector("#userWarn").setAttribute("class","warn");
            document.querySelector("#reasonWarn").setAttribute("class","warn");
            document.querySelector("#desWarn").setAttribute("class","warn");
        }else{
            document.querySelector("#userWarn").setAttribute("class","warn");
            document.querySelector("#reasonWarn").setAttribute("class","warn");
        }
    }else{
        document.querySelector("#userWarn").setAttribute("class","warn");
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
        document.querySelector(".textarea_small").parentNode.setAttribute("class","wrap hide");
        document.querySelector(".userInfo").setAttribute("class","userInfo");
        document.querySelector(".userInfo img").src="http://dayu.oa.com/avatars/"+localStorage.getItem("userName")+"/avatar.jpg";
        document.querySelector(".userInfo span").innerHTML=localStorage.getItem("userName");
    }else{
        var once=document.querySelector(".textarea_small");
        once.parentNode.setAttribute("class","wrap");
        var always=document.querySelector(".userInfo");
        always.setAttribute("class","userInfo  hide");
        once.addEventListener("keypress",function(event){
            if(event.keyCode===13){
                var pattern=/[a-z]{5,}/;
                if(pattern.test(event.target.value)){
                    event.preventDefault();
                    once.setAttribute("class","wrap hide");
                    always.querySelector("img").src="http://dayu.oa.com/avatars/"+event.target.value+"/avatar.jpg";
                    always.querySelector("span").innerHTML=event.target.value;
                    always.setAttribute("class","userInfo");
                    localStorage.setItem("userName",event.target.value);
                }
            }
        },false);
    }
    var textareaAll=document.querySelectorAll(".textarea");
    for(var i=0;i<textareaAll.length;i++){
        textareaAll[i].addEventListener("focus",function(event){
            event.target.parentNode.querySelector(".warn").setAttribute("class","warn");
        },false);
        textareaAll[i].addEventListener("blur",function(event){
            event.target.parentNode.querySelector(".warn").setAttribute("class","warn hide");
        },false);
    }
    var subBtn=document.querySelector(".button");
    subBtn.addEventListener("click",gatherInformation,false);
});





