function get_id(){
    var getID=document.getElementById("IDnumber").value;
    url = window.location.href;
    console.log(url);
    var token_ID = url.split('?');
    console.log("token_ID:"+token_ID);
    para_str = token_ID[1];
    console.log("para_str:"+para_str);
    if(para_str){
        url=token_ID[0];
    }
    location.href=url+'?'+getID;
}