console.log("welcome to fligs search");

(function(){
	getAirports();
})();

function getAirports () {
	$.ajax({
		url: '/airports',
		success: data=>data.map(a=>$('#from,#to').append($('<option>').html(a)))
	});
}

function search(){
	console.log("Buscando...");

	$.ajax({
		method:"POST",
		url:"/vuelos",
		data: {
			from: $("#from").val(),
			to: $("#to").val(),
			price: $("#price").val()
		},
		success: (data)=>{
			console.log(data);
			$('.results-container').html('');
			data.map(cluster=>{
				let $clusterTpl = $($('#clusterTpl').html());
				let $tramosContainer = $clusterTpl.find('.tramos-container');
				cluster.map(tramo=>{
					let $tramoTpl =  $($('#tramoTpl').html());
					$tramoTpl.find('.from').html(tramo.from);
					$tramoTpl.find('.to').html(tramo.to);
					$tramosContainer.append($tramoTpl)
				});
				$('.results-container').append($clusterTpl);
			});
		}
	});
}
