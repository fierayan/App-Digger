var userName,appDes,promoteReason,submitTime,appIconSrc, appName,screenShotSrc={},appLink,appCategory;
var url="http://appshare.sinaapp.com/index.php/appdigger/like_obj";

function gatherInformation(){
    localStorage.clear();
    userName=document.querySelector(".textarea_small").value;
    promoteReason=document.querySelector(".textarea_medium").value;
    appDes=document.querySelector(".textarea_large").value;
    submitTime=new Date();
    submitTime=submitTime.toISOString();
    var pattern=/[a-z]{5,}/;
    if(pattern.test(userName)){
        if(promoteReason.length>=10){
            if(appDes.length>=20){
                localStorage.setItem("userName",userName);
                localStorage.setItem("promoteReason",promoteReason);
                localStorage.setItem("appDes",appDes);
                localStorage.setItem("submitTime",submitTime);
                localStorage.setItem("appName",appName);
                localStorage.setItem("appIconSrc",appIconSrc);
                localStorage.setItem("shot_1",screenShotSrc[0]);
                localStorage.setItem("shot_2",screenShotSrc[1]);
                localStorage.setItem("shot_3",screenShotSrc[2]);
                localStorage.setItem("shot_4",screenShotSrc[3]);
                localStorage.setItem("appLink",appLink);
                localStorage.setItem("appCategory",appCategory);

                var info={
                    "userName": userName,
                    "submitTime": submitTime,
                    "appName": appName,
                    "appIconSrc": appIconSrc,
                    "screenShotSrc": [
                        {"shot_1":screenShotSrc[0]},
                        {"shot_2":screenShotSrc[1]},
                        {shot_3:screenShotSrc[2]},
                        {shot_4:screenShotSrc[3]}
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
        });
    if(localStorage.getItem("userName")){
        document.querySelector(".textarea_small").value=localStorage.getItem("userName");
    }
    var subBtn=document.querySelector(".button");
    subBtn.addEventListener("click",gatherInformation,false);
});





