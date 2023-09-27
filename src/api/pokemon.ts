const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export const fetchAllPokemons = async (limit = 150) => {
  const response = await fetch(`${BASE_URL}?limit=${limit}`);
  const data = await response.json();
  return data.results.map((pokemon: any) => ({
    ...pokemon,
    id: parseInt(pokemon.url.split("/")[6], 10)
  }));
};

export const fetchPokemonDetails = async (pokemonUrl: string): Promise<PokemonDetails> => {
  const response = await fetch(pokemonUrl);
  const data: PokemonDetails = await response.json();
  return data;
};

export const getPokemonImageURL = (id: number): string => 
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

export const getUniqueTypes = (pokemons: PokemonDetails[]): string[] => {
  return Array.from(
    new Set(pokemons.flatMap(pokemon => pokemon.types.map(typeInfo => typeInfo.type.name)))
  );
};
