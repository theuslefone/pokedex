import { getPokemonImageURL } from '@/api/pokemon';
import { Box, Image, Link, Text } from '@chakra-ui/react';

interface PokemonCardProps {
  pokemon: PokemonSummary | PokemonDetails;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const { id, name } = pokemon;
  const imageUrl = 'sprites' in pokemon ? pokemon.sprites.front_default : getPokemonImageURL(id);

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Link href={`/pokemon/${id}`}>
        <Image src={imageUrl} alt={`${name} image`} />
        <Box p="6">
          <Text as="h2" fontWeight="bold" fontSize="xl">
            {name}
          </Text>
        </Box>
      </Link>
    </Box>
  );
}

export default PokemonCard;
