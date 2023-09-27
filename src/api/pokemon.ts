const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export const fetchAllPokemons = async (limit = 150) => {
  const response = await fetch(`${BASE_URL}?limit=${limit}`);
  const data = await response.json();
  return data.results.map((pokemon: any) => ({
    ...pokemon,
    id: parseInt(pokemon.url.split("/")[6], 10)
    }));
};
