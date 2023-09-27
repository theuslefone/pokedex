import { ChangeEvent, useState } from 'react';
import Search from '../components/Search';
import PokemonTabs from '../components/PokemonTabs';
import PokemonSearchResults from '../components/PokemonSearchResults';
import { Box, Image, Text, Flex, Spacer } from '@chakra-ui/react';

export default function Home() {
  const [query, setQuery] = useState<string>('');

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setQuery(searchTerm);
  };

  return (
    <>
      <Box bgImage="url('/bg-red.svg')" h={{ base: "600px", md: "650px" }}>
        <Flex alignItems="center" justifyContent='center'>
          <Image src='/logo_pokemon.svg' alt="Logo Pokemon" w='350px' mb='15px' />
        </Flex>

        <Flex flexDirection="column" alignItems="center">
          <Image w="500px" src='/img-pokeball.png' alt="Logo Pokemon" />
          <Search onChange={handleSearchChange}/>
          <Text pt='40px' fontSize={['16px', '20px']} color='white'>Comece digitando para buscar seu Pokémon favorito!</Text>
        </Flex>
      </Box>
    
      <Box mt='30px' maxW='1150px' m='20px auto'>
        {query ? (
          <PokemonSearchResults query={query} />
        ) : (
          <PokemonTabs />
        )}
      </Box>
    </>
  );
}
