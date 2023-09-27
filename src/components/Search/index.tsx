import { Input } from '@chakra-ui/react';

interface SearchProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<SearchProps> = ({ onChange }) => {
  return (
    <Input 
      placeholder="Buscar Pokémon..."
      onChange={onChange}
    />
  );
}

export default Search;
