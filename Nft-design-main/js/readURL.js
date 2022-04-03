readUrl();
function readUrl(){
 
    var para_str = '';
   
    // Checking url is defined or not

     url = window.location.href; // e.g. ?num1=43&num2=23
     console.log(url);
     var token_ID = url.split('?');
     console.log("token_ID:"+token_ID);
     para_str = token_ID[1];
     console.log("para_str:"+para_str);
     if(para_str){
         document.getElementById("noID_text").style.display="none";
         document.getElementById("NFT_display").style.display="inline-flex";
         readNFT(para_str);
     }
     else{
        document.getElementById("noID_text").style.display="block";
        document.getElementById("NFT_display").style.display="none";
     }
    
   }
var readData;
function readNFT(token_ID){
    GenNFTS.methods.tokenURI(token_ID).call().then(res => {
			if (res) {
                var split_res=res.split('ipfs://')
				console.log("tokenURI:" + split_res[1]);
                $.getJSON('https://gateway.pinata.cloud/ipfs/'+split_res[1], function(data) {
                    readData=data;
                    console.log("data: "+readData.attributes[6].value)
                    document.getElementById("color1").innerHTML='<p style="color:'+readData.attributes[6].value+'>'+readData.attributes[6].value+'</p>'
                });
			} else if (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'NFT not minted'
                  })
			}
		})
}
