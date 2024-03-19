import React from 'react';
import { Pagination } from "@mui/material";

interface PaginationControlProps {
    totalPages: number;
    offset: number;
    limit: number;
    handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const PaginationControl: React.FC<PaginationControlProps> = ({ totalPages, offset, limit, handlePageChange }) => {
    return (
        <Pagination
            count={totalPages}
            page={offset / limit + 1}
            onChange={handlePageChange}
            color="standard"
        />
    );
}

export default PaginationControl;
