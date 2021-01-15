let cardsPokemon = document.getElementById('botao-pokemons')


cardsPokemon.addEventListener('click', function () {


    const pegaPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

    const gerarPokemonPromises = () => Array(150).fill().map((_, index) =>
        fetch(pegaPokemonUrl(index + 1)).then(response => response.json()))
    
    
    const gerarHTML = pokemons => pokemons.reduce((acumulador, pokemon) => {
            const types = pokemon.types.map(typeinfo => typeinfo.type.name)
    
        acumulador += `
                    <li class="cardlista-pokemons ${types[0]} " >
                    <img class = "card-imagem"  alt="${pokemon.name}" src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" />
                    <h2 class="card-titulo" >${pokemon.id}. ${pokemon.name}<h2>
                    <p class="card-subtitulo">${types.join(' | ')} </p>
                    </li>`
    
    
        return acumulador
        }, '')
    
    
    const inserirPokemonsNaPagina = pokemons => {
        const ul = document.querySelector('[data-js="pokedex"]')
    
        ul.innerHTML = pokemons
    
    }
    
    
    const pokemonPromises = gerarPokemonPromises()
    
    
    
    Promise.all(pokemonPromises)
        .then(gerarHTML)
        .then(inserirPokemonsNaPagina)
    

})


