var blocks;
$(document).ready(function() {
	//blocks = jQuery.parseJSON('[{"index":0,"previousHash":"0","timestamp":1465154705,"data":"my genesis block!!","hash":"816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7"},{"index":1,"previousHash":"816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7","timestamp":1509778846.159,"data":{"doctor":"Axel Fratoni","droga":"Xanax","dosis":"150mg","hashUsuario":"asdfghjklm","comentario":"Te amo bebu","status":"ok"},"hash":"56dadf1fe120e87b7d93d1ac21e74db1f4080b73fbec4d93dfddd53798427d4b"},{"index":2,"previousHash":"56dadf1fe120e87b7d93d1ac21e74db1f4080b73fbec4d93dfddd53798427d4b","timestamp":1509778923.082,"data":{"doctor":"Juan Domingo Peron","droga":"Penicilina","dosis":"100mg","hashUsuario":"lidsfughoehriuewrhiuwer","comentario":"","status":true},"hash":"13c561177fc734e69a34365e3a2415981c1ceab5efb8ce64946e6a787a91f92a"},{"index":3,"previousHash":"13c561177fc734e69a34365e3a2415981c1ceab5efb8ce64946e6a787a91f92a","timestamp":1509778976.566,"data":{"doctor":"Stefan Molyneaux","droga":"Red pills","dosis":"1000kg","hashUsuario":"aisdjoasidmolymemeaosjdasijod","comentario":"Not an argument","status":false},"hash":"bb0dacb6720652fb6bd63011c1abd51cfe493716358366c51119fb04a94cce93"},{"index":4,"previousHash":"bb0dacb6720652fb6bd63011c1abd51cfe493716358366c51119fb04a94cce93","timestamp":1509779017.305,"data":{"doctor":"Julian Antonielli","droga":"Lo ke venga jaja","dosis":"5g","hashUsuario":"kasjdoij34oi4jroiwj34","comentario":"Aguante mi pelo vieji","status":false},"hash":"ff8f53dea64460382c206a750576e76a4fcc1da07405042bdc75a973a7c08aba"}]');
	/*console.log("Esto es lo que me da: " );
	console.log("Mildo blocks.json");*/
	$.ajax({
		url: 'http://ba1c2423.ngrok.io/blocks',
		type: 'GET',
		//  beforeSend: function(xhr){xhr.setRequestHeader('Access-Control-Allow-Origin', '*');},
		success: function(data) {
			blocks = JSON.parse(data);
			console.log(data);
			if (blocks.length <= 4) {
				for (i = 1; i < blocks.length; i++) {
					var currentblock = blocks[i].data;
					$('#chain').append(
						'<div class="tile_stats_count block">' +
							'<a href="#" data-toggle="tooltip" data-placement="top" title="Index: ' +
							blocks[i].index +
							' Hash:' +
							blocks[i].hash +
							'" style="float:right;"><b>?</b></a>' +
							'<p><b>Doctor</b>: ' +
							currentblock.doctor +
							'</p>' +
							'<p><b>Droga</b>: ' +
							currentblock.droga +
							'</p>' +
							'<p><b>Dosis</b>: ' +
							currentblock.dosis +
							'</p>' +
							'<p><b>Comentario</b>: ' +
							currentblock.comentario +
							'</p>' +
							'</div>'
					);
				}
			} else {
				for (i = blocks.length - 4; i < blocks.length; i++) {
					var currentblock = blocks[i].data;
					$('#chain').append(
						'<div class="tile_stats_count block">' +
							'<a href="#" data-toggle="tooltip" data-placement="top" title="Index: ' +
							blocks[i].index +
							' Hash:' +
							blocks[i].hash +
							'" style="float:right;"><b>?</b></a>' +
							'<p><b>Doctor</b>: ' +
							currentblock.doctor +
							'</p>' +
							'<p><b>Droga</b>: ' +
							currentblock.droga +
							'</p>' +
							'<p><b>Dosis</b>: ' +
							currentblock.dosis +
							'</p>' +
							'<p><b>Comentario</b>: ' +
							currentblock.comentario +
							'</p>' +
							'</div>'
					);

					$(document).ready(function() {
						$('[data-toggle="tooltip"]').tooltip();
					});
				}
			}
		}
	});
	/*

	$.ajax({
		url: "http://localhost:3001/blocks",
		//dataType: "jsonp",
		type: "GET",
		beforeSend: function(xhr){xhr.setRequestHeader('Access-Control-Allow-Origin', '*');},
		success: function(data){
				blocks = data;
				console.log()
				console.log("Esto es lo que me da: ");
				for(i = blocks.length+1-5; i < blocks.length; i++) {
					var currentblock = blocks[i].data;

					console.log(blocks[i].data.doctor);
					$("#chain").append('<div class="tile_stats_count block">'
						+ '<a href="#" data-toggle="tooltip" data-placement="top" title="Index: '+blocks[i].index+' Hash:'+blocks[i].hash+'" style="float:right;"><b>?</b></a>'
						+ '<p><b>Doctor</b>: '+currentblock.doctor+'</p>'
						+ '<p><b>Droga</b>: '+currentblock.droga+'</p>'
						+ '<p><b>Dosis</b>: '+currentblock.dosis+'</p>'
						+ '<p><b>Comentario</b>: '+currentblock.comentario+'</p>'
					    + '</div>');
				}
			},
		error: function(data){
			console.log("FALLO");
		}
	});*/
});
