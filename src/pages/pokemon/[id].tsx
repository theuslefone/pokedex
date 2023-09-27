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

  return (
    <Flex direction="column" minH="100vh" bg={bgColor} p={10}>
      <Link alignSelf="flex-start" _hover={{ textDecoration: 'none' }} href="/">
        <Button colorScheme="teal" variant="outline" mb={6}>
          Voltar
        </Button>
      </Link>

      <Flex flex={1} direction="column" alignItems="center" justifyContent="center">
        <Box position="relative" borderRadius="full" p={4} boxShadow="md" bg="gray.200" mb={4}>
          <Image src={getPokemonImageURL(pokemon.id)} alt={pokemon.name} boxSize="150px" />
        </Box>

        <Text fontWeight="bold" fontSize="2xl" letterSpacing="wider" mt={4}>
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </Text>

        <Flex wrap="wrap" justifyContent="center" mt={4}>
          {pokemon.types.map(typeInfo => (
            <Box key={typeInfo.type.name} p={3} m={1} bg="gray.300" borderRadius="full">
              <Text fontSize="sm" fontWeight="medium">{typeInfo.type.name}</Text>
            </Box>
          ))}
        </Flex>

        <VStack spacing={4} w="100%" mt={4} align="start">
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
      </Flex>
    </Flex>
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
