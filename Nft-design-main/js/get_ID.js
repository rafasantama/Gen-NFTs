function get_id(){
    var getID=document.getElementById("IDnumber").value;
    if(getID){
        url = window.location.href;
        console.log(url);
        var token_ID = url.split('?');
        console.log("token_ID:"+token_ID);
        para_str = token_ID[1];
        console.log("getID:"+getID);
        location.href=token_ID[0]+'?'+getID;
    }
}