import React, { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';

interface Column {
    key: string;
    label: string;
}

interface ReusableTableProps<T> {
    columns: Column[];
    data: T[];
    pageStart?: number; // Start index of the current page (from the backend)
    pageEnd?: number; // End index of the current page (from the backend)
    numberPerPage?: number; // Number of rows per page (from the backend)
    totalItems?: number; // Total number of items (from the backend)
    onRowClick?: (row: T) => void;
    onPageChange?: (newPageStart: number) => void; // Callback to fetch new data
    onActionClick?: (row: T) => void; // Callback for action button
}

const ReusableTable = <T extends Record<string, any>>({
                                                          columns,
                                                          data,
                                                          pageStart = 0,
                                                          pageEnd = data.length,
                                                          numberPerPage = 10,
                                                          totalItems = data.length,
                                                          onRowClick,
                                                          onPageChange,
                                                          onActionClick,
                                                      }: ReusableTableProps<T>) => {
    if (!Array.isArray(columns) || columns.length === 0) {
        throw new Error("Columns must be a non-empty array.");
    }

    if (!Array.isArray(data)) {
        throw new Error("Data must be an array.");
    }

    if (numberPerPage <= 0) {
        throw new Error("numberPerPage must be greater than 0.");
    }

    const [currentPage, setCurrentPage] = useState(() => Math.ceil(pageStart / numberPerPage) + 1);
    const totalPages = Math.ceil(totalItems / numberPerPage);

    useEffect(() => {
        // Update the current page when the `pageStart` changes (e.g., after fetching data)
        setCurrentPage(Math.ceil(pageStart / numberPerPage) + 1);
    }, [pageStart, numberPerPage]);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
        const newPageStart = (page - 1) * numberPerPage;
        setCurrentPage(page);
        if (onPageChange) {
            onPageChange(newPageStart);
        }
    };

    return (
        <div style={{ overflowX: 'auto' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                <tr>
                    {columns.map((col) => (
                        <th
                            key={col.key}
                            style={{
                                padding: '10px',
                                border: '1px solid #ddd',
                                backgroundColor: '#f4f4f4',
                                textAlign: 'left',
                            }}
                        >
                            {col.label}
                        </th>
                    ))}
                    <th
                        style={{
                            padding: '10px',
                            border: '1px solid #ddd',
                            backgroundColor: '#f4f4f4',
                            textAlign: 'left',
                        }}
                    >
                        Actions
                    </th>
                </tr>
                </thead>
                <tbody>
                {data.slice(pageStart, pageEnd).map((row, rowIndex) => (
                    <tr
                        key={rowIndex}
                        onClick={() => onRowClick && onRowClick(row)}
                        style={{
                            cursor: onRowClick ? 'pointer' : 'default',
                            backgroundColor: rowIndex % 2 === 0 ? '#fff' : '#f9f9f9',
                        }}
                    >
                        {columns.map((col) => (
                            <td
                                key={col.key}
                                style={{
                                    padding: '10px',
                                    border: '1px solid #ddd',
                                }}
                            >
                                {row[col.key]}
                            </td>
                        ))}
                        <td
                            style={{
                                padding: '10px',
                                border: '1px solid #ddd',
                                textAlign: 'center',
                            }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent triggering row click
                                    if (onActionClick) onActionClick(row);
                                }}
                            >
                                Action
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </div>
        </div>
    );
};

export default ReusableTable;
