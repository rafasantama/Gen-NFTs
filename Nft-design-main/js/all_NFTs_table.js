var NFTs_table
async function readNFTtable(){
    console.log("read NFT table");
    document.getElementById("NFT_table_card").style.display="block";
    NFTs_table=$('#all_NFTs').DataTable({
        "columns": [
            { "title": "TokenID" },
            { "title": "NFT" },
            { "title": "Color Principal" },
        ],
        "language": {
            "lengthMenu": "Mostrar _MENU_ NFTs",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando NFTs del _START_ al _END_ de un total de _TOTAL_ NFTs",
            "infoEmpty": "Mostrando NFTs del 0 al 0 de un total de 0 NFTs",
            "infoFiltered": "(filtrado de un total de _MAX_ NFTs)",
            "sSearch": "Buscar:",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "sProcessing": "Procesando...",
        }
    });
    $('#all_NFTs').on('click', 'tbody tr', function() {

        //get textContent of the TD
        console.log('TD cell textContent : ', this.textContent)
      
        //get the value of the TD using the API 
        var NFTID= NFTs_table.cell({ row: this.parentNode.rowIndex }).data();
        console.log('value by API : ', NFTID.split("#").pop());
        url = window.location.href;
        console.log(url);
        var token_ID = url.split('?');
        location.href=token_ID[0]+'?'+NFTID.split("#").pop();
      })
    console.log("Changing to cards!");
    document.getElementById("all_NFTs").classList.add('cards');
    document.getElementById("btToggleDisplay").innerHTML="Ver Modo Tabla";
    // document.getElementById("all_NFTs_filter").style.display="none";
    try{
        await GenNFTS.methods.totalSupply().call().then(res => {
            console.log("TotalSupply: "+res);
            loop_NFTs(res);
        })
    }
    catch{
        console.log("error al leer total supply");
    }
    stop_preloader();
}

async function loop_NFTs(totalSupply){
    for (var i = 1; i<= totalSupply; i++){
        var iNFT = await GenNFTS.methods.tokenURI(i).call();
        console.log(iNFT);
        read_json(i,iNFT);
    }
}

function read_json(tokenID,token_URI){
	$.getJSON('https://gateway.pinata.cloud/ipfs/'+token_URI.split("://").pop(), function(data) {
		console.log(data);
		console.log(data.name);
		console.log(data.image);
		var imgHTML= '<img src="https://gateway.pinata.cloud/ipfs/'+data.image.split("://").pop()+'" width="100px" height="auto" alt="" />'
        var colorHTML= 'Color Principal: '+'<p style="color:'+data.attributes[6].value+'">'+data.attributes[6].value+'</p>';
        NFTs_table.row.add(['#'+tokenID,imgHTML,colorHTML]).draw(false);
	});
}

$('#btToggleDisplay').on('click', function () {
    if(document.getElementById("btToggleDisplay").innerHTML=="Ver Modo Tarjetas"){
        console.log("Changing to cards!");
        document.getElementById("all_NFTs").classList.add('cards');
        document.getElementById("btToggleDisplay").innerHTML="Ver Modo Tabla";
    }
    else {
        console.log("Changing to table!");
        document.getElementById("all_NFTs").classList.remove('cards');
        document.getElementById("btToggleDisplay").innerHTML="Ver Modo Tarjetas";
    }

})

