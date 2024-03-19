import React from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    TableCell,
    TableRow,
    Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Pokemon } from "../services/PokemonService";

interface PokemonRowProps {
    pokemon: Pokemon;
    handleRowClick: (pokemon: Pokemon) => void;
    isSelected: boolean;
}

const PokemonRow: React.FC<PokemonRowProps> = ({ pokemon, handleRowClick, isSelected }) => {
    return (
        <>
            <TableRow onClick={() => handleRowClick(pokemon)}>
                <TableCell>{pokemon.name}</TableCell>
                <TableCell>{pokemon.base_experience}</TableCell>
                <TableCell>{pokemon.height}</TableCell>
            </TableRow>
            {isSelected && (
                <TableRow>
                    <TableCell colSpan={3}>
                        <Accordion expanded={isSelected}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon onClick={() => handleRowClick(pokemon)} />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>{pokemon.name} Details</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div>
                                    <ul>
                                        {pokemon.abilities.map((ability, index) => (
                                            <li key={index}>{ability.ability.name}</li>
                                        ))}
                                    </ul>
                                    <img src={pokemon.sprites.front_default} alt={''} />
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </TableCell>
                </TableRow>
            )}
        </>
    );
}

export default PokemonRow;
