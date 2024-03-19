import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from "@mui/material";
import PokemonRow from "./PokemonRow";
import { Pokemon } from '../services/PokemonService';

interface PokemonTableProps {
    data: Pokemon[];
    handleSort: (columnName: string) => void;
    handleRowClick: (pokemon: Pokemon) => void;
    selectedPokemon: Pokemon | null;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
}

const PokemonTable: React.FC<PokemonTableProps> = ({ data, handleSort, handleRowClick, selectedPokemon, sortBy, sortOrder }) => {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <TableSortLabel
                                active={sortBy === 'name'}
                                direction={sortBy === 'name' ? sortOrder : 'asc'}
                                onClick={() => handleSort('name')}
                            >
                                Name
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={sortBy === 'base_experience'}
                                direction={sortBy === 'base_experience' ? sortOrder : 'asc'}
                                onClick={() => handleSort('base_experience')}
                            >
                                Base Experience
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={sortBy === 'height'}
                                direction={sortBy === 'height' ? sortOrder : 'asc'}
                                onClick={() => handleSort('height')}
                            >
                                Height
                            </TableSortLabel>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((pokemon: Pokemon) => (
                        <PokemonRow
                            key={pokemon.name}
                            pokemon={pokemon}
                            handleRowClick={handleRowClick}
                            isSelected={selectedPokemon === pokemon}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default PokemonTable;
