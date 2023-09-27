import { Box, Image, Text } from '@chakra-ui/react';
import { fetchAllPokemons, fetchPokemonDetails, getPokemonImageURL } from '../../api/pokemon';

interface PokemonPageProps {
    pokemon: PokemonDetails;
}

function PokemonPage({ pokemon }: PokemonPageProps) {
  return (
    <Box padding={4}>
      <Image src={getPokemonImageURL(pokemon.id)} alt={pokemon.name} boxSize="150px" mx="auto" />
      
      <Text fontWeight="bold" fontSize="2xl" textAlign="center" mt={4}>
        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
      </Text>
      
      <Box display="flex" justifyContent="center" mt={4}>
        {pokemon.types.map(typeInfo => (
          <Box key={typeInfo.type.name} p={2} m={1} bg="gray.200" borderRadius="md">
            <Text>{typeInfo.type.name}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export async function getStaticPaths() {
    const pokemons = await fetchAllPokemons(150);
  
    const paths = pokemons.map((pokemon: PokemonDetails) => ({
      params: { id: String(pokemon.id) },
    }));
  
    return {
      paths,
      fallback: false,
    };
  }

export async function getStaticProps({ params }: { params: { id: string } }) {
  const pokemon = await fetchPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${params.id}`);

  return {
    props: { pokemon },
  };
}

export default PokemonPage;
