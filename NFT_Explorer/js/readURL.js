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
         readNFT(para_str);
     }
     else{
        document.getElementById("noID_text").style.display="block";
        document.getElementById("NFT_display").style.display="none";
        readNFTtable();
     }
    
   }
var readData;
var attribute_table= document.getElementById("attribute_table");
async function readNFT(token_ID){
    try{
        await GenNFTS.methods.tokenURI(token_ID).call().then(res => {
            var split_res=res.split('ipfs://')
            console.log("tokenURI:" + split_res[1]);
            $.getJSON('https://gateway.pinata.cloud/ipfs/'+split_res[1], function(data) {
                readData=data;
                console.log("data: "+readData);
                // console.log("data: "+readData.attributes[6].value)
                console.log("longitud de atributos: "+readData.attributes.length);
                document.getElementById("nft_name").innerHTML= readData.name;
                document.getElementById("nft_description").innerHTML=readData.description;
                document.getElementById("nft_img").src="https://gateway.pinata.cloud/ipfs/"+data.image.split("://").pop();
                for(var i = 0;i<readData.attributes.length;i++){
                    var trait_name=readData.attributes[i].trait_type;
                    var trait_value=readData.attributes[i].value;
                    if(trait_name.includes('%color')) {
                        attribute_table.innerHTML+='<tr><td style="color:'+readData.attributes[i-1].value+';">'+trait_name+'</td><td  style="color:'+readData.attributes[i-1].value+';">'+trait_value+'</td></tr>';
                    }
                    else if (trait_name.includes('color')){
                        attribute_table.innerHTML+='<tr><td style="color:'+trait_value+';">'+trait_name+'</td><td style="color:'+trait_value+';">'+trait_value+'</td></tr>';
                    }
                    else{
                        attribute_table.innerHTML+='<tr><td>'+trait_name+'</td><td>'+trait_value+'</td></tr>';
                    }
                }
                stop_preloader();
                document.getElementById("NFT_display").style.display="flex";
            });
        })
    }
    catch{
        stop_preloader()
        Swal.fire({
            icon: 'error',
            title: 'NFT no existe',
            html: 'No pudimos encontrar el ID #'+token_ID+' en el contrato: <a target="_blank" href="'+explorer_url+"token/"+contractAddress+'">'+contractAddress+'</a>' ,
            // footer: '<a href="">Why do I have this issue?</a>'
          })
        document.getElementById("noIDcreated").style.display="block";
        document.getElementById("NFT_display").style.display="none";
    }

    try{
        await GenNFTS.methods.ownerOf(token_ID).call().then(res => {
                console.log("Owner del NFT: "+res);
                document.getElementById("owner_address").innerHTML=res;
                document.getElementById("owner_address").href=explorer_url+"address/"+res;
            })
    }
    catch{
        console.log("No NFT owner cause no NFT exist");
        document.getElementById("noIDcreated").style.display="block";
        document.getElementById("NFT_display").style.display="none";
    }

}


