interface Type {
    slot: number;
    type: {
        name: string;
    };
}

interface BasePokemon {
    id: number;
    name: string;
}

interface PokemonSummary extends BasePokemon {
    url: string;
}

interface PokemonSprite {
    front_default: string;
}

interface PokemonDetails extends BasePokemon {
    height: number;
    weight: number;
    types: Type[];
    sprites: PokemonSprite;
}

interface PokemonCardProps extends BasePokemon {
    imageUrl: string;
}

interface FuseSearchResult {
    item: PokemonSummary;
    refIndex: number;
}

interface PokemonListResponse {
    results: PokemonSummary[];
}

interface PokemonSearchResultsProps {
    query: string;
}
