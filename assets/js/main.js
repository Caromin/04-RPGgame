// counter for displayingPokemon() after your pokemon is picked
var x = 0;

// names and picture urls for all the pokemon
var pokemon = [{picture: "assets/images/001Bulbasaur.png", name: "Bulbasaur"},
 {picture: "assets/images/004Charmander.png", name: "Charmander"},
  {picture: "assets/images/007Squirtle.png", name: "Squirtle"}];

// on windows load this will run
$(window).on("load", function() {
	displayPokemon();
	$('#battleField').hide();
// once one of the pokemon is selected, the select screen will hide and the battlefield div will appear	
	$("img").on("click", function() {
		$('#choosePokemon').hide();
		$('#battleField').show()
// checking the id on the image that i clicked		
		console.log(this.src);
// passing the id and src parameters to the myPokemon div		
		myPokemon(this.id, this.src);
// now removing the choosen pokemon from the array to generate the enemy pokemon		
		pokemon.splice(this.id, 1);
// consolelogging the array again to check if it worked as expected		
		console.log(pokemon);
// running the displayPokemon now, but it will display in battleField div		
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
				$("#enemies").append("<br /><button id=" + pokemon[i].name +" class='btn btn-primary col float-right' style='width: 20%; clear:both;'>Attack!</button>")
				$("#enemies").append(img) ;

			}
		};
// increases x by 1 so next time the for loop runs, a different path will happen		
	x++;
}

// similar to displayPokemon() but for myPokemon and floated to the left
function myPokemon(id, src) {
	var mine = $('<img>')
		.attr('src', src)
		.attr("class", "img-responsive float-left" )
		.attr("id", src)
		.attr("data-hp", Math.floor(Math.random() * 30) + 10)
		.attr("data-attack", Math.floor(Math.random() * 10) + 5);
		$("#myPokemon").append(mine);
}

$("button").on("click", function() {
	console.log("is this working?");
});