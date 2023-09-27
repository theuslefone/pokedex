import { Tab, Tabs, TabList, TabPanel, TabPanels } from "@chakra-ui/react";
import { useEffect, useState, useCallback } from "react";
import PokemonCard from "../Pokemon/PokemonCard";
import { fetchAllPokemons, fetchPokemonDetails, getUniqueTypes } from "../../api/pokemon";

const PokemonTabs = () => {
  const [pokemons, setPokemons] = useState<PokemonDetails[]>([]);
  const [types, setTypes] = useState<string[]>([]);

  const fetchPokemonsData = useCallback(async () => {
    const allPokemons = await fetchAllPokemons();

    const details: PokemonDetails[] = await Promise.all(
      allPokemons.map(async (pokemon : PokemonSummary) => {
        return await fetchPokemonDetails(pokemon.url);
      })
    );

    setPokemons(details);
    const uniqueTypes = getUniqueTypes(details);
    setTypes(uniqueTypes);
  }, []);

  useEffect(() => {
    fetchPokemonsData();
  }, [fetchPokemonsData]);

  return (
    <Tabs variant="enclosed">
      <TabList>
        {types.map(type => (
          <Tab key={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</Tab>
        ))}
      </TabList>

      <TabPanels>
        {types.map(type => (
          <TabPanel key={type}>
            {pokemons
              .filter(pokemon => pokemon.types.some(t => t.type.name === type))
              .map(pokemon => (
                <PokemonCard
                    key={pokemon.id}
                    id={pokemon.id}
                    name={pokemon.name}
                    imageUrl={pokemon.sprites.front_default}
                />
              ))}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default PokemonTabs;
