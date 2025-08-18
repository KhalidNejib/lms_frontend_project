import React from 'react';

interface TableProps {
  columns: { key: string; label: string }[];
  data: any[];
  renderCell?: (row: any, key: string) => React.ReactNode;
}

const Table: React.FC<TableProps> = ({ columns, data, renderCell }) => (
  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
    <thead>
      <tr>
        {columns.map(col => (
          <th key={col.key} style={{ 
            textAlign: 'left', 
            padding: '12px 8px', 
            borderBottom: '1px solid #eee',
            fontWeight: 600,
            fontSize: '14px',
            color: '#333'
          }}>
            {col.label}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, idx) => (
        <tr key={row.id || idx}>
          {columns.map(col => (
            <td key={col.key} style={{ 
              padding: '12px 8px', 
              borderBottom: '1px solid #f5f5f5',
              fontSize: '14px'
            }}>
              {renderCell ? renderCell(row, col.key) : row[col.key]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;