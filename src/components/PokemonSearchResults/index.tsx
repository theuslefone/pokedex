import React from 'react';
import { useEffect, useState } from 'react';
import Fuse from 'fuse.js';
import { fetchAllPokemons } from '../../api/pokemon';
import PokemonCard from '../Pokemon/PokemonCard';

interface PokemonSearchResultsProps {
  query: string;
}

const PokemonSearchResults: React.FC<PokemonSearchResultsProps> = ({ query }) => {
  const [allPokemons, setAllPokemons] = useState<PokemonSummary[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<PokemonSummary[]>([]);  

  useEffect(() => {
    const fetchAndSetPokemons = async () => {
      const pokemons = await fetchAllPokemons();
      setAllPokemons(pokemons);
    };
    
    fetchAndSetPokemons();
  }, []);

  useEffect(() => {
    if (query && allPokemons.length) {
      const options = {
        keys: ['name'],
        threshold: 0.4
      };
      const fuse = new Fuse(allPokemons, options);
      setFilteredPokemons(fuse.search(query).map(result => result.item));
    } else {
      setFilteredPokemons([]);
    }
  }, [query, allPokemons]);

  return (
    <div>
      {filteredPokemons.map(pokemon => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
        />
      ))}
    </div>
  );
}

export default PokemonSearchResults;
