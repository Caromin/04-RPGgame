// counter for displayingPokemon() after your pokemon is picked
var x = 0;
var pokemonHP;
var pokemonAttack;
var enemyHP;
var enemyAttack;

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
		console.log(this.id);
// passing the id and src parameters to the myPokemon div		
		myPokemon(this.id, this.src);
// now removing the choosen pokemon from the array to generate the enemy pokemon		
		pokemon.splice(this.id, 1);
// consolelogging the array again to check if it worked as expected		
		console.log(pokemon);
// running the displayPokemon now, but it will display in battleField div		
		displayPokemon();
//why does this onclick only work when it is inside this, but not ouside by itself?		
		$(".confirm").on("click", function() {
			console.log(this.id);
			attack(this.id);
		});
	});
});


function displayPokemon() {
		for (i = 0; i < pokemon.length; i++) {
			var img = $('<img>')
				.attr('src', pokemon[i].picture)	
				.attr("class", "img-responsive" )
				.attr("id", 'pokemon[' + i + ']')
			if (x === 0) {		
				$("#choosePokemon").append(img);
			} else {
				img.attr("class", "float-right");
				img.css("width", "20%")
				.attr("data-hp", Math.floor(Math.random() * 30) + 10)
				.attr("data-attack", Math.floor(Math.random() * 10) + 5);
			var button = $('<button>')
				.text("Attack!")
				.attr("id", 'pokemon[' + i + ']')
				.addClass("confirm btn btn-primary col float-right")	
				.css({"width": "20%", "clear": "both"})
				$("#enemies").append(button);
				$("#enemies").append(img) ;
				enemyHP = img.attr('data-hp');
				enemyAttack = img.attr('data-attack');

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
		.attr("id", "mine")
		.attr("data-hp", Math.floor(Math.random() * 30) + 10)
		.attr("data-attack", Math.floor(Math.random() * 10) + 5);
		$("#myPokemon").append(mine);
		pokemonHP = mine.attr('data-hp');
		pokemonAttack = mine.attr('data-attack');

}

function attack(id) {
		if (enemyHP !== 0  && pokemonHP > 0) {
			enemyHP = enemyHP - pokemonAttack 
		}
			else if (enemyHP <= 0 && pokemonHP > 0) {
				console.log("you won!");
				
			}
}

function endScreen() {

}