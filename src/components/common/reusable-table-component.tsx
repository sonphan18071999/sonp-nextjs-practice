import React from 'react';

// Define types for columns and data
interface Column {
    key: string;
    label: string;
}

interface ReusableTableProps<T> {
    columns: Column[];
    data: T[];
    onRowClick?: (row: T) => void;
}

const ReusableTable = <T extends Record<string, any>>({
                                                          columns,
                                                          data,
                                                          onRowClick,
                                                      }: ReusableTableProps<T>) => {
    return (
        <div style={{overflowX: 'auto'}}>
            <table style={{borderCollapse: 'collapse', width: '100%'}}>
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
                </tr>
                </thead>
                <tbody>
                {data.map((row, rowIndex) => (
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
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReusableTable;
