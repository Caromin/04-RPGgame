// the two major problems left when i stopped working on it:
// the timing from when i remove the choosen pokemon and post the enemy ones created a duplicate
// if i someone other than Bulbasaur.

// the other problem was resetting the current enemy hp and attack for the next pokemon
// easier if only two but as it is set up now it is not able to scale properly for unlimited battles









// counter for displayingPokemon() after your pokemon is picked
var x = 0;

// pushed my pokemon stats here
var pokemonHP;
var pokemonAttack;

// pushed enemy pokemon stats here PROBLEM, see above notes
var currentEnemyHP;
var currentEnemyAttack;

// used to link name and image to my pokemon function
// MAYBE WHERE THE PROBLEM HAPPENED ABOVE
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
// if statement to block all other buttons not pressed to help control options			
  				if (currentEnemyHP >= 0 ){
  				  				$('.confirm').not(getValueButton).prop('disabled', true);
  				  			} else {
// this section is not properly vetted, on how well it works  				  			 
  				  				$(this).removeClass("confirm");		
								$(this).prop('disabled', true);
								$('.confirm').prop('disabled', false);	}
// pushes this parameter to the attack function so i know who i am battling
			attack(this.id);

		});
	});
});

// inital pick screen
function displayPokemon() {
		for (i = 0; i < pokemon.length; i++) {
			var img = $('<img>')
				.attr('src', pokemon[i].picture)	
				.attr("class", "img-responsive" )
				.attr("id", 'pokemon[' + i + ']')
// for the first pass			
			if (x === 0) {		
				$("#choosePokemon").append(img);
			} 
// for the second pass, after pokemon is picked
			else {
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

//this is the function where the battle interactions happen
function attack(id) {
// checks to see if any pokemon is below or equal to 0hp		
		if (currentEnemyHP !== 0  && pokemonHP >= 0) {
			currentEnemyHP = currentEnemyHP - pokemonAttack;
			pokemonHP = pokemonHP - currentEnemyAttack;
			console.log("enemyhp: " + currentEnemyHP);
			console.log("myhp: " + pokemonHP);
// if enemy is defeated, hp goes up, BUT around this function
// is where one of the problems is			
				if (currentEnemyHP <= 0 && pokemonHP > 0) {
					pokemonHP += 20;
					console.log("currenthp " + pokemonHP);
					console.log("you won!");
					$('#' + id + '').prop('disabled', true);		
				}
		}
// if both hp are below 0hp then game over and disables attacks		
// works fine does the job				
		if (currentEnemyHP > 0 && pokemonHP <= 0 || currentEnemyHP <= 0 && pokemonHP <= 0) {
			alert("sorry you lost!");
			$('.confirm').prop('disabled', true);	
		}	
}

// did not waste time implimenting it
// function endScreen() {

// }