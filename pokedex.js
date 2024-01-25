//se pokedex filtrada estiver vazia
//se >1 argumentos




import pokedex from './pokedex.json' assert { type: 'json' }

const types = ["GRASS","POISON","FIRE","WATER","FLYING","BUG","NORMAL","ELECTRIC","GROUND","FAIRY","FIGHTING","PSYCHIC","ROCK","STEEL","ICE","GHOST","DRAGON","DARK"];

const importPokemons = document.querySelector("#import-pokemons");
addPokeCards(pokedex);

const filterBtns = document.querySelectorAll(".filter a");
filterBtns.forEach(btn => {
	btn.addEventListener("click", event => handleBtns(event));
})

let searchBar = document.querySelector("form");
searchBar.addEventListener("submit", e => {
	e.preventDefault();

	const search = document.querySelector("#search-bar").value;
	handleSearch(captalizeFirst(search));
})

//Displays a "0 results found!" message bellow the form
function noResultsMsg(){
	const newH1 = document.createElement("h1");
	newH1.appendChild(document.createTextNode("0 results found!"));
	
	const newDiv = document.createElement("div");
	newDiv.classList.add("no-results");
	
	newDiv.appendChild(newH1);
	document.body.appendChild(newDiv);
}

function addPokeCards(pokemonsToImport){
	const template = document.querySelector("#poke-card");

	const newDiv = document.createElement("div");
	newDiv.classList.add("pokemons");

	pokemonsToImport.forEach(pokemon => {
		const clone = template.content.cloneNode(true);

		clone.querySelector("h3").textContent = pokemon.name.english;
		clone.querySelector("img").src = pokemon.image.hires;

		newDiv.appendChild(clone);
	})

	document.body.appendChild(newDiv);
}

//Captalizes only the first letter os the string
function captalizeFirst(word){
	return word.charAt(0).toUpperCase() + word.toLowerCase().slice(1);
}

function handleBtns(a){
	const selection = a.target;
	a.preventDefault();

	if(selection.getAttribute("data-filter") == "All"){
		clearDisplayArea();
		addPokeCards(pokedex);
	}
	else{
		console.log("Invalid command\n");
	}
}

function removeDivByAttbt(attbt){
	const div = document.querySelector(attbt);
	if(div != null){
		div.remove();
	}
}

function clearDisplayArea(){
	removeDivByAttbt(".no-results");
	removeDivByAttbt(".pokemons");
}

function handleSearch(search){
	const pokedexClone = JSON.parse(JSON.stringify(pokedex));

	var filteredPokedex = new String;
	let pokeId;

	//Runs if the search input is a type
	if(types.includes(search.toUpperCase())){
		filteredPokedex = pokedexClone.filter(pokemon => pokemon.type.includes(search));
	}

	//Runs if the search input is a name or an numeric id
	else{
		for(let pokemon of pokedex){
			if(pokemon.id == search){
				pokeId = pokemon.id;
				break;
			}
			else if(pokemon.name.english == search){
				pokeId = pokemon.id;
				break;
			}
		}
		filteredPokedex = pokedexClone.filter(pokemon => pokemon.id == pokeId);
	}

	clearDisplayArea();

	//Check if search result is empty
	if(filteredPokedex == ""){
		noResultsMsg();
	}
	
	else{
		addPokeCards(filteredPokedex);
	}

	//Clear search bar
	document.querySelector("#search-bar").value = '';

}