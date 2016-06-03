
var pokemonAPI = "http://pokeapi.co/api/v2/";
var pokemonGenerationOneAPI = pokemonAPI + "generation/1/";
var pokemonTypesAPI = pokemonAPI + "type/1/";

function displayPokemonType(data) {
  $.each( data.types, function( i, item ) {
    $( "#thumbnailTitle" + i).text((data.types[i].name).toUpperCase());
  });
}

function displayPokemons(data) {
  var pokemonList = '<ul class="pokemon-list container" id="list">';

  $.each( data.pokemon, function( i, pokemon ) {
    pokemonList += '<li class="">';
    pokemonList += '<a href="#" data-toggle="modal" data-target="#myModal" data-url="' + data.pokemon[i].pokemon.url + '">';
    pokemonList += '<h3 class="thumbnail__title--small">' + (data.pokemon[i].pokemon.name).toUpperCase() + '</h3></a></li>';
  });
  
  pokemonList += '</ul>';
  $('#pokemonNormalList').html(pokemonList);
}

function displaySinglePokemon(data) {

  var headline = $('h4');
  headline.text(data.name);

  var img = $('img');
  img.attr({
    'src': data.sprites.front_default,
    'alt': data.name
   });

  var generalInfos = $('.general-info');
    generalInfos.empty();
    generalInfos.append('<li>Height : ' + data.height + ' ft</li>');
    generalInfos.append('<li>Weight : ' + data.weight + ' lbs</li>');

  var abilities = $('.abilities');
  var li = "";
  $.each(data.abilities, function(i) {
   li += '<li><i class="fa fa-plus" aria-hidden="true"></i>  ' + data.abilities[i].ability.name + '</li>';
  });
  abilities.html(li);
}

$.getJSON( pokemonGenerationOneAPI, displayPokemonType );
$.getJSON( pokemonTypesAPI, displayPokemons);

$('#pokemonNormalList').on('click', 'a', function(e) {
    //Cancel the link behavior
    e.preventDefault();

    // modal content
    var pokemonSingleAPI = $(this).data('url');
    $.getJSON(pokemonSingleAPI, displaySinglePokemon);
});
