import pokedex from './pokedex.json' assert { type: 'json' }

const importPokemons = document.querySelector("#import-pokemons");
addPokeCards(pokedex);

const filterBtns = document.querySelectorAll(".filter a");
filterBtns.forEach(btn => {
	btn.addEventListener("click", event => handleFilterBtns(event));
})

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

	importPokemons.appendChild(newDiv);
}

function handleFilterBtns(a){
	const selection = a.target;
	a.preventDefault();

	const pokedexClone = JSON.parse(JSON.stringify(pokedex));
	const filteredPokedex = pokedexClone.filter(pokemon => pokemon.type.includes(selection.getAttribute("data-filter")));
	
	deleteDivChildren(importPokemons);
	
	if(selection.getAttribute("data-filter") == "All"){
		addPokeCards(pokedex);
	}
	else{
		addPokeCards(filteredPokedex);
	}
}

function deleteDivChildren(div){
	while(div.firstChild){
		div.removeChild(div.firstChild);
	}
}

