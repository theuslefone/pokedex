import { Input } from '@chakra-ui/react';

interface SearchProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<SearchProps> = ({ onChange }) => {
  return (
    <Input 
    placeholder="Buscar Pokémon..."
    onChange={onChange}
    w="80%"
    maxW="600px"
    backgroundColor="white"
    borderColor="gray.300"
    borderWidth="1px"
    borderRadius="md"
    _focus={{ borderColor: 'gray.500', boxShadow: '0 0 0 1px gray.500' }}
    _hover={{ borderColor: 'gray.400' }}
    _placeholder={{ color: 'gray.400' }}
    />
  );
}

export default Search;
