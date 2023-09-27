import { Tab, Tabs, TabList, TabPanel, TabPanels } from "@chakra-ui/react";
import { useEffect, useState, useCallback } from "react";
import PokemonCard from "../Pokemon/PokemonCard";
import { fetchAllPokemons, fetchPokemonDetails, getUniqueTypes } from "../../api/pokemon";
import styles from "./styles.module.css";

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
    <Tabs className={styles.customTabs} variant="enclosed">
      <TabList className={styles.customList}>
        {types.map(type => (
          <Tab _selected={{fontWeight: 'bold'}} border='none' w="150px"  key={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</Tab>
        ))}
      </TabList>

      <TabPanels borderLeft='1px solid #00000021' pl='10px' >
        {types.map(type => (
          <TabPanel className={styles.customItens}  key={type}>
            {pokemons
              .filter(pokemon => pokemon.types.some(t => t.type.name === type))
              .map(pokemon => (
                <PokemonCard 
                    key={pokemon.id}
                    pokemon={pokemon}
                />
              ))}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default PokemonTabs;
