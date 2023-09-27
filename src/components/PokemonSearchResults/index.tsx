import { useEffect, useState } from 'react';
import Fuse from 'fuse.js';
import { fetchAllPokemons, getPokemonImageURL } from '../../api/pokemon';
import PokemonCard from '../Pokemon/PokemonCard';

const PokemonSearchResults: React.FC<PokemonSearchResultsProps> = ({ query }) => {

  const [allPokemons, setAllPokemons] = useState<PokemonSummary[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<PokemonSummary[]>([]);  

  // Busca inicial para obter todos os Pokemons
  useEffect(() => {
    const fetchAndSetPokemons = async () => {
      const pokemons = await fetchAllPokemons();
      setAllPokemons(pokemons);
    };
    
    fetchAndSetPokemons();
  }, []);

  // Filtro de Pokemons com base na consulta
  useEffect(() => {
    if (query && allPokemons.length) {
      const options = {
        keys: ['name'],
        threshold: 0.4
      };
      const fuse = new Fuse(allPokemons, options);
      setFilteredPokemons(fuse.search(query).map((result: FuseSearchResult) => result.item));
    } else {
      setFilteredPokemons([]);
    }
  }, [query, allPokemons]);

  return (
    <div>
      { filteredPokemons.map(pokemon => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
        />
    
      ))}
    </div>
  );
}

export default PokemonSearchResults;
