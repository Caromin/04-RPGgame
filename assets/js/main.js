var x = 0;

var pokemon = [{picture: "assets/images/001Bulbasaur.png", name: "Bulbasaur"},
 {picture: "assets/images/004Charmander.png", name: "Charmander"},
  {picture: "assets/images/007Squirtle.png", name: "Squirtle"}];

$(window).on("load", function() {
	displayPokemon();
	$('#battleField').hide();
	$("img").on("click", function() {
		$('#choosePokemon').hide();
		$('#battleField').show()
// get the id on the image that i clicked		
		console.log(this.src);
		myPokemon(this.id, this.src);
		pokemon.splice(this.id, 1);
		console.log(pokemon);
		displayPokemon();
	});
});


function displayPokemon() {
		for (i = 0; i < pokemon.length; i++) {
			var img = $('<img>')
				.attr('src', pokemon[i].picture)	
				.attr("class", "img-responsive" )
				.attr("id", i);
			if (x === 0) {		
				$("#choosePokemon").append(img);
			} else {
				img.attr("class", "float-right");
				img.css("width", "20%")
				.attr("data-hp", Math.floor(Math.random() * 30) + 10)
				.attr("data-attack", Math.floor(Math.random() * 10) + 5);
				$("#enemies").append("<br /><button id=" + i + " class='btn btn-primary col float-right' style='width: 20%; clear:both;'>Attack!</button>")
				$("#enemies").append(img) ;

			}
		};
	x++;
}

function myPokemon(id, src) {
	var mine = $('<img>')
		.attr('src', src)
		.attr("class", "img-responsive float-left" )
		.attr("id", src)
		.attr("data-hp", Math.floor(Math.random() * 30) + 10)
		.attr("data-attack", Math.floor(Math.random() * 10) + 5);
		$("#myPokemon").append(mine);

}

