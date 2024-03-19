import { useEffect, useState } from 'react';
import { fetchPokemonData, Pokemon } from '../services/PokemonService';

const usePokemonData = () => {
    const [data, setData] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [offset, setOffset] = useState<number>(0);
    const limit = 5; // Set your desired limit here
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortBy, setSortBy] = useState<string>('name');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            // we can uncomment setTimeout to observe loader on every action
            // setTimeout(async () => {
                try {
                    // Fetch data from API
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
                    const json = await response.json();

                    // Fetch details for each pokemon
                    const pokemonDataArray: Pokemon[] = [];
                    for (const pokemon of json.results) {
                        const pokemonData = await fetchPokemonData(pokemon.url);
                        pokemonDataArray.push(pokemonData);
                    }

                    // Sort data based on the selected column and order
                    const sortedData = pokemonDataArray.sort((a, b) => {
                        if (sortOrder === 'asc') {
                            return (a as any)[sortBy] < (b as any)[sortBy] ? -1 : 1;
                        } else {
                            return (a as any)[sortBy] > (b as any)[sortBy] ? -1 : 1;
                        }
                    });

                    setData(sortedData);

                    // Calculate total pages based on the total count from the API
                    const totalCount = json.count;
                    setTotalPages(Math.ceil(totalCount / limit));
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            // }, 1000);
        }

        fetchData();
    }, [offset, sortBy, sortOrder]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setOffset((value - 1) * limit);
    };

    const handleRowClick = (pokemon: Pokemon) => {
        setSelectedPokemon(pokemon === selectedPokemon ? null : pokemon);
    };

    const handleSort = (columnName: string) => {
        if (columnName === sortBy) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(columnName);
            setSortOrder('asc');
        }
    };

    return { loading, data, handleSort, handlePageChange, selectedPokemon, handleRowClick, offset, limit, totalPages, sortBy, sortOrder };
};

export default usePokemonData;
