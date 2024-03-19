export interface Pokemon {
    name: string;
    abilities: Array<{ ability: { name: string } }>;
    base_experience: number;
    height: number;
    sprites: any;
}

export async function fetchPokemonData(url: string): Promise<Pokemon> {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {

        console.error('Error fetching data:', error);
        throw error;
    }
}
