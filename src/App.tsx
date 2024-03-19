import React from 'react';
import './App.css';
import { CircularProgress, Stack } from "@mui/material";
import PokemonTable from './components/PokemonTable';
import usePokemonData from './hooks/usePokemonData';
import PaginationControl from "./components/PaginationControl";

function App() {
    const { loading, data, handleSort, handlePageChange, selectedPokemon, handleRowClick, offset, limit, totalPages, sortBy, sortOrder } = usePokemonData();

    return (
        <div>
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                    <CircularProgress />
                </div>
            ) : (
                <div className={'main-table'}>
                    <PokemonTable
                        data={data}
                        handleSort={handleSort}
                        handleRowClick={handleRowClick}
                        selectedPokemon={selectedPokemon}
                        sortBy={sortBy}
                        sortOrder={sortOrder}
                     />
                    <Stack spacing={2} direction="row" justifyContent="center" alignItems="center">
                        <PaginationControl totalPages={totalPages} offset={offset} limit={limit} handlePageChange={handlePageChange} />
                    </Stack>
                </div>
            )}
        </div>
    );
}

export default App;
