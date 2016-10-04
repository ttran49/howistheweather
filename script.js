
function hide_and_show(hideid,showid){
    var targethide = document.getElementById(hideid);
    var targetshow= document.getElementById(showid);

        targethide.style.display='none';
        targetshow.style.display='block';
        var stateObj = { foo: "bar" };
        history.pushState(stateObj, "page 2", "#"+showid);
}
function hide_all (firstid,secondid){
    var target1= document.getElementById(firstid);
    var target2= document.getElementById(secondid);

    target1.style.display='none';
    target2.style.display='none';
}
function draw(){
    var string1=[["░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░<br>",
                "░░░░░░░░░░▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄░░░░░░░░░<br>",
                "░░░░░░░░▄▀░░░░░░░░░░░░▄░░░░░░░▀▄░░░░░░░<br>",
                "░░░░░░░░█░░▄░░░░▄░░░░░░░░░░░░░░█░░░░░░░<br>",
                "░░░░░░░░█░░░░░░░░░░░░▄█▄▄░░▄░░░█░▄▄▄░░░<br>",        
                "░▄▄▄▄▄░░█░░░░░░▀░░░░▀█░░▀▄░░░░░█▀▀░██░░<br>",                   
                "░██▄▀██▄█░░░▄░░░░░░░██░░░░▀▀▀▀▀░░░░██░░<br>",                   
                "░░▀██▄▀██░░░░░░░░▀░██▀░░░░░░░░░░░░░▀██░<br>",
                "░░░░▀████░▀░░░░▄░░░██░░░▄█░░░░▄░▄█░░██░<br>",
                "░░░░░░░▀█░░░░▄░░░░░██░░░░▄░░░▄░░▄░░░██░<br>",
                "░░░░░░░▄█▄░░░░░░░░░░░▀▄░░▀▀▀▀▀▀▀▀░░▄▀░░<br>",
                "░░░░░░█▀▀█████████▀▀▀▀████████████▀░░░░<br>",
                "░░░░░░████▀░░███▀░░░░░░▀███░░▀██▀░░░░░░<br>",
                "░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░<br>"],
               ["'.,¸,.·*¯`·.,¸,.·.... ╭━━━━╮<br>",
                "`·.,¸,.·*¯`·.,¸,.·*¯. |:::::: /\\:___:/\\<br>",
                "`·.,¸,.·*¯`·.,¸,.·* <|::::: (｡◕‿‿ ◕)<br>",
                "`·.,¸,.·*¯`·.,¸,.·* ╰O--O----O-O<br>"]];
    //create a element
    var element=document.getElementById("drawspace");
    var face= Math.round(Math.random()*1);
    console.log(face);
    for (i =0; i< string1[face].length;i++){
        //drawing
        (function(data){
            window.setTimeout(function(){
                element.innerHTML+=data;   
            },200*i);
        }(string1[face][i]));
    }
}

function erase(){
    $("#drawspace").empty();

}

$(window ).load(function() {
    $("#drawbutton").click(draw);
    $("#erasebutton").click(erase);    
});
$(window).on("hashchange", function (){
//console.log(location.hash);
    if(location.hash == "#catvideo"){
        hide_and_show("dogvideo","catvideo");
    } else {
        hide_and_show("catvideo", "dogvideo");
    }
});