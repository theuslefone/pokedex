import { Box, Image, Link, Text } from '@chakra-ui/react';

const PokemonCard: React.FC<PokemonCardProps> = ({ id, name, imageUrl }) => {
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
