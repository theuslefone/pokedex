import { ChangeEvent, useState } from 'react';
import Search from '../components/Search';
import PokemonTabs from '../components/PokemonTabs';
import PokemonSearchResults from '../components/PokemonSearchResults';

export default function Home() {
  const [query, setQuery] = useState<string>('');

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setQuery(searchTerm);
  };

  return (
    <>
      <Search onChange={handleSearchChange} />
      {query ? (
        <PokemonSearchResults query={query} />
      ) : (
        <PokemonTabs />
      )}
    </>
  )
}
