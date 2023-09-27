import { getPokemonImageURL } from '@/api/pokemon';
import { Box, Image, Link, Text } from '@chakra-ui/react';
import styles from "./styles.module.css";

interface PokemonCardProps {
  pokemon: PokemonSummary | PokemonDetails;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const { id, name } = pokemon;
  const imageUrl = 'sprites' in pokemon ? pokemon.sprites.front_default : getPokemonImageURL(id);

  return (
    <Box 
      maxW="sm" 
      w="200px" 
      borderWidth="1px" 
      borderRadius="lg" 
      overflow="hidden" 
      transition="transform 0.3s, box-shadow 0.3s" 
      boxShadow="0 3px 6px rgba(0, 0, 0, 0.1)" 
      _hover={{
        transform: "translateY(-5px)",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)"
      }}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Link 
        href={`/pokemon/${id}`} 
        textDecoration="none" 
        _hover={{ textDecoration: "none" }}
      >
        <Image 
          w="150px" 
          src={imageUrl} 
          alt={`${name} image`} 
          transition="opacity 0.3s"
          _hover={{ opacity: 0.9 }}
        />
        <Box p="6">
          <Text as="h2" fontWeight="bold" fontSize="xl" textAlign="center">
            {name}
          </Text>
        </Box>
      </Link>
    </Box>

  );
}

export default PokemonCard;
