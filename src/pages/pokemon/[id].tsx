import {
  Box,
  Image,
  Text,
  Progress,
  Link,
  Button,
  Flex,
  VStack,
  useColorModeValue
} from '@chakra-ui/react';
import { fetchAllPokemons, fetchPokemonDetails, getPokemonImageURL } from '../../api/pokemon';

interface PokemonPageProps {
  pokemon: PokemonDetailsPerId;
}

function PokemonPage({ pokemon }: PokemonPageProps) {
  const bgColor = useColorModeValue('gray.100', 'gray.900');

  console.log(pokemon);
  return (
    <VStack spacing={8} align="center" mt={12} bg={bgColor} p={6} borderRadius="xl" boxShadow="2xl" maxW="md" m="50px auto">
      <Link _hover={{ textDecoration: 'none' }} href="/">
        <Button colorScheme="teal" variant="outline" mb={4}>
          Voltar
        </Button>
      </Link>

      <Box position="relative" borderRadius="full" p={4} boxShadow="md" bg="gray.200">
        <Image src={getPokemonImageURL(pokemon.id)} alt={pokemon.name} boxSize="120px" />
      </Box>

      <Text fontWeight="bold" fontSize="2xl" letterSpacing="wider">
        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
      </Text>

      <Flex wrap="wrap" justifyContent="center">
        {pokemon.types.map(typeInfo => (
          <Box key={typeInfo.type.name} p={2} bg="gray.300" borderRadius="full">
            <Text fontSize="sm" fontWeight="medium">{typeInfo.type.name}</Text>
          </Box>
        ))}
      </Flex>

      <VStack spacing={4} w="80%" align="start">
        <Box>
            <Text fontWeight="medium">HP: {getStatByName(pokemon.stats, 'hp')}</Text>
            <Progress value={getStatByName(pokemon.stats, 'hp')} max={100} colorScheme="green" size="sm" />
        </Box>

        <Box>
            <Text fontWeight="medium">Attack: {getStatByName(pokemon.stats, 'attack')}</Text>
            <Progress value={getStatByName(pokemon.stats, 'attack')} max={100} colorScheme="red" size="sm" />
        </Box>

        <Box>
            <Text fontWeight="medium">Defense: {getStatByName(pokemon.stats, 'defense')}</Text>
            <Progress value={getStatByName(pokemon.stats, 'defense')} max={100} colorScheme="yellow" size="sm" />
        </Box>
    </VStack>


    </VStack>
  );
}

function getStatByName(stats: PokemonStats[], name: string): number {
  const stat = stats.find(s => s.stat.name === name);
  return stat ? stat.base_stat : 0;
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
