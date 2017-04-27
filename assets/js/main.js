// counter for displayingPokemon() after your pokemon is picked
var x = 0;
var pokemonHP;
var pokemonAttack;
var currentEnemyHP;
var currentEnemyAttack;
var picked = "";
var photo = "";

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
		picked = this.id;
		photo = this.src; 
// passing the id and src parameters to the myPokemon div		
		myPokemon(picked, photo);
// now removing the choosen pokemon from the array to generate the enemy pokemon		
		pokemon.splice(this.id, 1);
// consolelogging the array again to check if it worked as expected		
		console.log(pokemon);
// running the displayPokemon now, but it will display in battleField div		
		displayPokemon();
//why does this onclick only work when it is inside this, but not ouside by itself?		
		$(".confirm").on("click", function() {
			var getValueButton = this
  				if (currentEnemyHP >= 0 ){
  				  				$('.confirm').not(getValueButton).prop('disabled', true);
  				  			} else { 
  				  				$(this).removeClass("confirm");		
								$(this).prop('disabled', true);
								$('.confirm').prop('disabled', false);	}
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
				currentEnemyHP = img.attr('data-hp');
				currentEnemyAttack = img.attr('data-attack');

			}
		};
// increases x by 1 so next time the for loop runs, a different path will happen		
	x++;
}

// similar to displayPokemon() but for myPokemon and floated to the left
function myPokemon(pick, photo) {
	var mine = $('<img>')
		.attr('src', photo)
		.attr("class", "img-responsive float-left" )
		.attr("id", "mine")
		.attr("data-hp", Math.floor(Math.random() * 30) + 15)
		.attr("data-attack", Math.floor(Math.random() * 10) + 5);
		$("#myPokemon").append(mine);
		pokemonHP = mine.attr('data-hp');
		pokemonAttack = mine.attr('data-attack');

}

function attack(id) {
// checks to see if any pokemon is below or equal to 0hp		
		if (currentEnemyHP !== 0  && pokemonHP >= 0) {
			currentEnemyHP = currentEnemyHP - pokemonAttack;
			pokemonHP = pokemonHP - currentEnemyAttack;
			console.log("enemyhp: " + currentEnemyHP);
			console.log("myhp: " + pokemonHP);
				if (currentEnemyHP <= 0 && pokemonHP > 0) {
					pokemonHP += 20;
					console.log("currenthp " + pokemonHP);
					console.log("you won!");
					$('#' + id + '').prop('disabled', true);		
				}
		}
// if both hp are below 0hp then game over and disables attacks				
		if (currentEnemyHP > 0 && pokemonHP <= 0 || currentEnemyHP <= 0 && pokemonHP <= 0) {
			alert("sorry you lost!");
			$('.confirm').prop('disabled', true);	
		}	
}

function endScreen() {

}